import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const DeveloperCard = ({ currentDeveloper, direction, onSwipe }) => {
  return  (
    <div className="w-full flex items-center  flex-grow justify-center">
      <AnimatePresence>
        {currentDeveloper && (
          <motion.div
            key={currentDeveloper?._id}
            initial={{ x: direction === "right" ? -300 : 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction === "right" ? 300 : -300, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 25,
            }}
            drag="x"
            dragConstraints={{ left: -200, right: 200 }}
            dragElastic={0.5}
            onDragEnd={(event, info) => {
              if (info.offset.x > 150) {
                onSwipe("right"); // Swipe right callback
              } else if (info.offset.x < -150) {
                onSwipe("left"); // Swipe left callback
              }
            }}
            className="rounded-2xl bg-slate-300 shadow-xl cursor-grab active:cursor-grabbing"
            style={{
              width: "350px", // Fixed width
              height: "550px", // Fixed height
            }}
          >
            <div className="p-6 py-12 space-y-4 h-full flex flex-col">
              <div className="flex flex-col items-center">
                <img
                  src={currentDeveloper?.photoUrl || "/placeholder.svg"}
                  alt={currentDeveloper?.firstName}
                  className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg"
                />
                <h2 className="mt-4 text-2xl font-bold text-gray-800">
                  {currentDeveloper?.firstName} {currentDeveloper?.lastName}
                </h2>
                <p className="text-gray-600">{currentDeveloper?.profession}</p>
                <p className="text-gray-600 text-sm">
                  {currentDeveloper?.gender}, {currentDeveloper?.age}
                </p>
              </div>
              <p className="text-center text-xs md:text-sm text-gray-700 flex-grow overflow-hidden overflow-y-auto max-h-40 scrollbar-hide">
                {currentDeveloper?.about}
              </p>

              <div className="flex flex-wrap justify-center gap-2">
                {currentDeveloper?.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeveloperCard;
