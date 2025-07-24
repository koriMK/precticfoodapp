import { createContext, useState } from 'react'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [user, setUser] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [orders, setOrders] = useState([])

  const categories = [
    { id: 1, name: 'Fast Food', icon: 'category-food' },
    { id: 2, name: 'Drinks', icon: 'category-drink' },
    { id: 3, name: 'Groceries', icon: 'category-grocery' },
    { id: 4, name: 'Desserts', icon: 'category-dessert' },
    { id: 5, name: 'Asian', icon: 'category-food' },
    { id: 6, name: 'Italian', icon: 'category-food' },
  ]

  const restaurants = [
    {
      id: 1,
      name: 'Burger Palace',
      image: '/burger.jpg',
      rating: 4.5,
      deliveryTime: '20-30 min',
      minOrder: '$10',
      categories: [1],
    },
    {
      id: 2,
      name: 'Pizza Heaven',
      image: '/pizza.jpg',
      rating: 4.2,
      deliveryTime: '25-35 min',
      minOrder: '$15',
      categories: [1, 6],
    },
    {
      id: 3,
      name: 'Sushi World',
      image: '/sushi.jpg',
      rating: 4.7,
      deliveryTime: '30-40 min',
      minOrder: '$20',
      categories: [5],
    },
    {
      id: 4,
      name: 'Sweet Dreams',
      image: '/dessert.jpg',
      rating: 4.3,
      deliveryTime: '15-25 min',
      minOrder: '$8',
      categories: [4],
    },
  ]

  const menuItems = {
    1: [
      {
        id: 101,
        name: 'Classic Burger',
        description: 'Beef patty with lettuce, tomato, and special sauce',
        price: 8.99,
        category: 'Mains',
      },
      {
        id: 102,
        name: 'Cheeseburger',
        description: 'Classic burger with American cheese',
        price: 9.99,
        category: 'Mains',
      },
      {
        id: 103,
        name: 'Bacon Burger',
        description: 'Classic burger with crispy bacon',
        price: 10.99,
        category: 'Mains',
      },
      {
        id: 104,
        name: 'French Fries',
        description: 'Crispy golden fries with sea salt',
        price: 3.99,
        category: 'Sides',
      },
      {
        id: 105,
        name: 'Chocolate Shake',
        description: 'Creamy chocolate milkshake',
        price: 4.99,
        category: 'Drinks',
      },
    ],
    2: [
      {
        id: 201,
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce and mozzarella',
        price: 12.99,
        category: 'Mains',
      },
      {
        id: 202,
        name: 'Pepperoni Pizza',
        description: 'Margherita pizza with pepperoni',
        price: 14.99,
        category: 'Mains',
      },
      {
        id: 203,
        name: 'Garlic Bread',
        description: 'Toasted bread with garlic butter',
        price: 5.99,
        category: 'Sides',
      },
      {
        id: 204,
        name: 'Tiramisu',
        description: 'Classic Italian dessert',
        price: 6.99,
        category: 'Desserts',
      },
    ],
    3: [
      {
        id: 301,
        name: 'California Roll',
        description: 'Crab, avocado and cucumber',
        price: 8.99,
        category: 'Mains',
      },
      {
        id: 302,
        name: 'Spicy Tuna Roll',
        description: 'Tuna with spicy mayo',
        price: 9.99,
        category: 'Mains',
      },
      {
        id: 303,
        name: 'Miso Soup',
        description: 'Traditional Japanese soup',
        price: 3.99,
        category: 'Sides',
      },
      {
        id: 304,
        name: 'Green Tea Ice Cream',
        description: 'Refreshing green tea flavor',
        price: 5.99,
        category: 'Desserts',
      },
    ],
    4: [
      {
        id: 401,
        name: 'Chocolate Cake',
        description: 'Rich chocolate cake with fudge icing',
        price: 6.99,
        category: 'Desserts',
      },
      {
        id: 402,
        name: 'Cheesecake',
        description: 'New York style cheesecake',
        price: 7.99,
        category: 'Desserts',
      },
      {
        id: 403,
        name: 'Ice Cream Sundae',
        description: 'Vanilla ice cream with toppings',
        price: 5.99,
        category: 'Desserts',
      },
      {
        id: 404,
        name: 'Coffee',
        description: 'Freshly brewed coffee',
        price: 2.99,
        category: 'Drinks',
      },
    ],
  }

  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  const deliveryFee = cartTotal > 0 ? 2.99 : 0
  const orderTotal = cartTotal + deliveryFee

    // Add to cart function
  const addToCart = (item, restaurantId) => {
    if (cartItems.length > 0 && cartItems[0].restaurantId !== restaurantId) {
      if (window.confirm('Your cart contains items from another restaurant. Would you like to clear your cart and add this item?')) {
        setCartItems([{ ...item, restaurantId, quantity: 1 }])
      }
      return
    }

    const existingItem = cartItems.find(cartItem => cartItem.id === item.id)
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ))
    } else {
      setCartItems([...cartItems, { ...item, restaurantId, quantity: 1 }])
    }
    setShowCart(true)
  }

  // Remove from cart function
  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId))
  }

  // Update quantity function
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId)
      return
    }
    setCartItems(cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ))
  }

  // Handle login
  const handleLogin = (email, password) => {
    setUser({ email, name: 'John Doe' })
    setShowLoginModal(false)
  }

  // Handle logout
  const handleLogout = () => {
    setUser(null)
  }

  // Handle checkout
  const handleCheckout = (address, paymentMethod) => {
    const newOrder = {
      id: Date.now(),
      items: [...cartItems],
      total: orderTotal,
      address,
      paymentMethod,
      status: 'preparing',
      restaurant: restaurants.find(r => r.id === cartItems[0]?.restaurantId),
      date: new Date().toISOString(),
    }
    setOrders([...orders, newOrder])
    setCartItems([])
    setShowCart(false)
    setCurrentPage('dashboard')
  }

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedRestaurant,
        setSelectedRestaurant,
        cartItems,
        setCartItems,
        user,
        setUser,
        showLoginModal,
        setShowLoginModal,
        showCart,
        setShowCart,
        orders,
        setOrders,
        categories,
        restaurants,
        menuItems,
        cartTotal,
        deliveryFee,
        orderTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        handleLogin,
        handleLogout,
        handleCheckout,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}