// 1. DOM Element Selectors
const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('toggle-btn');
const strengthBar = document.getElementById('strength-bar');
const feedbackText = document.getElementById('feedback-text');

const reqLength = document.getElementById('req-length');
const reqUpper = document.getElementById('req-upper');
const reqNumber = document.getElementById('req-number');
const reqSpecial = document.getElementById('req-special');

// 2. Windows 11 Style Input Visibility Toggle
toggleBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = 'Hide';
        toggleBtn.style.color = '#004277'; // Deeper focus state blue accent
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = 'Show';
        toggleBtn.style.color = '#0067b8'; // Default Windows 11 link blue
    }
});

// 3. Real-Time Security Metrics Engine
passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    let score = 0;

    // Reset interface if the input is entirely empty
    if (!val) {
        strengthBar.style.width = '0%';
        feedbackText.textContent = "Awaiting input entry...";
        feedbackText.style.color = '#334155';
        
        resetRequirement(reqLength, "Minimum 8 characters");
        resetRequirement(reqUpper, "At least 1 uppercase letter");
        resetRequirement(reqNumber, "At least 1 number");
        resetRequirement(reqSpecial, "At least 1 special character");
        return;
    }

    // Evaluate Regex Validation Rules
    const hasLength = val.length >= 8;
    const hasUpper = /[A-Z]/.test(val);
    const hasNumber = /[0-9]/.test(val);
    const hasSpecial = /[^A-Za-z0-9]/.test(val);

    // Update Interactive Checklist UI States
    updateRequirement(reqLength, hasLength, "Minimum 8 characters");
    updateRequirement(reqUpper, hasUpper, "At least 1 uppercase letter");
    updateRequirement(reqNumber, hasNumber, "At least 1 number");
    updateRequirement(reqSpecial, hasSpecial, "At least 1 special character");

    // Tally Cumulative Structural Score
    if (hasLength) score++;
    if (hasUpper) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;

    // Dynamic UI Updates (Color Palettes Matched to Glass Elements)
    if (score <= 1) {
        strengthBar.style.width = '25%';
        strengthBar.style.backgroundColor = '#e11d48'; // Windows Fluid Red tint
        feedbackText.textContent = 'Threat Vulnerable ⚠️';
        feedbackText.style.color = '#e11d48';
    } else if (score === 2 || score === 3) {
        strengthBar.style.width = '65%';
        strengthBar.style.backgroundColor = '#d97706'; // Smooth Warning Amber tint
        feedbackText.textContent = 'Moderate Defense 🛡️';
        feedbackText.style.color = '#b45309';
    } else if (score === 4) {
        strengthBar.style.width = '100%';
        strengthBar.style.backgroundColor = '#16a34a'; // Premium Security Green tint
        feedbackText.textContent = 'Crypto Shield Active ✅';
        feedbackText.style.color = '#15803d';
    }
});

// 4. Interface State Management Utilities
function updateRequirement(element, isValid, text) {
    if (isValid) {
        element.innerHTML = `✅ ${text}`;
        element.classList.add('valid');
    } else {
        element.innerHTML = `❌ ${text}`;
        element.classList.remove('valid');
    }
}

function resetRequirement(element, text) {
    element.innerHTML = `<span class="indicator"></span>${text}`;
    element.classList.remove('valid');
}
