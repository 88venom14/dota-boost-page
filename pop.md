Вот готовый технический фундамент для твоего расширения. Это самая сложная часть системы, так как она должна работать «агрессивно», но не ломать верстку сайтов.

Ниже представлен код Manifest V3 и основной Content Script на TypeScript/JavaScript.
1. manifest.json

Этот файл говорит браузеру, какие права нужны расширению. Мы запрашиваем доступ ко всем сайтам, чтобы заменять рекламу везде.
JSON

{
  "manifest_version": 3,
  "name": "Dota 2 Boost by Semka | Ad-Healer",
  "version": "1.0",
  "description": "Заменяет токсичную рекламу на спокойствие и MMR.",
  "permissions": ["storage"],
  "host_permissions": ["<all_urls>"],
  "action": {
    "default_popup": "popup.html",
    "default_icon": "icon.png"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"],
      "run_at": "document_start"
    }
  ],
  "web_accessible_resources": [
    {
      "resources": ["banner.webp"],
      "matches": ["<all_urls>"]
    }
  ]
}

2. content.js (Сердце расширения)

Этот скрипт ищет рекламные блоки и заменяет их на твой баннер. Он использует MutationObserver, чтобы отлавливать рекламу, которая подгружается динамически (как на YouTube или при скролле).
JavaScript

// Конфигурация селекторов (база данных рекламных блоков)
const AD_SELECTORS = [
  '.adsbygoogle', '[id^="google_ads"]', '.ad-unit', 
  '.ytd-ad-slot-renderer', '.shimmer-ad', '.v-ad',
  '.premium-ads', '[class*="sponsored-post"]',
  'iframe[src*="doubleclick.net"]', 'aside[aria-label="Ads"]'
];

const BANNER_URL = chrome.runtime.getURL('banner.webp');
let healedCount = 0;

// Функция замены
function healAds(node = document) {
  AD_SELECTORS.forEach(selector => {
    const ads = node.querySelectorAll(selector);
    ads.forEach(ad => {
      if (ad.dataset.semkaHealed) return; // Пропускаем уже замененные

      // Создаем контейнер в стиле Apple
      const replacement = document.createElement('div');
      replacement.style.cssText = `
        width: 100% !important;
        height: 100% !important;
        min-height: 150px;
        background: url("${BANNER_URL}") center/cover no-repeat;
        border-radius: 12px;
        border: 1px solid rgba(255, 140, 0, 0.3);
        cursor: pointer;
        transition: transform 0.3s ease;
        display: flex;
        align-items: flex-end;
        padding: 15px;
        box-sizing: border-box;
      `;
      
      replacement.onclick = () => window.open('https://semka-boost.com', '_blank');
      replacement.onmouseover = () => replacement.style.transform = 'scale(1.01)';
      replacement.onmouseout = () => replacement.style.transform = 'scale(1)';

      // Очищаем оригинал и вставляем наш баннер
      ad.innerHTML = '';
      ad.appendChild(replacement);
      ad.dataset.semkaHealed = "true";
      
      healedCount++;
      updateCounter();
    });
  });
}

// Сохраняем статистику в память браузера
function updateCounter() {
  chrome.storage.local.get(['totalHealed'], (res) => {
    const total = (res.totalHealed || 0) + 1;
    chrome.storage.local.set({ totalHealed: total });
  });
}

// Наблюдатель за изменениями DOM (для YouTube и бесконечных лент)
const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    if (mutation.addedNodes.length) healAds();
  });
});

// Запуск
healAds();
observer.observe(document.body || document.documentElement, {
  childList: true,
  subtree: true
});

3. popup.html (Минималистичное окно)

То, что увидит юзер при клике на иконку расширения. Стиль: Apple Dark Mode.
HTML

<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      width: 220px;
      background: #0A0A0A;
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      padding: 20px;
      text-align: center;
    }
    .count {
      font-size: 32px;
      font-weight: 700;
      color: #FF8C00;
      margin: 10px 0;
    }
    .label {
      font-size: 12px;
      color: #636366;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    button {
      background: #FF8C00;
      border: none;
      color: white;
      padding: 10px 20px;
      border-radius: 8px;
      margin-top: 15px;
      cursor: pointer;
      font-weight: 600;
      width: 100%;
    }
  </style>
</head>
<body>
  <div class="label">Очищено баннеров</div>
  <div id="counter" class="count">0</div>
  <div style="font-size: 13px;">Твой покой под защитой Semka</div>
  <button onclick="window.open('https://semka-boost.com')">Заказать буст</button>

  <script>
    chrome.storage.local.get(['totalHealed'], (res) => {
      document.getElementById('counter').innerText = res.totalHealed || 0;
    });
  </script>
</body>
</html>