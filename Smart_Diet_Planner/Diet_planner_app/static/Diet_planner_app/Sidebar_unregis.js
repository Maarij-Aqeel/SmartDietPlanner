function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.querySelector('.toggle-button');

    sidebar.classList.toggle('open');
    toggleButton.classList.toggle('move'); // This ensures only one button moves
}

function addPromptToInput(promptText) {
      const inputField = document.getElementById('questionInput');
      inputField.value = promptText;
    }
