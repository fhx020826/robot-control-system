'use client'

import { useState, useEffect } from "react";
import { ClipboardList, ChevronDown, ChevronUp, Info, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TaskPlanning() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isInfoExpanded, setIsInfoExpanded] = useState(true);
  const [highLevelInstruction, setHighLevelInstruction] = useState("");
  const [subtasks, setSubtasks] = useState<any[]>([]);
  const [visibleTasks, setVisibleTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("A");

  // 映射：将 1.jpg -> 对应的路径，2.jpg -> 对应的路径等
  const pathMapping: PathMapping = {
    "1.jpg": "/home/hxfeng/original_data/alfred/full_2.1.0/train/pick_and_place_simple-ToiletPaper-None-ToiletPaperHanger-417/trial_T20190908_185320_708158/raw_images/000000000.jpg",
    "2.jpg": "/home/hxfeng/original_data/alfred/full_2.1.0/train/pick_and_place_simple-ToiletPaper-None-ToiletPaperHanger-417/trial_T20190908_043859_833063/raw_images/000000000.jpg",
    "3.jpg": "/home/hxfeng/original_data/alfred/full_2.1.0/train/pick_and_place_simple-ToiletPaper-None-ToiletPaperHanger-417/trial_T20190908_043909_541721/raw_images/000000000.jpg",
    "4.jpg": "/home/hxfeng/original_data/alfred/full_2.1.0/train/pick_and_place_simple-HandTowel-None-CounterTop-416/trial_T20190909_045204_373695/raw_images/000000000.jpg",
    "5.jpg": "/home/hxfeng/original_data/alfred/full_2.1.0/train/pick_and_place_simple-HandTowel-None-CounterTop-416/trial_T20190909_045221_760575/raw_images/000000000.jpg",
    "6.jpg": "/home/hxfeng/original_data/alfred/full_2.1.0/train/pick_and_place_simple-HandTowel-None-CounterTop-416/trial_T20190909_045148_475019/raw_images/000000000.jpg",
    "7.jpg": "/home/hxfeng/original_data/images/7.jpg",
    "8.jpg": "/home/hxfeng/original_data/images/8.jpg",
    "9.jpg": "/home/hxfeng/original_data/images/9.jpg",
    "10.jpg": "/home/hxfeng/original_data/images/10.jpg",
  };

  // 从缓存中读取图片路径
  const [imagePath, setImagePath] = useState<string>(localStorage.getItem("imagePath") || "1.jpg");

  // 处理表单提交
  const handleSubmit = async () => {
    setVisibleTasks([]); // 清空已显示的任务
    setSubtasks([]); // 清空子任务
    setIsLoading(true); // 设置加载状态

    // 从缓存中获取图片路径，并映射为实际路径
    const mappedPath = pathMapping[imagePath];
    const response = await fetch("http://localhost:8000/plan/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        high_level_instruction: highLevelInstruction,
        vision_input: mappedPath, // 使用映射后的路径
      }),
    });

    const data = await response.json();
    setSubtasks(data.subtasks); // 设置新返回的任务
    setVisibleTasks([]); // 再次确保清空显示的任务
    setIsLoading(false); // 结束加载状态
  };

  useEffect(() => {
    if (subtasks.length > 0 && visibleTasks.length < subtasks.length) {
      const timer = setTimeout(() => {
        // 将返回的任务格式化为可显示的内容
        const formattedTasks = subtasks.map((task: string) => {
          const parsedTask = JSON.parse(task.replace(/'/g, '"')); // 转换单引号为双引号
          const action = parsedTask.api_name;
          const target = parsedTask.api_args.map((arg: any) => arg.value).join(", ");
          return `action：${action} ，target：${target}`;
        });
        setVisibleTasks((prev) => [...prev, formattedTasks[visibleTasks.length]]);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [subtasks, visibleTasks]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-blue-300 h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-blue-600">任务规划</h2>
        <button
          onClick={() => setIsInfoExpanded(!isInfoExpanded)}
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
          <Info className="mr-1" size={18} />
          {isInfoExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {isInfoExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm text-gray-600 mb-4"
          >
            <p>基于智能算法的任务规划系统，可自动分解复杂任务，生成最优执行方案，确保任务高效完成。</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center mb-4">
        <label className="mr-2 text-lg font-semibold">选择模型:</label>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-50 transition duration-300 ease-in-out shadow-md"
        >
          <option value="A">deepseek-r1-250120</option>
          <option value="B">doubao-1.5-vision-pro-32k-250115</option>
        </select>
      </div>

      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={highLevelInstruction}
          onChange={(e) => setHighLevelInstruction(e.target.value)}
          className="flex-grow p-2 bg-gray-100 border border-blue-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          placeholder="输入高级任务指令..."
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition-colors duration-200"
        >
          <Send size={18} className="mr-2" />
        </button>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center space-x-2 mt-4 mb-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <span className="text-blue-500 text-lg">正在规划任务...</span>
        </div>
      )}

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="flex-grow overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="space-y-4">
              {visibleTasks.map((task, index) => (
                <motion.div
                  key={index}
                  className="text-gray-700 p-2 bg-gray-50 rounded-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="font-bold mr-2">{index + 1}.</span>
                  {task}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
