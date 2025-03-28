import { Link } from "react-router-dom";

export default function CategoryCard({ image, category }) {
  return (
    <div className="relative aspect-[3/2]">
      <img src={image} className="object-cover rounded-xl h-full" width={1500} height={1500} alt={`${category}`} />
      <Link to={`/vehicles?type=${String(category).toLowerCase()}`}>
        <button className="absolute bottom-4 left-4 bg-white px-8 py-2 text-green-700 rounded-full hover:brightness-75">
          <h1>{category}</h1>
        </button>
      </Link>
    </div>
  );
}
