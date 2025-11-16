// Shared theme controller (v7) - Auto system-follow on pages without a manual toggle
(function () {
  const STORAGE_KEY = "gm-theme";

  function getSystemPref() {
    try {
      return window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } catch (e) {
      return "light";
    }
  }

  function shouldFreezeIcons() {
    const html = document.documentElement;
    const body = document.body;
    return (
      html.hasAttribute("data-fixed-icons") ||
      (body && body.classList.contains("fixed-icons"))
    );
  }

  function swapIconsForTheme(theme) {
    if (shouldFreezeIcons()) return; // Home/index stays constant
    const iconMap = {
      instagram: {
        light: "./assets/InstagramBlack.png",
        dark: "./assets/InstagramWhite.webp",
      },
      linkedin: {
        light: "./assets/LinkedInBlack.png",
        dark: "./assets/LinkedInWhite.webp",
      },
      youtube: {
        light: "./assets/YouTubeBlack.png",
        dark: "./assets/YouTubeWhite.webp",
      },
    };
    document.querySelectorAll("img[data-icon]").forEach((img) => {
      const key = (img.getAttribute("data-icon") || "").toLowerCase();
      const set = iconMap[key];
      if (set) {
        const desired = set[theme];
        if (desired && img.getAttribute("src") !== desired) {
          img.setAttribute("src", desired);
        }
      }
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    swapIconsForTheme(theme);
  }

  function currentTheme() {
    return localStorage.getItem(STORAGE_KEY) || getSystemPref();
  }

  function toggleTheme() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const hasManualToggle = !!document.querySelector(".theme-toggle");

    if (!hasManualToggle) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      const applySystem = () => applyTheme(getSystemPref());
      applySystem();

      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applySystem();
      if (mql.addEventListener) mql.addEventListener("change", handler);
      else if (mql.addListener) mql.addListener(handler);
    } else {
      applyTheme(currentTheme());

      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        if (!localStorage.getItem(STORAGE_KEY)) {
          applyTheme(getSystemPref());
        }
      };
      if (mql.addEventListener) mql.addEventListener("change", handleChange);
      else if (mql.addListener) mql.addListener(handleChange);

      document.querySelectorAll(".theme-toggle").forEach((btn) => {
        btn.addEventListener("click", toggleTheme);
        btn.setAttribute(
          "aria-pressed",
          currentTheme() === "dark" ? "true" : "false",
        );
      });
    }
  });
})();
