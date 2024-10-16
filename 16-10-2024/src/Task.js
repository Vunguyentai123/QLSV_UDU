import React from "react";
import { motion } from "framer-motion";

function Task({ task, onComplete }) {
  return (
    <div className="flex items-center mb-2">
      <motion.button
        onClick={onComplete}
        className="w-8 h-8 rounded-full border-2 flex items-center justify-center mr-2"
        style={{ borderColor: task.color }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
      </motion.button>
      <div className="flex-grow">
        <span>{task.text}</span>
        <div className="text-sm text-gray-500">Deadline: {task.deadline}</div>
      </div>
    </div>
  );
}

export default Task;