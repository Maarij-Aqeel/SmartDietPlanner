function toggleSidebar() {
      const sidebar = document.getElementById('sidebar');
      sidebar.classList.toggle('open');
    }
function addPromptToInput(promptText) {
      const inputField = document.getElementById('questionInput');
      inputField.value = promptText;
    }
