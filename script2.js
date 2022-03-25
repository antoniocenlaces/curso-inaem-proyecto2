console.log(`Test start`);

setTimeout(() => {
  console.log(`He llegado a la meta`);
}, 0);

Promise.resolve("Resolve promise 1").then((res) => console.log(res));
Promise.resolve("Resolve promise 2").then((res) => {
  for (let index = 0; index < 100000000; index++) {}
  console.log(res);
});
console.log(`Fin del test`);
