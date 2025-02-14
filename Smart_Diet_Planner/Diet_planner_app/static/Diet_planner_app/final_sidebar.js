// Toggle Sidebar Function
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar') || document.getElementById('panel');
    const toggleButton = document.querySelector('.toggle-button');

    if (sidebar) {
        sidebar.classList.toggle('open');
    }
    toggleButton.classList.toggle('move');
}

// Add Prompt to Input Field
function addPromptToInput(promptText) {
    const inputField = document.getElementById('questionInput');
    if (inputField) {
        inputField.value = promptText;
    }
}

// Chart Data and Configuration
const data = {
    labels: ['Carbs', 'Protein', 'Fiber', 'Fats', 'Minerals', 'Others'],
    datasets: [{
        data: [300, 500, 100, 150, 200, 50], // Example calorie values
        backgroundColor: ['#F3EDDD', '#D0D976', '#D5DCB3', '#303040', '#708B05', '#506400'],
        borderWidth: 0
    }]
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                color: 'black'
            }
        }
    },
    onClick(event, elements) {
        const totalCaloriesElem = document.getElementById('totalCalories');
        if (!totalCaloriesElem) return;

        if (elements.length > 0) {
            const index = elements[0].index;
            const selectedLabel = this.data.labels[index];
            const selectedData = this.data.datasets[0].data[index];

            totalCaloriesElem.innerText = `${selectedData}`;

            // Dim other segments and highlight selected one
            this.data.datasets[0].backgroundColor = this.data.datasets[0].backgroundColor.map((color, i) =>
                i === index ? color : 'rgba(200,200,200,0.5)'
            );
            this.update();
        } else {
            totalCaloriesElem.innerText = '1300'; // Reset to default
            this.data.datasets[0].backgroundColor = ['#F3EDDD', '#D0D976', '#D5DCB3', '#303040', '#708B05', '#506400'];
            this.update();
        }
    }
};

// Initialize Chart
const ctx = document.getElementById('pieChart');
if (ctx) {
    const nutrientChart = new Chart(ctx.getContext('2d'), {
        type: 'doughnut',
        data,
        options: chartOptions
    });
}
