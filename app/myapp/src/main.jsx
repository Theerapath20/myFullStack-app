import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from './pages/backOffice/SignIn.jsx';
import Home from './pages/backOffice/Home.jsx';
import Product from './pages/backOffice/Product.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<Product />} />
         </Routes>
    </Router>
  );

