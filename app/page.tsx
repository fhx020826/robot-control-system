'use client'

import { motion } from 'framer-motion'
import VoiceControl from './components/VoiceRecognition'
import TaskPlanning from './components/TaskPlanning'
import SensorDisplay from './components/SensorDisplay'

export default function Home() {
  return (
    <div className="space-y-8 px-6 py-12 bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        机器脑展示
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="h-full bg-white shadow-lg rounded-lg p-4 flex items-center justify-center"  // Ensuring full height for VoiceControl
        >
          <VoiceControl />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="h-full bg-white shadow-lg rounded-lg p-4 flex items-center justify-center"  // Ensuring full height for SensorDisplay
        >
          <SensorDisplay />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="h-[600px] bg-white shadow-lg rounded-lg p-6 mt-8"
      >
        <TaskPlanning />
      </motion.div>
    </div>
  )
}
