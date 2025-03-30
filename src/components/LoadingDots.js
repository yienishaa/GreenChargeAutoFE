import { motion } from 'framer-motion';

const LoadingDots = () => {
  const dots = [1, 2, 3]; // Array to represent the dots

  return (
    <div className="flex space-x-1">
      {dots.map((dot, index) => (
        <motion.div
          key={index}
          className="w-2 h-2 bg-lime-600 rounded-full"
          animate={{ y: [2.5, -2.5, 2.5] }} // Bouncing effect
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "loop",
            delay: index * 0.1, // Stagger the animation
          }}
        />
      ))}
    </div>
  );
};

export default LoadingDots;