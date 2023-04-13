import { Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import MainBody from "./components/main/main-body";
import Blog from "./components/blog/Blog";
import About from "./components/home/about";
import Contact from "./components/home/contact";
import Success from "./components/success/success"
import CheckoutPage from "./components/PageCheckout/CheckoutPage"
import Payment from "./components/payment/payment";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<MainBody />} />
        <Route path="/blog/:params" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element ={<Contact />} />
        <Route path="/address/success" element ={<Success />} />
        <Route path="/checkout" element ={<CheckoutPage />} />
        <Route path="/payment" element ={<Payment />} />
        <Route path="/success" element ={<Success />} />
      </Routes>
    </div>
  );
}

export default App;
