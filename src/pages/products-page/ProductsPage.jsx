import axios from 'axios';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons';
import { addToCart } from '../../redux/reducers/cartSlice';

const ProductsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 12;
  const totalPages = Math.max(1, Math.ceil(totalProducts / limit));

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const skip = (currentPage - 1) * limit;
        const response = await axios.get(
          `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
        );
        setProducts(response.data.products || []);
        setTotalProducts(response.data.total || 0);
      } catch (error) {
        console.error('Failed to load products:', error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, [currentPage]);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <p className="text-1xl font-bold mb-4">Welcome to shopping website... </p>
      {isLoading && (
        <p className="mb-3 text-sm font-medium text-gray-600">
          Loading products...
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {products.map((product) => {
          const isInCart = cartItems.some((item) => item.id === product.id);
          const originalPrice =
            product.discountPercentage > 0
              ? product.price / (1 - product.discountPercentage / 100)
              : product.price;

          return (
            <article
              key={product.id}
              className="cursor-pointer rounded-[26px] border border-emerald-200 bg-[#f9fcf9] p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <div className="rounded-[20px] bg-gray-200 p-3">
                <img
                  className="h-56 w-full object-contain"
                  src={product.thumbnail}
                  alt={product.title}
                />
              </div>

              <div className="p-3">
                <p className="text-sm text-gray-500">
                  {product.brand || 'Brand'}
                </p>

                <h2 className="mt-1 min-h-12 text-base font-extrabold uppercase text-slate-900">
                  {product.title}
                </h2>

                <div className="mt-2 flex items-center gap-1 text-sm text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FontAwesomeIcon
                      key={`${product.id}-star-${index}`}
                      icon={faStar}
                      className={
                        index < Math.round(product.rating || 0)
                          ? 'opacity-100'
                          : 'opacity-30'
                      }
                    />
                  ))}
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-3xl font-extrabold text-teal-700">
                      {product.price.toFixed(0)} USD
                    </span>
                    <span className="text-sm font-medium text-gray-400 line-through">
                      {originalPrice.toFixed(0)} USD
                    </span>
                  </div>

                  <button
                    type="button"
                    aria-label="Add to cart"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-200 bg-emerald-100 text-teal-700 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-40"
                    disabled={product.stock <= 0 || isInCart}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(
                        addToCart({
                          id: product.id,
                          title: product.title,
                          price: product.price,
                          thumbnail: product.thumbnail,
                        }),
                      );
                      navigate('/cart');
                    }}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </button>
                </div>

                <p
                  className={`mt-2 text-xs font-semibold ${
                    product.stock > 0 ? 'text-green-700' : 'text-red-600'
                  }`}
                >
                  {product.stock > 0
                    ? `In stock: ${product.stock}`
                    : 'Out of stock'}
                </p>
              </div>
            </article>
          );
        })}
      </div>
      <div className="mt-6 mx-auto flex w-fit flex-col items-center justify-center rounded-lg bg-white p-4 shadow sm:flex-row">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span className="text-sm font-semibold text-gray-800">
            Page {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
