// Inicializo objeto data que contendrá la respuesta de la API geocode.xyz/api
let data = {};
// countryContainer es la <div> donde se muestran los países
const countryContainer = document.querySelector(".countries");
// función para escribir text en un fichero escogido por el usuario en entry
// function writeToFileEntry(entry, text) {
//   entry.createWriter(
//     function (fileWriter) {
//       const data = Blob([text], { type: "text/plain" });

//       fileWriter.write(data);
//     },
//     function (err) {
//       throw Error(err.mesage, "Error al escribir en fichero");
//     }
//   );
// }
// function processFiles(fichero) {
//   console.log(fichero, `Lo que he recibido del input file`);
//   const file = fichero[0];
//   const key = { lat: 52.508, long: 13.381 };
//   const dataText = localStorage.getItem(key);
//   writeToFileEntry(fichero, dataText);
// }
// Cuando me pasen un fichero por el input lo pongo en localStorage
function processFiles(fichero) {
  const file = fichero[0];
  // const file = { name: "Martin", age: 30, country: "United States" };
  const json = file.name;
  console.log(file, `Objeto file leido`);
  console.log(json, `Objeto convertido a texto`);
  localStorage.setItem("data.json", json);
}
let contenido = "";
function readFileFromStorage(fichero) {
  const file = fichero[0];
  const reader = new FileReader();
  console.log(reader, `El objeto creado con FileReader`);
  reader.onload = function (e) {
    contenido = e.target.result;
    console.log(contenido, `El contenido del fichero`);
    data = JSON.parse(contenido);
    getCountryData(data.country);
  };
  reader.readAsText(file);
}
// función wherami pide lat y long a la api y devuelve respuesta
function whereami(lat, long) {
  const url = `https://geocode.xyz/${lat},${long}?geoit=json`;
  fetch(url)
    .then((response) => {
      console.log(response, `Respuesta del API geocode`);
      if (response.ok) {
        return response.json();
      } else {
        throw Error("Servicio API ocupado");
      }
    })
    .then((data) => {
      console.log(data);
      const json = JSON.stringify(data);
      console.log(json, `conversión a texto json`);
      const key = JSON.stringify({ lat: `${lat}`, long: `${long}` });
      localStorage.setItem(key, json);
      if (data.matches === null) {
        throw Error("No existe un país en estas coordenadas");
      }
      return data;
    })
    .catch((err) => console.log(err.message, `error en whereami`));
}
const getCountryData = (country) => {
  const request = new XMLHttpRequest();
  const requestType = "GET";
  const url = `https://restcountries.com/v3.1/name/${country}`;
  request.open(requestType, url);
  request.send();

  request.addEventListener("load", function () {
    // const data = JSON.parse(this.responseText)[0]; [0] proque inicialmente recibía un array con todos los países que tienen una moneda
    const [data] = JSON.parse(this.responseText);
    renderData(data);
    // for (const neighbour of data.borders) {
    //   getCountryNeighbour(neighbour);
    // }
  });
};
const renderData = (data, optionalClass = "") => {
  // Código del profesor para cargar las variables de data:
  // const country = data.name.common;
  // const flag = data.flags.svg;
  // const { region, population } = data;
  // const [language] = Object.values(data.languages);
  // const [currency] = Object.values(data.currencies);

  // const {name: {common: country }} = data;

  const {
    name,
    region,
    population: poblacion,
    languages,
    currencies,
    flag: bandera,
  } = data;
  console.log(name);
  // const [, , nombre] = altSpellings;
  // console.log(nombre);
  const [nombreIngles] = Object.values(name);
  const { common: nombreOriginal } = Object.values(Object.values(name)[1])[0];
  console.log(nombreIngles);
  console.log(nombreOriginal);
  console.log(region);
  console.log(poblacion);
  const [idioma] = Object.values(languages);
  console.log(idioma);
  const { name: moneda, symbol: simbolo } = Object.values(currencies)[0];
  console.log(moneda);
  console.log(simbolo);
  console.log(bandera);

  // hecho en clase
  const country = data.name.common;
  // const {name: {common: country}}} = data;
  const flag = data.flags.svg;
  const { region: region1, population } = data;
  const [language] = Object.values(languages);
  const [currency] = Object.values(data.currencies);
  console.log(`Language: ${language}`);
  console.log(`currency: ${currency.name}`);
  const html = `<article class="country ${optionalClass}">
          <img class="country__img" src="${flag}" />
          <div class="country__data">
            <h3 class="country__name">${country}</h3>
            <h4 class="country__region">${region1}</h4>
            <p class="country__row">${population}</p>
            <p class="country__row">${language}</p>
            <p class="country__row">${currency.name}</p>
          </div>
        </article>`;
  console.log(countryContainer);
  countryContainer.innerHTML += html;
};
// coordenadas originales 52.508,13.381
// data = whereami(52.518, 13.361);

// valor es un objeto
// const valorSerializado = Object.stringify(data);
// localStorage.setItem(key,valor);

function readLocal(lat, long) {
  const key = JSON.stringify({ lat: `${lat}`, long: `${long}` });
  const data = localStorage.getItem(key);
  console.log(data, `datos mostrados en lectura localStorage`);
}
readLocal(52.518, 13.361);
const key = { lat: 52.508, long: 13.381 };
const dataText = localStorage.getItem(key);
console.log(dataText, `El objeto data leido de local como texto`);
const data1 = JSON.parse(dataText);
console.log(data1, `Objeto leido de local`);
getCountryData(data1.country);
