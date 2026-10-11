const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('toggle-btn');
const strengthBar = document.getElementById('strength-bar');
const feedbackText = document.getElementById('feedback-text');
const crackTimeValue = document.getElementById('crack-time-value');

const reqLength = document.getElementById('req-length');
const reqUpper = document.getElementById('req-upper');
const reqNumber = document.getElementById('req-number');
const reqSpecial = document.getElementById('req-special');

const genLengthSlider = document.getElementById('gen-length');
const lengthValDisplay = document.getElementById('length-val');
const generateBtn = document.getElementById('generate-btn');
const genSuccessMsg = document.getElementById('gen-success-msg');

// Toggle view
toggleBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = 'Show';
    }
});

// Update slider text label real-time
genLengthSlider.addEventListener('input', () => {
    lengthValDisplay.textContent = genLengthSlider.value;
});

// Analyzer and Brute-force Calculation
passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    let score = 0;

    if (!val) {
        strengthBar.style.width = '0%';
        feedbackText.textContent = "Awaiting input entry...";
        crackTimeValue.textContent = "0 seconds";
        return;
    }

    const hasLength = val.length >= 8;
    const hasUpper = /[A-Z]/.test(val);
    const hasNumber = /[0-9]/.test(val);
    const hasSpecial = /[^A-Za-z0-9]/.test(val);

    updateRequirement(reqLength, hasLength, "Minimum 8 characters");
    updateRequirement(reqUpper, hasUpper, "At least 1 uppercase letter");
    updateRequirement(reqNumber, hasNumber, "At least 1 number");
    updateRequirement(reqSpecial, hasSpecial, "At least 1 special character");

    if (hasLength) score++;
    if (hasUpper) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;

    // Calculate Brute Force Crack Time
    let poolSize = 0;
    if (/[a-z]/.test(val)) poolSize += 26;
    if (hasUpper) poolSize += 26;
    if (hasNumber) poolSize += 10;
    if (hasSpecial) poolSize += 32;

    const combinations = Math.pow(poolSize, val.length);
    const hashesPerSecond = 10000000000; // Estimated 10 Billion guesses/sec (Modern GPU rig)
    const secondsToCrack = combinations / hashesPerSecond;

    crackTimeValue.textContent = formatTime(secondsToCrack);

    // Color feedback matching
    if (score <= 1) {
        strengthBar.style.width = '25%';
        strengthBar.style.backgroundColor = '#e11d48';
        feedbackText.textContent = 'Threat Vulnerable ⚠️';
    } else if (score === 2 || score === 3) {
        strengthBar.style.width = '65%';
        strengthBar.style.backgroundColor = '#d97706';
        feedbackText.textContent = 'Moderate Defense 🛡️';
    } else if (score === 4) {
        strengthBar.style.width = '100%';
        strengthBar.style.backgroundColor = '#16a34a';
        feedbackText.textContent = 'Crypto Shield Active ✅';
    }
});

// Secure Client-Side Password Generator
generateBtn.addEventListener('click', () => {
    const len = parseInt(genLengthSlider.value);
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#\$%^&*()_+~`|}{[]:;?><,./-=";
    const allChars = upper + lower + numbers + symbols;
    
    let generatedPassword = "";
    // Ensure at least one of each type is present for a strong build
    generatedPassword += upper[Math.floor(Math.random() * upper.length)];
    generatedPassword += lower[Math.floor(Math.random() * lower.length)];
    generatedPassword += numbers[Math.floor(Math.random() * numbers.length)];
    generatedPassword += symbols[Math.floor(Math.random() * symbols.length)];

    for (let i = generatedPassword.length; i < len; i++) {
        generatedPassword += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle characters
    generatedPassword = generatedPassword.split('').sort(() => 0.5 - Math.random()).join('');

    passwordInput.value = generatedPassword;
    passwordInput.type = 'text';
    toggleBtn.textContent = 'Hide';
    
    // Fire analytical tracking updates on the generated string
    passwordInput.dispatchEvent(new Event('input'));

    // Copy instantly to clipboard
    navigator.clipboard.writeText(generatedPassword).then(() => {
        genSuccessMsg.textContent = "Copied to phone clipboard!";
        setTimeout(() => { genSuccessMsg.textContent = ""; }, 2500);
    });
});

function updateRequirement(element, isValid, text) {
    element.innerHTML = isValid ? `✅ ${text}` : `❌ ${text}`;
    element.className = isValid ? 'valid' : '';
}

function formatTime(seconds) {
    if (seconds === Infinity || seconds > 3153600000000) return "Trillions of years 🪐";
    if (seconds > 31536000) return `${Math.floor(seconds / 31536000)} years ⏳`;
    if (seconds > 86400) return `${Math.floor(seconds / 86400)} days 📅`;
    if (seconds > 3600) return `${Math.floor(seconds / 3600)} hours ⏰`;
    if (seconds > 60) return `${Math.floor(seconds / 60)} minutes ⏱️`;
    return `${Math.floor(seconds)} seconds ⚡`;
}
