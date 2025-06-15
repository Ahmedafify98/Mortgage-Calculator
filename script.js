// Helper for error toggle
function showError(id, message) {
  document.getElementById(id + "-group").classList.add("has-error");
  document.getElementById(id + "-error").style.display = "block";
  if (message) document.getElementById(id + "-error").innerText = message;
}
function hideError(id) {
  document.getElementById(id + "-group").classList.remove("has-error");
  document.getElementById(id + "-error").style.display = "none";
}
function showTypeError(message) {
  document.getElementById("type-group").classList.add("has-error");
  document.getElementById("type-error").style.display = "block";
  if (message) document.getElementById("type-error").innerText = message;
}
function hideTypeError() {
  document.getElementById("type-group").classList.remove("has-error");
  document.getElementById("type-error").style.display = "none";
}

// Calculation logic + error handling
const form = document.getElementById('mortgage-form');
const resultsEmpty = document.getElementById('results-empty');
const resultsFull = document.getElementById('results-full');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  let hasError = false;

  // Validate amount
  const amountVal = form.amount.value.trim();
  if (!amountVal || isNaN(amountVal) || Number(amountVal) <= 0) {
    showError("amount", "This field is required");
    hasError = true;
  } else {
    hideError("amount");
  }
  // Validate term
  const termVal = form.term.value.trim();
  if (!termVal || isNaN(termVal) || Number(termVal) <= 0) {
    showError("term", "This field is required");
    hasError = true;
  } else {
    hideError("term");
  }
  // Validate rate
  const rateVal = form.rate.value.trim();
  if (!rateVal || isNaN(rateVal) || Number(rateVal) <= 0) {
    showError("rate", "This field is required");
    hasError = true;
  } else {
    hideError("rate");
  }
  // Validate mortgage type
  if (![...form['mortgage-type']].some(r => r.checked)) {
    showTypeError("This field is required");
    hasError = true;
  } else {
    hideTypeError();
  }

  if (hasError) {
    resultsFull.style.display = 'none';
    resultsEmpty.style.display = 'flex';
    return;
  }

  // Dummy calculation (replace with real logic)
  const amount = parseFloat(form.amount.value);
  const years = parseInt(form.term.value);
  const rate = parseFloat(form.rate.value);
  const type = form['mortgage-type'].value;
  let monthly = 0, total = 0;
  if(type === 'repayment') {
    const months = years * 12;
    const monthlyRate = rate / 100 / 12;
    monthly = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    total = monthly * months;
  } else {
    monthly = amount * (rate / 100) / 12;
    total = monthly * years * 12;
  }
  monthlyPayment.textContent = '£' + monthly.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
  totalPayment.textContent = '£' + total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});

  resultsEmpty.style.display = 'none';
  resultsFull.style.display = 'flex';
});

// Clear all handler
document.getElementById('clear-all').addEventListener('click', function(e) {
  e.preventDefault();
  form.reset();
  hideError("amount");
  hideError("term");
  hideError("rate");
  hideTypeError();
  resultsFull.style.display = 'none';
  resultsEmpty.style.display = 'flex';
});