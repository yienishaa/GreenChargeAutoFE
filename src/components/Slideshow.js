import { motion, AnimatePresence } from "motion/react";
import placeholder from "../images/placeholder.png";
import { useState, useEffect, useCallback } from "react";
import { Speed, CarCrash, NoCrash, ArrowOutward } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Slideshow({ featA, featB, featC, featD }) {
  const feats = [featA, featB, featC, featD];
  const [featNum, setFeatNum] = useState(0);
  const nextFeat = useCallback(() => {
    setFeatNum((featNum + 1) % feats.length);
  }, [featNum, feats.length]);

  useEffect(() => {
    const interval = setInterval(nextFeat, 7000);
    return () => clearInterval(interval);
  }, [nextFeat]);
  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={featNum}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ mode: "tween", duration: 0.5 }}
          layout
        >
          <img
            src={`https://greencharge-catalog.s3.us-east-1.amazonaws.com/${feats[featNum].image}` || placeholder}
            width={1920}
            height={1080}
            alt={feats[featNum].brand + " " + feats[featNum].model}
            className="object-cover aspect-video"
          />
          <div className="absolute inset-0 bg-lime-700 opacity-60" />
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        <motion.div
          className="absolute left-64 top-1/2 text-white space-y-10"
          key={featNum}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ mode: "tween", duration: 0.5 }}
          layout
        >
          {feats[featNum].hotDeal && (
            <div className="rounded-full absolute bg-gradient-to-br from-orange-600 to-red-600 text-white px-5 py-3 -top-5 hover:bg-gradient-to-tl transition-all">
              Hot Deal!
            </div>
          )}
          <div>
            <h2 className="text-3xl ">{feats[featNum].manufacturedYear}</h2>
            <h1 className="text-7xl ">
              {feats[featNum].brand} {feats[featNum].model}
            </h1>
          </div>
          <h2 className="text-4xl">
            $
            {feats[featNum].price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h2>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence method="wait">
        <motion.div
          key={featNum}
          className="flex flex-col text-white space-y-10 bg-lime-300/50 absolute right-32 rounded-xl p-10 top-1/3 min-w-64 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ mode: "tween", duration: 0.5 }}
          layout
        >
          <span className="space-y-2">
            <Speed sx={{ fontSize: "64px" }} />
            <motion.h2
              className="text-xl"
              key={featNum}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 25 }}
              transition={{ mode: "tween", duration: 0.25, delay: 0.6 }}
            >
              {feats[featNum].mileage.toLocaleString()} km
            </motion.h2>
          </span>
          <span className="space-y-2">
            {feats[featNum].hasBeenInAccident ? (
              <CarCrash sx={{ fontSize: "64px" }} />
            ) : (
              <NoCrash sx={{ fontSize: "64px" }} />
            )}
            <motion.h2
              className="text-xl"
              key={featNum}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 25 }}
              transition={{ mode: "tween", duration: 0.25, delay: 0.7 }}
            >
              {feats[featNum].hasBeenInAccident
                ? "Accident Recorded"
                : "No Accidents"}
            </motion.h2>
          </span>
          <Link
            to={`/vehicles/${feats[featNum].vid}`}
            className="flex justify-center items-center text-xl bg-lime-800 py-3 rounded-xl px-2 border-2 border-green-600 hover:brightness-90"
          >
            Learn More{" "}
            <ArrowOutward sx={{ fontSize: "28px" }} className="ml-2" />
          </Link>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-10 left-64 flex space-x-2">
        {Array.from({ length: feats.length }).map((_, index) => (
          <button
            onClick={() => setFeatNum(index)}
            key={index}
            className={`${
              index === featNum ? "w-12" : "w-5"
            } transition-all rounded-full h-2 bg-white duration-500 ease-in-out`}
          />
        ))}
      </div>
    </div>
  );
}
