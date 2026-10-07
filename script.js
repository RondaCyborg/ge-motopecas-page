const CONFIG = {
  whatsapp: "5585992923169",
  instagram: "https://www.instagram.com/gemotopecasoficial/",
  timezone: "America/Fortaleza"
};

const messages = {
  header: "Olá! Vim pelo site da GE Motopeças e gostaria de consultar uma peça.",
  menu: "Olá! Vim pelo site da GE Motopeças e gostaria de mais informações.",
  hero: "Olá! Gostaria de consultar preço e disponibilidade de uma peça na GE Motopeças.",
  varejo: "Olá! Gostaria de consultar uma peça no varejo.",
  atacado: "Olá! Tenho interesse em atendimento no atacado. Gostaria de consultar disponibilidade e condições.",
  final: "Olá! Vim pelo site da GE Motopeças e gostaria de consultar preço e disponibilidade.",
  floating: "Olá! Vim pelo site da GE Motopeças e gostaria de consultar uma peça."
};

const categories = {
  pecas: {
    number: "01",
    image: "./assets/cat-pecas.webp",
    imageAlt: "Imagem promocional da categoria peças de moto",
    tag: "PEÇAS",
    kicker: "PARA SUA MOTO",
    title: "PEÇAS",
    text: "Consulte disponibilidade para a peça que você procura e fale diretamente com a equipe.",
    cta: "Consultar peças no WhatsApp",
    message: "Olá! Gostaria de consultar disponibilidade e preço de uma peça para minha moto."
  },
  pneus: {
    number: "02",
    image: "./assets/cat-acessorios.webp",
    imageAlt: "Imagem promocional da categoria pneus de moto",
    tag: "PNEUS",
    kicker: "RODAGEM E SEGURANÇA",
    title: "PNEUS",
    text: "Informe a medida ou o modelo da moto e consulte as opções disponíveis diretamente com a loja.",
    cta: "Consultar pneus no WhatsApp",
    message: "Olá! Gostaria de consultar disponibilidade e preço de pneus. Posso informar a medida ou o modelo da moto."
  },
  capacetes: {
    number: "03",
    image: "./assets/cat-capacetes.webp",
    imageAlt: "Imagem promocional da categoria capacetes de moto",
    tag: "CAPACETES",
    kicker: "PROTEÇÃO E ESTILO",
    title: "CAPACETES",
    text: "Consulte os modelos e tamanhos disponíveis. A equipe informa as opções atuais pelo WhatsApp.",
    cta: "Consultar capacetes no WhatsApp",
    message: "Olá! Gostaria de saber quais capacetes e tamanhos estão disponíveis."
  },
  acessorios: {
    number: "04",
    image: "./assets/cat-pneus.webp",
    imageAlt: "Imagem promocional da categoria acessórios de moto",
    tag: "ACESSÓRIOS",
    kicker: "PRATICIDADE NO DIA A DIA",
    title: "ACESSÓRIOS",
    text: "Procure um acessório específico ou explique o que precisa e consulte as opções disponíveis.",
    cta: "Consultar acessórios no WhatsApp",
    message: "Olá! Gostaria de consultar acessórios para minha moto."
  }
};

const waUrl = (message) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;

document.querySelectorAll("[data-wa]").forEach((link) => {
  const key = link.dataset.wa;
  link.href = waUrl(messages[key] || messages.floating);
});

/* Header and mobile navigation */
const header = document.querySelector(".site-header");
const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const scrollProgress = document.getElementById("scrollProgress");

function closeMenu() {
  mobileMenu?.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}
menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  mobileMenu?.classList.toggle("open", !open);
  document.body.classList.toggle("menu-open", !open);
});
mobileMenu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

/* Category switcher */
const categoryTabs = [...document.querySelectorAll(".category-tab")];
const categoryNumber = document.getElementById("categoryNumber");
const categoryImage = document.getElementById("categoryImage");
const categoryTag = document.getElementById("categoryTag");
const categoryKicker = document.getElementById("categoryKicker");
const categoryTitle = document.getElementById("categoryTitle");
const categoryText = document.getElementById("categoryText");
const categoryCta = document.getElementById("categoryCta");

function setCategory(key) {
  const data = categories[key];
  if (!data) return;

  categoryTabs.forEach((tab) => {
    const active = tab.dataset.category === key;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });

  categoryNumber.textContent = data.number;
  categoryImage.src = data.image;
  categoryImage.alt = data.imageAlt;
  categoryTag.textContent = data.tag;
  categoryKicker.textContent = data.kicker;
  categoryTitle.textContent = data.title;
  categoryText.textContent = data.text;
  categoryCta.firstChild.textContent = `${data.cta} `;
  categoryCta.href = waUrl(data.message);
}
categoryTabs.forEach((tab) => tab.addEventListener("click", () => setCategory(tab.dataset.category)));

