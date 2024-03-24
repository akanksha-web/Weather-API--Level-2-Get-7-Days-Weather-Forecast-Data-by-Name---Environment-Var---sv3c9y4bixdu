const fs = require('fs');

async function getDataFromDatabase() {
  return new Promise((resolve, reject) => {
    fs.readFile('src/data/data.json', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

async function saveDataToDatabase(data) {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data);
    fs.writeFile('src/data/data.json', jsonData, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/*
  Instructions for students:
  Implement the function getForecastDataByName(cityName) that retrieves the 7-day weather forecast data for a city by its name.

  Tips:
    - Use the getDataFromDatabase() function to retrieve the data from the database.
    - Access the array of cities and their forecast data from the returned result.
    - Find the city object with the matching name and extract its forecast data.
    - Return the appropriate JSON response based on the result.

*/


// Level 2: Get 7 Days Weather Forecast Data by Name
async function getForecastDataByName(cityName) {
  
async function getForecastDataByName(cityName) {
  
  try{
    const data = await getDataFromDatabase();
    const city = data.find(city => city.name.toLowerCase() === cityName.toLowerCase());

     if(city){
      return{
        statusCode: 200,
        Response:{
          status :"success",
          message: "Forecast data retrieved",
          data: city.forecast
        }
      };
     }else{
      return{
        statusCode: 404,
        Response:{
          status:"error",
          message:"Failed to retrieve forecast data",
          error:"City not found"
        }
      };
     }
  }catch(error){
    return{
      statusCode:500,
      Response:{
        status:"error",
        message:"Internal server error",
        error: error.message
      }
    };
  }
  // TODO: Implement this function
  
}


module.exports = {
  getForecastDataByName
};
