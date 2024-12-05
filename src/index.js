import './styles/index.scss';

// Get references to the HTML elements
const yearSelect = document.getElementById('year');
const makeSelect = document.getElementById('make');
const modelSelect = document.getElementById('model');
const findCarBtn = document.getElementById('find-car-btn');
const carDetailsDiv = document.getElementById('car-details');

// Load the car data from the dataset
import('./car-dataset.json')
  .then(data => {
    const cars = data.default;
    const carData = {
      years: [],
      makes: {},
      models: {},
      cars: {}
    };

    // Populate the carData object
    cars.forEach(car => {
      if (!carData.years.includes(car.year)) {
        carData.years.push(car.year);
      }

      if (!carData.makes[car.year]) {
        carData.makes[car.year] = [];
      }

      if (!carData.makes[car.year].includes(car.Manufacturer)) {
        carData.makes[car.year].push(car.Manufacturer);
      }

      if (!carData.models[car.year]) {
        carData.models[car.year] = {};
      }

      if (!carData.models[car.year][car.Manufacturer]) {
        carData.models[car.year][car.Manufacturer] = [];
      }

      if (!carData.models[car.year][car.Manufacturer].includes(car.model)) {
        carData.models[car.year][car.Manufacturer].push(car.model);
      }

      if (!carData.cars[car.year]) {
        carData.cars[car.year] = {};
      }

      if (!carData.cars[car.year][car.Manufacturer]) {
        carData.cars[car.year][car.Manufacturer] = {};
      }

      carData.cars[car.year][car.Manufacturer][car.model] = car;
    });

    console.log(carData);

    // Populate the year select element with options
    yearSelect.innerHTML = carData.years.map(year => `<option value="${year}">${year}</option>`).join('');

    // Add event listeners to the select elements
    yearSelect.addEventListener('change', handleYearChange);
    makeSelect.addEventListener('change', handleMakeChange);
    findCarBtn.addEventListener('click', handleFindCar);

    // Define the event handler functions
    function handleYearChange() {
      const selectedYear = yearSelect.value;
      const makes = carData.makes[selectedYear];
      if (makes) {
        makeSelect.innerHTML = makes.map(make => `<option value="${make}">${make}</option>`).join('');
        makeSelect.disabled = false;
      } else {
        makeSelect.innerHTML = '';
        makeSelect.disabled = true;
      }

      // Reset the make and model selects when the year changes
      makeSelect.value = '';
      modelSelect.value = '';
      modelSelect.innerHTML = '';
      modelSelect.disabled = true;
    }

    function handleMakeChange() {
      const selectedYear = yearSelect.value;
      const selectedMake = makeSelect.value;
      const models = carData.models[selectedYear][selectedMake];
      if (models) {
        modelSelect.innerHTML = models.map(model => `<option value="${model}">${model}</option>`).join('');
        modelSelect.disabled = false;
      } else {
        modelSelect.innerHTML = '';
        modelSelect.disabled = true;
      }

      // Reset the model select when the make changes
      modelSelect.value = '';
    }

    function handleFindCar() {
      const selectedYear = yearSelect.value;
      const selectedMake = makeSelect.value;
      const selectedModel = modelSelect.value;

      if (!selectedYear || !selectedMake || !selectedModel) {
        carDetailsDiv.innerHTML = 'Please select a year, make, and model.';
        return;
      }

      const carDetails = carData.cars[selectedYear][selectedMake][selectedModel];
      if (carDetails) {
        const carDetailsHtml = `
          <p>Year: ${carDetails.year}</p>
          <p>Manufacturer: ${carDetails.Manufacturer}</p>
          <p>Model: ${carDetails.model}</p>
        `;

        carDetailsDiv.innerHTML = carDetailsHtml;
      } else {
        carDetailsDiv.innerHTML = 'No car details found.';
      }
    }
  })
  .catch(error => {
    console.error('Error loading car dataset:', error);
    carDetailsDiv.innerHTML = 'Error loading car dataset.';
  });