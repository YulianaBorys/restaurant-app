# Архітектура компонентів проєкту (Lab 1.2)

## 1. Дерево ієрархії компонентів (Component Tree)

```text
AppLayout (layout)
├── SiteHeader (layout)
│   └── MainNav (navigation)
├── [маршрутизований вміст / pages]
│   ├── MenuPage (pages)
│   │   ├── Section (ui)
│   │   ├── MenuSummary (dishes)
│   │   └── MenuList (dishes)
│   │       ├── DishCard (dishes)
│   │       │   └── AvailabilityBadge (dishes)
│   │       └── EmptyState (ui)
│   │
│   └── OrderPage (pages)
│       └── Section (ui)
│           ├── DishCard (dishes)
│           │   └── AvailabilityBadge (dishes)
│           └── OrderFormPreview (orders)
│               ├── FormField (ui)
│               └── AppButton (ui)
│
└── Footer (layout)
```


## 2. Контракти компонентів (Props API)

| Компонент | Папка | Вхідні пропси (Props) | Опис та призначення |
| --- | --- | --- | --- |
| `Section` | `components/ui` | `id`, `title`, `children` | Універсальний блок секції із заголовком та вкладеним вмістом. |
| `FormField` | `components/ui` | `id`, `label`, `hint`, `children` | Обгортка для полів введення, що пов'язує мітку з полем і виводить підказку. |
| `AppButton` | `components/ui` | `type`, `variant`, `disabled`, `children` | Кастомна кнопка з підтримкою стильових варіантів. |
| `EmptyState` | `components/ui` | `title`, `children` | Відображає повідомлення про відсутні дані або порожній список. |
| `AvailabilityBadge` | `components/dishes` | `available` (`boolean`) | Відображає статус доступності страви. |
| `DishCard` | `components/dishes` | `dish` (`object`) | Картка страви з ціною, описом і бейджем доступності. |
| `MenuList` | `components` | `items` (`array`) | Відображає список страв або повідомлення про порожній список. |
| `MenuSummary` | `components/dishes` | `total` (`number`) | Показує загальну кількість страв у каталозі. |
| `OrderFormPreview` | `components/orders` | — | Форма підготовки замовлення з полями імені, телефону, адреси та кількості. |
| `AppLayout` | `components/layout` | `title`, `links`, `children` | Загальний каркас сайту: шапка, основний вміст і підвал. |


# Архітектура компонентів та навігації (Лабораторна робота 2.2)

## 1. Карта сторінок та дерево маршрутів (Routes Tree)

Всі маршрути додатку оголошені в `src/App.jsx` з використанням `react-router-dom`:

- `<AppLayout />` (спільна оболонка, що надає `DishSelectionProvider`)
  - `/` — `HomePage`: Головна сторінка.
  - `/menu` — `MenuListPage`: Каталог страв із синхронізацією фільтрів у URL (`useSearchParams`).
  - `/menu/:dishId` — `DishDetailsPage`: Параметризована сторінка деталей конкретної страви (`useParams`).
  - `/order` — `<OrdersLayout />` (вкладена оболонка з підменю розділу):
    - `/order` (index) — `OrdersPage`: Список наявних замовлень.
    - `/order/new` — `OrderCreatePage`: Форма підготовки нової чернетки замовлення.
    - `/order/:orderId/edit` — `OrderEditPage`: Редагування наявного замовлення.
  - `*` — `NotFoundPage`: Сторінка обробки невідомих адрес та відсутніх записів (404).

## 2. Специфікація засобів навігації та роботи з URL

| Інструмент | Компоненти / Файли | Призначення |
| :--- | :--- | :--- |
| `NavLink` | `MainNav.jsx`, `OrdersLayout.jsx` | Підсвітка активного розділу (`.active`) та атрибут доступності `aria-current="page"`. |
| `Link` | `SiteHeader.jsx`, `DishCard.jsx`, `NotFoundPage.jsx` | Клієнтські переходи без перезавантаження всієї HTML-сторінки. |
| `useParams` | `DishDetailsPage.jsx`, `OrderEditPage.jsx` | Зчитування змінних параметрів шляху (`:dishId`, `:orderId`). |
| `useSearchParams` | `useDishFilters.js`, `OrderCreatePage.jsx` | Синхронізація фільтрів каталогу (`?q=...&available=1`) та передача `?dishId=...` в URL. |
| `useNavigate` | `DishDetailsPage.jsx`, `OrderCreatePage.jsx` | Програмний перехід після дій користувача (замовлення, скасування). |

## 3. Збереження стану між переходами (Context API)

Для збереження обраної страви під час будь-яких переходів між сторінками, `<Outlet/>` всередині `AppLayout.jsx` обгорнуто в `DishSelectionProvider`. Це дозволяє уникнути скидання стану вибору страви при навігації між `/menu` та `/order`.


# Оновлена компонентна архітектура (Лабораторна робота 3.1)

## Карта маршрутів та параметрів URL

| Шлях (Path) | Компонент | Параметри URL / Джерело даних | Призначення |
| :--- | :--- | :--- | :--- |
| `/` | `HomePage` | — | Головна сторінка закладу. |
| `/menu` | `MenuPage` | `?q=`, `?category=`, `?sort=` (`useSearchParams`) | Каталог страв із пошуком, категоріями та сортуванням. |
| `/menu/:dishId` | `DishDetailsPage` | `:dishId` (`useParams`) | Деталі страви та перехід до замовлення. |
| `/orders` | `OrdersPage` | `?q=`, `?cutlery=`, `?sort=` (`useSearchParams`) | Список замовлень із можливістю фільтрації. |
| `/orders/new` | `OrderCreatePage` | `?dishId=` (`useSearchParams`) | Форма підготовки та створення замовлення. |
| `/orders/:orderId` | `OrderDetailsPage` | `:orderId` (`useParams`) | Перегляд замовлення та видалення з модальним вікном. |
| `/orders/:orderId/edit` | `OrderEditPage` | `:orderId` (`useParams`) | Форма оновлення даних замовлення. |
| `*` | `NotFoundPage` | — | Опрацювання невідомих маршрутів (404). |