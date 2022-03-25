// PROMISIFY evitar el CALLBACK HELL
//  Mejor mantenimiento de código y más legible

// setTimeout(() => {
//   console.log(`Ha pasado un segundo`);
//   setTimeout(() => {
//     console.log(`Han pasado dos segundos adicionales`);
//     setTimeout(() => {
//       console.log(`Han pasado tres segundos adicionales`);
//       setTimeout(() => {
//         console.log(`Han pasado cuatro segundos adicionales`);
//       }, 4000);
//     }, 3000);
//   }, 2000);
// }, 1000);

const esperaPromesa1 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve("Ha pasado 1 segundo"), 1000);
});

const esperaPromesa2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve("Ha pasado 2 segundos"), 2000);
});
const esperaPromesa3 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve("Ha pasado 3 segundos"), 3000);
});

esperaPromesa1
  .then((res) => {
    console.log(res);
    return esperaPromesa2;
  })
  .then((res) => {
    console.log(res);
    return esperaPromesa3;
  })
  .then((res) => console.log(res));

const wait = (segundos) => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(`Función pasado ${segundos} segundos`),
      segundos * 1000
    );
  });
};

wait(1)
  .then((data) => {
    console.log(data);
    return wait(2);
  })
  .then((data) => {
    console.log(data);
    return wait(3);
  })
  .then((data) => {
    console.log(data);
    return wait(4);
  })
  .then((data) => console.log(data));