/* Spotlight cards */
document.querySelectorAll("[data-spotlight]").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  });
});

/* Manifesto reveal */
const manifesto = document.getElementById("manifesto");
const words = [...document.querySelectorAll(".manifesto .word")];

function updateManifesto() {
  if (!manifesto || !words.length) return;
  const rect = manifesto.getBoundingClientRect();
  const travel = Math.max(1, manifesto.offsetHeight - window.innerHeight * 0.62);
  const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.73 - rect.top) / travel));
  const visible = Math.round(progress * words.length);
  words.forEach((word, i) => word.classList.toggle("active", i < visible));
}

/* Audience sticky cards */
const audienceCards = [...document.querySelectorAll("[data-audience]")];
const audienceProgress = document.getElementById("audienceProgress");

if (audienceCards.length) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    const index = audienceCards.indexOf(visible.target);
    audienceCards.forEach((card, i) => card.classList.toggle("active", i === index));
    if (audienceProgress) audienceProgress.style.width = `${((index + 1) / audienceCards.length) * 100}%`;
  }, {
    threshold: [0.35, 0.55, 0.75],
    rootMargin: "-20% 0px -28% 0px"
  });

  audienceCards.forEach((card) => observer.observe(card));
}

/* Live store status fixed to Baturité / Fortaleza timezone */
function getLocalStoreTime() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: CONFIG.timezone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).formatToParts(new Date());

  const values = Object.fromEntries(parts.map(({type, value}) => [type, value]));
  const dayMap = {Sun:0, Mon:1, Tue:2, Wed:3, Thu:4, Fri:5, Sat:6};

  return {
    day: dayMap[values.weekday],
    hour: Number(values.hour),
    minute: Number(values.minute)
  };
}
const toMinutes = (h, m) => h * 60 + m;

function updateStoreStatus() {
  const now = getLocalStoreTime();
  const current = toMinutes(now.hour, now.minute);
  const heroStatus = document.getElementById("heroStatus");
  const heroStatusDetail = document.getElementById("heroStatusDetail");
  const storeStatus = document.getElementById("storeStatus");
  const storeStatusDetail = document.getElementById("storeStatusDetail");
  const statusDot = document.getElementById("statusDot");

  let open = false;
  let title = "Fechado agora";
  let detail = "Consulte novamente no próximo horário de funcionamento";

  if (now.day >= 1 && now.day <= 5) {
    open = current >= toMinutes(7,30) && current < toMinutes(17,0);
    if (open) {
      title = "Aberto agora";
      detail = "Hoje até 17:00";
    } else if (current < toMinutes(7,30)) {
      title = "Abre às 07:30";
      detail = "Funcionamento hoje até 17:00";
    } else {
      title = "Fechado agora";
      detail = now.day === 5 ? "Sábado abre às 07:30" : "Amanhã abre às 07:30";
    }
  } else if (now.day === 6) {
    open = current >= toMinutes(7,30) && current < toMinutes(12,0);
    if (open) {
      title = "Aberto agora";
      detail = "Hoje até 12:00";
    } else if (current < toMinutes(7,30)) {
      title = "Abre às 07:30";
      detail = "Funcionamento hoje até 12:00";
    } else {
      title = "Fechado agora";
      detail = "Segunda-feira abre às 07:30";
    }
  } else {
    title = "Fechado hoje";
    detail = "Domingo • segunda abre às 07:30";
  }

  heroStatus.textContent = title;
  heroStatusDetail.textContent = detail;
  storeStatus.textContent = title;
  storeStatusDetail.textContent = detail;
  statusDot.classList.toggle("open", open);
  statusDot.classList.toggle("closed", !open);

  document.querySelectorAll(".schedule-row").forEach((row) => row.classList.remove("active"));
  const activeKey = now.day === 6 ? "saturday" : now.day === 0 ? "sunday" : "weekday";
  document.querySelector(`[data-day="${activeKey}"]`)?.classList.add("active");
}

/* FAQ */
document.querySelectorAll(".faq-list details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    document.querySelectorAll(".faq-list details").forEach((other) => {
      if (other !== detail) other.removeAttribute("open");
    });
  });
});

/* Reveal */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: .12, rootMargin: "0px 0px -30px"});
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

function updateScroll() {
  header?.classList.toggle("scrolled", window.scrollY > 18);

  const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const progress = Math.min(1, Math.max(0, window.scrollY / scrollable));
  if (scrollProgress) scrollProgress.style.width = `${progress * 100}%`;

  updateManifesto();
}

document.getElementById("year").textContent = new Date().getFullYear();

window.addEventListener("scroll", updateScroll, {passive:true});
updateScroll();
updateStoreStatus();
setInterval(updateStoreStatus, 60000);
setCategory("pecas");
