fetch(`https://localhost:${process.env.PORT}/post`)
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
