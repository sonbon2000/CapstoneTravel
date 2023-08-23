const getGeonameDataHandler = async (location) => {
  const requestBody = {
    BASE_URL: `http://api.geonames.org/searchJSON?formatted=true&q=${location}`,
  };

  const geonameResponse = await fetch("/geoNameLocation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  const geonameData = await geonameResponse.json();
  return geonameData;
};

export { getGeonameDataHandler };
