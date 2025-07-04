import { useState, useEffect } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"

function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart")
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(db)
  const [cart,setCart] =  useState([])
  const MIN_ITEM = 1

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  //funcion agrega al carrito
  function addToCart(item){
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id)
    if(itemExists >= 0){
      // console.log("ya existe")
      const updateCart = [...cart]
      updateCart[itemExists].quantity++
      setCart(updateCart)
    }else{
      // console.log("no existe")
      item.quantity = 1
      setCart([...cart, item])
    }

  }

  //elimina item del carrito
  function removeCart(id){
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  //incrementar cantidad del item
  function increaseQuantity(id){
    const updateCart = cart.map(item => {
      if (item.id === id) {
        return{
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updateCart)
  }
  //decrementar cantidad del item
  function decreaseQuantity(id){
    const updateCart = cart.map(item => {
      if (item.id === id && item.quantity > MIN_ITEM) {
        return{
          ...item,
          quantity: item.quantity - 1
          }
        
      }
      return item
    })
    setCart(updateCart)
  }
  // Vaciar CArrito
  function clearCart(){
    setCart([])
  }


 
  return (
    <>
    <Header 
      cart = {cart}
      removeCart = {removeCart}
      increaseQuantity = {increaseQuantity}
      decreaseQuantity = {decreaseQuantity}
      clearCart = {clearCart}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar)=>(
            <Guitar 
              key={guitar.id}
              guitar={guitar}
              setCart = {setCart}
              addToCart={addToCart}
            />

          ))}
            
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
