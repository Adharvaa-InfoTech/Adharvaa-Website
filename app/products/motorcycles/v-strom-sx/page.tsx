'use client'

import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import ZoomableImageModal from '../../../../components/ZoomableImageModal'

const colorVariants = [
  {
    "name": "Yellow",
    "hex": "#FFD700",
    "image": "/images/bikes/v-strom-sx/v-strom-sx-yellowColour.png"
  },
  {
    "name": "Red",
    "hex": "#DC2626",
    "image": "/images/bikes/v-strom-sx/V-strom-sx-redColour.png"
  },
  {
    "name": "Black",
    "hex": "#000000",
    "image": "/images/bikes/v-strom-sx/V-strom-sx-blackColour.png"
  }
]

const TABS = [
  { id: 'overview',       label: 'Overview' },
  { id: 'features',       label: 'Features' },
  { id: 'accessories',    label: 'Accessories' },
  { id: 'specifications', label: 'Specifications' },
  { id: 'downloads',      label: 'Downloads' },
]

const accessoriesList = [
  {
    title: 'Accessory Bar',
    img: '/images/bikes/v-strom-sx/accessories/Accessory Bar.jpg',
    desc: 'Heavy-duty protective bar designed to shield your V-Strom SX during adventure rides.',
  },
  {
    title: 'Fuel Tank Pad',
    img: '/images/bikes/v-strom-sx/accessories/Fuel Tank Pad.jpg',
    desc: 'Protective tank pad to prevent scratches from gear and belt buckles.',
  },
  {
    title: 'Fuel Tank Protection',
    img: '/images/bikes/v-strom-sx/accessories/FUEL TANK PROTECTION.jpg',
    desc: 'Side tank grip pads providing enhanced knee control and tank surface protection.',
  },
  {
    title: 'Low Height Seat Assembly',
    img: '/images/bikes/v-strom-sx/accessories/SEAT ASSEMBLY-LOW HEIGHT.jpg',
    desc: 'Low-profile seat option designed to lower seat height for comfortable footing.',
  },
  {
    title: 'Wheel Decal (Red)',
    img: '/images/bikes/v-strom-sx/accessories/WHEEL DECAL (RED).jpg',
    desc: 'Sporty red wheel decals that highlight the adventure rim profile.',
  },
  {
    title: 'Wheel Decal (Yellow)',
    img: '/images/bikes/v-strom-sx/accessories/WHEEL DECAL (YELLOW).jpg',
    desc: 'Vibrant yellow rim decals matching Suzuki’s iconic championship colorway.',
  },
]

const specTabs = [
  {
    "id": "engine",
    "label": "Engine",
    "rows": [
      { "label": "Engine Type",        "value": "4-stroke, Single-cylinder, oil-cooled, SOHC" },
      { "label": "Valve System",        "value": "4 valve" },
      { "label": "Bore x Stroke",       "value": "76.0mm x 54.9mm" },
      { "label": "Displacement",        "value": "249 cm³" },
      { "label": "Compression Ratio",   "value": "10.7 : 1" },
      { "label": "Max Power",           "value": "26.5ps@9300rpm" },
      { "label": "Max Torque",          "value": "22.2Nm@7300rpm" },
      { "label": "Fuel System",         "value": "Fuel Injection" },
      { "label": "Starter System",      "value": "Electric" },
      { "label": "Lubrication System",  "value": "Wet sump" },
      { "label": "Transmission",        "value": "6-speed constant mesh" }
    ]
  },
  {
    "id": "dimensions",
    "label": "Dimensions & Weight",
    "rows": [
      { "label": "Overall Length",      "value": "2,180 mm" },
      { "label": "Overall Width",       "value": "880 mm" },
      { "label": "Overall Height",      "value": "1,355 mm" },
      { "label": "Wheel Base",          "value": "1,440 mm" },
      { "label": "Ground Clearance",    "value": "205 mm" },
      { "label": "Seat Height",         "value": "835 mm" },
      { "label": "Kerb Mass",           "value": "167 kg" },
      { "label": "Fuel Tank Capacity",  "value": "12 L" }
    ]
  },
  {
    "id": "brakes",
    "label": "Brakes",
    "rows": [
      { "label": "Front",               "value": "Disc, single" },
      { "label": "Rear",                "value": "Disc" }
    ]
  },
  {
    "id": "tyres",
    "label": "Tyres Size",
    "rows": [
      { "label": "Front",               "value": "100/90-19M/C 57S, tubeless" },
      { "label": "Rear",                "value": "140/70-17M/C 66S, tubeless" },
      { "label": "Rake / Trail",        "value": "27° / 97 mm" }
    ]
  },
  {
    "id": "suspension",
    "label": "Suspension",
    "rows": [
      { "label": "Front",               "value": "Telescopic, coil spring, oil damped" },
      { "label": "Rear",                "value": "Swing arm type, coil spring, oil damped" }
    ]
  },
  {
    "id": "electrical",
    "label": "Electrical",
    "rows": [
      { "label": "Ignition System",     "value": "Electronic ignition" },
      { "label": "Battery",             "value": "Maintenance Free, 12V 6AH" },
      { "label": "Headlight & Tail Light", "value": "LED" }
    ]
  }
]


