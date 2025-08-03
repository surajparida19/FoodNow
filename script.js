// Sample Data
const restaurants = [
    {
        id: 1,
        name: "Bella Italia",
        cuisine: "Italian",
        rating: 4.8,
        deliveryTime: "25-35 min",
        deliveryFee: 2.99,
        image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400",
        featured: true
    },
    {
        id: 2,
        name: "Sushi Master",
        cuisine: "Japanese",
        rating: 4.9,
        deliveryTime: "30-40 min",
        deliveryFee: 3.99,
        image: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=400",
        featured: true
    },
    {
        id: 3,
        name: "Burger Palace",
        cuisine: "American",
        rating: 4.6,
        deliveryTime: "20-30 min",
        deliveryFee: 1.99,
        image: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=400",
        featured: false
    },
    {
        id: 4,
        name: "Spice Garden",
        cuisine: "Indian",
        rating: 4.7,
        deliveryTime: "35-45 min",
        deliveryFee: 2.49,
        image: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=400",
        featured: true
    },
    {
        id: 5,
        name: "Dragon Palace",
        cuisine: "Chinese",
        rating: 4.5,
        deliveryTime: "25-35 min",
        deliveryFee: 2.99,
        image: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400",
        featured: false
    },
    {
        id: 6,
        name: "Taco Fiesta",
        cuisine: "Mexican",
        rating: 4.4,
        deliveryTime: "20-30 min",
        deliveryFee: 1.99,
        image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=400",
        featured: false
    }
];

