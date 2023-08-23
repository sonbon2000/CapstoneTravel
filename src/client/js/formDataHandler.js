const onSubmit = async (event) => {
  event.preventDefault();

  const destination = document.querySelector("#destination");
  const cardResult = document.querySelector(".cards");

  let geonameData;
  let weatherData;
  let pixabayData;

  try {
    geonameData = await Client.getGeonameDataHandler(destination.value);
    const lat = geonameData.geonames[0].lat;
    const lon = geonameData.geonames[0].lng;
    weatherData = await Client.getWeatherBitDataHandler(lat, lon);
    pixabayData = await Client.getPixabayImagesHandler(
      "photo",
      "travel",
      true,
      "popular",
      "horizontal",
      destination.value
    );

    const projectData = {
      id: geonameData.geonames[0].geonameId,
      departureDate: departureDate.value,
      destination: destination.value,
      leavingDate: departureDate.value,
      geonameData: { ...geonameData.geonames[0] },
      weatherData: [...weatherData.data],
      pixabayData: { ...pixabayData.hits[0] },
    };

    postProjectdata("/search", projectData).then(async (data) => {
      const innerCard = Client.renderHTMLTemplate(
        data.pixabayData.webformatURL,
        data.destination,
        data.weatherData
      );

      cardResult.innerHTML = `
        <div class="card">
             ${innerCard}
        </div>
      `;
    });
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

const postProjectdata = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export { onSubmit };
