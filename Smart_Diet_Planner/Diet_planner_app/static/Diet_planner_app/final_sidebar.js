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

// Configure marked.js for better rendering
if (typeof marked !== 'undefined') {
    marked.setOptions({
        breaks: true, // Convert single line breaks to <br>
        gfm: true,   // GitHub Flavored Markdown
        sanitize: false, // Allow HTML (be careful with user input)
        smartLists: true,
        smartypants: true
    });
}

// Question Answer Section
document.addEventListener('DOMContentLoaded', function() {
    const questionInput = document.getElementById('questionInput');
    const sendButton = document.getElementById('sendButton');
    const chatHistory = document.getElementById('chat-history');

    // Store conversation history
    let conversationHistory = [];

    // Function to add message to UI
    function addMessageToUI(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = role === 'human' ? 'chat-message user-message' : 'chat-message assistant-message';
        
       


        
        if (role === 'assistant') {
            // Parse markdown and set as HTML
            try {
                const parsedContent = marked.parse(content);
                messageDiv.innerHTML = parsedContent;
            } catch (error) {
                console.error('Error parsing markdown:', error);
                messageDiv.textContent = content; // Fallback to plain text
            }
        } else {
            messageDiv.textContent = content;
        }

        chatHistory.appendChild(messageDiv);
        // Auto scroll to bottom
        chatHistory.scrollTop = chatHistory.scrolelHeight;
    }

    // Handle send button click
    if (sendButton) {
        sendButton.addEventListener('click', function() {
            sendQuery();
        });
    }

    // Also trigger send on Enter key
    if (questionInput) {
        questionInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendQuery();
            }
        });
    }

    function sendQuery() {
        const query = questionInput.value.trim();
        if (!query) return;

        // Add user message to UI
        addMessageToUI('human', query);

        // Clear input
        questionInput.value = '';

        // Show loading indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-indicator';
        loadingDiv.innerHTML = '<div class="spinner-grow text-primary" role="status"><span class="sr-only">Loading...</span></div>';
        chatHistory.appendChild(loadingDiv);

        // Get CSRF token
        const csrftoken = getCookie('csrftoken');

        // Send AJAX request
        fetch('/recipe-query/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                query: query,
                history: conversationHistory
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Remove loading indicator
            if (loadingDiv.parentNode) {
                chatHistory.removeChild(loadingDiv);
            }

            // Add assistant response to UI
            addMessageToUI('assistant', data.response);

            // Update chat history
            conversationHistory = data.history;
        })
        .catch(error => {
            console.error('Error:', error);
            // Remove loading indicator
            if (loadingDiv.parentNode) {
                chatHistory.removeChild(loadingDiv);
            }
            // Show error message
            addMessageToUI('assistant', 'Sorry, an error occurred while processing your request.');
        });
    }

    // Function to get CSRF token
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

    // Function to handle prompt card clicks
    window.addPromptToInput = function(promptText) {
        const inputField = document.getElementById('questionInput');
        if (inputField) {
            inputField.value = promptText;
        }
    };
});