import Link from 'next/link'
import { Home, Settings, Info } from 'lucide-react'

export default function Navigation() {
  return (
    <nav className="flex items-center space-x-4">
      <Link href="/" className="flex items-center p-2 rounded hover:bg-blue-100 transition-colors duration-200">
        <Home className="w-5 h-5 text-blue-500" />
        <span className="ml-2 text-sm text-blue-600">首页</span>
      </Link>
      <Link href="/config" className="flex items-center p-2 rounded hover:bg-blue-100 transition-colors duration-200">
        <Settings className="w-5 h-5 text-blue-500" />
        <span className="ml-2 text-sm text-blue-600">配置</span>
      </Link>
      <Link href="/about" className="flex items-center p-2 rounded hover:bg-blue-100 transition-colors duration-200">
        <Info className="w-5 h-5 text-blue-500" />
        <span className="ml-2 text-sm text-blue-600">关于</span>
      </Link>
    </nav>
  )
}

