/* Global Variables */
const API_KEY = `065c3090565d5424466ff5f5f8c7b474`;
// Fields and generate button
const zipcodeField = document.getElementById('zip');
const zipcodeErrorEl = document.getElementById('zipcode-error');
const feelingsField = document.getElementById('feelings');
const genBtn = document.getElementById('generate');
// Entry
const entryContainerEl = document.getElementById('entry-container');
const entryHolderEl = document.getElementById('entry-holder');
const locationEl = document.getElementById('location');
const weatherEl = document.getElementById('weather');
const weatherIconEl = document.getElementById('icon');
const dateEl = document.getElementById('date');
const tempEl = document.getElementById('temp');
const tempHighEl = document.getElementById('temp-max');
const tempLowEl = document.getElementById('temp-min');
const contentEl = document.getElementById('content');
// Months Names array
// Used in formatting date
const monthsNamesArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


/* Events */
// On click generate button
/*  */
genBtn.addEventListener('click', (e)=>{

    const zipcode = zipcodeField.value;
    // Today's date
    const dateNow = new Date();
    // Format date
    const dateFormatted = `${dateNow.getDate()} ${monthsNamesArr[dateNow.getMonth()]} ${dateNow.getFullYear()}, ${dateNow.getHours()}:${dateNow.getMinutes() < 9 ? '0' + dateNow.getMinutes() : dateNow.getMinutes()}${dateNow.getHours() < 12 ? ' AM' : ' PM'}` ;
    // API url
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${API_KEY}&units=metric`;

    // validate ZIPCODE to avoid bad requests
    if (!zipcode || zipcode.length !== 5) {
        // If not Valid
        // Show Error message
        zipcodeErrorEl.innerText = "Must contain 5 numbers";
        zipcodeErrorEl.style.display = 'block';
    } else {
        // If Valid
        // Hide Error Message
        zipcodeErrorEl.style.display = 'none';
        // Get Weather data from openWeatherMap API
        getWeatherAPIData(url)
        .then( (data) => {
            if ( data ) {
                // Posting (retrieved data + user feelings + today's date) to our server
                /* In order to be more beneficial, included some extra data from the API response
                Rather than the Temperature like city, country, weather condition and icon, also the high & low temperature */
                postData('/weather', {
                    date: dateFormatted,
                    temp: data.main.temp,
                    tempHigh: data.main.temp_max,
                    tempLow: data.main.temp_min,
                    feelings: feelingsField.value || '',
                    city: data.name,
                    country: data.sys.country,
                    weather: data.weather[0].main,
                    weatherIcon: data.weather[0].icon
                }).then( (postedData) => {
                    // Updating the UI with the updated data from the server
                    updateUI();
                });
            }
        });
    }
    
});


/* Main functions */
/**
* @description Get current weather data from openweathermap API
* @param {string} url
* @returns {object} current weather object
*/
const getWeatherAPIData = async ( url ) => {

    const request = await fetch (url);
    try {
        const weatherAPIData = await request.json();
        // Error checking
        if ( weatherAPIData.cod === '404' ){
            // If Error
            // Show Error Message
            zipcodeErrorEl.innerText = 'City zipcode is not correct';
            zipcodeErrorEl.style.display = 'block';
        } else {
            // If No Error
            return weatherAPIData;
        }
    } catch(error) {
        console.log("API Error", error)
    }

};


/**
* @description Posting current weather data to the server on the endpoint object 
* @param {string} url
* @param {object} data
* @returns {object} posted data object
*/
const postData = async ( url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
    });
    try {
        const postedDataObj = await response.json();
        return postedDataObj;
    } catch(error) {
        console.log("POST Error", error);
    }

};


/**
* @description Loading weather data from the server
* @param {string} url
* @returns {object} weather data
*/
const getData = async ( url = '' ) => {

    const response = await fetch(url);
    try {
        const weatherDataObj = await response.json();
        return weatherDataObj;
    } catch(error) {
        console.log("GET Error", error);
    }

};


/**
* @description Updating UI dynamically with the retrieved data from the server
*/
const updateUI = () => {
    // Get data from server
    getData('/getData')
    .then( (data) => {
        // Updating UI
        // Setting location
        locationEl.innerText = `${data.city}, ${data.country}`;
        // Setting date
        dateEl.innerText = data.date;
        // Setting weather condition & icon
        weatherEl.innerText = data.weather;
        weatherIconEl.style.backgroundImage = `url(http://openweathermap.org/img/wn/${data.weatherIcon}@2x.png)`;
        // Setting Temperatures
        tempEl.innerText = data.temp;
        tempHighEl.innerText = data.tempHigh;
        tempLowEl.innerText = data.tempLow;
        // Setting User feelings
        contentEl.innerText = data.feelings;
        // Finally display the data container
        entryContainerEl.style.display = 'block';
    });
};
