// DOM variables
const numBtns = document.querySelectorAll(".number-btn");
const operationBtns = document.querySelectorAll(".operation-btn");
const clearBtn = document.querySelector("#clear");
const resultDOM = document.querySelector(".result");
const historyList = document.querySelector(".history-list");
const calculatorInput = document.querySelector("#calculator-input");

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
  console.log("calculations from display:", calculations);
  if (calculations.length > 0) {
    resultDOM.innerHTML = calculations[calculations.length - 1].result;
    historyList.innerHTML = calculations
      .map(({ expression }) => {
        return `
        <li>${expression}</li>
        `;
      })
      .join("");
  }
};

// Get iniital calculations
getCalculations();

// Handle Calculation
const handleCalculation = (e) => {
  e.preventDefault();

  fetch("/calculations", {
    method: "POST",
    body: JSON.stringify(calculatorInput.value.split(" ")),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      getCalculations();
      // Set Calculator Input Field to previous response for arthmetic chaining.
    })
    .catch((error) => {
      console.log("Error with request:", error);
      alert("Something went wrong.");
    });
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
const inputNumber = (e) => {
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
};

// Clear Fields
const clearInputs = () => {
  num1Input.value = "";
  num2Input.value = "";
};
