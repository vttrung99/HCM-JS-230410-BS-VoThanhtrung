"use strict";
class Product {
    constructor(name, id = Date.now() * Math.random()) {
        this.id = id;
        this.name = name;
    }
    getData() {
        return {
            id: this.id,
            name: this.name,
        };
    }
}
class ProductManager {
    constructor() {
        var _a;
        this.products = [];
        let productsLocal = JSON.parse((_a = localStorage.getItem("products")) !== null && _a !== void 0 ? _a : "[]");
        let productsTemp = productsLocal.map((item) => new Product(item.name, item.id));
        this.products = productsTemp;
        this.renderProducts();
    }
    addProduct(newProduct) {
        this.products.push(newProduct);
        localStorage.setItem("products", JSON.stringify(this.products));
        this.renderProducts();
    }
    deleteProduct(id) {
        this.products = this.products.filter((product) => product.getData().id !== id);
        localStorage.setItem("products", JSON.stringify(this.products));
        this.renderProducts();
    }
    renderProducts() {
        const productList = document.getElementById("product-list");
        productList.innerHTML = "";
        this.products.forEach((product, index) => {
            const listItem = document.createElement("div");
            listItem.innerHTML =
                `
                <div class="enterContens">
                    <span>${index + 1}. ${product.getData().name}</span>
                    <i class="fa-sharp fa-solid fa-trash" onclick="productManager.deleteProduct(${product.getData().id})"></i>
                    
                   
                </div>
            `;
            productList.appendChild(listItem);
        });
    }
}
const productManager = new ProductManager();
function addProduct() {
    const productName = document.getElementById("add");
    if (productName.value) {
        const newProduct = new Product(productName.value);
        productManager.addProduct(newProduct);
    }
}
