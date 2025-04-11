'use client'

import { useState } from 'react'
import { Mic, Send, Info, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function VoiceControl() {
  const [input, setInput] = useState('') // 用于语音合成输入
  const [result, setResult] = useState('') // 用于显示识别结果
  const [isListening, setIsListening] = useState(false) // 控制是否正在监听
  const [isInfoExpanded, setIsInfoExpanded] = useState(true) // 控制信息面板的展开与否
  const [commandText, setCommandText] = useState('') // 用于保存识别到的命令文本

  // 语音唤醒部分
  const handleWakeup = async () => {
    try {
      const response = await fetch('http://localhost:8003/voice/wakeup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wake_notice: "机器人已激活",
        }),
      })
      if (response.ok) {
        const data = await response.json()
        console.log('语音唤醒成功:', data)
      } else {
        throw new Error('语音唤醒请求失败')
      }
    } catch (error) {
      console.error('请求错误:', error)
    }
  }

  // 语音识别部分
  const toggleListening = async () => {
    setIsListening(!isListening)

    if (!isListening) {
      setResult('')
      setCommandText('') // 清除上次识别结果

      try {
        const response = await fetch('http://localhost:8003/voice/recognition', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const data = await response.json()
          setCommandText(data.command_text) // 保存返回的命令文本
        } else {
          throw new Error('语音识别请求失败')
        }
      } catch (error) {
        console.error('请求错误:', error)
      }
    } else {
      setResult(commandText)
    }
  }

  // 语音合成部分
  const handleSynthesis = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8003/voice/synthesis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text_to_speak: input,
          output_file_path: "/home/yczhang/RoboBrain-jnyu/instances/voice_yjn/light.mp3",
        }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('语音合成成功:', data)
      } else {
        throw new Error('语音合成请求失败')
      }
    } catch (error) {
      console.error('请求错误:', error)
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-blue-300 h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-blue-600">语音控制</h2>
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
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm text-gray-600 mb-4"
          >
            <p>通过语音识别、语音唤醒和语音合成功能，实现与机器人的语音交互。</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 语音唤醒 */}
      <motion.div className="mb-4">
        <h3 className="text-lg font-semibold text-blue-600 mb-2">语音唤醒</h3>
        <motion.button
          className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={handleWakeup}
        >
          启动语音唤醒
        </motion.button>
      </motion.div>

      {/* 语音识别 */}
      <motion.div className="mb-4">
        <h3 className="text-lg font-semibold text-blue-600 mb-2">语音识别</h3>
        <motion.button
          className={`w-full p-2 rounded-md ${isListening ? 'bg-red-500' : 'bg-blue-500'} text-white flex items-center justify-center`}
          onClick={toggleListening}
          whileTap={{ scale: 0.95 }}
        >
          <Mic className="mr-2" size={20} />
          {isListening ? '停止听取' : '开始听取'}
        </motion.button>
        {result && (
          <motion.div
            className="mt-4 p-4 bg-gray-100 rounded-md border border-blue-300"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="font-semibold text-blue-600 mb-2">识别结果：</h3>
            <p className="text-gray-800">{result}</p>
          </motion.div>
        )}
      </motion.div>

      {/* 语音合成 */}
      <motion.div className="mb-4">
        <h3 className="text-lg font-semibold text-blue-600 mb-2">语音合成</h3>
        <form onSubmit={handleSynthesis}>
          <div className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入要合成的文本"
              className="flex-grow p-2 bg-gray-100 border border-blue-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
            />
            <button
              onClick={handleSynthesis}
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition-colors duration-200"
            >
              <Send size={18} className="mr-2" />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
