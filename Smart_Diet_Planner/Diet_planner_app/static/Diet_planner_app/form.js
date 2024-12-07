const steps = document.querySelectorAll('.step');
const indicators = document.querySelectorAll('.step-indicator');
const nextBtn = document.querySelector('.btn-next');
const backBtn = document.querySelector('.btn-back');
const backgroundCircle = document.querySelector('.background-circle');
const heading = document.querySelector("h2");
let currentStep = 0;

const stepHeadings = [
  "Tell us about yourself",
  "Nice! How about your dietary needs?",
  "Time Commitment",
  "Anything else you'd like to tell the coach?"
];

function updateSteps() {
    steps.forEach((step, index) => {
        if (index === currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });

    indicators.forEach((indicator, index) => {
        if (index <= currentStep) {
            indicator.classList.add('completed');
        } else {
            indicator.classList.remove('completed');
        }
    });

    // Update background circle size
    const scale = 1 + (currentStep * 0.2);
    backgroundCircle.style.transform = `scale(${scale})`;

    if (currentStep === 0) {
        backBtn.style.visibility = 'hidden';
    } else {
        backBtn.style.visibility = 'visible';
    }

    if (currentStep === steps.length - 1) {
        nextBtn.textContent = 'Finish';
    } else {
        nextBtn.textContent = 'Next';
    }

    heading.textContent = stepHeadings[currentStep];
}

backBtn.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        updateSteps();
    }
});

// Handle radio options
document.querySelectorAll('.radio-option').forEach(option => {
    option.addEventListener('click', () => {
        const parent = option.parentElement;
        parent.querySelectorAll('.radio-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        option.classList.add('selected');
    });
});

// Handle allergy tags
document.querySelectorAll('.allergy-tag').forEach(tag => {
    tag.addEventListener('click', () => {
        tag.classList.toggle('selected');
    });
});

// Toggle buttons functionality
document.querySelectorAll('.toggle-group').forEach(group => {
    group.querySelectorAll('.toggle-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            group.querySelectorAll('.toggle-button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});

updateSteps();