const menuItems = [
    // Bella Italia
    { id: 1, restaurantId: 1, name: "Margherita Pizza", description: "Fresh tomatoes, mozzarella, basil", price: 14.99, category: "mains", image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=300" },
    { id: 2, restaurantId: 1, name: "Caesar Salad", description: "Crisp romaine, parmesan, croutons", price: 9.99, category: "appetizers", image: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=300" },
    { id: 3, restaurantId: 1, name: "Tiramisu", description: "Classic Italian dessert", price: 6.99, category: "desserts", image: "https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=300" },
    
    // Sushi Master
    { id: 4, restaurantId: 2, name: "Salmon Roll", description: "Fresh salmon, avocado, cucumber", price: 12.99, category: "mains", image: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=300" },
    { id: 5, restaurantId: 2, name: "Miso Soup", description: "Traditional soybean soup", price: 4.99, category: "appetizers", image: "https://images.pexels.com/photos/5085712/pexels-photo-5085712.jpeg?auto=compress&cs=tinysrgb&w=300" },
    { id: 6, restaurantId: 2, name: "Green Tea Ice Cream", description: "Creamy matcha dessert", price: 5.99, category: "desserts", image: "https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=300" },
    
    // Burger Palace
    { id: 7, restaurantId: 3, name: "Classic Burger", description: "Beef patty, lettuce, tomato, cheese", price: 11.99, category: "mains", image: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=300" },
    { id: 8, restaurantId: 3, name: "Buffalo Wings", description: "Spicy chicken wings with blue cheese", price: 8.99, category: "appetizers", image: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=300" },
    { id: 9, restaurantId: 3, name: "Chocolate Shake", description: "Rich chocolate milkshake", price: 4.99, category: "drinks", image: "https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=300" }
];

let cart = [];
let currentRestaurant = null;

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    renderFeaturedRestaurants();
    renderAllRestaurants();
    setupEventListeners();
    loadCartFromStorage();
});

// Event Listeners
function setupEventListeners() {
    // Navigation
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Cart
    cartBtn.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    
    // Filters
    document.getElementById('cuisine-filter').addEventListener('change', filterRestaurants);
    document.getElementById('rating-filter').addEventListener('change', filterRestaurants);
    
    // Search
    document.getElementById('search-input').addEventListener('input', searchRestaurants);
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function toggleCart() {
    cartSidebar.classList.toggle('open');
}

// Render Functions
function renderFeaturedRestaurants() {
    const featuredGrid = document.getElementById('featured-grid');
    const featuredRestaurants = restaurants.filter(r => r.featured);
    
    featuredGrid.innerHTML = featuredRestaurants.map(restaurant => `
        <div class="restaurant-card" onclick="openMenu(${restaurant.id})">
            <img src="${restaurant.image}" alt="${restaurant.name}">
            <div class="card-content">
                <div class="card-header">
                    <div>
                        <h3>${restaurant.name}</h3>
                        <span class="cuisine">${restaurant.cuisine}</span>
                    </div>
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        ${restaurant.rating}
                    </div>
                </div>
                <div class="card-info">
                    <div class="delivery-time">
                        <i class="fas fa-clock"></i>
                        ${restaurant.deliveryTime}
                    </div>
                    <div class="delivery-fee">$${restaurant.deliveryFee}</div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderAllRestaurants(restaurantsToShow = restaurants) {
    const restaurantsGrid = document.getElementById('restaurants-grid');
    
    restaurantsGrid.innerHTML = restaurantsToShow.map(restaurant => `
        <div class="restaurant-card" onclick="openMenu(${restaurant.id})">
            <img src="${restaurant.image}" alt="${restaurant.name}">
            <div class="card-content">
                <div class="card-header">
                    <div>
                        <h3>${restaurant.name}</h3>
                        <span class="cuisine">${restaurant.cuisine}</span>
                    </div>
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        ${restaurant.rating}
                    </div>
                </div>
                <div class="card-info">
                    <div class="delivery-time">
                        <i class="fas fa-clock"></i>
                        ${restaurant.deliveryTime}
                    </div>
                    <div class="delivery-fee">$${restaurant.deliveryFee}</div>
                </div>
            </div>
        </div>
    `).join('');
}

function openMenu(restaurantId) {
    // Store restaurant info and redirect to menu page
    localStorage.setItem('selectedRestaurant', JSON.stringify(restaurants.find(r => r.id === restaurantId)));
    window.location.href = 'pages/menu.html';
}

// Cart Functions
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    const existingItem = cart.find(i => i.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    updateCartUI();
    saveCartToStorage();
    showNotification('Item added to cart!');
}

function removeFromCart(itemId) {
    const itemIndex = cart.findIndex(i => i.id === itemId);
    if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
    }
    updateCartUI();
    saveCartToStorage();
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const subtotal = document.getElementById('subtotal');
    const total = document.getElementById('total');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price}</p>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="removeFromCart(${item.id})">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="addToCart(${item.id})">+</button>
                </div>
            </div>
        `).join('');
    }
    
    // Update totals
    const subtotalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = currentRestaurant ? currentRestaurant.deliveryFee : 2.99;
    const totalAmount = subtotalAmount + deliveryFee;
    
    subtotal.textContent = `$${subtotalAmount.toFixed(2)}`;
    total.textContent = `$${totalAmount.toFixed(2)}`;
}

// Storage Functions
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Filter and Search Functions
function filterRestaurants() {
    const cuisineFilter = document.getElementById('cuisine-filter').value.toLowerCase();
    const ratingFilter = parseFloat(document.getElementById('rating-filter').value) || 0;
    
    let filtered = restaurants.filter(restaurant => {
        const cuisineMatch = !cuisineFilter || restaurant.cuisine.toLowerCase().includes(cuisineFilter);
        const ratingMatch = !ratingFilter || restaurant.rating >= ratingFilter;
        return cuisineMatch && ratingMatch;
    });
    
    renderAllRestaurants(filtered);
}

function searchRestaurants() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    if (!searchTerm) {
        renderAllRestaurants();
        return;
    }
    
    const filtered = restaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchTerm) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm)
    );
    
    renderAllRestaurants(filtered);
}

// Utility Functions
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification {
        animation: slideIn 0.3s ease;
    }
`;
document.head.appendChild(style);