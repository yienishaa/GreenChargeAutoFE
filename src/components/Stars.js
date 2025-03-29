import { Star, StarBorder } from "@mui/icons-material";

export default function Stars({ rating }) {
  return (
    <div className="text-yellow-500">
      {Array.from({ length: Math.floor(rating) }, (_, index) => (
        <Star key={index} />
      ))}
      {Array.from({ length: 5 - Math.floor(rating) }, (_, index) => (
        <StarBorder key={index} />
      ))}
    </div>
  );
}
