import axios from 'axios';

const params = {
    access_key: '4833e20ae97cde6cf404db8a84504444',
    query: '',
}

const getWeather = (location, callback) => {
    params.query = location
    axios.get('http://api.weatherstack.com/current', {params})
    .then(response => { 
        const apiResponse = response.data;
        if(apiResponse.error) {
            console.log('Unable to find location. Try another search.')
            callback('Unable to find location. Try another search.', undefined)
        } else {
            console.log(`${apiResponse.current.weather_descriptions[0]}. Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);

            callback(undefined, {
                description: `${apiResponse.current.weather_descriptions[0]}`,
                temperature: `Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`
            })
        }
    }).catch(error => {
        console.log('Unable to connect to location services!');

        callback('Unable to connect to location services!');        
    });
}

// getWeather('London')

export default getWeather

