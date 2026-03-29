const renderStars = (rating) => {
  const fullStars = Math.max(0, Math.min(5, Math.round(rating)));
  return `${'★'.repeat(fullStars)}${'☆'.repeat(5 - fullStars)}`;
};

function RatingComponents({ product }) {
  return (
    <div className="mt-3 flex items-center gap-2">
      <p className="mb-2 text-sm text-red-500">{renderStars(product.rating)}</p>
      <span className="text-sm text-gray-700">
        {product.rating?.toFixed(1)} / 5
      </span>
    </div>
  );
}

export default RatingComponents;
