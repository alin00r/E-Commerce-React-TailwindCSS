import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons';
import FeedContainer from '../../components/feed/FeedContainer';
import { addToCart } from '../../redux/reducers/cartSlice';

const HomePage = ({ language = 'en' }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const [offerProducts, setOfferProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getOffers = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await axios.get(
          'https://dummyjson.com/products?limit=30',
        );
        const products = response.data?.products || [];

        const offers = products
          .filter((product) => product.discountPercentage > 0)
          .slice(0, 8)
          .map((product) => ({
            id: product.id,
            title: product.title,
            brand: product.brand || 'Brand',
            rating: product.rating || 0,
            price: product.price,
            oldPrice:
              product.discountPercentage > 0
                ? product.price / (1 - product.discountPercentage / 100)
                : product.price,
            offer: `${product.discountPercentage.toFixed(0)}% OFF`,
            thumbnail: product.thumbnail,
          }));

        setOfferProducts(offers);
      } catch (fetchError) {
        console.error(fetchError);
        setError(
          language === 'ar'
            ? 'فشل تحميل العروض. حاول مرة اخرى.'
            : 'Failed to load offers. Please try again.',
        );
      } finally {
        setIsLoading(false);
      }
    };

    getOffers();
  }, [language]);

  const copy =
    language === 'ar'
      ? {
          welcome: 'مرحبا بك في متجرنا الالكتروني',
          hint: 'اكتشف المنتجات والعروض الخاصة من القائمة بالاعلى.',
          offersTitle: 'عروض خاصة',
          offersHint: 'منتجات مختارة بخصومات قوية لفترة محدودة.',
          addToCart: 'اضف الى السلة',
          loading: 'جاري تحميل العروض...',
        }
      : {
          welcome: 'Welcome to My E-commerce',
          hint: 'Hello! Browse products and discover special offers below.',
          offersTitle: 'Special Offers',
          offersHint: 'Selected products with limited-time discounts.',
          addToCart: 'Add to Cart',
          loading: 'Loading offers...',
        };

  return (
    <div className="bg-gray-100">
      <FeedContainer language={language} />

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-8">
        <section className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">{copy.welcome}</h1>
          <p className="mt-2 text-slate-600">{copy.hint}</p>
        </section>

        <section>
          <div className="mb-4">
            <h2 className="text-2xl font-extrabold text-slate-900">
              {copy.offersTitle}
            </h2>
            <p className="text-sm text-slate-600">{copy.offersHint}</p>
          </div>

          {isLoading && (
            <p className="mb-3 text-sm text-slate-600">{copy.loading}</p>
          )}
          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {offerProducts.map((product) => {
              const isInCart = cartItems.some((item) => item.id === product.id);

              return (
                <article
                  key={product.id}
                  className="cursor-pointer rounded-[26px] border border-emerald-200 bg-[#f9fcf9] p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  <div className="rounded-[20px] bg-gray-200 p-3">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-56 w-full object-contain"
                    />
                  </div>

                  <div className="p-3">
                    <p className="text-sm text-gray-500">{product.brand}</p>

                    <h3 className="mt-1 min-h-12 text-base font-extrabold uppercase text-slate-900">
                      {product.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-1 text-sm text-amber-400">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <FontAwesomeIcon
                          key={`${product.id}-star-${index}`}
                          icon={faStar}
                          className={
                            index < Math.round(product.rating)
                              ? 'opacity-100'
                              : 'opacity-30'
                          }
                        />
                      ))}
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-3xl font-extrabold text-teal-700">
                        {product.price.toFixed(0)} USD
                      </span>

                      <button
                        type="button"
                        aria-label={copy.addToCart}
                        disabled={isInCart}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-200 bg-emerald-100 text-teal-700 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-45"
                        onClick={(event) => {
                          event.stopPropagation();
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
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
