const apiURL = "https://api.exchangerate-api.com/v4/latest/USD";

async function fetchCurrencies() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        
        populateCurrencyDropdowns(data.rates);
    } catch (error) {
        console.error("Error fetching currency data:", error);
    }
}

function populateCurrencyDropdowns(rates) {
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");

    for (const currency in rates) {
        const option1 = document.createElement("option");
        option1.value = currency;
        option1.textContent = currency;
        fromCurrency.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = currency;
        option2.textContent = currency;
        toCurrency.appendChild(option2);
    }

    fromCurrency.value = "USD";
    toCurrency.value = "EUR";
}

async function convertCurrency() {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    try {
        const response = await fetch(`${apiURL}`);
        const data = await response.json();
        
        const rate = data.rates[toCurrency] / data.rates[fromCurrency];
        const result = (amount * rate).toFixed(2);

        document.getElementById("result").textContent = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
    } catch (error) {
        console.error("Error converting currency:", error);
    }
}

fetchCurrencies();
