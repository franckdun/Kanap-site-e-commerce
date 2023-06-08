let pageUrl = window.location.href;
var url = new URL(pageUrl);
var productId = url.searchParams.get("id");
let currentProduct;
let quantityInput = document.getElementById('quantity');
let colorSelect = document.getElementById('colors');
//console.log(productId);

function getProductById(productId) {

    fetch(`http://localhost:3000/api/products/${productId}`)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (product) {
            //console.log(product);
            currentProduct = product;

            // Insérer l'image du produit
            const itemImg = document.getElementsByClassName('item__img')[0];
            const img = document.createElement('img');
            img.setAttribute('src', product.imageUrl);
            img.setAttribute('alt', product.altTxt);
            itemImg.appendChild(img);

            // Insérer le Nom du produit
            let h1 = document.getElementById('title');
            h1.textContent = product.name;

            // Insérer le prix du produit

            let price = document.getElementById('price');
            price.textContent = product.price;

            // Insérer la description du produit

            let description = document.getElementById('description');
            description.textContent = product.description;

            // Insérer les options de couleur

            product.colors.forEach(function (color) {
                //console.log('toto', color);
                let option = document.createElement('option');
                option.setAttribute('value', color);
                colorSelect.appendChild(option);
                option.textContent = color;
            });
        })
        .catch(function (err) {
            // Une erreur est survenue
            console.log(err);
        });
}

getProductById(productId);

// Créer une fonction nomée addToCart

function addToCart() {
    //console.log('Ajout du panier');
    let productInfos = {
        id: currentProduct._id,
        color: colorSelect.value,
        quantity: quantityInput.value,
        name: currentProduct.name,
        // price: currentProduct.price,
        description: currentProduct.description,
        imageUrl: currentProduct.imageUrl,
        altTxt: currentProduct.altTxt,
    }

    if (localStorage.cart) {
        let stringArray = localStorage.cart;
        let cart = JSON.parse(stringArray);
        //console.log('cart', cart);
        let isProductInCart = false;

        cart.forEach(product => {
            //console.log(product);
            if (productInfos.id === product.id && productInfos.color === product.color) {
                isProductInCart = true;
                product.quantity++;
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

};

// Mettre un console log dedans

// Créer un écouteur d'évenement sur le click au bouton d'ajout au panier
// et faire en sorte que ça appel la fonction addToCart
// Tester le clic pour voir le console log dans la console du navigateur

const addToCartBtn = document.getElementById('addToCart');
addToCartBtn.addEventListener('click', addToCart);


// Dans addToCart
    // Récuperer la couleur sélectionnée
    // Récupérer la quantité
    // Créer un nouvel objet productToCart avec 3 propriétées : id, color et quantity
    // Vérifier si l'objet cart existe dans le localStorage
        // Si oui, on parcours les produits du panier et on regarde pour chacun
        // d'entre eux, si son id et sa couleur sont le même que celui du produit de la page
            // Si oui, on incrémente la propriété quantity de 1
            // Ensuite on écrase le tableau dans le localStorage par version à jour
        // Si non, on ajoute l'objet cart au localStorage, qui sera un 
        // tableau contenant notre produit, avec une nouvelle propriété quantity de 1

