import { useNavigate } from 'react-router';

function FeedContainer({ language = 'en' }) {
  const navigate = useNavigate();

  const copy =
    language === 'ar'
      ? {
          trade: 'عرض الاستبدال',
          title: 'عروض قوية جدا',
          subtitle: 'على كل المنتجات',
          desc: 'وفر اكثر مع الكوبونات وخصومات حتى 70%',
          cta: 'تسوق الان',
        }
      : {
          trade: 'Trade-in-offer',
          title: 'Super value deals',
          subtitle: 'On all products',
          desc: 'Save more with coupons & up to 70% off!',
          cta: 'Shop Now',
        };

  return (
    <section
      className="relative min-h-[72vh] w-full overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(225, 236, 244, 0.88) 0%, rgba(225, 236, 244, 0.78) 38%, rgba(225, 236, 244, 0.24) 62%, rgba(225, 236, 244, 0.1) 100%), url('https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1800&q=80')",
      }}
      aria-label="Promotional banner"
    >
      <div className="mx-auto flex min-h-[72vh] w-full  items-center px-6 py-16 sm:px-10 lg:px-16">
        <div className=" space-y-5 text-slate-900">
          <p className="text-xl font-semibold tracking-tight sm:text-2xl">
            {copy.trade}
          </p>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {copy.title}
            <span className="mt-1 block text-teal-700">{copy.subtitle}</span>
          </h1>

          <p className="text-base text-slate-700 sm:text-lg">{copy.desc}</p>

          <button
            type="button"
            className="mt-4 inline-flex h-14  items-center justify-center rounded-md bg-white px-8 text-lg font-bold text-teal-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100  focus-visible:outline-offset-2 focus-visible:outline-teal-700"
            onClick={() => navigate('/products')}
          >
            {copy.cta}
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeedContainer;
