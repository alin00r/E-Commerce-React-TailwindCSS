import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../../redux/reducers/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <main className="min-h-screen bg-[#f5f5f4] px-4 py-8 sm:px-8 sm:py-12">
      <section className="mx-auto w-full max-w-5xl">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <FontAwesomeIcon icon={faXmark} className="mb-4 text-6xl" />
            <p className="text-2xl font-semibold">Your cart is empty</p>
            <p className="mt-2 text-sm">Add some products to get started.</p>
          </div>
        ) : (
          <>
            <p className="mb-3 text-sm font-semibold text-gray-700">
              {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in cart
            </p>

            <div className="mb-3 hidden grid-cols-[1.7fr_0.9fr_0.5fr_0.5fr] text-sm font-semibold text-gray-500 md:grid">
              <p>Description</p>
              <p>Quantity</p>
              <p>Remove</p>
              <p>Price</p>
            </div>

            <ul className="divide-y divide-gray-200 border-y border-gray-200 bg-white">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="grid grid-cols-1 gap-4 p-4 sm:p-6 md:grid-cols-[1.7fr_0.9fr_0.5fr_0.5fr] md:items-center"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-20 w-20 rounded object-cover"
                    />
                    <p className="text-base font-bold text-gray-900">
                      {item.title}
                    </p>
                  </div>

                  <div>
                    <div className="inline-flex overflow-hidden rounded-md border border-gray-200">
                      <button
                        type="button"
                        className="h-10 w-10 bg-emerald-900 text-sm font-bold text-white"
                        aria-label="Increase quantity"
                        onClick={() => dispatch(increaseQuantity(item.id))}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                      <span className="flex h-10 w-10 items-center justify-center text-sm font-semibold text-gray-700">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="h-10 w-10 bg-gray-100 text-sm font-bold text-gray-500"
                        aria-label="Decrease quantity"
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50"
                      aria-label="Remove item"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>

                  <p className="text-2xl font-semibold text-gray-700">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex justify-end">
              <div className="w-full max-w-55 border border-gray-200 bg-white p-5">
                <div className="flex items-center justify-between">
                  <p className="text-base text-gray-500">Total</p>
                  <p className="text-3xl font-bold text-gray-700">
                    ${total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default CartPage;
