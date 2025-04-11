'use client'
import { useState, useEffect } from 'react'
import { Camera, Radio, Info, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SensorDisplay() {
  const [isInfoExpanded, setIsInfoExpanded] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0) // 维护选中的图片索引
  const [selectedImagePath, setSelectedImagePath] = useState('1.jpg') // 缓存选中的图片路径
  const imageList = [ // 图片列表，包含10张图片的相对路径
    '1.jpg', '2.jpg', '3.jpg', '4.jpg',
    '5.jpg', '6.jpg', '7.jpg', '8.jpg',
    '9.jpg', '10.jpg'
  ];
  const imageDescriptions = [
    '厕所1', '厕所2', '厕所3', '厕所4', '厕所5', '厕所6','厨房','书房','客厅','野餐'
  ];
  // 组件加载时检查缓存
  useEffect(() => {
    const cachedImagePath = localStorage.getItem("imagePath"); // 从localStorage获取缓存的图片路径
    if (cachedImagePath) {
      setSelectedImagePath(cachedImagePath); // 设置为缓存的图片路径
      const cachedImageIndex = imageList.indexOf(cachedImagePath);
      setSelectedImageIndex(cachedImageIndex); // 设置为缓存的图片索引
    } else {
      setSelectedImagePath("1.jpg"); // 如果没有缓存，则设置默认值
    }
  }, []);

  // 选择图片后更新摄像头显示的图片，并更新缓存
  const handleImageChange = (event) => {
    const index = parseInt(event.target.value, 10); // 确保转换为数字
    setSelectedImageIndex(index);
    setSelectedImagePath(imageList[index]); // 更新缓存
  
    // 保存图片路径到localStorage
    localStorage.setItem("imagePath", imageList[index]);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-blue-300 h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-blue-600 flex-grow">传感器信息</h2>
      </div>

      <AnimatePresence>
        {isInfoExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm text-gray-600 mb-4"
          >
            <p>实时显示机器人的视觉和激光雷达数据，提供环境感知和状态监控，支持高精度的环境建模和导航定位。</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 flex-grow overflow-hidden">
        <div className="col-span-1 md:col-span-2 h-full flex flex-col">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-semibold text-blue-500 flex-grow">
              <Camera className="mr-2" size={20} />
              摄像头画面
            </h3>
            {/* 图片选择下拉框放在标题旁边 */}
            <select
              value={selectedImageIndex}
              onChange={handleImageChange}
              className="p-2 border border-blue-300 rounded-md ml-4"
            >
              {imageList.map((image, index) => (
                <option key={index} value={index}>
                  {imageDescriptions[index]} {/* 显示描述 */}
                </option>
              ))}
            </select>
          </div>

          <div className="relative flex-grow overflow-hidden">
            {/* 根据选中的索引显示对应的图片 */}
            <img
              src={selectedImagePath} // 显示选中的图片
              alt="摄像头画面"
              className="border border-blue-300 rounded-md w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="col-span-1 h-full flex flex-col">
          <h3 className="text-lg font-semibold mb-2 flex items-center text-blue-500">
            <Radio className="mr-2" size={20} />
            激光雷达数据
          </h3>
          <div className="relative flex-grow overflow-hidden">
            <img
              src="2.png" // 这里也可以用同样的图片，或者其他图片，展示雷达数据
              alt="激光雷达数据"
              className="border border-blue-300 rounded-md w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
