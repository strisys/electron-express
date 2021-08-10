const countElem = document.getElementById('count');
const btnElem = document.getElementById('btn');

const increment = async () => {
  const respose = (await fetch(`/count`));
  const json = (await respose.json());
  console.log(json);

  countElem.innerText = json.count;
}

btnElem.addEventListener('click', increment);
export {};