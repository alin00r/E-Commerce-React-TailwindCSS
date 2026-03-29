import { NavLink } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const NavLinks = ({ language, setLanguage }) => {
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  const labels =
    language === 'ar'
      ? {
          home: 'الرئيسية',
          products: 'المنتجات',
          cart: 'السلة',
          register: 'تسجيل',
          contact: 'اتصل بنا',
        }
      : {
          home: 'Home',
          products: 'Products',
          cart: 'Cart',
          register: 'Register',
          contact: 'Contact Us',
        };

  const linkClassName = ({ isActive }) =>
    `${isActive ? 'bg-blue-500 text-white' : 'text-white-700 hover:bg-gray-200'} rounded-md px-3 py-2 text-sm font-medium`;

  return (
    <nav className="flex items-center gap-2 ltr:flex-row rtl:flex-row-reverse">
      <NavLink className={linkClassName} to="/register">
        {labels.register}
      </NavLink>
      <NavLink className={linkClassName} to="/">
        {labels.home}
      </NavLink>
      <NavLink className={linkClassName} to="/products">
        {labels.products}
      </NavLink>
      <NavLink className={linkClassName} to="/contact">
        {labels.contact}
      </NavLink>
      <NavLink className={linkClassName} to="/cart">
        <span className="relative inline-flex items-center gap-1">
          <FontAwesomeIcon icon={faShoppingCart} />
          {cartCount > 0 && (
            <span className="absolute -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white ltr:-right-3 rtl:-left-3">
              {cartCount}
            </span>
          )}
        </span>
        <span className="ltr:ml-4 rtl:mr-4">{labels.cart}</span>
      </NavLink>

      <label className="sr-only" htmlFor="language-select">
        Select language
      </label>
      <select
        id="language-select"
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
        className="rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 outline-none"
      >
        <option value="en">EN</option>
        <option value="ar">AR</option>
      </select>
    </nav>
  );
};

export default NavLinks;
