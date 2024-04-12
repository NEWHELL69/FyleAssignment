(() => {
  let form = document.getElementById("taxForm");

  form.addEventListener('change', event => {
    const formData = new FormData(form);
    sessionStorage.setItem('taxFormData', JSON.stringify(Object.fromEntries(formData)));
  });

  const previouslySavedData = sessionStorage.getItem('taxFormData');

  if (previouslySavedData) {
    const inputValues = JSON.parse(previouslySavedData);

    for(const [name, value] of Object.entries(inputValues)) {
      const input = form.querySelector(`input[name=${name}]`);
        input.value = value;
    }
  }
})()

const clearTaxFormStoredData = () => {
  sessionStorage.removeItem("taxFormData");
}