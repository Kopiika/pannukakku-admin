# 🥞 pannukakku-admin

This is a simple admin dashboard for viewing, sorting, searching, and updating pancake orders. Access is granted only after entering a password. Orders are stored in the browser's `localStorage`. This project is part of a broader system and works together with the [pannukakku-order-client](https://kopiika.github.io/pannukakku-order-client/), where the customer creates an order.

## 🔗 Live Demo

[🌐 View it on GitHub Pages](https://kopiika.github.io/pannukakku-admin/)

## 🛠️ Technologies

- HTML5
- CSS3 (with custom styling and responsive layout)
- JavaScript (Vanilla)
- `localStorage` for data persistence
- DOM Manipulation and Event Handling


## 📋 Features

- 🔐 **Password Protection** – Admin interface is protected with a simple password modal.
- 📦 **Order Display** – View all orders with customer details and pancake selections.
- 🧾 **Order Status Management** – Change order status between:
  - `awaits` 
  - `ready`
  - `delivered`
- 🗑️ **Delete Orders** – Orders marked as `delivered` can be deleted.
- 🔍 **Search** – Find orders by customer's name in real-time.
- 🔃 **Sorting** – Sort orders based on their status.
- 💾 **LocalStorage Based** – All data is stored locally in the browser.


## 📸 Screenshot

![App Preview](image/screenshot%20.png)


## 📚 What I Learned

- Handling user authentication logic on the client side
- Using `localStorage` for simple state management
- Building interactive UI with vanilla JavaScript
- DOM-based rendering and dynamic styling by state
- Creating responsive layouts with plain CSS


## 🚀 Getting Started


⚠️ Important: This project is connected with the [pannukakku-order-client project](https://github.com/Kopiika/pannukakku-admin). 
The pannukakku-admin project allows you to view and manage orders that customers place on the [pannukakku-order-client page](https://kopiika.github.io/pannukakku-order-client/).

1. Clone or download this repository.
2. Open `index.html` in your browser.

```bash
git clone https://github.com/yourusername/pannukakku-admin.git
cd pannukakku-admin
open index.html
```
3. When prompted, enter the password: `12345`. 
You can change this in script.js:
```js
const correctPassword = 12345;
```

4. To see actual orders:

Ensure the [pannukakku-order-client project](https://github.com/Kopiika/pannukakku-admin) is running and saving orders to localStorage.


## 📁 Project Structure

```bash
pannukakku-admin/
├── index.html       # Main admin dashboard HTML
├── style.css        # Styling for the dashboard and modal
├── script.js        # Core logic for rendering and managing orders
├── image/
│   └── screenshot.png    # Page screenshot
└── README.md        # Project documentation
```
---
Created by [Eleonora Kopiika](https://www.linkedin.com/in/eleonora-kopiika/)  