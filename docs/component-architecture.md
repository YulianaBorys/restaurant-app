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