"use client";

import { useState } from "react";
import { withBasePath } from "@/lib/basePath";

type EvidenceImage = {
  src: string;
  alt: string;
  caption: string;
};

type EvidenceMedia = {
  label: string;
  images: readonly EvidenceImage[];
};

export function CommunityEvidenceCarousel({ media, locale }: { media: EvidenceMedia; locale: "es" | "en" }) {
  const [current, setCurrent] = useState(0);
  const image = media.images[current];
  const total = media.images.length;

  function move(direction: -1 | 1) {
    setCurrent((index) => (index + direction + total) % total);
  }

  return (
    <details className="community-evidence">
      <summary>
        <span className="evidence-summary-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Zm2 10.7.2.3h11.6l.2-.3-3.5-4.1-2.3 2.5-1.7-1.8L6 17.2Zm8.7-6.7a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4Z" />
          </svg>
        </span>
        <span>{media.label}</span>
        <span className="evidence-summary-count">{total}</span>
        <span className="evidence-summary-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div className="community-carousel" aria-roledescription="carousel" aria-label={media.label}>
        <figure>
          <a href={withBasePath(image.src)} target="_blank" rel="noreferrer">
            <img
              src={withBasePath(image.src)}
              alt={image.alt}
              width="1200"
              height="800"
              loading="lazy"
              decoding="async"
            />
          </a>
          <figcaption>{image.caption}</figcaption>
        </figure>
        <div className="community-carousel-controls">
          <button type="button" onClick={() => move(-1)} aria-label={locale === "es" ? "Imagen anterior" : "Previous image"}>←</button>
          <span aria-live="polite">{current + 1} / {total}</span>
          <div className="community-carousel-dots" aria-hidden="true">
            {media.images.map((item, index) => (
              <i className={index === current ? "active" : ""} key={item.src} />
            ))}
          </div>
          <button type="button" onClick={() => move(1)} aria-label={locale === "es" ? "Imagen siguiente" : "Next image"}>→</button>
        </div>
      </div>
    </details>
  );
}
