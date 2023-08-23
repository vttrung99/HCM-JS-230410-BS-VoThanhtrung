class Product {
    id: number;
    name: string;

    constructor(name: string, id: number = Date.now() * Math.random()) {
        this.id = id;
        this.name = name;
    }

    getData(): { id: number; name: string } {
        return {
            id: this.id,
            name: this.name,
        };
    }
}

class ProductManager {
    products: Product[] = [];

    constructor() {
        let productsLocal = JSON.parse(localStorage.getItem("products") ?? "[]");
        let productsTemp = productsLocal.map((item: { name: string; id: number }) => new Product(item.name, item.id));
        this.products = productsTemp;
        this.renderProducts();
    }

    addProduct(newProduct: Product) {
        this.products.push(newProduct);
        localStorage.setItem("products", JSON.stringify(this.products));
        this.renderProducts();
    }

    deleteProduct(id: number) {
        this.products = this.products.filter((product) => product.getData().id !== id);
        localStorage.setItem("products", JSON.stringify(this.products));
        this.renderProducts();
    }

    renderProducts() {
        const productList = document.getElementById("product-list") as HTMLUListElement;
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
    const productName = document.getElementById("add") as HTMLInputElement;
    if (productName.value) {
        const newProduct = new Product(productName.value);
        productManager.addProduct(newProduct);
    }
}
