# Summary

This is a take home project for an interview for a Software Engineer position.

Link to the app: https://store-locator-two.vercel.app

# Requirements

Build a store locator with the following features:

1. Show a list of stores sorted by distance from user
2. Filter results based on zipcode
3. Toggle to expand each result to see the details
4. Show the store location on the map view as you select the store

# Getting Started

1. Clone this repo
2. Run `cd store-locator`
3. Get API keys from the following services:
   - [Rapid API](https://rapidapi.com/marketplace)
   - [Mapbox](https://www.mapbox.com)
4. In your code editor, create a new `.env` file
5. In the `.env` file, add the following credentials
   - `REACT_APP_RAPID_API_KEY={<YOUR_RAPID_RAPI_KEY>}`
   - `REACT_APP_MAPBOX_TOKEN={<YOUR_MAPBOX_TOKEN>)`
6. Run `yarn` to install dependencies packages
7. Run `yarn start`
8. View the app in `localhost:3000`

# Tools and Technologies

- I build this app using [Create React App](https://github.com/facebook/create-react-app) and [TailwindCSS](https://tailwindcss.com).
- I opt for Mapbox API instead of Google Maps API as I have used Mapbox API before and have some familiarity with it.
- This app is deployed on [Vercel](https://vercel.com/)

# Product decisions

### Calculating distance

- For simplicity, I am using the [Haversine](https://en.wikipedia.org/wiki/Haversine_formula) formula (the crow flies distance between 2 coordinates). Although from a user point of view, a walking/driving distance would be more useful.
- Future improvement: Integrate with [Google Distance Matrix API](https://developers.google.com/maps/documentation/javascript/distancematrix).

### Detecting user location

- I am using user's IP address to determine user's approximate location rather than using the Geolocation API to get a more exact location because using IP address does not require user's explicit permission. For the purpose of this app, I think using approximate location is sufficient, results in better user experience without sacrificing much functionality.
- Future improvement: Ask for user's permission to get GPS location if we want to provide commute time to the pharmacy location.

### Filtering by zipcode

- I am matching the first 3 digits of US zipcode as a proxy to proximity.
- Future improvement: Allow users to specify the radius distance they want to filter.

### Pharmacy locations data

- I randomly picked 10 pharmacies from a list from the [Department of Homeland Security](https://catalog.data.gov/dataset/pharmacies).

# Screenshots

#### Web view
![Screen Shot 2021-06-25 at 1 48 53 PM](https://user-images.githubusercontent.com/32437766/123483767-1f433c00-d5bc-11eb-9e48-2354b9566154.png)


#### Mobile view
![Screen Shot 2021-06-25 at 1 48 09 PM](https://user-images.githubusercontent.com/32437766/123483751-1b171e80-d5bc-11eb-8051-51ad06190bcd.png)


# Future enhancements

- On mobile, only show the map when user clicks "Select", and allow user to close the map view
- On mobile, scroll up to the map section when user clicks "Select"
- Add tests
- Optimize for tablet view
