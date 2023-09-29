// NO SE PUEDE UTILIZAR innerHTML

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
    cantidad.textContent = 1;

    let btnmas = document.createElement("BUTTON");
    btnmas.setAttribute("class", "listbtn__add")
    btnmas.textContent = "+";

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
    if (nuevoalimento.value != "") {
        aniadirItem();
        nuevoalimento.value = "";
        nuevoalimento.focus();
    }
})

btncomprar.addEventListener("click", () => {
    while (list.children.length > 0) {
        list.removeChild(list.firstElementChild)
    }
})

list.addEventListener("click", (event) => {
    if (event.target.tagName == "BUTTON") {
        let elemento = event.target;
        let hermano = elemento.nextElementSibling.nextElementSibling;

        if (elemento.classList.contains("listbtn__add")) {
            hermano.textContent = parseInt(hermano.textContent) + 1
        }

        hermano = elemento.nextElementSibling;

        if (elemento.classList.contains("listbtn__decrease") && parseInt(hermano.textContent) > 1) {
            hermano.textContent = parseInt(hermano.textContent) - 1
        }
    }
})