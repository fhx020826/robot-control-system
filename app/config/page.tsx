'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ConfigSection from '../components/ConfigSection'
import { Button } from '@/components/ui/button'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ConfigPage() {
  const [configs, setConfigs] = useState({
    voice: {},
    task: {},
    action: {}
  })

  const handleSave = (section: string, values: Record<string, string>) => {
    setConfigs(prev => ({ ...prev, [section]: values }))
    toast.success(`${section}配置已保存`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  return (
    <div className="space-y-8">
      <motion.h1 
        className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        配置管理
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <ConfigSection 
            title="语音识别模块" 
            configs={[
              { name: 'recognition_model', label: '识别模型', type: 'select', options: ['模型A', '模型B', '模型C'], defaultValue: '模型A' },
              { name: 'language', label: '语言', type: 'select', options: ['中文', '英文', '日文'], defaultValue: '中文' },
              { name: 'sensitivity', label: '灵敏度', type: 'radio', options: ['低', '中', '高'], defaultValue: '中' },
              { name: 'noise_reduction', label: '噪声消除', type: 'radio', options: ['开启', '关闭'], defaultValue: '开启' },
              { name: 'sample_rate', label: '采样率', type: 'select', options: ['8000 Hz', '16000 Hz', '44100 Hz'], defaultValue: '16000 Hz' },
              { name: 'vad_threshold', label: 'VAD阈值', type: 'number', defaultValue: '50' },
            ]} 
            onSave={(values) => handleSave('voice', values)}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <ConfigSection 
            title="任务规划模块" 
            configs={[
              { name: 'planning_algorithm', label: '规划算法', type: 'select', options: ['A*', 'RRT', 'Dijkstra'], defaultValue: 'A*' },
              { name: 'max_planning_time', label: '最大规划时间', type: 'number', defaultValue: '30' },
              { name: 'heuristic_weight', label: '启发式权重', type: 'number', defaultValue: '1' },
            ]} 
            onSave={(values) => handleSave('task', values)}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <ConfigSection 
            title="动作执行模块" 
            configs={[
              { name: 'max_velocity', label: '最大速度', type: 'number', defaultValue: '1.0' },
              { name: 'acceleration', label: '加速度', type: 'number', defaultValue: '0.5' },
              { name: 'deceleration', label: '减速度', type: 'number', defaultValue: '0.5' },
              { name: 'smoothing_factor', label: '平滑因子', type: 'number', defaultValue: '0.5' },
            ]} 
            onSave={(values) => handleSave('action', values)}
          />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Button 
          onClick={() => console.log(configs)} 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg py-3"
        >
          保存所有配置
        </Button>
      </motion.div>
      <ToastContainer />
    </div>
  )
}

