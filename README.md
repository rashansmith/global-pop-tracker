# Global Population Explorer

- This project provides an interactive map view of the population of countries around the world.
- By clicking on a country, you can get their population statistics as of December 24th, 2023. 
- Color thresholds are used to distinguish between different ranges of populations between countries.
- I thought this would be a simple yet global Dashboard solution that could provide insight into the world around me. 


## Preview
Url: https://global-population-tracker.onrender.com/
(This project is deployed on a free cloud tier, so it may take a while to load)
<img width="1431" alt="screenshot_data" src="https://github.com/rashansmith/t-w-d/assets/6632748/901b6e2a-ff3b-457c-99ee-d3bafa466c9a">


## Data Used

[World Population API](https://d6wn6bmjj722w.population.io/#!/population/determineTotalPopulationByDate)


## Tech Stack

- [Vite - React Framework](https://vitejs.dev/)
- [Leaflet - Maps API](https://react-leaflet.js.org/)
- [Render - Cloud Deployment](https://render.com/)


## Prerequisites
- Node 18
- NPM

## Local Deployment Instructions (from terminal)
- Install dependencies
```
npm install 
```
- Run app (navigate to http://localhost:5173/ when done)
```
npm run dev
```


## App Interaction
- To sign up, create any username and password combination
- This app uses localStorage to store user data


## Current App Bugs - Potential Fixes
- The Filter panel does not refresh to map ater the first filter is chosen.
- Integrate a more robost login/signup system without localStorage


