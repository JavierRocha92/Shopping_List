/* CAPTURAR LOS ELEMENTOS NECESARIOS */
const btncomprar = document.getElementById('btncomprar')
const btnaniadir = document.getElementById('btnaniadir')
const nuevoalimento = document.getElementById('nuevoalimento')
const totalPrice = document.getElementById('totalPrice')
const errorempty = document.getElementById('error--empty')
const errorrepeat = document.getElementById('error--repeat')
const list = document.getElementById('list')


/* FUNCIONES NECESARIAS */

/* FUNCION PARA DETERMINAR QUE BOTON SE HA PULSADO  */
const createElement =(text) =>{
    let priceUd = Math.floor(Math.random() * 11)
    /* CREATE LI ELEMENT */
    const itemList = document.createElement('LI')
    itemList.classList.add('listitem')
    /* CREATE LIST ITEM NAME */
    const name = document.createElement('SPAN')
    name.classList.add('listitem__name')
    name.textContent= text
    /* CREATE LIST ITEM PRICE */
    const price = document.createElement('SPAN')
    price.classList.add('listitem__price')
    price.textContent = priceUd + '.00 €'
    price.id = priceUd
    /* CREATE LIST ITEM BUTTONS */
    const buttons = document.createElement('DIV')
    buttons.classList.add('buttons')
    /* CREATE LIST ITEM BUTTON */
    const buttonAdd = document.createElement('BUTTON')
    buttonAdd.classList.add('listbtn__add')
    buttonAdd.textContent = '+'
    /* CREATE LIST ITEM BUTTON */
    const buttonDec = document.createElement('BUTTON')
    buttonDec.classList.add('listbtn__decrease')
    buttonDec.textContent = '-'
    /*ADDING BUTTONS INTO BUTTONS DIV  */
    buttons.appendChild(buttonAdd)
    buttons.appendChild(buttonDec)
    
    /* CREATE LIST ITEM BUTTON */
    const itemAmount = document.createElement('SPAN')
    itemAmount.classList.add('listitem__amount')
    itemAmount.textContent = '1'
    /* CREATE LIST ITEM BUTTON */
    const buttonErase = document.createElement('SPAN')
    buttonErase.classList.add('listbtn__erase')
    buttonErase.textContent = 'x'

    /* INSERT ALL ITEMS INTO LIST ITEM */
    itemList.appendChild(name)
    itemList.appendChild(price)
    itemList.appendChild(buttons)
    itemList.appendChild(itemAmount)
    itemList.appendChild(buttonErase)

    /* INSERT LIST ITEM INTO LIST */

    list.appendChild(itemList)

    
    // '<li class="listitem">'+
    // '<span class="listitem__name" id="'+price+'">'+name+'</span>'+
    // '<span class="listitem__price">'+price+'.00 €</span>'+
    // '<div class="buttons">'+
    // '<button class="listbtn__add">+ </button>'+
    // '<button class="listbtn__decrease"> - </button>'+
    // '</div>'+
    // '<span class="listitem__amount">1</span>'+
    // '<span class="listbtn__erase">x</span>'+
    // '</li>'
}
/**
 * function to set textcontent to totalPrice element to shoe total rice from the list
 * 
 * @param {*} total 
 */
const showTotal = (total) => {
    totalPrice.textContent = 'El total de la compra es '+total+',00 €'
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

/**
 * function to calculate total proce from the list items 
 */

const amountPurchase = () =>{
    let total = 0
    let items = list.querySelectorAll('.listitem')
    items.forEach(item => {
        let price = item.querySelector('.listitem__price')
        total += parseFloat(price.textContent)
    });

    /* remove all elemnts on the list */

    list.textContent = ''

    /* calling function to show total price  */
    showTotal(total)
    
}

const addUds = (list) => {

    list[3].textContent = parseInt(list[3].textContent) + 1
}

const decreaseUds = (list) => {

    list[3].textContent = parseInt(list[3].textContent) - 1
}



/* FUNCION PARA MODIFICAR UN ELEMENTO DE UN PRODUCTO */

const modifyProduct = (event) =>{
    const e = event.target
    //GUARDAMOS EN UN ARRAY LOS ELEMENTOS HIJOS DE EL ELEMENTO CAPTURADO EN ESTE CASO EL <li>
    const listElement = e.parentElement.parentElement.children
    /* first take conditional to filter button pushed */
    switch(e.className){
        case 'listbtn__add':
            /* calling function to add uds  */
            addUds(listElement)
            //GUARDAMOS EL PRECIO NUEVO RESPECTO A LAS UNIDADES QUE TIENE EL ARTICULO EN LA LIST
            listElement[1].textContent = (parseInt(listElement[3].textContent) * parseInt(listElement[0].id)) + '.00 €'
            e.focus()
            break;
            case 'listbtn__decrease':
                //CON ESTE BOTON RESTAMOS UNIDADES Y COMPROBAMOS SI LAS UNIDADES SON UNO PARA NO LLEGAR A 0 EN LA INTERFAZ
                if(listElement[3].textContent != 1){
                    /* calling function to decrease uds */
                    decreaseUds(listElement)
                    
                    ///GUARDAMOS EL PRECIO NUEVO RESPECTO A LAS UNIDADES QUE TIENE EL ARTICULO EN LA LIST
                    listElement[1].textContent = (parseInt(listElement[3].textContent) * parseInt(listElement[0].id)) + '.00 €'                
                    e.focus()
                }
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

/**
 * FUNCTION TO CHECK IS A VALUE FROM INPUT IS OR NOT EMPTY 
 * 
 * @param {*} input 
 * @returns boolean type 
 */
const isEmpty = (input) => {
    return input.value == ''
}


const isRepeat = (input) =>{
    for (const element of list.children) {
        if(element.children[0].textContent.toLowerCase() == input.value.toLowerCase()){
            return true
        }
    }
    return false
}

/**
 * function to check diferents filter on input values and repeat product on the list 
 * and then insert a new porudct on the list
 * 
 * @param {*} event 
 */

const clickOnAniadir = (event) => {
    /* FUNCTION TO CHECK INPUT HAS SOME WRITEN */
    if(!isEmpty(nuevoalimento)){
        errorempty.style.display = 'none'
        /* FUNCTION TO CHECK PRIDUCT IS ALREADY ON LIST */
        if(!isRepeat(nuevoalimento)){
            errorrepeat.style.display = 'none'
            /* FUNCTION TO CREATE AN ITEM LIST */
            createElement(nuevoalimento.value)
            /* REMOVE INPUT VALUE */
            nuevoalimento.value = ''
            nuevoalimento.focus()
        }else{
            console.log('son ufales')
            errorrepeat.style.display = 'block'
        }
    }else{
        errorempty.style.display = 'block'
    }
}

/* EVENTS LIST */

// btnaniadir.addEventListener('click',addItem)
btncomprar.addEventListener('click',amountPurchase)
btnaniadir.addEventListener('click',clickOnAniadir)
list.addEventListener('click',modifyProduct)