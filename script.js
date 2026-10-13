"use strict";

/*
    Expense Tracker Application

    Responsibilities:
    - Manage transactions
    - Save data in LocalStorage
    - Calculate balances
    - Update the UI dynamically
*/


// DOM Elements

const transactionForm = document.getElementById("transaction-form");

const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");

const transactionList = document.getElementById("transaction-list");

const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expenseElement = document.getElementById("expenses");

const titleError = document.getElementById("title-error");
const amountError = document.getElementById("amount-error");
const typeError = document.getElementById("type-error");


// Load saved transactions from LocalStorage

let transactions = JSON.parse(
    localStorage.getItem("transactions")
) || [];


// Generate unique ID

function generateId() {
    return Date.now();
}


// Save transactions

function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}



// Format currency

function formatCurrency(value) {

    return `$${value.toFixed(2)}`;

}



// Calculate totals

function calculateTotals() {

    const income = transactions
        .filter(transaction => transaction.type === "income")
        .reduce((total, transaction) => {
            return total + transaction.amount;
        }, 0);


    const expenses = transactions
        .filter(transaction => transaction.type === "expense")
        .reduce((total, transaction) => {
            return total + transaction.amount;
        }, 0);


    const balance = income - expenses;


    return {
        income,
        expenses,
        balance
    };

}



// Update balance cards

function updateSummary() {

    const totals = calculateTotals();


    balanceElement.textContent =
        formatCurrency(totals.balance);


    incomeElement.textContent =
        formatCurrency(totals.income);


    expenseElement.textContent =
        formatCurrency(totals.expenses);

}



// Render transactions

function renderTransactions() {

    transactionList.innerHTML = "";


    if (transactions.length === 0) {

        transactionList.innerHTML = `
            <li class="empty-message">
                No transactions yet.
            </li>
        `;

        return;
    }



    transactions.forEach(transaction => {


        const listItem = document.createElement("li");

        listItem.classList.add(
            "transaction-item",
            transaction.type
        );


        const sign =
            transaction.type === "income"
                ? "+"
                : "-";



        listItem.innerHTML = `

            <div class="transaction-info">

                <h4>
                    ${transaction.title}
                </h4>

                <span>
                    ${transaction.type}
                </span>

            </div>


            <div class="transaction-right">

                <span class="transaction-amount">

                    ${sign}${formatCurrency(transaction.amount)}

                </span>


                <button 
                    class="delete-btn"
                    data-id="${transaction.id}"
                    aria-label="Delete transaction"
                >
                    ✕
                </button>

            </div>

        `;


        transactionList.appendChild(listItem);

    });

}



// Add transaction

function addTransaction(event) {

    event.preventDefault();


    clearErrors();



    const title = titleInput.value.trim();

    const amount = Number(amountInput.value);

    const type = typeInput.value;



    if (!validateForm(title, amount, type)) {

        return;

    }



    const transaction = {

        id: generateId(),

        title,

        amount,

        type

    };



    transactions.push(transaction);


    saveTransactions();


    updateUI();


    transactionForm.reset();

}



// Validate form

function validateForm(title, amount, type) {


    let isValid = true;



    if (!title) {

        titleError.textContent =
            "Title cannot be empty.";

        isValid = false;

    }



    if (!amount || amount <= 0) {

        amountError.textContent =
            "Amount must be a positive number.";

        isValid = false;

    }



    if (!type) {

        typeError.textContent =
            "Please select a transaction type.";

        isValid = false;

    }



    return isValid;

}



// Clear error messages

function clearErrors() {

    titleError.textContent = "";

    amountError.textContent = "";

    typeError.textContent = "";

}



// Delete transaction

function deleteTransaction(id) {


    transactions = transactions.filter(
        transaction => transaction.id !== id
    );


    saveTransactions();


    updateUI();

}



// Handle delete button clicks

function handleTransactionClick(event) {


    if (
        event.target.classList.contains("delete-btn")
    ) {

        const id = Number(
            event.target.dataset.id
        );


        deleteTransaction(id);

    }

}



// Update everything

function updateUI() {

    renderTransactions();

    updateSummary();

}



// Event Listeners

transactionForm.addEventListener(
    "submit",
    addTransaction
);


transactionList.addEventListener(
    "click",
    handleTransactionClick
);



// Initial application load

updateUI();