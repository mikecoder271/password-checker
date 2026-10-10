const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('toggle-btn');
const strengthBar = document.getElementById('strength-bar');
const feedbackText = document.getElementById('feedback-text');

// Elements for checklist
const reqLength = document.getElementById('req-length');
const reqUpper = document.getElementById('req-upper');
const reqNumber = document.getElementById('req-number');
const reqSpecial = document.getElementById('req-special');

// Hide/Show password feature
toggleBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = 'Show';
    }
});

// Analyze password strength
passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    let score = 0;

    if (!val) {
        strengthBar.style.width = '0%';
        feedbackText.textContent = "Type a password to check strength...";
        return;
    }

    // Check conditions
    const hasLength = val.length >= 8;
    const hasUpper = /[A-Z]/.test(val);
    const hasNumber = /[0-9]/.test(val);
    const hasSpecial = /[^A-Za-z0-9]/.test(val);

    // Update UX requirements checklist
    updateRequirement(reqLength, hasLength, "Minimum 8 characters");
    updateRequirement(reqUpper, hasUpper, "At least 1 uppercase letter");
    updateRequirement(reqNumber, hasNumber, "At least 1 number");
    updateRequirement(reqSpecial, hasSpecial, "At least 1 special character");

    // Calculate score
    if (hasLength) score++;
    if (hasUpper) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;

    // Update visuals based on final score
    if (score <= 1) {
        strengthBar.style.width = '25%';
        strengthBar.style.backgroundColor = '#dc3545'; // Red
        feedbackText.textContent = 'Weak 🔴';
    } else if (score === 2 || score === 3) {
        strengthBar.style.width = '60%';
        strengthBar.style.backgroundColor = '#ffc107'; // Yellow
        feedbackText.textContent = 'Medium 🟡';
    } else if (score === 4) {
        strengthBar.style.width = '100%';
        strengthBar.style.backgroundColor = '#28a745'; // Green
        feedbackText.textContent = 'Strong 🟢';
    }
});

function updateRequirement(element, isValid, text) {
    if (isValid) {
        element.textContent = `✅ ${text}`;
        element.classList.add('valid');
    } else {
        element.textContent = `❌ ${text}`;
        element.classList.remove('valid');
    }
}
  
