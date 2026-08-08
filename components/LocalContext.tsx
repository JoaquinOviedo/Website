"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/content/portfolio";

type WeatherState =
  | { status: "idle" | "loading" | "error"; temperature?: never; code?: never }
  | { status: "success"; temperature: number; code: number };

const weatherIcon = (code: number) => {
  if (code === 0) return "☀";
  if (code <= 3) return "◑";
  if (code <= 48) return "≋";
  if (code <= 67 || (code >= 80 && code <= 82)) return "☂";
  if (code <= 77 || (code >= 85 && code <= 86)) return "❄";
  return "ϟ";
};

export function LocalContext({ locale }: { locale: Locale }) {
  const [time, setTime] = useState("--:--");
  const [weather, setWeather] = useState<WeatherState>({ status: "idle" });
  const copy = locale === "es"
    ? { time: "Hora local", weather: "Ver clima local", loading: "Consultando clima", error: "No se pudo obtener el clima. Intentar nuevamente", current: "Clima local actual" }
    : { time: "Local time", weather: "Show local weather", loading: "Checking weather", error: "Weather unavailable. Try again", current: "Current local weather" };

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat(locale === "es" ? "es-AR" : "en", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()));
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, [locale]);

  function requestWeather() {
    if (!navigator.geolocation) {
      setWeather({ status: "error" });
      return;
    }
    setWeather({ status: "loading" });
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const latitude = Number(coords.latitude.toFixed(2));
        const longitude = Number(coords.longitude.toFixed(2));
        try {
          const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`, { headers: { Accept: "application/json" } });
          if (!response.ok) throw new Error("Weather request failed");
          const data = await response.json() as { current?: { temperature_2m?: number; weather_code?: number } };
          if (typeof data.current?.temperature_2m !== "number" || typeof data.current.weather_code !== "number") throw new Error("Invalid weather response");
          setWeather({ status: "success", temperature: Math.round(data.current.temperature_2m), code: data.current.weather_code });
        } catch {
          setWeather({ status: "error" });
        }
      },
      () => setWeather({ status: "error" }),
      { enableHighAccuracy: false, timeout: 8_000, maximumAge: 1_800_000 },
    );
  }

  const weatherLabel = weather.status === "loading" ? copy.loading : weather.status === "error" ? copy.error : weather.status === "success" ? `${copy.current}: ${weather.temperature} °C` : copy.weather;

  return (
    <div className="local-context">
      <time aria-label={`${copy.time}: ${time}`} title={copy.time}>{time}</time>
      <button type="button" onClick={requestWeather} disabled={weather.status === "loading"} aria-label={weatherLabel} title={weatherLabel}>
        <span aria-hidden="true">{weather.status === "loading" ? "…" : weather.status === "success" ? weatherIcon(weather.code) : weather.status === "error" ? "↻" : "⌖"}</span>
        {weather.status === "success" ? <b>{weather.temperature}°</b> : null}
      </button>
      <span className="sr-only" role="status" aria-live="polite">{weather.status === "idle" ? "" : weatherLabel}</span>
    </div>
  );
}
