const currency = "$"
const items = [
    {"id": "wc-01", "name": "Wash Car", "price": 10},
    {"id": "mw-02", "name": "Mow Lawn", "price": 20},
    {"id": "pw-03", "name": "Pull Weeds", "price": 30}
]
const buttonEl = document.getElementById("service-buttons-el")
const itemListEl = document.getElementById("item-list-el")
const totalEl = document.getElementById("total-el")
const sendInvoiceBtEl = document.getElementById("send-invoice-el")

let itemList = []

function renderButtons() {
    let buttonContent = ""
    for (let i=0; i<items.length; i++) {
        buttonContent += `<button id="${items[i].id}" onclick="addItem('${items[i].id}')">${items[i].name} ${currency}${items[i].price}</button>`
    }
    buttonEl.innerHTML = buttonContent
}

function addItem(itemId) {
    if (!inList(itemId, itemList)) {
        itemList.push({"id": itemId})
    }
    renderListItems()
    const total = calculateTotal()
    renderInvoiceTotal(total)
}

function inList(id, list) {
    let found = false
    for (let i=0; i<list.length; i++) {
        if (list[i].id == id) {
            found = true
            break
        }
    }
    return found
}

function renderListItems() {
    let itemListContent = ""
    for (let i=0; i<itemList.length; i++) {
        for (let j=0; j<items.length; j++) {
            if (itemList[i].id == items[j].id) {
                itemListContent += `
                <div class="row">
                    <div class="column">
                        <div class="itemList">${items[j].name}<a href="#" onclick="removeItem('${items[j].id}');return false"> Remove</a></div>
                    </div>
                    <div class="column">
                        <div class="itemPrice">${currency}${items[j].price}</div>
                    </div>
                </div>
                `   
            }
        }
    }
    itemListEl.innerHTML = itemListContent
}

function calculateTotal() {
    let currentTotal = 0
    for (let i=0; i<itemList.length; i++) {
        for (let j=0; j<items.length; j++) {
            if (itemList[i].id == items[j].id) {
                currentTotal += items[j].price 
            }
        }
    }
    return currentTotal
}
function renderInvoiceTotal(totalPrice) {
    totalEl.innerHTML = `
                        <div class="row">
                            <div class="column">
                                <div class="smallTitle">We accept cash, credit card, or PayPal</div>
                            </div>
                            <div class="column">
                                <div class="itemPrice">$${totalPrice}</div>
                            </div>
                        </div>
                        `
}

sendInvoiceBtEl.addEventListener("click", function() {
    resetPage()
})

function resetPage() {
    itemList = []
    renderListItems()
    const total = calculateTotal()
    renderInvoiceTotal(total)
}

function removeItem(itemId) {
    let reRender = false
    for (let i=0; i<itemList.length; i++) {
        if (itemList[i].id == itemId) {
            itemList.splice(i,1)
            reRender = true
        }
    }
    if (reRender) {
        renderListItems()
        const total = calculateTotal()
        renderInvoiceTotal(total)
    }
}

renderButtons()
renderInvoiceTotal(0)
