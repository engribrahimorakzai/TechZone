// import react, { useEffect, useState } from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Home from './pages/Home'
// import Cart from './pages/Cart'
// import Contact from './pages/Contact'
// import About from './pages/About'
// import Products from './pages/Products'
// import Navbar from './components/Navbar'
// import axios from 'axios'
// import Footer from './components/Footer'
// import SingleProduct from './pages/SingleProduct'
// const App = () => { 
// const [location ,setLoaction]=useState()
// // const [openDropdown, setOpenDropdown] = useState(false)
// const [openDropdown, setOpcenDropdown] = useState(false)   // FIX: onst -> const

//    const getLoction = async ()=>{
//     setOpcenDropdown(false)   // FIX: click par foran close ho jaye
//     navigator.geolocation.getCurrentPosition( async(  pos)=>{
//       const { latitude, longitude } = pos.coords
//       console.log(latitude, longitude)
//      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
//       try {
//         const location=await axios.get(url)
//         const extractedLocation=location.data.address
//         setLoaction(extractedLocation)
//         setOpcenDropdown(false)
//       } catch (error) {
//         console.log(error)
//       }
//     },
//     (err) => {                // FIX: permission deny / error ka pata chalega
//       console.log('Location error:', err.message)
//     }
//     )
//   }
//   useEffect(()=>{
//     getLoction()
//   },[]) 
//   return (
//     <BrowserRouter>
//     <Navbar location ={location} getLoction ={getLoction} openDropdown={openDropdown} setOpcenDropdown={setOpcenDropdown}/>
//       <Routes>
//         <Route path='/' element={<Home />}></Route>
//         <Route path='/products' element={<Products />}></Route>
//         <Route path='product/:id' element={<SingleProduct />}></Route>
//         <Route path='category/:category' ></Route>
//         <Route path='/about' element={<About />}></Route>
//         <Route path='/contact' element={<Contact />}></Route>
//         <Route path='/cart' element={<Cart />}></Route>
//       </Routes>
//       <Footer/>
//     </BrowserRouter>
//   )
// }
// export default App



import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import SingleProduct from './pages/SingleProduct'
import CategoryProducts from './pages/CategoryProducts'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'

const App = () => {
  const [location, setLocation] = useState()
  const [openDropdown, setOpcenDropdown] = useState(false)

  const getLoction = () => {
    setOpcenDropdown(false)

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        try {
          const res = await axios.get(url)
          setLocation(res.data.address)
        } catch (error) {
          console.log(error)
        }
      },
      (err) => {
        console.log('Location error:', err.message)
      }
    )
  }

  useEffect(() => {
    getLoction()
  }, [])

  return (
    <BrowserRouter>
      <Navbar
        location={location}
        getLoction={getLoction}
        openDropdown={openDropdown}
        setOpcenDropdown={setOpcenDropdown}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/category/:category" element={<CategoryProducts />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/cart"
          element={<Cart location={location} getLocation={getLoction} />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App