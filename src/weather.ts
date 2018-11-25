const weather = (function() {
  interface Coords {
    latitude: number;
    longitude: number;
  }

  const API_KEY = "269f45b2cddefb4199d5fab1bdae27d7";
  const COORDS = "coords";
  const doc = <HTMLDocument>document;
  const weather = <HTMLSpanElement>doc.querySelector(".js-weather");

  const positionOptions: PositionOptions = {
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 5000
  };

  async function getWeather(latitude, longitude) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      const json = await response.json();
      const {
        main: { temp },
        name
      } = json;
      weather.innerText = `${temp} @ ${name}`;
    } catch (error) {
      console.log(error);
    }
  }

  function setCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
  }

  function handleGetCurrentPositionSuccess(position: Position) {
    const {
      coords: { latitude, longitude }
    } = position;
    const coordsObj: Coords = {
      latitude,
      longitude
    };
    setCoords(coordsObj);
    getWeather(latitude, longitude);
  }

  function handleGeoCurrentPositionError(error: PositionError) {
    console.log("Can't access geo location");
    console.log(error);
  }

  function askForCoords() {
    navigator.geolocation.getCurrentPosition(
      handleGetCurrentPositionSuccess,
      handleGeoCurrentPositionError,
      positionOptions
    );
  }

  function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);

    if (loadedCoords === null) {
      askForCoords();
    } else {
      const parsedCoords: Coords = JSON.parse(loadedCoords);
      const { latitude, longitude } = parsedCoords;
      getWeather(latitude, longitude);
    }
  }

  function init() {
    loadCoords();
  }

  init();
})();
