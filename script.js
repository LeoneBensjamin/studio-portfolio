const SITE_SETTINGS = {
  name: "NORTHSTAR STUDIO",
  email: "leonebensjamin21@gmail.com",
  // Use your country code and number only, without +, spaces, or punctuation.
  whatsapp: "REPLACE_WITH_YOUR_WHATSAPP_NUMBER"
};

document.querySelectorAll("[data-studio-name]").forEach((element) => {
  element.textContent = SITE_SETTINGS.name;
});

document.title = `${SITE_SETTINGS.name} — Independent Web Design`;
document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
document
  .querySelector('meta[name="description"]')
  ?.setAttribute(
    "content",
    `${SITE_SETTINGS.name} creates thoughtful, refined websites for ambitious small businesses.`
  );

document.querySelectorAll("[data-studio-initial]").forEach((element) => {
  element.textContent = SITE_SETTINGS.name.charAt(0);
});

document.querySelectorAll("[data-studio-home]").forEach((link) => {
  link.setAttribute("aria-label", `${SITE_SETTINGS.name} home`);
});

document.querySelectorAll("[data-studio-top]").forEach((link) => {
  link.setAttribute("aria-label", `${SITE_SETTINGS.name} back to top`);
});

const emailIsConfigured = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(SITE_SETTINGS.email);

document.querySelectorAll("[data-email-link], [data-email-text]").forEach((link) => {
  if (emailIsConfigured) {
    link.href = `mailto:${SITE_SETTINGS.email}`;
    link.removeAttribute("aria-disabled");
  } else {
    link.removeAttribute("href");
    link.setAttribute("aria-disabled", "true");
  }
});

document.querySelectorAll("[data-email-text]").forEach((link) => {
  link.textContent = emailIsConfigured
    ? SITE_SETTINGS.email
    : "Email address not configured";
});

const whatsappIsConfigured = /^\d+$/.test(SITE_SETTINGS.whatsapp);

document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
  if (whatsappIsConfigured) {
    link.href = `https://wa.me/${SITE_SETTINGS.whatsapp}`;
    link.removeAttribute("aria-disabled");
  } else {
    link.removeAttribute("href");
    link.setAttribute("aria-disabled", "true");
  }
});

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");

if (menuToggle && primaryNavigation) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    primaryNavigation.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute(
      "aria-label",
      isExpanded ? "Open navigation menu" : "Close navigation menu"
    );
    primaryNavigation.classList.toggle("is-open", !isExpanded);
  });

  primaryNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });
}
