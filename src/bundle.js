fetch('car-dataset.json')
  .then(response => response.json())
  .then(data => {
    // Populate the year dropdown options
    const yearSelect = document.getElementById('year');
    const years = [...new Set(data.map(car => car.year))];
    years.sort((a, b) => a - b);
    years.forEach(year => {
      const yearOption = document.createElement('option');
      yearOption.value = year;
      yearOption.text = year;
      yearSelect.appendChild(yearOption);
    });

    // Populate the make dropdown options
    const makeSelect = document.getElementById('make');
    const makes = [...new Set(data.map(car => car.make))];
    makes.sort();
    makes.forEach(make => {
      const makeOption = document.createElement('option');
      makeOption.value = make;
      makeOption.text = make;
      makeSelect.appendChild(makeOption);
    });

    // Populate the model dropdown options
    const modelSelect = document.getElementById('model');
    const models = [...new Set(data.map(car => car.model))];
    models.sort();
    models.forEach(model => {
      const modelOption = document.createElement('option');
      modelOption.value = model;
      modelOption.text = model;
      modelSelect.appendChild(modelOption);
    });

    // Handle changes to the year dropdown
    yearSelect.addEventListener('change', () => {
      const selectedYear = yearSelect.value;
      const carDetails = data.find(car => car.year === parseInt(selectedYear));
      if (carDetails) {
        const carDetailsDiv = document.getElementById('car-details');
        carDetailsDiv.innerHTML = `
          <h2>${carDetails.make} ${carDetails.model}</h2>
          <p>Year: ${carDetails.year}</p>
          <p>Price: ${carDetails.price}</p>
        `;
      } else {
        const carDetailsDiv = document.getElementById('car-details');
        carDetailsDiv.innerHTML = 'No car found with the selected year.';
      }
    });

    // Handle changes to the make dropdown
    makeSelect.addEventListener('change', () => {
      const selectedMake = makeSelect.value;
      const carDetails = data.find(car => car.make === selectedMake);
      if (carDetails) {
        const carDetailsDiv = document.getElementById('car-details');
        carDetailsDiv.innerHTML = `
          <h2>${carDetails.make} ${carDetails.model}</h2>
          <p>Year: ${carDetails.year}</p>
          <p>Price: ${carDetails.price}</p>
        `;
      } else {
        const carDetailsDiv = document.getElementById('car-details');
        carDetailsDiv.innerHTML = 'No car found with the selected make.';
      }
    });

    // Handle changes to the model dropdown
    modelSelect.addEventListener('change', () => {
      const selectedModel = modelSelect.value;
      const carDetails = data.find(car => car.model === selectedModel);
      if (carDetails) {
        const carDetailsDiv = document.getElementById('car-details');
        carDetailsDiv.innerHTML = `
          <h2>${carDetails.make} ${carDetails.model}</h2>
          <p>Year: ${carDetails.year}</p>
          <p>Price: ${carDetails.price}</p>
        `;
      } else {
        const carDetailsDiv = document.getElementById('car-details');
        carDetailsDiv.innerHTML = 'No car found with the selected model.';
      }
    });

    // Handle submit button click
    const submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedYear = yearSelect.value;
      const selectedMake = makeSelect.value;
      const selectedModel = modelSelect.value;

      const carDetails = data.find(car => car.year === parseInt(selectedYear) && car.make === selectedMake && car.model === selectedModel);
      if (carDetails) {
        const carDetailsDiv = document.getElementById('car-details');
        carDetailsDiv.innerHTML = `
          <h2>${carDetails.make} ${carDetails.model}</h2>
          <p>Year: ${carDetails.year}</p>
          <p>Price: ${carDetails.price}</p>
        `;
      } else {
        const carDetailsDiv = document.getElementById('car-details');
        carDetailsDiv.innerHTML = 'No car found with the selected criteria.';
      }
    });
  });