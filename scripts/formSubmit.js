const form = document.getElementById("taxForm");

const ageFieldValidation = () => {
    const ageField = document.getElementById("age");
    const ageFieldToolTip = document.getElementById("ageFieldError");

    if(ageField.selectedIndex == 0) {
        ageFieldToolTip.dataset.tooltip = "Please select age group"
        ageFieldToolTip.classList.add("active");
        return false;
    } else {
        ageFieldToolTip.classList.remove("active");
    }


    return true;
}

const valueValidation = () => {
    const tooltips = [
        document.getElementById("incomeFieldError"),             
        document.getElementById("extraIncomeFieldError"),
        document.getElementById("deductionsFieldError")
    ];

    let bool = true;

    tooltips.forEach((tooltip) => {
        const fieldValue = tooltip.previousElementSibling.value;
        if(fieldValue === ""){
            tooltip.dataset.tooltip = "Please enter a number"
            tooltip.classList.add("active");
            bool = false;
        }else if(isNaN(parseFloat(fieldValue))){
            tooltip.dataset.tooltip = "Please enter numbers only"
            tooltip.classList.add("active");
            bool = false;
        } else if(parseFloat(fieldValue) < 0){
            tooltip.dataset.tooltip = "Please enter a positive number"
            tooltip.classList.add("active");
            bool = false;
        } else {
            tooltip.classList.remove("active");
        }
    })

    return bool;
}

const mathValidation = (formData) => {
    const incomeFieldVal = parseFloat(formData.get("income"));
    const ExtraIncomeFieldVal = parseFloat(formData.get("extraIncome"));
    const deductionsFieldVal = parseFloat(formData.get("deductions"));

    const deductionsFieldError = document.getElementById("deductionsFieldError");

    if((incomeFieldVal + ExtraIncomeFieldVal) < deductionsFieldVal){
        deductionsFieldError.dataset.tooltip = "Dedudctions cannot be less than Income and extra Income combined"
        deductionsFieldError.classList.add("active");
        return false
    } else {
        deductionsFieldError.classList.remove("active");
    }

    return true;
}

const showResult = (formData) => {
    let age = formData.get("age");
    let income = parseFloat(formData.get("income"));
    let extraIncome = parseFloat(formData.get("extraIncome"));
    let deductions = parseFloat(formData.get("deductions"));
    let tax = 0;

    if (income + extraIncome - deductions <= 8) {
      tax = 0;
    } else {
      var taxableIncome = income + extraIncome - deductions - 8;
      switch (age) {
        case "<40":
          tax = 0.3 * taxableIncome;
          break;
        case "40-60":
          tax = 0.4 * taxableIncome;
          break;
        case ">=60":
          tax = 0.1 * taxableIncome;
          break;
      }
    }

    document.getElementById("resultValue").innerText = (income + extraIncome) - Math.trunc(tax);
    document.getElementById("result").showModal();
}

const clearTaxFormFields = (formData) => {
    for(const key of formData.keys()) {
        if(key === "age") {
            document.getElementById("age").selectedIndex = 0;
            continue;
        };
        const input = form.querySelector(`input[name=${key}]`);
        input.value = "";
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const ageFieldValid = ageFieldValidation()
    const valueAndMathValid = valueValidation() && mathValidation(formData)

    if(ageFieldValid && valueAndMathValid) {
        showResult(formData);
        clearTaxFormStoredData();
        clearTaxFormFields(formData);
    }

    return;
})

document.getElementById("resultCloseBtn").addEventListener("click", () => {
    document.getElementById("result").close();
});