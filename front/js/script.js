function getProducts() {
    fetch("http://localhost:3000/api/products")
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (products) {
            // console.log(products);
            const sectionItems = document.getElementById("items");

            products.forEach(kanap => {
                //console.log('kanap', kanap);
                const a = document.createElement('a');
                const article = document.createElement('article');
                const img = document.createElement('img');
                const h3 = document.createElement('h3');
                const p = document.createElement('p');

                a.setAttribute('href', './product.html?id=' + kanap._id);
                img.setAttribute('src', kanap.imageUrl);
                img.setAttribute('alt', kanap.altTxt);
                h3.setAttribute('class', 'productName');
                p.setAttribute('class', 'productDescription');

                h3.textContent = kanap.name;
                p.textContent = kanap.description;

                sectionItems.appendChild(a);
                a.appendChild(article);
                article.appendChild(img);
                article.appendChild(h3);
                article.appendChild(p);
            });
        })
        .catch(function (err) {
            // Une erreur est survenue
        });
}

getProducts();



