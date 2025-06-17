let checkboxlist = document.querySelectorAll(".checkbox");
let inputFeilds = document.querySelectorAll(".goal-input");
let errorlevel = document.querySelector(".error-lable");
let progressBar = document.querySelector(".progress-bar");
let progressValue = document.querySelector(".progress-value");
let proglable = document.querySelector(".prog-lable");
let qoute = document.querySelector(".qoute");
let allquotes = [
  "Raise the bar by completing your goals!",
  "well begun ",
  "half completed",
  "wow you completed the goal👋",
];

let allgoals = JSON.parse(localStorage.getItem("allgoals")) || {};

function updateProgressBar() {
  const total = Object.keys(allgoals).length || 1; // Avoid division by 0
  const completed = Object.values(allgoals).filter(
    (goal) => goal.completed
  ).length;
  const percent = (completed / total) * 100;
  progressValue.style.width = `${percent}%`;
  progressValue.style.display = "block";
  progressValue.firstElementChild.innerText = `${completed}/${total} completed`;
  proglable.innerText = allquotes[completed];
  if (percent === 100) {
    qoute.innerText = `"keep going you made great progress today 👌"`;
  }
}

// Set initial values and UI
inputFeilds.forEach((input) => {
  input.value = allgoals[input.id]?.name || "";

  if (allgoals[input.id]?.completed) {
    input.parentElement.classList.add("completed");
  }

  input.addEventListener("focus", () => {
    errorlevel.style.display = "none";
  });

  input.addEventListener("input", (e) => {
    if (allgoals[input.id]?.completed) {
      e.target.value = allgoals[input.id].name;
      return;
    }
    allgoals[input.id] = {
      name: input.value,
      completed: false,
    };
    localStorage.setItem("allgoals", JSON.stringify(allgoals));
    updateProgressBar();
  });
});

// Handle checkbox clicks
checkboxlist.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    const allFieldsFilled = [...inputFeilds].every(
      (input) => input.value.trim() !== ""
    );

    if (allFieldsFilled) {
      const inputid = checkbox.nextElementSibling.id;

      // Toggle completed class
      checkbox.parentElement.classList.toggle("completed");

      // Toggle goal completion
      allgoals[inputid].completed = !allgoals[inputid].completed;

      localStorage.setItem("allgoals", JSON.stringify(allgoals));
      errorlevel.style.display = "none";
      updateProgressBar(); // ✅ Now using latest value
    } else {
      errorlevel.style.display = "block";
    }
  });
});

// ✅ Initial progress bar on page load
updateProgressBar();
