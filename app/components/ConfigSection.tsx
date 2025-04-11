'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Save } from 'lucide-react'
import { motion } from 'framer-motion'

type Config = {
  name: string
  label: string
  type: string
  options?: string[]
  defaultValue?: string
}

type ConfigSectionProps = {
  title: string
  configs: Config[]
  onSave: (values: Record<string, string>) => void
}

export default function ConfigSection({ title, configs, onSave }: ConfigSectionProps) {
  const [values, setValues] = useState<Record<string, string>>(
    configs.reduce((acc, config) => ({ ...acc, [config.name]: config.defaultValue || '' }), {})
  )

  const handleChange = (name: string, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    onSave(values)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-blue-300 h-full">
      <h2 className="text-2xl font-semibold mb-6 text-blue-600">{title}</h2>
      <div className="space-y-6">
        {configs.map(config => (
          <div key={config.name} className="flex flex-col space-y-2">
            <Label htmlFor={config.name} className="text-lg font-medium text-gray-700">{config.label}</Label>
            {config.type === 'select' && (
              <Select
                value={values[config.name]}
                onValueChange={(value) => handleChange(config.name, value)}
              >
                <SelectTrigger className="w-full bg-gray-100 border-blue-300 text-gray-800 text-lg">
                  <SelectValue placeholder="选择一个选项" />
                </SelectTrigger>
                <SelectContent>
                  {config.options?.map(option => (
                    <SelectItem key={option} value={option} className="text-lg">{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {config.type === 'radio' && (
              <div className="flex space-x-4">
                {config.options?.map(option => (
                  <button
                    key={option}
                    onClick={() => handleChange(config.name, option)}
                    className={`px-4 py-2 rounded-md transition-all duration-200 text-lg ${
                      values[config.name] === option
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
            {config.type === 'number' && (
              <Input
                id={config.name}
                type="number"
                value={values[config.name]}
                onChange={(e) => handleChange(config.name, e.target.value)}
                className="w-full bg-gray-100 border-blue-300 text-gray-800 text-lg"
              />
            )}
          </div>
        ))}
      </div>
      <Button onClick={handleSave} className="mt-6 bg-blue-500 hover:bg-blue-600 text-white text-lg px-6 py-3">
        <Save className="mr-2" size={20} />
        保存
      </Button>
    </div>
  )
}

