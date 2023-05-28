import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CustomNavbar } from "./components/Navbar";
import { Shop } from './pages/shop/shop';

import { Cart } from './pages/cart/cart';
import { ItemListContainer } from "./components/ItemListContainer"
import { AccessoryDetail } from "./components/accessoryDetail";
import { Category } from "./components/Category";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Footer } from "./components/footer";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcL0i-h4nteYmPsUTQqNN1ESI6O7LNQ88",
  authDomain: "gaming-spot-d901c.firebaseapp.com",
  projectId: "gaming-spot-d901c",
  storageBucket: "gaming-spot-d901c.appspot.com",
  messagingSenderId: "618952519194",
  appId: "1:618952519194:web:47bb6ea3f537c7af526ba3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


function App() {
  return (
    <div className="App">
      <Router>
        <CustomNavbar />
        <ItemListContainer greeting={'Welcome to your Gaming Spot'}/>
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/:productCategory" element={<Category />} />
          <Route path="/:productCategory/:productId" element={<AccessoryDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        
      </Router>
      <ToastContainer />
      <Footer/>
    </div>
  );
}

export default App;

