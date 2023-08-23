const renderHTMLTemplate = (destinationImage, destination, weatherData) => {
  return `
        <div class="card">
          <div class="zoom-img">
            <div class="img-card">
              <img
                src="${destinationImage}"
              />
            </div>
          </div>

          <div class="text">
            <h2>${destination}</h2>
            <div class="card-box">
              <p class="time">Temparature: ${weatherData[0].temp}</p>
              <p class="location">${weatherData[0].weather.description}</p>
            </div>
          </div>
        </div>
    
    `;
};

export { renderHTMLTemplate };
