// DOM variables
const num1Input = document.querySelector("#num1");
const num2Input = document.querySelector("#num2");
const operationBtns = document.querySelectorAll(".operation-btn");
const clearBtn = document.querySelector("#clear");

// active operation
for (let btn of operationBtns) {
  btn.addEventListener("click", (event) => {
    for (let btn of operationBtns) {
      if (event.target === btn) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    }
  });
}

// Handle Calculation
const handleCalculation = (e) => {
  e.preventDefault();
  const num1 = Number(num1Input.value);
  const num2 = Number(num2Input.value);
  let operation;
  for (let btn of operationBtns) {
    if (btn.classList.contains("active")) {
      operation = btn.value;
    }
  }

  const calculationToAdd = JSON.stringify({ num1, num2, operation });
  fetch("/calculations", {
    method: "POST",
    body: calculationToAdd,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      // Get Calculations function (append to DOM)
      // Could reset fields here. For now I'm thinking a better user experience would be to not reset fields.
    })
    .catch((error) => {
      console.log("Error with request:", error);
      alert("Something went wrong.");
    });
};