const bikeData = {
  "category": "Adventure Touring",
  "namePart1": "V-STROM",
  "namePart2": "SX",
  "fullName": "V-STROM SX",
  "tagline": "Designed for long-distance cruising and versatile off-road adventures. Experience the Master of All Adventures.",
  "brochureUrl": "/pdf/v-strom-sx-brochure.pdf",
  "description": "The V-STROM SX is your gateway to adventure — a motorcycle that combines the rugged spirit of a true adventure tourer with the agility of a sport bike. Whether conquering mountain passes or navigating city streets, it adapts to every challenge.",
  "quickStats": [
    {
      "label": "Engine",
      "value": "249 cc"
    },
    {
      "label": "Max Power",
      "value": "26.5 ps"
    },
    {
      "label": "Max Torque",
      "value": "22.2 Nm"
    },
    {
      "label": "Fuel Tank",
      "value": "12 L"
    }
  ],
  "highlightsStrip": [
    {
      "icon": "⚡",
      "label": "Max Power",
      "value": "26.5 ps",
      "sub": "@9300 rpm"
    },
    {
      "icon": "🔩",
      "label": "Max Torque",
      "value": "22.2 Nm",
      "sub": "@7300 rpm"
    },
    {
      "icon": "👷",
      "label": "Cooling",
      "value": "SOCS",
      "sub": "Oil Cooling"
    },
    {
      "icon": "🛑",
      "label": "Braking",
      "value": "Dual Ch.",
      "sub": "ABS"
    },
    {
      "icon": "⛽",
      "label": "Fuel Tank",
      "value": "12 L",
      "sub": "Capacity"
    },
    {
      "icon": "🏍️",
      "label": "Kerb Mass",
      "value": "167 kg",
      "sub": "Ready to Ride"
    }
  ],
  "featuresList": [
    {
      "icon": "💡",
      "title": "Aggressive LED Headlamp",
      "desc": "Sharp dual-LED headlight with beak cowl gives a powerful adventure touring appearance."
    },
    {
      "icon": "👷",
      "title": "Suzuki Oil Cooling (SOCS)",
      "desc": "Engine oil cooling keeps the engine at peak temperature, giving reliable power outputs."
    },
    {
      "icon": "🗺️",
      "title": "Suzuki Ride Connect",
      "desc": "Smartphone connectivity with turn-by-turn navigation, Call/SMS alerts, and ETA displays."
    },
    {
      "icon": "🔧",
      "title": "Steel Trellis Frame",
      "desc": "Tough trellis chassis delivers agility on tarmac and complete stability on gravel and dirt."
    },
    {
      "icon": "🚧",
      "title": "Dual Channel ABS",
      "desc": "Standard dual-channel anti-lock braking ensures secure, controlled stopping on wet roads."
    },
    {
      "icon": "🏞️",
      "title": "Adventure Ergonomics",
      "desc": "Generous ground clearance (205mm) and a roomy adventure-style seat position for comfort."
    }
  ],
  "accessoriesList": [
    {
      "icon": "🧳",
      "title": "Genuine Pannier Case",
      "desc": "High-density hard side cases for touring luggage capacity, custom integrated."
    },
    {
      "icon": "🛡️",
      "title": "Rugged Engine Guard",
      "desc": "Tough steel underbelly bash protection from rocks and gravel off-road."
    },
    {
      "icon": "💨",
      "title": "Wind Protection Screen",
      "desc": "Specially engineered tall touring screen to reduce highway buffeting."
    }
  ]
}

