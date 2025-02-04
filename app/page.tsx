"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Battery, Camera, Cpu, ZoomIn, Wifi, Usb, ChevronRight } from "lucide-react"
import { type LucideIcon } from 'lucide-react'


export default function CompareIPhones() {
  const router = useRouter()
  const [learnMoreStates, setLearnMoreStates] = useState([false, false, false])
  const [learnMoreClicks, setLearnMoreClicks] = useState<string[]>([])
  const [mouseoverData, setMouseoverData] = useState<string[]>([])
  const mouseoverStartTime = useRef<number | null>(null)
  const currentMouseover = useRef<string | null>(null)

  const phones = [
    {
      name: "iPhone 16 Pro Max",
      image: "/iPhone-16-Pro-Max.png",
      price: "From $1199 or $49.95/mo. for 24 mo.*",
      display: {
        size: '6.9"',
        type: "Super Retina XDR display",
        tech: "ProMotion technology",
        extra: "Always-On display",
      },
      colors: ["natural", "gray", "black"],
      features: {
        opticalZoom: "Up to 5x",
        chip: "A17 Pro chip",
        camera: "Pro camera system\n48MP Main | Ultra Wide | Telephoto",
        battery: "Up to 29 hours video playback",
        wifi: "Wi‑Fi 6E",
        usb: "Supports USB 3 for up to 20x faster transfers",
      },
    },
    {
      name: "iPhone 16 Pro",
      image: "/iPhone-16-Pro.png",
      price: "From $999 or $41.62/mo. for 24 mo.*",
      display: {
        size: '6.3"',
        type: "Super Retina XDR display",
        tech: "ProMotion technology",
        extra: "Always-On display",
      },
      colors: ["natural", "gray", "black"],
      features: {
        opticalZoom: "Up to 5x",
        chip: "A17 Pro chip",
        camera: "Pro camera system\n48MP Main | Ultra Wide | Telephoto",
        battery: "Up to 29 hours video playback",
        wifi: "Wi‑Fi 6E",
        usb: "Supports USB 3 for up to 20x faster transfers",
      },
    },
    {
      name: "iPhone 16",
      image: "/iPhone-16.png",
      price: "From $799 or $33.29/mo. for 24 mo.*",
      display: {
        size: '6.1"',
        type: "Super Retina XDR display",
        tech: "",
        extra: "",
      },
      colors: ["blue", "pink", "yellow", "black"],
      features: {
        opticalZoom: "Up to 2x",
        chip: "A16 Bionic chip",
        camera: "Dual-camera system\n48MP Main | Ultra Wide",
        battery: "Up to 26 hours video playback",
        wifi: "Wi‑Fi 6",
        usb: "Supports USB 2",
      },
    },
  ]

  const handleLearnMore = (index: number) => {
    setLearnMoreStates((prevState) => {
      const newState = [...prevState]
      newState[index] = true
      return newState
    })
    setLearnMoreClicks((prevClicks) => [...prevClicks, phones[index].name])
  }

  const handleBuy = () => {
    const lmclicks = learnMoreClicks.join(",")
    const moData = mouseoverData.join(",").slice(0, 4000) // Limit to 4000 characters

    // Redirect with learn more clicks data and mouseover data
    router.push(`https://vlabURL.com/?lmclicks=${encodeURIComponent(lmclicks)}&mo=${encodeURIComponent(moData)}`)
  }

  const handleMouseEnter = (phoneName: string, feature: string) => {
    if (learnMoreStates[phones.findIndex((phone) => phone.name === phoneName)]) {
      mouseoverStartTime.current = Date.now()
      currentMouseover.current = `${phoneName}-${feature}`
    }
  }

  const handleMouseLeave = () => {
    if (mouseoverStartTime.current && currentMouseover.current) {
      const duration = Date.now() - mouseoverStartTime.current
      if (duration >= 20) {
        setMouseoverData((prevData) => [...prevData, `${currentMouseover.current}-${duration}`])
      }
      mouseoverStartTime.current = null
      currentMouseover.current = null
    }
  }

  useEffect(() => {
    return () => {
      if (mouseoverStartTime.current && currentMouseover.current) {
        const duration = Date.now() - mouseoverStartTime.current
        if (duration >= 20) {
          setMouseoverData((prevData) => [...prevData, `${currentMouseover.current}-${duration}`])
        }
      }
    }
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold">Compare iPhone models</h1>
          <div className="flex items-center justify-center gap-2 text-sm text-blue-600">
            <span>Shop iPhone</span>
            <ChevronRight className="w-4 h-4" />
          </div>
          <p className="text-sm">
            Get help choosing <span className="text-blue-600">Chat with a Specialist</span>
          </p>
          <p className="text-sm flex items-center justify-center gap-1">
            Watch a guided tour of iPhone 16 and iPhone 16 Pro
            <ChevronRight className="w-4 h-4" />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {phones.map((phone, index) => (
            <div key={index} className="border rounded-lg p-6 space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-medium text-center">{phone.name}</h2>
                <div className="relative h-64">
                  <Image src={phone.image || "/placeholder.svg"} alt={phone.name} fill className="object-contain" />
                </div>
                <div className="flex justify-center gap-2">
                  {phone.colors.map((color, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded-full border ${
                        color === "natural" ? "bg-neutral-200" : color === "gray" ? "bg-gray-400" : `bg-${color}-500`
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-center">{phone.price}</p>
                <div className="space-y-4">
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    onClick={handleBuy}
                  >
                    Buy
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-center text-gray-600">
                  If you&apos;d like to learn more information about the phone option(s) click &quot;learn more&quot;
                  under the option and then hover over the features (e.g., &quot;optical zoom&quot; or
                  &quot;chip&quot;).
                </p>
                <button
                  className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                  onClick={() => handleLearnMore(index)}
                >
                  Learn more
                </button>
              </div>

              <div className="space-y-4 pt-4">
                <FeatureItem
                  text={`${phone.display.size} ${phone.display.type}`}
                  subText={`${phone.display.tech}\n${phone.display.extra}`}
                  isEnabled={learnMoreStates[index]}
                  onMouseEnter={() => handleMouseEnter(phone.name, "display")}
                  onMouseLeave={handleMouseLeave}
                />

                <div className="space-y-4 grid grid-cols-1 gap-2">
                  {Object.entries(phone.features).map(([key, value]) => (
                    <FeatureItem
                      key={key}
                      icon={getIconForFeature(key)}
                      text={key}
                      subText={value}
                      isEnabled={learnMoreStates[index]}
                      onMouseEnter={() => handleMouseEnter(phone.name, key)}
                      onMouseLeave={handleMouseLeave}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FeatureItem({
  icon: Icon,
  text,
  subText,
  isEnabled,
  onMouseEnter,
  onMouseLeave,
}: {
  icon?: LucideIcon
  text: string
  subText?: string
  isEnabled: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  return (
    <div
      className={`group relative border border-gray-200 rounded-md ${isEnabled ? "cursor-pointer" : "cursor-not-allowed"}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isEnabled && (
        <div className="w-full h-full min-h-[80px] opacity-0 group-hover:opacity-100 absolute inset-0 transition-opacity duration-200 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-md">
          <p className="text-sm font-medium">{text}</p>
          {subText && <p className="text-xs text-gray-600 whitespace-pre-line">{subText}</p>}
        </div>
      )}
      <div className="text-center space-y-1 p-4">
        {Icon && (
          <div className="flex justify-center">
            <Icon className="w-6 h-6" />
          </div>
        )}
        <p className="text-sm">{text.split(" ")[0]}</p>
      </div>
    </div>
  )
}

function getIconForFeature(feature: string): LucideIcon | undefined {
  switch (feature.toLowerCase()) {
    case "opticalzoom":
      return ZoomIn
    case "chip":
      return Cpu
    case "camera":
      return Camera
    case "battery":
      return Battery
    case "wifi":
      return Wifi
    case "usb":
      return Usb
    default:
      return undefined
  }
}

