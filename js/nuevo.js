const nuevoalimento = document.getElementById("nuevoalimento");
const list = document.getElementById("list");
const btnaniadir = document.getElementById("btnaniadir");
const btncomprar = document.getElementById("btncomprar");


const aniadirItem = () => {
  //Creamos el elemento de lista
  let newItem = document.createElement("LI");
  newItem.setAttribute("class", "listitem")

  //Creamos el nombre, precio unidades del elmento
  let nombre = document.createElement("SPAN");
  nombre.setAttribute("class", "listitem__name")
  nombre.textContent = nuevoalimento.value;

  let precio = document.createElement("SPAN");
  precio.setAttribute("class", "listitem__price")
  precio.textContent = Math.floor(Math.random() * 100) + ".00 €";

  let cantidad = document.createElement("SPAN");
  cantidad.setAttribute("class", "listitem__amount")
  cantidad.textContent = 0;

  let btnmas = document.createElement("INPUT");
  btnmas.setAttribute("class", "listbtn__add")
  btnmas.setAttribute("type", "button")
  btnmas.setAttribute("value", "+")


  let btnmenos = document.createElement("BUTTON");
  btnmenos.setAttribute("class", "listbtn__decrease")
  btnmenos.textContent = "-";

  // añadimos los elementos del item 
  newItem.appendChild(nombre)
  newItem.appendChild(precio)
  newItem.appendChild(btnmas)
  newItem.appendChild(btnmenos)
  newItem.appendChild(cantidad)

  //   Añadimos el item a la lista
  list.appendChild(newItem)
}



// Eventos
btnaniadir.addEventListener("click", () => {
  aniadirItem();
  nuevoalimento.value = "";
  nuevoalimento.focus();
})

list.addEventListener("click", (event) => {
  let elemento = event.target;
  console.log(event.target.innerHTML)
  console.log(typeof(elemento.innerHTML))
  console.log(typeof(event.target.innerHTML))
  if (event.target.innerHTML == "+") {
    elemento.nextElementSibling.nextElementSibling.textContent = parseInt(elemento.nextElementSibling.nextElementSibling.textContent) + 1
  }
})