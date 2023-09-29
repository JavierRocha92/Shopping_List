/* CAPTURAR LOS ELEMENTOS NECESARIOS */
const btncomprar = document.getElementById('btncomprar')
const btnaniadir = document.getElementById('btnaniadir')
const nuevoalimento = document.getElementById('nuevoalimento')
const list = document.getElementById('list')


/* FUNCIONES NECESARIAS */

/* FUNCION PARA DETERMINAR QUE BOTON SE HA PULSADO  */
const createElement =(name) =>{
    let price = Math.floor(Math.random() * 11)
    list.innerHTML += '<li class="listitem">'+
    '<span class="listitem__name" data="'+price+'">'+name+'</span>'+
    '<span class="listitem__price">'+price+'.00 €</span>'+
    '<button class="listbtn__add">+ </button>'+
    '<button class="listbtn__decrease"> - </button>'+
    '<span class="listitem__amount">1</span>'+
    '<span class="listitem__erase">x</span>'+
    '</li>'
}

/* FUNCION PARA BORRAR UN ELEMENTO */

const removeElement = ()=>{
    let items = list.querySelectorAll('.listitem')
    items.forEach(item => {
        console.log(item)
    });
}

/* FUNCION PARA AÑADIR UN ALIMENTO */

const  addItem = ()=>{
    createElement(nuevoalimento.value)
    nuevoalimento.value = ''
}

/* FUNCION PARA GENERAR UN PRECIO DE TODOS LOS PRODUCTOS */

const amountPurchase = () =>{
    let total = 0
    let items = list.querySelectorAll('.listitem')
    items.forEach(item => {
        let price = item.querySelector('.listitem__price')
        total += parseFloat(price.textContent)
    });

    /* AHORA VACIAMOS LA LISTA Y MOSTRAMOS EL TOTAL */

    list.textContent = ''
    list.innerHTML = '<h2>El total de la compra es '+total+',00 €</h2>'
}

/* FUNCION PARA MODIFICAR UN ELEMENTO DE UN PRODUCTO */

const modifyProduct = (event) =>{
    const e = event.target
    //GUARDAMOS EN UN ARRAY LOS ELEMENTOS HIJOS DE EL ELEMENTO CAPTURADO EN ESTE CASO EL <li>
    const listElement = e.parentNode.childNodes
    if (e.className === 'listbtn__add'){
        listElement[4].textContent = parseInt(listElement[4].textContent) + 1
    }else if(e.className === 'listbtn__decrease'){
        if(listElement[4].textContent != 1)
        listElement[4].textContent = parseInt(listElement[4].textContent) - 1
    }
    console.log(listElement[0].dataset)
    listElement[1].textContent = (parseInt(listElement[4].textContent) * parseInt(listElement[0].data)) + '.00 €'
    /* EL ELEMENTO DATA NO SE PUEDE ACCEDER A EL HAY QUW ARREGLARLO PARA PODER REALIZAR LA OPERACION */
}

/* LISTA DE EVENTOS */
btnaniadir.addEventListener('click',addItem)
btncomprar.addEventListener('click',amountPurchase)
list.addEventListener('click',modifyProduct)