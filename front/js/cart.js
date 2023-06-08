let stringArray = localStorage.cart;
let cart = JSON.parse(stringArray);
let cartItems = document.getElementById('cart__items');

function updateProductQuantity(event) {
    const input = event.target;
    const newQuantity = input.value;
    let article = input.closest('article');
    const dataId = article.getAttribute("data-id");
    const dataColor = article.getAttribute("data-color");
    console.log('dataId', dataId);
    console.log('dataColor', dataColor);

    let stringArray = localStorage.cart;
    let cart = JSON.parse(stringArray);
    console.log('Contenu de la variable cart:', cart);

    // Parcourir les produits dans le cart

    // var articleClass = document.querySelector('.cart__item');

    for (let i = 0; i < cart.length; i++) {
        let currentProduct = cart[i];
        console.log('Element du tableau à l\'index', i, ':', currentProduct);
        if (dataColor === currentProduct.color && dataId === currentProduct.id) {
            console.log('on a trouvé le produit', currentProduct);
            currentProduct.quantity = newQuantity;
        }
    }

    stringArray = JSON.stringify(cart);
    localStorage.setItem("cart", stringArray);
}

function deleteProduct(event) {
    console.log('deleteProduct');
    const p = event.target;
    let article = p.closest('article');
    console.log('article', article);
    const dataId = article.getAttribute("data-id");
    const dataColor = article.getAttribute("data-color");

    article.parentNode.removeChild(article);

    let stringArray = localStorage.cart;
    let cart = JSON.parse(stringArray);
    console.log('Contenu de la variable cart:', cart);

    for (let i = 0; i < cart.length; i++) {
        let currentProduct = cart[i];
        console.log('Element du tableau à l\'index', i, ':', currentProduct);
        if (dataColor === currentProduct.color && dataId === currentProduct.id) {
            console.log('on a trouvé le produit', currentProduct);
            cart.splice(i, 1);
        }
    }
    stringArray = JSON.stringify(cart);
    localStorage.setItem("cart", stringArray);
}

cart.forEach(product => {
    fetch(`http://localhost:3000/api/products/${product.id}`)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (productFromApi) {
            console.log('productFromApi', productFromApi);
            product.price = productFromApi.price;

            // 1) createElement comme page accueil
            let article = document.createElement('article');
            let divCartItemImg = document.createElement('div');
            let img = document.createElement('img');
            let divCartItemContent = document.createElement('div');
            let divCartItemContentDescription = document.createElement('div');
            let h2 = document.createElement('h2');
            let pColor = document.createElement('p');
            let pPrice = document.createElement('p');
            let divCartItemContentSettings = document.createElement('div');
            let divCartItemContentSettingsQuantity = document.createElement('div');
            let pQuantity = document.createElement('p');
            let inputItemQuantity = document.createElement('input');
            let divCartItemContentSettingsDelete = document.createElement('div');
            let pDeleteItem = document.createElement('p');

            // 2) attribut
            article.setAttribute('class', 'cart__item');
            article.setAttribute('data-id', product.id);
            article.setAttribute('data-color', product.color);
            divCartItemImg.setAttribute('class', 'cart__item__img');
            img.setAttribute('src', product.imageUrl);
            img.setAttribute('alt', product.altTxt);
            inputItemQuantity.setAttribute('type', 'number');
            inputItemQuantity.setAttribute('class', 'itemQuantity');
            inputItemQuantity.setAttribute('name', 'itemQuantity');
            inputItemQuantity.setAttribute('min', '1');
            inputItemQuantity.setAttribute('max', '100');
            inputItemQuantity.setAttribute('value', product.quantity);
            divCartItemContent.setAttribute('class', 'cart__item__content');
            divCartItemContentDescription.setAttribute('class', 'cart__item__content__description');
            divCartItemContentSettingsQuantity.setAttribute('class', 'cart__item__content__settings__quantity');
            divCartItemContentSettings.setAttribute('class', 'cart__item__content__settings');
            divCartItemContentSettingsDelete.setAttribute('class', 'cart__item__content__settings__delete');
            pDeleteItem.setAttribute('class', 'deleteItem');

            // 2.bis) Insérer le contenu texte pour les éléménts qui en ont
            h2.textContent = product.name;
            pPrice.textContent = product.price;
            pColor.textContent = product.color;
            pQuantity.textContent = 'Qté : ';
            pDeleteItem.textContent = 'Supprimer';

            // 3) relation
            article.appendChild(divCartItemImg);
            article.appendChild(divCartItemContent);
            divCartItemImg.appendChild(img);
            divCartItemContent.appendChild(divCartItemContentDescription);
            divCartItemContent.appendChild(divCartItemContentSettings);
            divCartItemContentDescription.appendChild(h2);
            divCartItemContentDescription.appendChild(pColor);
            divCartItemContentDescription.appendChild(pPrice);
            divCartItemContentSettings.appendChild(divCartItemContentSettingsQuantity);
            divCartItemContentSettings.appendChild(divCartItemContentSettingsDelete);
            divCartItemContentSettingsQuantity.appendChild(pQuantity);
            divCartItemContentSettingsQuantity.appendChild(inputItemQuantity);
            divCartItemContentSettingsDelete.appendChild(pDeleteItem);
            cartItems.appendChild(article);

            inputItemQuantity.addEventListener('change', updateProductQuantity);
            pDeleteItem.addEventListener('click', deleteProduct);

        })
        .catch(function (err) {
            // Une erreur est survenue
            console.log(err);
        });
});




