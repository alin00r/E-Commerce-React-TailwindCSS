import HeaderContainer from './components/header/HeaderContainer';
import { Route, Routes } from 'react-router';
import HomePage from './pages/home-page/HomePage';
import ProductsPage from './pages/products-page/ProductsPage';
import ProductDetails from './pages/product-details/ProductDetails';
import NotFound from './pages/not-found/NotFound';
import CartPage from './pages/cart-page/CartPage';
import { useContext } from 'react';
import { LanguageContext } from './context/languageContext';
import RegisterPage from './pages/register-page/RegisterPage';
import ContactPage from './pages/contact-page/ContactPage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div dir={direction} className="ltr:text-left rtl:text-right">
      <HeaderContainer language={language} setLanguage={setLanguage} />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage language={language} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
