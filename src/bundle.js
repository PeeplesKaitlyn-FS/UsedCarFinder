fetch('car-dataset.json')
  .then(response => response.json())
  .then(data => {
    // Populate the year dropdown options
    const yearSelect = document.getElementById('year');
    data.forEach(car => {
      const yearOption = document.createElement('option');
      yearOption.value = car.year;
      yearOption.text = car.year;
      yearSelect.appendChild(yearOption);
    });

    // Populate the make dropdown options
    const makeSelect = document.getElementById('make');
    data.forEach(car => {
      const makeOption = document.createElement('option');
      makeOption.value = car.make;
      makeOption.text = car.make;
      makeSelect.appendChild(makeOption);
    });

    // Populate the model dropdown options
    const modelSelect = document.getElementById('model');
    data.forEach(car => {
      const modelOption = document.createElement('option');
      modelOption.value = car.model;
      modelOption.text = car.model;
      modelSelect.appendChild(modelOption);
    });

    // Handle changes to the year dropdown
    yearSelect.addEventListener('change', () => {
      const selectedYear = yearSelect.value;
      const carDetails = data.find(car => car.year === selectedYear);
      const carDetailsDiv = document.getElementById('car-details');
      carDetailsDiv.innerHTML = `
        <h2>${carDetails.make} ${carDetails.model}</h2>
        <p>Year: ${carDetails.year}</p>
        <p>Price: ${carDetails.price}</p>
      `;
    });

    // Handle changes to the make dropdown
    makeSelect.addEventListener('change', () => {
      const selectedMake = makeSelect.value;
      const carDetails = data.find(car => car.make === selectedMake);
      const carDetailsDiv = document.getElementById('car-details');
      carDetailsDiv.innerHTML = `
        <h2>${carDetails.make} ${carDetails.model}</h2>
        <p>Year: ${carDetails.year}</p>
        <p>Price: ${carDetails.price}</p>
      `;
    });

    // Handle changes to the model dropdown
    modelSelect.addEventListener('change', () => {
      const selectedModel = modelSelect.value;
      const carDetails = data.find(car => car.model === selectedModel);
      const carDetailsDiv = document.getElementById('car-details');
      carDetailsDiv.innerHTML = `
        <h2>${carDetails.make} ${carDetails.model}</h2>
        <p>Year: ${carDetails.year}</p>
        <p>Price: ${carDetails.price}</p>
      `;
    });
  });