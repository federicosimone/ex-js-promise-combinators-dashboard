const API_URL = "http://localhost:3333";




async function getDashboardData(query) {
    const destinazionePromise = fetch(`${API_URL}/destinations?search=${query}`).then(destinazione => destinazione.json()); //promise per destinazione
    const meteoPromise = fetch(`${API_URL}/weathers?search=${query}`).then(meteo => meteo.json()); //promise per meteo 
    const airportPromise = fetch(`${API_URL}/airports?search=${query}`).then(destinazione => destinazione.json()); //promise per aeroporto 

    const promises = await Promise.all([destinazionePromise, meteoPromise, airportPromise])
        .then(([[cityData], [weatherData], [airportData]]) => {

            let info = {};

            info.city = cityData.name
            info.country = cityData.country
            info.temperature = weatherData.temperature
            info.weather = weatherData.weather_description
            info.airport = airportData.name

            console.log(info)


        })
        .catch((error) => {
            console.error(error)
        })


}

getDashboardData('london')
    .then(obj => console.log(obj))
    .catch(err => console.error(err))