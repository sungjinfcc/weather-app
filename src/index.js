import "./style.css";

function renderData(weatherJson) {
  const city = weatherJson.location.name;
  const { country } = weatherJson.location;
  const condition = weatherJson.current.condition.text;
  const tempC = weatherJson.current.temp_c;
  const { icon } = weatherJson.current.condition;

  const cityDiv = document.createElement("h1");
  const countryDiv = document.createElement("p");
  const conditionDiv = document.createElement("p");
  const tempDiv = document.createElement("p");
  const iconDiv = document.createElement("img");

  cityDiv.textContent = city;
  countryDiv.textContent = country;
  conditionDiv.textContent = condition;
  tempDiv.textContent = `${tempC}°C`;
  iconDiv.src = icon;

  const container = document.querySelector(".container");
  container.innerHTML = "";
  container.appendChild(cityDiv);
  container.appendChild(countryDiv);
  container.appendChild(conditionDiv);
  container.appendChild(tempDiv);
  container.appendChild(iconDiv);
}

async function getWeatherData(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=8da8534b826341b9bc164001231206&q=${city}`,
    {
      mode: "cors",
    }
  );
  const weatherJson = await response.json();
  renderData(weatherJson);
}

function loadHome() {
  const navBar = document.createElement("div");
  navBar.classList.add("nav");
  const container = document.createElement("div");
  container.classList.add("container");
  const input = document.createElement("input");
  const button = document.createElement("button");
  button.textContent = "Search";
  button.addEventListener("click", (e) =>
    getWeatherData(e.target.parentNode.children[0].value).catch((e) =>
      alert("City not found!")
    )
  );
  navBar.appendChild(input);
  navBar.appendChild(button);
  document.body.appendChild(navBar);
  document.body.appendChild(container);
  getWeatherData("Seoul");
}

loadHome();
