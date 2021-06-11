window.onload = () => {
  init();
};

const getWeather = async (coordinates, name) => {
  await $(".locations").html("");
  let x = coordinates.shift();
  coordinates.push(x);
  coordinates = coordinates.join();
  let weatherData = await fetch(
    `http://localhost:3000/find/forcast/${coordinates}`
  );
  $(".locations").append("<h3>Result:</h3>");
  let currentWeather = await weatherData.json();
  console.log(currentWeather);
  const {
    weather_descriptions,
    feelslike,
    humidity,
    temperature,
    weather_icons,
    wind_speed,
    wind_dir,
  } = currentWeather.current;
  $(".locations").append(
    `<div class="weather-data"><h3>${name}</h3><img src="${weather_icons}">
    <p>Overcast is <strong> ${weather_descriptions[0]}</strong></p> <p>The temperature is: <strong>${temperature}c</strong>, and feels like <strong>${feelslike}c</strong><p> <p>Humidity is at <strong>${humidity}%</strong>.</p><p>Wind speed is <strong>${wind_speed}kph</strong>, and wind direction is <strong>${wind_dir}</strong></p> </div>`
  );
};

const init = () => {
  console.log("jquery on");
  $("form").submit(async (e) => {
    e.preventDefault();
    await $(".locations").html("");
    let location = e.target.location.value;
    console.log(location);
    if (location == "") {
      return $(".error").html("<p>Please enter a location<p>");
    } else {
      $(".error").html("");
    }
    $("input").val("");

    let data = await fetch(`http://localhost:3000/find/${location}`);
    let locations = await data.json();
    $(".locations").append("<h3>Results:</h3>");
    locations.map((location) => {
      let $locDiv = $(`<div class="loc"></div>`);
      let $btn = $(`<button class='loc-name'>${location.place_name}</button>`);
      $btn.click(() => getWeather(location.center, location.place_name));
      $locDiv.append($btn);
      $(".locations").append($locDiv);
    });

    // $(".weather-data").html(`${main.weather_descriptions[0]}`);
  });
};
