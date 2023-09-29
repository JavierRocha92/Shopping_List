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
    '<span class="listitem__name" id="'+price+'">'+name+'</span>'+
    '<span class="listitem__price">'+price+'.00 €</span>'+
    '<div class="buttons">'+
    '<button class="listbtn__add">+ </button>'+
    '<button class="listbtn__decrease"> - </button>'+
    '</div>'+
    '<span class="listitem__amount">1</span>'+
    '<span class="listbtn__erase">x</span>'+
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
    const listElement = e.parentNode.parentNode.childNodes
    console.log(e.parentNode.parentNode)
    //FILTRAMOS DEL BOTON QUE SE HA PULSADO MEDIANTE SU CLASE
    switch(e.className){
        case 'listbtn__add':
            //CON ESTE BOTON AÑADIMOS UNIDADES 
            listElement[3].textContent = parseInt(listElement[3].textContent) + 1
            //GUARDAMOS EL PRECIO NUEVO RESPECTO A LAS UNIDADES QUE TIENE EL ARTICULO EN LA LIST
            listElement[1].textContent = (parseInt(listElement[3].textContent) * parseInt(listElement[0].id)) + '.00 €'
            e.focus()
            break;
            case 'listbtn__decrease':
                //CON ESTE BOTON RESTAMOS UNIDADES Y COMPROBAMOS SI LAS UNIDADES SON UNO PARA NO LLEGAR A 0 EN LA INTERFAZ
                if(listElement[3].textContent != 1)
                    listElement[3].textContent = parseInt(listElement[3].textContent) - 1
                    ///GUARDAMOS EL PRECIO NUEVO RESPECTO A LAS UNIDADES QUE TIENE EL ARTICULO EN LA LIST
                    listElement[1].textContent = (parseInt(listElement[3].textContent) * parseInt(listElement[0].id)) + '.00 €'                
                    e.focus()
            break;
        case 'listbtn__erase':
            //CON ESTE BOTON BORRAMOS EL ELEMENTO DE LA LISTA HACIENDO REFENCIA AL PADRE QUE ES EL <li>
            e.parentNode.remove()
            break;
        }
        e.addEventListener('mouseup',()=>{
            e.blur()
    })
    

    /* COGEMOS LA INFORMACION DEL PRECIO DEL PRODUCTO GUATDANDOLO EN UN ID. HABRIA QUE BUSCA OTRA FORMA MSD CORRECTA DE GUARDARLO */
}

//FUNCION PARA CAMBIAR LA CLASE A LOS BOTONES DE SUMAR Y RESTAR CUANDO EL CLICK SE ACABA

const changeFocus = () => {

}

/* LISTA DE EVENTOS */
btnaniadir.addEventListener('click',addItem)
btncomprar.addEventListener('click',amountPurchase)
list.addEventListener('mousedown',modifyProduct)