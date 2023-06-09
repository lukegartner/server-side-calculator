// DOM variables
const numBtns = document.querySelectorAll(".number-btn");
const operationBtns = document.querySelectorAll(".operation-btn");
const clearBtn = document.querySelector("#clear");
const resultDOM = document.querySelector(".result");
const historyList = document.querySelector(".history-list");
const calculatorInput = document.querySelector("#calculator-input");

// Input State
let inputIsResult = false;

// active math operation NO LONGER NEEDED????????????????
// for (let btn of operationBtns) {
//   btn.addEventListener("click", (event) => {
//     for (let btn of operationBtns) {
//       if (event.target === btn) {
//         btn.classList.add("active");
//       } else {
//         btn.classList.remove("active");
//       }
//     }
//   });
// }

// Get Calculations
let myCalculations = [];
const getCalculations = () => {
  fetch("/calculations")
    .then((response) => {
      console.log("response:", response);
      return response.json();
    })
    .then((json) => {
      console.log("json:", json);
      myCalculations = json;
      displayCalculations(json);
    })
    .catch((error) => {
      console.log("Error with request:", error);
      alert("Something went wrong.");
    });
};

// Display Calculations
const displayCalculations = (calculations) => {
  if (calculations.length > 0) {
    resultDOM.innerHTML = calculations[calculations.length - 1].result;
    // Set Calculator Input Field to previous response for arthmetic chaining.
    calculatorInput.value = calculations[calculations.length - 1].result;
    inputIsResult = true;
    // display history
    historyList.innerHTML = calculations
      .map(({ expression }, index) => {
        return `
        <li onclick="recallHistory(event)" data-index="${index}" >${expression}</li>
        `;
      })
      .join("");
  } else {
    resultDOM.innerHTML = 0;
    historyList.innerHTML = "";
  }
};

// Get iniital calculations
getCalculations();

// Handle Calculation
const handleCalculation = (e) => {
  if (e) {
    e.preventDefault();
  }

  if (calculatorInput.value[calculatorInput.value.length - 1] !== " ") {
    fetch("/calculations", {
      method: "POST",
      body: JSON.stringify(calculatorInput.value.split(" ")),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        getCalculations();
      })
      .catch((error) => {
        console.log("Error with request:", error);
        alert("Something went wrong.");
      });
  } else {
    alert("please enter a valid expression");
  }
};

// --------
// Construct input while typing expression to calculate
// ---------

// NumberButtons Event Listener
for (let btn of numBtns) {
  btn.addEventListener("click", (event) => {
    inputNumber(event);
  });
}
// NumberButtons add Number to input
const inputNumber = (e) => {
  // if input is showing a result chain any math operator to result
  // Clear input if a new number is entered
  if (inputIsResult) {
    calculatorInput.value = "";
    inputIsResult = false;
  }
  calculatorInput.value += e.target.value;
};

// Arithmetic operation Button Event Listener
for (let btn of operationBtns) {
  btn.addEventListener("click", (event) => {
    inputOperation(event);
  });
}
const inputOperation = (e) => {
  calculatorInput.value += ` ${e.target.value} `;
  inputIsResult = false;
};

// Handle Square Root
const handleSqrt = () => {
  calculatorInput.value += " √";
  handleCalculation();
};

// Clear Fields
const clearInputs = () => {
  calculatorInput.value = "0";
  inputIsResult = true;
};

// Clear History
const clearHistory = () => {
  fetch("/calculations", { method: "DELETE" })
    .then(() => {
      getCalculations();
      console.log("History Cleared");
    })
    .catch((error) => {
      console.log(error);
    });
};

// Recall History
const recallHistory = (e) => {
  const userIndex = e.target.dataset.index;
  fetch(`/calculations/${userIndex}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      calculatorInput.value = json.result;
    })
    .catch((error) => {
      console.log(error);
    });
};
