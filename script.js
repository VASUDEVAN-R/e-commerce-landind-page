const productContainer = document.getElementById("product-container");
const searchBar = document.getElementById("search-bar");
const productModal = document.getElementById("product-modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const closeModal = document.querySelector(".close");

let products = [];


async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}



function displayProducts(products) {
    productContainer.innerHTML = "";
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button onclick="openModal('${product.title}', '${product.description}')">View Details</button>
        `;
        productContainer.appendChild(productCard);
    });
}


function openModal(title, description) {
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    productModal.style.display = "block";
}


closeModal.onclick = () => {
    productModal.style.display = "none";
};

window.onclick = (event) => {
    if (event.target === productModal) {
        productModal.style.display = "none";
    }
};


searchBar.addEventListener("input", () => {
    const searchText = searchBar.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchText)
    );
    displayProducts(filteredProducts);
});

fetchProducts();