function SectionHeader({ eyebrow, title, accent, subtitle }: {
  eyebrow: string; title: string; accent: string; subtitle: string
}) {
  return (
    <motion.div className="text-center"
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <p className="text-xs uppercase tracking-[0.25em] text-suzuki-blue mb-2 font-bold">{eyebrow}</p>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
        {title} <span className="text-suzuki-red">{accent}</span>
      </h2>
      <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg">{subtitle}</p>
    </motion.div>
  )
}

export default function BikePage() {
  const [selectedColor, setSelectedColor] = useState(colorVariants[0])
  const [isZoomed, setIsZoomed]           = useState(false)
  const [activeTab, setActiveTab]         = useState('overview')
  const [specTab, setSpecTab]             = useState('engine')

  const mouseX  = useMotionValue(0)
  const mouseY  = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })
  const tabBarRef = useRef<HTMLDivElement>(null)

  const openZoom  = () => { setIsZoomed(true);  document.body.style.overflow = 'hidden' }
  const closeZoom = () => { setIsZoomed(false); document.body.style.overflow = 'unset'  }

  useEffect(() => {
    const onScroll = () => {
      const offset = 80 + (tabBarRef.current?.offsetHeight ?? 56) + 15
      let current = TABS[0].id
      for (const tab of TABS) {
        const el = document.getElementById('section-' + tab.id)
        if (el && el.getBoundingClientRect().top <= offset) {
          current = tab.id
        }
      }
      setActiveTab(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById('section-' + id)
    if (!el) return
    const offset = 80 + (tabBarRef.current?.offsetHeight ?? 56)
    window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' })
    setActiveTab(id)
    document.getElementById('tab-btn-' + id)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

  return (
    <div className="min-h-screen pt-24 bg-white text-slate-900">

      {/* HERO */}
      <motion.section className="relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-100 to-suzuki-blue/20" />
        <div className="absolute -right-20 top-10 w-64 h-64 bg-suzuki-red/10 blur-3xl rounded-full" />
        <div className="absolute -left-24 -bottom-12 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Link href="/products/motorcycles"
              className="inline-flex items-center text-slate-600 hover:text-suzuki-blue mb-4 transition-colors text-sm font-medium">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Motorcycles
            </Link>
          </motion.div>
          <motion.p className="text-xs uppercase tracking-[0.25em] text-suzuki-blue mb-3 font-bold"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            {bikeData.category}
          </motion.p>
          <motion.h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-slate-900"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
            {bikeData.namePart1} <span className="text-suzuki-red">{bikeData.namePart2}</span>
          </motion.h1>
          <motion.p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
            {bikeData.tagline}
          </motion.p>
          <motion.div className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
            <Link href="/enquiry/get-quote">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="bg-suzuki-blue text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all">
                Get Quote
              </motion.button>
            </Link>
            <a href={bikeData.brochureUrl}
              target="_blank" rel="noopener noreferrer">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="bg-white border-2 border-suzuki-blue text-suzuki-blue px-8 py-3 rounded-full font-bold hover:bg-suzuki-blue hover:text-white transition-all flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Download Brochure
              </motion.button>
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* SECTION: OVERVIEW (Top Banner) */}
      <section id="section-overview" className="scroll-mt-32 bg-white py-12 sm:py-20 border-b border-gray-100">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start max-w-7xl mx-auto">

            {/* Sticky bike image */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
              className="lg:sticky lg:top-36">
              <motion.div
                className="relative h-[380px] sm:h-[500px] lg:h-[620px] bg-gray-50 rounded-3xl overflow-hidden shadow-xl border border-gray-200 cursor-crosshair group"
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect()
                  mouseX.set(((e.clientX - r.left) / r.width  - 0.5) * 20)
                  mouseY.set(((e.clientY - r.top)  / r.height - 0.5) * 20)
                }}
                onMouseLeave={() => { mouseX.set(0); mouseY.set(0) }}
                onClick={openZoom}>
                <motion.div className="absolute inset-0 opacity-20 blur-[100px] pointer-events-none"
                  animate={{ backgroundColor: selectedColor.hex }} transition={{ duration: 1 }} />
                <motion.div className="relative w-full h-full flex items-center justify-center z-10"
                  style={{ rotateX: springY, rotateY: springX, transformStyle: 'preserve-3d' }}>
                  <AnimatePresence mode="wait">
                    <motion.div key={selectedColor.name}
                      initial={{ opacity: 0, scale: 0.85, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.85, y: -20 }}
                      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                      className="relative w-[90%] h-[90%]">
                      <Image src={selectedColor.image} alt={'Bike ' + selectedColor.name} fill
                        className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]" priority />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-900/80 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-full font-medium tracking-wider pointer-events-none">
                  Click to Zoom
                </div>
              </motion.div>
            </motion.div>

            {/* Info card */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}>
              <div className="bg-white border border-gray-100 rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 uppercase tracking-wider">{bikeData.fullName}</h2>
                <p className="text-gray-500 text-base mb-8 leading-relaxed">
                  {bikeData.description}
                </p>

                {/* Colour picker */}
                <div className="mb-8">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Choose Your Colour</h3>
                  <div className="flex gap-3">
                    {colorVariants.map((c) => (
                      <button key={c.name} onClick={() => setSelectedColor(c)} title={c.name}
                        className={'flex flex-col items-center gap-2 p-2.5 rounded-xl transition-all ' + (
                          selectedColor.name === c.name
                            ? 'ring-2 ring-suzuki-blue ring-offset-2 bg-gray-50 shadow'
                            : 'hover:bg-gray-50'
                        )}>
                        <div className={'w-11 h-11 rounded-full border-4 transition-all ' + (
                          selectedColor.name === c.name ? 'border-suzuki-blue scale-110' : 'border-gray-200'
                        )} style={{ backgroundColor: c.hex }} />
                        <span className={'text-xs font-bold uppercase ' + (
                          selectedColor.name === c.name ? 'text-suzuki-blue' : 'text-gray-400'
                        )}>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {bikeData.quickStats.map((s) => (
                    <div key={s.label} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">{s.label}</p>
                      <p className="text-xl font-extrabold text-gray-900">{s.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button onClick={openZoom} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 text-xs transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                    Zoom View
                  </motion.button>
                  <Link href="/enquiry/get-quote" className="flex-1">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="w-full bg-suzuki-blue hover:bg-blue-700 text-white px-5 py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-suzuki-blue/20 text-xs transition-colors">
                      Get a Quote
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Highlights strip */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-10 sm:py-14 text-white mt-12 sm:mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-center text-white/60 text-xs font-bold uppercase tracking-[0.2em] mb-8">KEY VEHICLE HIGHLIGHTS</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {bikeData.highlightsStrip.map((item, i) => (
                <div key={item.label} className="text-center p-4 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                  <span className="text-3xl block mb-2">{item.icon}</span>
                  <span className="text-white/60 text-[10px] uppercase font-bold block mb-1">{item.label}</span>
                  <span className="text-white font-extrabold text-lg block">{item.value}</span>
                  <span className="text-white/50 text-[10px] block mt-0.5">{item.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STICKY TAB BAR (White style with blue active tab, vertical divider border-r, matching screenshot) */}
      <div ref={tabBarRef} className="sticky top-[80px] z-40 bg-white border-y border-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto flex overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none' as any }}>
          <div className="flex w-full border-l border-gray-200">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                id={'tab-btn-' + tab.id}
                onClick={() => scrollTo(tab.id)}
                className={'flex-1 min-w-[120px] text-center py-4 text-[11px] sm:text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-150 border-r border-gray-200 ' + (
                  activeTab === tab.id
                    ? 'bg-suzuki-blue text-white'
                    : 'text-gray-700 bg-white hover:bg-gray-50 hover:text-suzuki-blue'
                )}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION: FEATURES */}
      <section id="section-features" className="scroll-mt-32 bg-gray-50 py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 uppercase tracking-wider mb-2">
              Key Features of the <span className="text-suzuki-blue">V-Strom SX 250</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
              Capable of sporty riding in the curves on paved roads and solid handling on unpaved roads — the Master of All Adventures.
            </p>
          </div>

          <div className="w-full relative overflow-hidden mb-16 shadow-xl border-y border-gray-200 bg-gray-50 rounded-3xl">
            <Image 
              src="/images/SectionBanner/V-Strom Outdoor 3x1.jpg" 
              alt="V-Strom SX Introduction" 
              width={1920} 
              height={1080} 
              className="w-full h-auto object-cover max-h-[60vh]"
              unoptimized
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            {[
              { img: "back-desigen.jpg", title: "Beak Design", desc: "A beak design inspired by the legendary DR-Z racer and DR-BIG off-road models, remade specifically for the V-STROM." },
              { img: "LED-Headlight.jpg", title: "LED Headlight", desc: "Stylish octagonal LED headlight arranging lights in three separate rows for a sleek look and strong road presence." },
              { img: "LED-headlights.jpg", title: "LED Tail Lights", desc: "Bright LED tail lights keeping the machine highly visible at night." },
              { img: "Knuckle-covers.jpg", title: "Knuckle Covers", desc: "Knuckle covers keep wind, rain, and small rocks off the rider’s hands for added comfort on long rides." },
              { img: "Windscreen.jpg", title: "Compact Windscreen", desc: "Compact yet highly functional windscreen shields well, reducing rider fatigue." },
              { img: "Separate-seat.jpg", title: "Separate Seat", desc: "Sporty separate seat providing long-distance comfort for both rider and passenger." },
              { img: "Dual-exit-muffler.jpg", title: "Dual-Exit Muffler", desc: "Short, all-black dual-exit muffler specifically designed with a rugged cap." },
              { img: "Engine-under-cowling.jpg", title: "Engine Under-Cowling", desc: "Under-cowling offers a tough look and protects engine vitals." },
              { img: "Graphics.jpg", title: "Sport-Inspired Graphics", desc: "Sport-inspired graphics hint at the V-STROM SX's adventure side." }
            ].map((feature, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col group shadow-lg hover:border-suzuki-blue/30 hover:-translate-y-1 transition-all">
                <div className="h-56 relative overflow-hidden bg-gray-50 p-4 flex items-center justify-center">
                  <Image src={"https://www.suzukimotorcycle.co.in/images/website/" + feature.img} alt={feature.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                </div>
                <div className="p-6 flex-1 flex flex-col border-t border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wider">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Engine & Ride Connect Cards */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-xl max-w-7xl mx-auto flex flex-col md:flex-row gap-10 items-center mb-12">
            <div className="md:w-1/3 flex justify-center">
              <div className="text-3xl font-black text-suzuki-blue border-b-2 border-suzuki-blue inline-block drop-shadow-xl">SOCS</div>
            </div>
            <div className="md:w-2/3 md:border-l border-gray-100 md:pl-10">
              <h3 className="text-2xl font-extrabold text-gray-900 mb-4 uppercase tracking-widest">Suzuki Oil Cooling System <span className="text-suzuki-blue">(SOCS)</span></h3>
              <p className="text-gray-500 text-md leading-relaxed">
                The Suzuki Oil Cooling System offers advantages in size, weight, durability, and combustion efficiency, providing brisk acceleration while keeping fuel consumption low.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: ACCESSORIES */}
      <section id="section-accessories" className="scroll-mt-32 bg-white py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Personalise Your Ride" title="Genuine" accent="Accessories"
            subtitle="Enhance your machine with official Suzuki accessories — designed to fit perfectly and built to last." />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {accessoriesList.map((item, i) => (
              <motion.div key={item.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:border-suzuki-blue/30 hover:-translate-y-1 transition-all group">
                <div className="relative h-60 overflow-hidden bg-gray-50 p-4">
                  <Image src={item.img} alt={item.title} fill className="object-contain group-hover:scale-105 transition-transform duration-500" unoptimized />
                </div>
                <div className="p-6 border-t border-gray-100">
                  <h3 className="text-base font-extrabold text-gray-900 uppercase tracking-wider mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/contact">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="bg-suzuki-blue hover:bg-blue-700 text-white px-10 py-4 rounded-full font-extrabold uppercase tracking-widest shadow-lg shadow-suzuki-blue/20 inline-flex items-center gap-2 transition-colors">
                Enquire About Accessories
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION: SPECIFICATIONS */}
      <section id="section-specifications" className="scroll-mt-32 bg-gray-50 py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Technical Data" title="Complete" accent="Specifications"
            subtitle="Every detail engineered to perfection — explore the full technical breakdown of the machine." />
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-10 mb-8">
            {specTabs.map((tab) => (
              <motion.button key={tab.id} onClick={() => setSpecTab(tab.id)}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className={'px-6 py-2.5 rounded-full font-bold uppercase tracking-wider text-xs transition-all duration-300 border border-gray-200 ' + (
                  specTab === tab.id
                    ? 'bg-suzuki-blue text-white shadow-lg shadow-suzuki-blue/20 border-suzuki-blue'
                    : 'bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                )}>
                {tab.label}
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {specTabs.filter(t => t.id === specTab).map(tab => (
              <motion.div key={tab.id}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-gray-50 px-6 sm:px-10 py-5 border-b border-gray-100">
                  <h3 className="text-suzuki-blue text-xl sm:text-2xl font-extrabold tracking-widest uppercase">{tab.label}</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {tab.rows.map((row, i) => (
                    <motion.div key={row.label}
                      className="grid grid-cols-2 px-6 sm:px-10 py-4 hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}>
                      <span className="text-gray-500 font-bold uppercase tracking-wider text-xs sm:text-sm flex items-center">{row.label}</span>
                      <span className="text-gray-900 font-extrabold text-sm sm:text-base">{row.value}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* SECTION: DOWNLOADS */}
      <section id="section-downloads" className="scroll-mt-32 py-16 sm:py-24 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader 
            eyebrow="Resources" 
            title="Official" 
            accent="Downloads"
            subtitle="Download the official brochure and technical specifications for the V-Strom SX." 
          />
          
          <div className="mt-12 grid sm:grid-cols-1 gap-8 max-w-xl mx-auto">
            <motion.a
              href="/pdf/v-strom-sx-brochure.pdf"
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -4 }} 
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center gap-4 bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-suzuki-blue/30 transition-all group"
            >
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-gray-50 flex items-center justify-center">
                <Image 
                  src="/images/bikes/v-strom-sx/v-strom-sx-brochure-thumb.jpg" 
                  alt="V-Strom SX Download Brochure" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  unoptimized 
                />
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mt-2 group-hover:text-suzuki-blue transition-colors">V-Strom SX Download Brochure</h3>
            </motion.a>
          </div>
        </div>
      </section>

      {/* SECTION: SPECIFICATIONS */}
      <section id="section-specifications" className="scroll-mt-32 bg-gray-50 py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Technical Data" title="Complete" accent="Specifications"
            subtitle="Every detail engineered to perfection — explore the full technical breakdown of the machine." />
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-10 mb-8">
            {specTabs.map((tab) => (
              <motion.button key={tab.id} onClick={() => setSpecTab(tab.id)}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className={'px-6 py-2.5 rounded-full font-bold uppercase tracking-wider text-xs transition-all duration-300 border border-gray-200 ' + (
                  specTab === tab.id
                    ? 'bg-suzuki-blue text-white shadow-lg shadow-suzuki-blue/20 border-suzuki-blue'
                    : 'bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                )}>
                {tab.label}
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {specTabs.filter(t => t.id === specTab).map(tab => (
              <motion.div key={tab.id}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-gray-50 px-6 sm:px-10 py-5 border-b border-gray-100">
                  <h3 className="text-suzuki-blue text-xl sm:text-2xl font-extrabold tracking-widest uppercase">{tab.label}</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {tab.rows.map((row, i) => (
                    <motion.div key={row.label}
                      className="grid grid-cols-2 px-6 sm:px-10 py-4 hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}>
                      <span className="text-gray-500 font-bold uppercase tracking-wider text-xs sm:text-sm flex items-center">{row.label}</span>
                      <span className="text-gray-900 font-extrabold text-sm sm:text-base">{row.value}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Zoom Modal */}
      <ZoomableImageModal
        src={selectedColor.image}
        alt={'Zoomed Bike'}
        isOpen={isZoomed}
        onClose={closeZoom}
      />
    </div>
  )
}