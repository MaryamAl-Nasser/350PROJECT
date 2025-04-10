const learningPath = {
    completed: [
      { name: "OOP", grade: "A" },
      { name: "Intro to CS", grade: "B+" }
    ],
    inProgress: ["JavaScript"],
    pending: ["Web Security"]
  };
  
  function showLearningPathDetails() {
    let html = "<h2>Learning Path</h2>";
  
    html += "<h3>Completed:</h3><ul>";
    learningPath.completed.forEach(c => {
      html += `<li>${c.name} - Grade: ${c.grade}</li>`;
    });
    html += "</ul>";
  
    html += "<h3>In Progress:</h3><ul>";
    learningPath.inProgress.forEach(c => {
      html += `<li>${c}</li>`;
    });
    html += "</ul>";
  
    html += "<h3>Pending:</h3><ul>";
    learningPath.pending.forEach(c => {
      html += `<li>${c}</li>`;
    });
    html += "</ul>";
  
    document.getElementById("learningPath").innerHTML = html;
  }
  