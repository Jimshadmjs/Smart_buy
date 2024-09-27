// script.js
let timerElement = document.getElementById("timer");
const otpInputs = document.querySelectorAll('.otp-input');
let resendLink = document.getElementById("resendLink");
let msg = document.getElementById('msg');

let timeLeft = 60;

// Focus on the next input field when one is filled
otpInputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        // Allow only numeric input
        if (!/^[0-9]*$/.test(input.value)) {
            input.value = ''; // Clear invalid input
            return; // Stop further execution
        }

        // Move to the next input field if filled
        if (input.value.length === 1 && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
    });

    input.addEventListener('keydown', (event) => {
        // Allow backspace to navigate to previous input
        if (event.key === 'Backspace' && index > 0 && input.value.length === 0) {
            otpInputs[index - 1].focus();
        }
    });
});

// Timer for OTP resend
let timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timerElement.innerText = "0s";
        resendLink.style.display = "block"; // Show the resend link
    } else {
        timerElement.innerText = `${timeLeft--}s`;
    }
}, 1000);

// Validate OTP form
function validateForm() {
    const inputs = document.querySelectorAll('.otp-input');
    for (const input of inputs) {
        if (input.value === '') {
            msg.innerHTML = 'Please fill in all fields.';
            setTimeout(() => {
                msg.innerHTML = ''; // Clear message after 3 seconds
            }, 3000);
            return false; // Prevent form submission
        }
    }
    return true; // Allow form submission
}
