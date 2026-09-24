import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import { setProducts } from "./redux/productSlice";
import { Products } from "./assets/Products";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProducts(Products));
  }, [dispatch]);

  return (
    <BrowserRouter>
      {/* Shows small pop-up messages (replaces alert()) */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style: { borderRadius: "12px", fontSize: "14px" },
        }}
      />

      <Navbar />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;