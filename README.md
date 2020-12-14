# Weather-Journal App Project

## Objective
This app is used to get live weather conditions and temperature in a user friendly interface for the zipcode provided.

## User Interface
The User Interface contains:
1. Zipcode Input field
2. User Feelings Input field (optional)
3. Generate Button
4. Recent Entry Weather Card data:
- Location: {city}, {country}
- Date
- Weather condition
- Weather condition Icon
- Temperature {current Temp. in °C, Max. Temp. in °C, Min. Temp. in °C}
- User Feelings (if available)


## Decisions

- Used Asyncrounus functions to get data from the weather API to perform actions on recieving the reponse so that it prevent errors and also provide efficient way for error handling if the request fails for some reason.

- Used some extra descriptive weather data rather than the temperature only for a better UX like the Location representing the zipcode, weather condition, descriptive icon, also the min. and max. temperatures

## Design

- Responsive design.
- Card like representation for the data, with a modern and clean look.



