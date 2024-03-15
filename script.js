const Menu = document.getElementById("menu")
const BtnCartOpen = document.getElementById("btn-cart-open")
const ModalCart = document.getElementById("cart-modal")
const BtnCloseCart = document.getElementById("btn-close-cart")
const CartItemsContainer = document.getElementById("cart-itens")
const TotalPrice = document.getElementById("total-price")
const CartCounter = document.getElementById("cart-iten-count")
const AdressInput = document.getElementById("adrees")
const AdressHelpMessage = document.getElementById("adress-warn")
const checkoutCompleted = document.getElementById("checkout-btn")
const dateSpan = document.getElementById("date-span")

//variavel de controle para salvar produtos
let Cart = []

//fechar o cart quando clicado
BtnCloseCart.addEventListener("click", () => {
    ModalCart.style.display = "none"
})
//abrir o modalCart ao clicado 
BtnCartOpen.addEventListener("click", () => {
    ModalCart.style.display = "flex"
    //atualizar o carrinho toda ver que for para abrir
    updateCart()
})
//fechar o ModalCart caso for clicado fora dele
ModalCart.addEventListener("click", (event) => {
    //verificar se a propriedade retornada do target é o proprio modal se for feche o
    if (event.target === ModalCart) {
        ModalCart.style.display = "none"
    }
})

//adicionar pedido ao carrinho
Menu.addEventListener("click", (event) => {
    //pegar o elemento button do produto que foi clicado 
    let parentButton = event.target.closest(".add-to-cart-btn")
    //verificar se existe o botão com essa classe
    if (parentButton) {
        //pegando os valores dos atributos de data
        let price = parseFloat(parentButton.getAttribute("data-price"))
        let productName = parentButton.getAttribute("data-name")
        //adicionar ao carrinho
        AddCart(productName, price)
    }
    //atualizar carrinho a cada evento de click
    updateCart()
})

//adicionar ao carrinho
function AddCart(name, price) {
    //verificar se existe esse produto
    let checkExist = Cart.find((product) => product.name === name)
    //se existir adicione mais um produto a lista
    if (checkExist) {
        checkExist.quantity += 1
    } else {
        //se não apenas adicione ele a lista
        Cart.push({ name, price, quantity: 1 })
    }

}

//atualizar o carrinho
function updateCart() {
    CartItemsContainer.innerHTML = ""
    //variavel que armazena valor dos pedidos
    let total = 0
    //fazer um loop dentro do Array para construir a lista de produtos
    Cart.forEach((item) => {

        const cartElement = document.createElement("div")
        cartElement.classList.add("flex", "justify-between", "flex-col", "mb-4")
        //criado o elemento então adicione o item dentro do elemento
        cartElement.innerHTML += `
        
            <div class="flex items-center justify-between"> 
                <div> 
                    <p class="font-medium">${item.name}</p>
                    <p>Qtn: ${item.quantity}</p>
                    <p class="font-medium mt-2">${item.price.toFixed(2)}</p>
                </div>
                <div> 
                    <button class="remove-from-item-cart" data-name="${item.name}">Remover</button>
                </div>
            </div>
        `
        //pegar o valor de cada produto e salvar valor na variavel de contro de total
        total += item.price * item.quantity
        //e adicione na div pai para mostrar na tela do usuário
        CartItemsContainer.appendChild(cartElement)
    })
    //formatar o dinheiro total
    TotalPrice.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
    //pegando quantidade de produto no carrinho
    CartCounter.innerHTML = Cart.reduce((acc, item) => { return acc + item.quantity }, 0)

}


//função para remover item do carrinho com event
CartItemsContainer.addEventListener("click", (event) => {

    let ParentBtnRemove = event.target.closest(".remove-from-item-cart")
    console.log("ola")
    if (ParentBtnRemove) {
        console.log("ola")
        const name = ParentBtnRemove.getAttribute("data-name")
        RemoveItemCart(name)
        console.log("ola")
    }
})
//function que será chamada caso queira remover um item
function RemoveItemCart(name) {
    //se existir retornara a posição no array do carrinho
    const index = Cart.findIndex((item) => item.name === name)

    if (index !== -1) {
        //pegar o item da posição
        const item = Cart[index]

        //verificar se a quantidade de produtos é maior que um para diminuir a quantidade
        if (item.quantity > 1) {
            item.quantity -= 1
            //atualizar carrinho
            updateCart()
            return
        }
        //se não remova o item da lista de produtos
        Cart.splice(index, 1)
        //atualizar carrinho
        updateCart()
        console.log(Cart)
    }
}
//verificar se o input está preenchido
AdressInput.addEventListener("input", (event) => {

    let inputValue = event.target.value
    if (inputValue !== "") {
        AdressHelpMessage.classList.add("hidden")
        AdressInput.classList.remove("border-red-600")
    }
})

//enviar mensagem de erro caso o input esteja vazio
checkoutCompleted.addEventListener("click", () => {

    if (Cart.length === 0) {
        if (AdressInput.value === "") {
            AdressHelpMessage.classList.remove("hidden")
            AdressInput.classList.add("border-red-600")
        }
    }
})

//verificar se a loja está aberta para efetuar pedidos
function CheckRestourantOpen() {
    let data = new Date()
    let hors = data.getHours()
    return hors >= 18 && hors < 22 // true restaurante está aberto
}

//verificar se o restaurante está aberto toda vez que o site for carregador
let isOpen = CheckRestourantOpen()
//verificar se está aberto ou não o restaurante
if (isOpen) {
    dateSpan.classList.remove("bg-red-600")
    dateSpan.classList.add("bg-green-600")
}else{
    dateSpan.classList.add("bg-red-600")
    dateSpan.classList.remove("bg-green-600")
}