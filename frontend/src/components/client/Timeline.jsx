import React from "react";
import { motion } from "framer-motion";

const timelineData = [
  {
    year: "2025",
    title: "Started Masters in Computer Science",
    description:
      "Began pursuing my Master's degree in Computer Science with focus on AI and Fullstack Development.",
  },
  {
    year: "2024",
    title: "Built Task Manager Dashboard",
    description:
      "Developed a task management app with React, Node.js, and MongoDB, featuring charts, modals, and authentication.",
  },
  {
    year: "2023",
    title: "Internship as Web Developer",
    description:
      "Worked as a web developer intern, building e-commerce sites with React and Next.js.",
  },
  {
    year: "2022",
    title: "Started Learning Programming",
    description:
      "Began learning programming seriously — started with HTML, CSS, JavaScript, then moved into React and Node.js.",
  },
];

const TimelineItem = ({ item, index }) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.2,
      }}
      className="mb-12 w-full flex justify-center relative"
    >
      <div
        className={`flex flex-col md:flex-row items-center w-full ${
          isLeft ? "md:justify-start" : "md:justify-end"
        }`}
      >
        <div
          className={`md:w-1/2 relative ${
            isLeft ? "md:pr-8 text-right" : "md:pl-8 text-left"
          }`}
        >
          <div
            className={`absolute top-1/2 transform -translate-y-1/2 ${
              isLeft ? "right-0" : "left-0"
            } w-4 h-4 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full border-2 border-white`}
          ></div>

          <div className="bg-[#1A1F2B] p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300">
            <h3 className="text-xl font-bold text-gradient bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {item.year} — {item.title}
            </h3>
            <p className="mt-2 text-gray-300">{item.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Timeline = () => {
  return (
    <section className="py-16 bg-[#0B1120] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-16">🚀 My Journey</h2>

        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>

          {/* Timeline Items */}
          {timelineData.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
