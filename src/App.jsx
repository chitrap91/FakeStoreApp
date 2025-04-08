import { useEffect, useState } from 'react'

import './App.css'
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartModal from './components/CartModal';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);

  // Fetch products from API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((result) => setProducts(result))
      .catch((error) => console.log(error))
  }
    , []);


  // Add product to cart
  const addToCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      alert("Item already added to the cart");
    } else {
      product.quantity = 1;
      const cartCopy = [...cart, product]
      calculateCartQuantity(cartCopy);
      setCart(cartCopy);
    }
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const cartCopy = prevCart.filter((item) => item.id !== productId);
      calculateCartQuantity(cartCopy);
      return cartCopy;
    });
  };

  function calculateCartQuantity(allItemsInCart = []) {
    const totalItems = allItemsInCart.reduce((total, item) => {
      return total + item.quantity
    }, 0);
    setTotalProducts(totalItems)
  }

  // Change product quantity from cart
  const quantityChange = (type, productId) => {
    const copyCart = cart;
    const matchingItem = copyCart.find((item) => item.id === productId);

    if (type === "dec" && matchingItem.quantity > 1) {
      matchingItem.quantity = matchingItem.quantity - 1;
    } else if (type === "inc") {
      matchingItem.quantity = matchingItem.quantity + 1;
    }
    calculateCartQuantity(copyCart);
    setCart(copyCart);
  };

  const openCartModal = () => setIsModalOpen(true);

  // Close the cart modal
  const closeModal = () => setIsModalOpen(false);

  return (

    <div className="min-h-screen bg-gray-100 w-full" >

      <Header cartCount={totalProducts} openCartModal={openCartModal} />


      {/* //ProductCard */}
      <div className="p-4">
        <div className='grid grid-cols-1 sm:grid grid-cols-2 md:grid grid-cols-3 lg:grid-cols-4 xl: grid-cols-5'>

          {products.map((product) => (

            <ProductCard

              key={product.id}
              product={product}
              addToCart={addToCart}
              isInCart={cart.some((item) => item.id === product.id)} />


          ))}

        </div>

      </div>

      {isModalOpen && (
        <CartModal cart={cart} removeFromCart={removeFromCart} quantityChange={quantityChange} closeModal={closeModal} totalProducts={totalProducts} />
      )}
    </div>





  )
}

export default App
