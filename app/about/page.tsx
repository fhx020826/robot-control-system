'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserCircle, Building, Cpu } from 'lucide-react'

export default function AboutPage() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="space-y-8">
      <motion.h1 
        className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        关于机器脑
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="bg-white border-blue-300 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-600">
                <UserCircle className="mr-2" size={24} />
                研发团队
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">由顶尖人工智能专家和机器人工程师组成的精英团队</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="bg-white border-blue-300 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-600">
                <Building className="mr-2" size={24} />
                研发基地
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">位于全球科技创新中心，拥有先进的研发设施</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Card className="bg-white border-blue-300 shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-600">
              <Cpu className="mr-2" size={24} />
              核心功能模块
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-gray-700">高级语音识别与自然语言处理</li>
              <li className="text-gray-700">智能任务规划与决策系统</li>
              <li className="text-gray-700">精确动作控制与执行</li>
              <li className="text-gray-700">自主学习与适应能力</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

