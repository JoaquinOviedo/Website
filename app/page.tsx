export default function Home() {
  const redirectScript = `
    (function () {
      try {
        var storedLocale = localStorage.getItem("locale");
        var locale;

        if (storedLocale === "es" || storedLocale === "en") {
          locale = storedLocale;
        } else {
          var languages =
            navigator.languages && navigator.languages.length
              ? navigator.languages
              : [navigator.language];

          locale = languages.some(function (language) {
            return language.toLowerCase().startsWith("es");
          })
            ? "es"
            : "en";
        }

        window.location.replace(
          "/" + locale + "/" + window.location.search + window.location.hash
        );
      } catch (error) {
        window.location.replace("/es/");
      }
    })();
  `;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />

      <noscript>
        <a href="/es/">Abrir portfolio</a>
      </noscript>
    </>
  );
}
