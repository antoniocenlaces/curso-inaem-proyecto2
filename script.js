// Inicializo objeto data que contendrá la respuesta de la API geocode.xyz/api
let data = {};
// countryContainer es la <div> donde se muestran los países
const countryContainer = document.querySelector(".countries");
// btnEnvia pide a la API https://geocode.xyz/api el lugar especificado en latitude y longitude
const btnEnvia = document.querySelector(".envia");
// campos input para introducir coordenadas
const latitude = document.querySelector("#latitude");
const longitude = document.querySelector("#longitude");
// Redondea num a dec posiciones decimales
function roundNumber(num, dec) {
  console.log(
    `Número recibido: ${num}, devuelto: ${
      Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec)
    }`
  );
  return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
}
// Función que lee el contenido de un fichero .json seleccionado por usuario
// Muestra por cónsola de que ciudad y país se trata
// Renderiza los datos del país
// Guarda en localStorage todo el json con una clave que son las coordenadas redondeadas a un decimal
// Renderiza los datos de ese país
function readFileFromStorage(fichero) {
  const file = fichero[0];
  const reader = new FileReader();
  //  console.log(reader, `El objeto creado con FileReader`);
  reader.onload = function (e) {
    contenido = e.target.result;
    //  console.log(contenido, `El contenido del fichero`);
    data = JSON.parse(contenido);
    const key = `${roundNumber(Number(data.latt), 2)},${roundNumber(
      Number(data.longt),
      2
    )}`;
    localStorage.setItem(key, contenido);
    console.log(
      `Las coordenadas en el fichero ${file.name} pertenecen a: ${data.city}, ${data.country}`
    );
    getCountryData(data.country);
  };
  reader.readAsText(file);
}
// función wherami pide lat y long a la api y devuelve respuesta
// Muestra en cónsola la ciudad y el país
// Si se produce algún error lo lanza para ser recogido por el catch
// en el catch se informa del error y se procura en localStorage por unas coordenadas similares (hasta segundo decimal)
function whereami(lat, long) {
  const url = `https://geocode.xyz/${lat},${long}?geoit=json`;
  fetch(url)
    .then((response) => {
      // console.log(response, `Respuesta del API geocode`);
      if (response.ok) {
        return response.json();
      } else {
        throw Error("Servicio API ocupado");
      }
    })
    .then((data) => {
      if (data.matches === null) {
        throw Error("No existe un país en estas coordenadas");
      }
      //  console.log(data, `data recibido en segunda promesa`);
      const json = JSON.stringify(data);
      // console.log(json, `conversión a texto el objeto data recibido`);
      const key = `${roundNumber(Number(lat), 2)},${roundNumber(
        Number(long),
        2
      )}`;
      localStorage.setItem(key, json);
      const pais = data.country;
      const ciudad = data.city;
      console.log(`Estás en ${ciudad}, ${pais}`);
      if (pais !== null && pais !== undefined) getCountryData(pais);
    })
    .catch((err) => {
      console.log(err.message, `error en whereami`);
      const dataRead = JSON.parse(
        readLocal(roundNumber(Number(lat), 2), roundNumber(Number(long), 2))
      );
      // console.log(
      //   `Se ha producido un error. Leyendo localstorage dataRead= ${JSON.stringify(
      //     dataRead
      //   )}`
      // );
      if (dataRead !== null) {
        console.log(
          `Aún así, las coordenadas que has pedido están en LocalStorage`
        );
        const pais = dataRead.country;
        const ciudad = dataRead.city;
        console.log(
          `Las coordenadas, latitud: ${lat} y longitud ${long}, pertenecen a: ${ciudad}, ${pais}`
        );
        if (pais !== null && pais !== undefined) getCountryData(pais);
      }
    });
}
// Función que llama a la API https://restcountries.com y devuelve los datos de un país
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
// Función que renderiza los datos de un país y su bandera
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
  const nombreOriginal = Object.values(name)[1];
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
  // const { region: region1, population } = data;
  const [language] = Object.values(languages);
  const [currency] = Object.values(currencies);
  console.log(`Language: ${language}`);
  console.log(`currency: ${currency.name}`);
  const html = `<article class="country ${optionalClass}">
          <img class="country__img" src="${flag}" />
          <div class="country__data">
            <h3 class="country__name">${country}</h3>
            <h4 class="country__region">${region}</h4>
            <p class="country__row">${poblacion}</p>
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
//Función que lee de localStorage
function readLocal(lat, long) {
  const key = `${lat},${long}`;
  const data = localStorage.getItem(key);
  //  console.log(data, `datos mostrados en lectura localStorage`);
  return data;
}
// Funicón asociada al botón envia
btnEnvia.addEventListener("click", function (e) {
  e.preventDefault();
  data = whereami(latitude.value, longitude.value);
  // data = readLocal(latitude.value, longitude.value);
  //  console.log(`Por curiosidad escribo lo que leo de localstorage: ${data}`);
});

// readLocal(52.518);
// const key = { lat: 52.508, long: 13.381 };
// const dataText = localStorage.getItem(key);
// console.log(dataText, `El ob13.361jeto data leido de local como texto`);
// const data1 = JSON.parse(dataText);
// console.log(data1, `Objeto leido de local`);
// getCountryData(data1.country);
