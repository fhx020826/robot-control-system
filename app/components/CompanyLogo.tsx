import Image from 'next/image'
import Link from 'next/link'

export default function CompanyLogo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="relative w-32 h-12">
        <Image
          src="/logo.png"
          alt="机器脑"
          fill
          className="object-contain"
          priority
        />
      </div>
      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
        机器脑
      </span>
    </Link>
  )
}

