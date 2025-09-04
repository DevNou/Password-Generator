const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-value");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const excludeSimilarCheckbox = document.getElementById("exclude-similar");
const generateButton = document.getElementById("generate-btn");
const copyButton = document.getElementById("copy-btn");
const tooltip = document.getElementById("copy-tooltip");
const strengthBar = document.querySelector(".strength-bar");
const strengthLabel = document.getElementById("strength-label");
const themeToggle = document.getElementById("theme-toggle");

const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";
const similarChars = "il1Lo0O";

// Range slider
lengthSlider.addEventListener("input", () => {
  lengthDisplay.textContent = lengthSlider.value;
});

// Generate password
generateButton.addEventListener("click", generatePassword);

function generatePassword() {
  const length = Number(lengthSlider.value);
  let chars = "";
  if (uppercaseCheckbox.checked) chars += uppercaseLetters;
  if (lowercaseCheckbox.checked) chars += lowercaseLetters;
  if (numbersCheckbox.checked) chars += numberCharacters;
  if (symbolsCheckbox.checked) chars += symbolCharacters;
  if (excludeSimilarCheckbox.checked) {
    chars = chars.split("").filter(c => !similarChars.includes(c)).join("");
  }

  if (!chars.length) {
    showToast("Select at least one character type!");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  passwordInput.value = password;
  updateStrength(password);
}

// Password strength
function updateStrength(password) {
  let score = 0;
  if (/[A-Z]/.test(password)) score += 15;
  if (/[a-z]/.test(password)) score += 15;
  if (/[0-9]/.test(password)) score += 15;
  if (/[!@#$%^&*()-_=+\[\]{}|;:,.<>?/]/.test(password)) score += 15;
  score += Math.min(password.length * 2, 40);
  strengthBar.style.width = Math.max(5, Math.min(100, score)) + "%";

  if (score < 40) strengthLabel.textContent = "Weak";
  else if (score < 70) strengthLabel.textContent = "Medium";
  else strengthLabel.textContent = "Strong";
}

// Copy password to clipboard
copyButton.addEventListener("click", () => {
  if (!passwordInput.value) return;
  navigator.clipboard.writeText(passwordInput.value).then(() => {
    tooltip.classList.add("show");
    setTimeout(() => tooltip.classList.remove("show"), 1200);
  });
});

// Toast
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const icon = themeToggle.querySelector("i");
  icon.classList.toggle("fa-sun");
  icon.classList.toggle("fa-moon");
});

// Auto-generate on load
window.addEventListener("DOMContentLoaded", generatePassword);
