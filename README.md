# 💰 Expense Tracker

A simple and modern **Expense Tracker Web Application** built with pure **HTML, CSS, and Vanilla JavaScript**.

This project allows users to manage their personal finances by adding income and expense transactions, tracking their balance, and storing data permanently using the browser's **LocalStorage API**.

The goal of this project is to demonstrate fundamental frontend development concepts without using frameworks, libraries, or build tools.

## 📌 Features

### Transaction Management
- Add new transactions
- Define transaction title/description
- Enter transaction amount
- Select transaction type:
  - ✅ Income
  - ❌ Expense
- Delete existing transactions

### Financial Overview
The application dynamically displays:

- 💵 Total Balance
- 📈 Total Income
- 📉 Total Expenses

### Data Persistence
- Transactions are stored using **LocalStorage**
- Data automatically restores after refreshing the page
- User information remains available between sessions

### Validation
The application prevents invalid submissions by checking:

- Empty transaction titles
- Invalid or negative amounts
- Missing transaction type selection

Friendly error messages are displayed to guide users.

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic page structure |
| CSS3 | Styling, layout, responsiveness |
| JavaScript ES6+ | Application logic and DOM manipulation |
| LocalStorage API | Saving user transactions |

## 🎨 UI Design

The application follows a clean and minimal interface design.

### Design Features:

- Light theme
- Responsive layout
- Mobile and desktop support
- CSS Flexbox/Grid layouts
- Hover animations
- Clear income and expense color separation
