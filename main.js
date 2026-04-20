const API_URL = "http://localhost:3333";




async function getDashboardData(query) {
    try {
        const destinazionePromise = fetch(`${API_URL}/destinations?search=${query}`).then(destinazione => destinazione.json()); //promise per destinazione
        const meteoPromise = fetch(`${API_URL}/weathers?search=${query}`).then(meteo => meteo.json()); //promise per meteo 
        const airportPromise = fetch(`${API_URL}/airports?search=${query}`).then(airport => airport.json()); //promise per aeroporto 

        const [[cityData], [weatherData], [airportData]] = await Promise.all([destinazionePromise, meteoPromise, airportPromise])


        let info = {};

        info.city = cityData.name
        info.country = cityData.country
        info.temperature = weatherData.temperature
        info.weather = weatherData.weather_description
        info.airport = airportData.name

        return info;
    } catch (err) {
        throw new Error(`Errore recuperando i dati : ${err.message}`)
    }

}


getDashboardData('london')
    .then(data => console.log(`${data.city} is a city of ${data.country}. Today the temperature is ${data.temperature} degrees and the weather is ${data.weather}. The most important airport is ${data.airport}`))
    .catch(err => console.error(err))