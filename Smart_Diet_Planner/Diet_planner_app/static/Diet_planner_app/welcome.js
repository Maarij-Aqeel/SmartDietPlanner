document.getElementById("startButton").addEventListener("click", function () {
  // Redirect to the next step in the planner
  window.location.href = "multistep_planner_box.html";
});

document.getElementById("goBackButton").addEventListener("click", function () {
  // Logic to go back (e.g., redirect to a previous page)
  window.history.back();
});
