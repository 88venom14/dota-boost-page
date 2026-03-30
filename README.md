# Semka x ZXKalendarb — Dota 2 Boosting Service

**Dota 2 Boost by Semka x ZXKalendarb** — профессиональный сервис буста MMR в Dota 2.

---

## 📦 Структура проекта

```
semkadotasperma/
├── public/
│   ├── extension/          # Браузерное расширение
│   │   ├── assets/         # Баннеры и иконки
│   │   ├── content.js      # Скрипт замены рекламы
│   │   ├── manifest.json   # Конфигурация расширения
│   │   └── popup.html      # Окно расширения
│   ├── logo.png            # Логотип проекта
│   ├── favicon.ico         # Иконка сайта
│   └── sitemap.xml         # SEO карта сайта
├── src/
│   ├── components/         # React компоненты
│   │   ├── Header.tsx      # Шапка сайта
│   │   ├── Hero.tsx        # Главный экран
│   │   ├── Services.tsx    # Услуги
│   │   ├── Reviews.tsx     # Отзывы
│   │   └── Footer.tsx      # Подвал
│   ├── App.tsx             # Главный компонент
│   ├── main.tsx            # Точка входа
│   └── index.css           # Глобальные стили
├── index.html              # Главная страница
├── package.json            # Зависимости проекта
├── vite.config.ts          # Конфигурация Vite
└── README.md               # Документация
```

---

## 🌐 Запуск сайта

### Требования
- Node.js 18+
- npm или yarn

### Установка

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка для production
npm run build

# Предварительный просмотр production-сборки
npm run preview
```

Сайт будет доступен по адресу `http://localhost:5173`

---

## 🎨 Структура сайта

### Разделы

| Раздел | Описание |
|--------|----------|
| Hero | Главный экран с призывом к действию |
| Pain Points | Проблемы игроков (Токсичность, Сон, Победа) |
| Services | Услуги буста (MMR, Калибровка, Экспресс, Коучинг) |
| Reviews | Отзывы клиентов с формой отправки |

### Компоненты

- **Header** — навигация с логотипом
- **Hero** — промо-блок с CTA
- **Services** — карточки услуг
- **Reviews** — бегущая строка отзывов + форма
- **Footer** — ссылки и копирайт

---

## 🔌 Браузерное расширение

Расширение заменяет рекламу на баннеры Semka x ZXKalendarb на всех сайтах.

### Установка

#### Для Chrome / Яндекс.Браузера / Edge

1. Откройте `chrome://extensions/`
2. Включите **Режим разработчика**
3. Нажмите **Загрузить распакованное**
4. Выберите папку `public/extension`
5. Расширение установлено ✓

#### Для Firefox

1. Откройте `about:debugging#/runtime/this-firefox`
2. Нажмите **Загрузить временное дополнение**
3. Выберите файл `public/extension/manifest.json`

---

## 🎯 Как работает расширение

### Алгоритм выбора баннера

| Тип слота | Соотношение | Пример | Баннер |
|-----------|-------------|--------|--------|
| Вертикальный | `< 0.8` | 300×600 | `banner-vert.png` |
| Горизонтальный | `> 1.5` | 728×90 | `banner-horiz.png` |
| По умолчанию | `0.8 – 1.5` | 300×250 | `banner-main.png` |

### Поддерживаемые сети

- Google Ads (AdSense, DoubleClick)
- YouTube Ads
- Taboola, Outbrain, MGID
- Социальные сети

### Технологии

- **Manifest V3**
- **MutationObserver** — отслеживание динамической рекламы
- **Chrome Storage API** — статистика замен

---

## 📊 Статистика расширения

- **Всего очищено баннеров** — счётчик в popup
- **Status: Protected** — индикатор активности

---

## 🛠 Разработка

### Отладка расширения

1. Откройте консоль (F12)
2. Ищите логи:
   ```
   [Semka] Banner selected: banner-horiz.png (ratio: 8.11, 728x90)
   [Semka] Found 3 ad(s) to heal
   ```

### Очистка кэша

1. `chrome://extensions/` → Reload
2. Ctrl+Shift+Delete → Очистить кэш
3. Ctrl+F5 на странице

---

## 📁 Активы

### Баннеры

| Файл | Назначение |
|------|------------|
| `banner-main.png` | Основной 16:9 |
| `banner-horiz.png` | Горизонтальный |
| `banner-vert.png` | Вертикальный |

### Логотипы

| Файл | Назначение |
|------|------------|
| `logo.png` | Логотип сайта |
| `favicon.ico` | Иконка сайта |

---

## 📞 Контакты

- **Сайт:** https://semka-boost.com
- **Dota 2 Boost by Semka x ZXKalendarb © 2026**

> *"Ранг — это просто цифра, твои нервы — это всё."*