/*
inputsQuantity.forEach(input => {
    let input = document.querySelector('.input');
    let result = document.querySelector('#result');
    input.addEventListener('click', function ()
    input.classList
    {




        let quantity = [];
        if (productInfos.id === product.id && product.quantity) {
            isProductQuantityInCart = true;
            NbrQuantity * Quantity = totalQuantity;
            itemQuantity++;
        }

        const productQuantity = async () => {
            try {
                const result = await.fetch(`http://localhost:3000/api/products/${product.id}`);
                then(data)
                console.log('result, result');
            } catch (error(){
                console.log(error);
            }
            productQuantity();

            ou
            const productQuantity = async () => {
                fetch(`http://localhost:3000/api/products/${product.id}`);
                    .then(response) => {
            return nbrQuantity; (mettre nbrquantity avant)
    console.log('response', response);
})
console.log(test);

productQuantity()
    .then(data) => {
    console.log(data.filter);
}




let input = element.closest(article);

*/

/*
#1 Modifier la quantité
Faire un sélecteur pour tous les éléments portant la classe itemQuantity (getElementByClassName)
Faire une boucle sur chacun de ses éléments
Ajouter à chaque élément un écouteur d'événement de "change" qui trigger une fonction anonyme
Faire une sélecteur pour trouver la balise article la plus proche de l'input modifié (closest)

Extraires les valeurs des atributs data-id et data-color de cette balise article (à stocker dans une nouvelle variable)
Parcourir les produits du cart
Pour chaque produit du cart, tester si il correspond à la couleur et à l'id
Si oui, mettre à jour la valeur de la propriété quantité de cet objet
A la suite de la boucle,
*/
/*
let articleAttribut {
    data.id = "{product.ID}";
data.color = "{product.color}";
}
let articleDataId = data.id;
let articleColor = data.color;


if (localStorage.cart) {
    let stringArray = localStorage.cart;
    let cart = JSON.parse(stringArray);
    //console.log('cart', cart);
    let isItemQuantityInCart = false;

    cart.forEach(product => {
        //console.log(product);
        if (data.id === { product- ID} && data.color === { product- color}) {
    isItemQuantityInCart = true;
    item.quantity++;
}
    });

if (isProductInCart === false) {
    cart.push(productInfos);
}

//console.log('Ajout panier, fin', cart);

stringArray = JSON.stringify(cart);
localStorage.setItem("cart", stringArray);

} else {
    //console.log('pas de cart');
    let cart = [];
    cart.push(productInfos);
    let stringArray = JSON.stringify(cart);
    localStorage.setItem("cart", stringArray);
};
document.location.href = "./cart.html";

// récupérer donnée localstorage

// Supprimer une donnée localstorage


};
*/



