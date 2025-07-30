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


function send_profile_data(){
    // ✅ Gather form data and send to Django
    const profileData = {
      age: document.getElementById("age")?.value || null,
      height: document.getElementById("height")?.value || null,
      height_unit: document.querySelector("#height_group .toggle-button.active")?.dataset.unit || "cm",
      gender: document.querySelector('.radio-option.selected')?.innerText || null,
      current_weight: document.getElementById("current_weight")?.value || null,
      target_weight: document.getElementById("target_weight")?.value || null,
      weight_unit: document.querySelectorAll('.form-group')[2].querySelector('.toggle-button.active')?.dataset.unit || "kg",
      allergies: Array.from(document.querySelectorAll('.allergy-tag.selected')).map(e => e.innerText),
      cooking_skill: document.querySelectorAll('select')[0]?.value || null,
      budget: document.querySelector('#budget-options .radio-option.selected')?.innerText || null,
      physical_activity: document.querySelectorAll('select')[1]?.value || null,
      include_exercise: document.getElementById("exercise")?.checked || false,
      meal_prep_time: document.querySelector('.group4 .radio-option.selected')?.innerText || null,
      meals_per_day: document.querySelectorAll('select')[2]?.value || null,
      cooking_frequency: document.querySelectorAll('.group4')[1].querySelector('.selected')?.innerText || null,
      commitment_duration: document.querySelector('input[placeholder="Enter duration"]')?.value || null,
      additional_info: document.getElementById('additional_info')?.value || ""
    };

    // ✅ Send data to Django view using fetch
    fetch("/save-profile/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify(profileData)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        window.location.href =  typeof HOME_URL !== "undefined" ? HOME_URL : "/"; 
      } else {
        alert("Something went wrong!");
      }
    });
  }



nextBtn.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            updateSteps();
        } else {
            send_profile_data();
}});

// Helper to get CSRF token
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
    

