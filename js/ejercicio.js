/* CATCHING ELEMENTS*/
const btncomprar = document.getElementById('btncomprar')
const btnaniadir = document.getElementById('btnaniadir')
const nuevoalimento = document.getElementById('nuevoalimento')
const totalPrice = document.getElementById('totalPrice')
const errorempty = document.getElementById('error--empty')
const errorrepeat = document.getElementById('error--repeat')
const list = document.getElementById('list')


/* FUNCTIONS*/

/**
 * function to create new item list element and save diferent values into diferents elements
 * 
 * @param {string} text input value by tiping user
 * @returns the newly created element
 */
const createElement = (text) => {
    /* storage a random number into a varibale */
    let priceUd = Math.floor(Math.random() * 11)
    /* CREATE LI ELEMENT */
    const itemList = document.createElement('LI')
    itemList.classList.add('listitem')
    /* CREATE LIST ITEM NAME */
    const name = document.createElement('SPAN')
    name.classList.add('listitem__name')
    /* SET ITS VALAUE BY TAKING PARAMETER GIVEN */
    name.textContent = text
    /* CREATE LIST ITEM PRICE */
    const price = document.createElement('SPAN')
    price.classList.add('listitem__price')
    /* SET VARIABLE PRIEUD VALUE INTO TEXCONTENT AN ID PRICE */
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

    /* RETURN NEWLY CREATED ELEMENT */

    return itemList


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
 * @param {parseFloat} total toatal amount from all item list
 */
const showTotal = (total) => {
    totalPrice.textContent = 'El total de la compra es ' + total + ',00 €'
}


/**
 * function to insert into list dom element the item given as parameter and set input valur to ''
 * 
 * @param {HTMLLIElement} item 
 */

const addItem = (item) => {
    list.appendChild(item)
    nuevoalimento.value = ''
}

/**
 * function to calculate total price from the list items 
 */

const amountPurchase = () => {
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

/**
 * functionn to increase by one uds of an item
 * 
 * @param {HTMLAllCollection} list 
 */
const addUds = (list) => {

    list[3].textContent = parseInt(list[3].textContent) + 1
}
/**
 * functionn to decrease by one uds of an item
 * 
 * @param {HTMLAllCollection} list 
 */
const decreaseUds = (list) => {

    list[3].textContent = parseInt(list[3].textContent) - 1
}
/**
 * function to modify amount price of an item list depending of its price and its uds
 * 
 * @param {HTMLAllCollection} itemList 
 */
const updatePrice = (itemList) => {
    console.log(itemList)
    itemList[1].textContent = (parseInt(itemList[3].textContent) * parseInt(itemList[1].id)) + '.00 €'
}



/**
 * function to modify diferents values of item list depending which button is on clikc
 * 
 * @param {event} event click event
 */

const modifyProduct = (event) => {
    /* storage all event.target in a short name variable */
    const e = event.target
    /* storage all children element from de ('LI') in a short name variable */
    const listElement = e.parentElement.parentElement.children
    /* first take conditional to filter button pushed */
    switch (e.className) {
        case 'listbtn__add':
            /* calling function to add uds  */
            addUds(listElement)
            e.focus()
            break;
        case 'listbtn__decrease':
            /* conditinal to filter is amount of element in a itemlidt is more than 1 to let keep decreasing instead */
            if (listElement[3].textContent != 1) {
                /* calling function to decrease uds */
                decreaseUds(listElement)
                e.focus()
            }
            break;
        case 'listbtn__erase':
            /* by clicking this button remove parent element (itemList) ('LI') */
            e.parentNode.remove()
            break;
    }
    /* calling function to update amount price  */
    updatePrice(listElement)
    e.addEventListener('mouseup', () => {
        e.blur()
    })
}

/**
 * FUNCTION TO CHECK IS A VALUE FROM INPUT IS OR NOT EMPTY 
 * 
 * @param {HTMLInputElement} input 
 * @returns boolean type 
 */
const isEmpty = (input) => {
    return input.value == ''
}

/**
 * function to check if an element number is already in the list and return true or false
 * 
 * @param {HTMLInputElement} input input element from DOM
 * @returns true if an item exist with the same name, false if no item found wuth the same name
 */
const isRepeat = (input) => {
    for (const element of list.children) {
        if (element.children[0].textContent.toLowerCase() == input.value.toLowerCase()) {
            return true
        }
    }
    return false
}

/**
 * function to check diferents filter on input values and repeat product on the list 
 * and then insert a new porudct on the list
 * 
 * @param {event} event 
 */

const clickOnAniadir = (event) => {
    e = event.target
    if(event.keyCode == '13' || e.id == 'btnaniadir'){
        totalPrice.textContent = ''
        /* FUNCTION TO CHECK INPUT HAS SOME WRITEN */
        if (!isEmpty(nuevoalimento)) {
            errorempty.style.display = 'none'
            /* FUNCTION TO CHECK PRIDUCT IS ALREADY ON LIST */
            if (!isRepeat(nuevoalimento)) {
                errorrepeat.style.display = 'none'
                /* FUNCTION TO ADD AN ITEM LIST INTO LIST */
                addItem(createElement(nuevoalimento.value))
                /* REMOVE INPUT VALUE */
                nuevoalimento.value = ''
                nuevoalimento.focus()
            } else {
                console.log('son ufales')
                errorrepeat.style.display = 'block'
            }
        } else {
            errorempty.style.display = 'block'
        }
    }
}

// const showThings = (event) => {
//     console.log(event)
// }
/* EVENTS LIST */
btncomprar.addEventListener('click', amountPurchase)
document.addEventListener('keypress', clickOnAniadir)
list.addEventListener('mousedown', modifyProduct)
document.addEventListener('keypress',clickOnAniadir)