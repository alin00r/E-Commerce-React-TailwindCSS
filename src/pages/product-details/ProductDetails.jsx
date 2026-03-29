import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import RatingComponents from '../products-page/RatingComponents';
import { addToCart } from '../../redux/reducers/cartSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`,
        );
        if (!response.data) {
          throw new Error('Unable to load product details.');
        }

        const productData = await response.data;
        setProduct(productData);
        setQuantity(1);
      } catch (fetchError) {
        console.error(fetchError.message || 'Something went wrong.');
      }
    };
    getProductDetails();
  }, [id]);

  if (!product) {
    return (
      <p className="p-6 text-lg text-gray-700 text-center">
        PRODUCT NOT FOUND 404!
      </p>
    );
  }

  const imageList = product.images?.length
    ? product.images
    : [product.thumbnail];

  const previousPrice =
    product.discountPercentage > 0
      ? product.price / (1 - product.discountPercentage / 100)
      : product.price;

  const isInCart = cartItems.some((item) => item.id === product.id);

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-6xl rounded-xl bg-white p-5 shadow-md md:p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <div className="rounded-lg bg-gray-100 p-4">
              <img
                className="h-90 w-full object-contain"
                src={product.thumbnail || imageList[0]}
                alt={product.title}
              />
            </div>

            <div className="mt-4 flex gap-3 overflow-x-auto">
              {imageList.slice(0, 6).map((imageUrl, index) => (
                <div
                  key={imageUrl}
                  className={`h-16 w-16 shrink-0 overflow-hidden rounded-md border ${index === 0 ? 'border-green-600' : 'border-gray-300'}`}
                >
                  <img
                    src={imageUrl}
                    alt={`${product.title} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>
            <p className="mt-2 text-sm text-gray-600">{product.description}</p>

            <RatingComponents product={product} />

            <div className="mt-5 border-y border-gray-200 py-5">
              <p className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
                <span className="ml-2 text-base font-medium text-gray-500">
                  or ${(product.price / 12).toFixed(2)}/month
                </span>
              </p>

              <div className="mt-2 flex items-center gap-3 text-sm">
                <span className="text-gray-500 line-through">
                  ${previousPrice.toFixed(2)}
                </span>
                <span className="rounded bg-green-100 px-2 py-1 font-semibold text-green-700">
                  {product.discountPercentage.toFixed(0)}% OFF
                </span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded bg-gray-100 px-3 py-1 text-gray-700">
                Category: {product.category}
              </span>
              <span className="rounded bg-gray-100 px-3 py-1 text-gray-700">
                Brand: {product.brand}
              </span>
            </div>

            <p className="mt-4 text-sm font-semibold text-orange-600">
              Only {product.stock} items left. Don&apos;t miss it.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center rounded-full border border-gray-300 px-2 py-1">
                <button
                  type="button"
                  className="px-3 text-lg"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                >
                  -
                </button>
                <span className="min-w-8 text-center text-sm font-medium">
                  {quantity}
                </span>
                <button
                  type="button"
                  className="px-3 text-lg"
                  onClick={() => setQuantity((current) => current + 1)}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="rounded-full bg-emerald-700 px-6 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
                onClick={() =>
                  console.log('Buy now:', product.title, 'qty:', quantity)
                }
              >
                Buy Now
              </button>

              <button
                type="button"
                className="rounded-full border border-emerald-700 px-6 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
                disabled={isInCart || product.stock <= 0}
                onClick={() => {
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
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
