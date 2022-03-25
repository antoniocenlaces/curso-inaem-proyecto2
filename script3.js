// const promesa = new Pormise(function (resolve, reejct) {

// });

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log("Promesa iniciada");
  setTimeout(
    () =>
      Math.random() > 0.5 ? resolve("Ganaste") : reject(new Error("Perdiste")),
    5000
  );
});

lotteryPromise
  .then((res) => console.log(res))
  .catch((err) => console.log(err.message));
