const countryContainer = document.querySelector(".countries");
const boton = document.querySelector("#btnPais");
console.log(boton);

const renderCountry = (data, optionalClass = "") => {
  const country = data.name.common;
  const flag = data.flags.svg;
  const { region, population } = data;
  const [language] = Object.values(data.languages);
  const [currency] = Object.values(data.currencies);

  // const {name: {common: country }} = data;
  const html = `
        <article class="country ${optionalClass}">
          <img class="country__img" src="${flag}" />
          <div class="country__data">
            <h3 class="country__name">${country}</h3>
            <h4 class="country__region">${region}</h4>
            <p class="country__row">${population}</p>
            <p class="country__row">${language}</p>
            <p class="country__row">${currency.name}(${currency.symbol})</p>
          </div>
        </article>
    `;
  countryContainer.innerHTML += html;
  countryContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw Error(`País no encontrado, código ${response.status}`);
      }
      return response.json();
    })
    .then(([data]) => {
      renderCountry(data);
      const neighbour = data.borders;
      if (!neighbour) throw Error("No tiene vecinos");
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour[0]}`);
    })
    .then((response) => {
      if (!response.ok) {
        throw Error(`País no encontrado, código ${response.status}`);
      }
      return response.json();
    })
    .then(([data]) => renderCountry(data, "neighbour"))
    .catch((err) => console.log("MENSAJE ERROR:", err.message));
};

boton.addEventListener("click", () => {
  getCountryData("australia");
  boton.style.display = "none";
});

const getJSON = function (url, errMessage) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw Error(errMessage);
    }
    return response.json();
  });
};
