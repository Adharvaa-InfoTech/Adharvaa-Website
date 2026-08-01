'use client'

import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import ZoomableImageModal from '../../../../components/ZoomableImageModal'

const colorVariants = [
  {
    name: 'Metallic Matte Black',
    color: 'Standard',
    hex: '#111827',
    image: '/images/scooters/Access/Access Standard Edition.png',
  },
  {
    name: 'Deep Dark Blue',
    color: 'Special',
    hex: '#1E3A8A',
    image: '/images/scooters/Access/Access Special Edition.png',
  },
  {
    name: 'Matte Teal Green',
    color: 'Ride Connect',
    hex: '#14B8A6',
    image: '/images/scooters/Access/Access Ride Connect Edition.png',
  },
  {
    name: 'Pearl Sky Blue',
    color: 'Connect TFT',
    hex: '#0EA5E9',
    image: '/images/scooters/Access/Access Connect TFT Edition.png',
  },
]

const TABS = [
  { id: 'overview',       label: 'Overview' },
  { id: 'features',       label: 'Features' },
  { id: 'accessories',    label: 'Accessories' },
  { id: 'specifications', label: 'Specifications' },
  { id: 'downloads',      label: 'Downloads' },
]

const specTabs = [
  {
    id: "engine",
    label: "Engine",
    rows: [
      { label: "Engine Type", value: "4-Stroke, 1-Cylinder, Air-Cooled, SOHC, 2-Valve" },
      { label: "Displacement", value: "124 cm³" },
      { label: "Bore x Stroke", value: "52.5 mm x 57.4 mm" },
      { label: "Max Power", value: "8.7 PS @ 6,750 rpm" },
      { label: "Max Torque", value: "10.0 Nm @ 5,500 rpm" },
      { label: "Fuel System", value: "Fuel Injection" },
      { label: "Starter System", value: "Kick and Electric" },
      { label: "Transmission Type", value: "CVT" }
    ]
  },
  {
    id: "dimensions",
    label: "Dimensions & Weight",
    rows: [
      { label: "Overall Length", value: "1,870 mm" },
      { label: "Overall Width", value: "690 mm" },
      { label: "Overall Height", value: "1,160 mm" },
      { label: "Wheelbase", value: "1,265 mm" },
      { label: "Ground Clearance", value: "160 mm" },
      { label: "Seat Height", value: "773 mm" },
      { label: "Kerb Mass", value: "103 kg" },
      { label: "Fuel Tank Capacity", value: "5.0 L" }
    ]
  },
  {
    id: "chassis",
    label: "Chassis & Suspension",
    rows: [
      { label: "Front Suspension", value: "Telescopic, Coil Spring, Oil Damped" },
      { label: "Rear Suspension", value: "Swing Arm" },
      { label: "Front Brake", value: "Disc / Drum" },
      { label: "Rear Brake", value: "Drum" },
      { label: "Front Tyre", value: "90/90-12 54J Tubeless" },
      { label: "Rear Tyre", value: "90/100-10 53J Tubeless" },
      { label: "Battery", value: "Maintenance Free, 12V 3Ah" },
      { label: "Headlight", value: "LED" }
    ]
  }
]

const bikeData = {
  category: "Classic Lifestyle Scooter",
  namePart1: "Access",
  namePart2: "125",
  fullName: "Suzuki Access 125",
  tagline: "A timeless classic that combines retro charm with modern performance. Experience the ultimate comfort and style with the legendary Suzuki Access 125.",
  brochureUrl: "/pdf/access-125-brochure.pdf",
  description: "The Suzuki Access 125 is India's favorite 125cc scooter, known for its premium chrome design, powerful yet efficient performance, and unparalleled comfort. Designed with standard SEP engine technology and rich smartphone connectivity features.",
  quickStats: [
    { label: "Engine", value: "124 cc" },
    { label: "Max Power", value: "8.7 PS" },
    { label: "Max Torque", value: "10.0 Nm" },
    { label: "Fuel Tank", value: "5.0 L" }
  ],
  highlightsStrip: [
    { icon: "⚡", label: "Max Power", value: "8.7 PS", sub: "@6750 rpm" },
    { icon: "🔩", label: "Max Torque", value: "10.0 Nm", sub: "@5500 rpm" },
    { icon: "👷", label: "Cooling", value: "Air Cooled", sub: "4-Stroke" },
    { icon: "🛑", label: "Braking", value: "Disc/Drum", sub: "CBS/ABS" },
    { icon: "⛽", label: "Fuel Tank", value: "5 L", sub: "Capacity" },
    { icon: "🏍️", label: "Kerb Mass", value: "103 kg", sub: "Ready to Ride" }
  ]
}

const featuresList = [
  {
    title: 'Premium LED Headlamp',
    img: '/images/scooters/Access/features/LED HEAD LAMP.webp',
    desc: 'Bright, stylish LED headlamp with chrome surround that lights up the path and gives the scooter a classic, premium look.',
  },
  {
    title: 'Bluetooth Enabled Digital Console',
    img: '/images/scooters/Access/features/COLORED TFT DIGITAL CONSOLE.jpg',
    desc: 'Connect your smartphone via Bluetooth to view Turn-by-Turn navigation, Call/SMS alerts, speed notifications, and phone battery level.',
  },
  {
    title: 'Suzuki Eco Performance (SEP)',
    img: '/images/scooters/Access/features/SUZUKI ECO PERFORMANCE (SEP) TECHNOLOGY.webp',
    desc: 'Suzuki\'s advanced engine technology balances low fuel consumption and high combustion efficiency to deliver excellent performance and mileage.',
  },
  {
    title: 'External Fuel Re-Filling',
    img: '/images/scooters/Access/features/FRONT LOCK OPERATED EXTERNAL FUEL LID.webp',
    desc: 'Convenient external fuel filling operated by key from the multi-function central lock. No need to lift the seat at the petrol station.',
  },
  {
    title: 'Large Under-Seat Storage',
    img: '/images/scooters/Access/features/UNDER SEAT STORAGE.webp',
    desc: 'Spacious under-seat storage compartment to store your helmet, shopping bags, or personal belongings.',
  },
  {
    title: 'USB Socket with LED Outline',
    img: '/images/scooters/Access/features/FRONT USB CHARGING PORT.webp',
    desc: 'Convenient USB outlet on the front to charge your mobile phone on the go. Features an elegant LED light ring for easy locating at night.',
  },
  {
    title: 'Side Stand Interlock',
    img: '/images/scooters/Access/features/SIDE STAND INTERLOCK.webp',
    desc: 'Smart safety features that prevent the engine from starting or cuts off the ignition if the side stand is deployed.',
  },
  {
    title: 'Front Disc Brake & Combined Brake System',
    img: '/images/scooters/Access/features/FRONT DISC BRAKE.webp',
    desc: 'High-quality front disc brake works in tandem with the Combined Brake System (CBS) to ensure short, stable stopping distance.',
  },
  {
    title: 'Chrome Finish Mirrors',
    img: '/images/scooters/Access/features/CHROME FINISH MIRRORS.webp',
    desc: 'Classic round chrome mirrors that offer excellent rear visibility while adding a touch of vintage premium styling.',
  },
  {
    title: 'Longest Seat in the Segment',
    img: '/images/scooters/Access/features/LONG & ERGONIMIC SEAT.webp',
    desc: 'Contoured, long seat that ensures comfortable seating posture and ample space for both the rider and pillion during long rides.',
  },
  {
    title: 'Multi-Function Central Key Lock',
    img: '/images/scooters/Access/features/ONE PUSH CENTRAL LOCK SYSTEM.webp',
    desc: 'Ignition, steering lock, seat release, and external fuel lid opening are all consolidated into one secure, convenient central lock.',
  },
  {
    title: 'Solid Metal Body Panels',
    img: '/images/scooters/Access/features/FRONT METAL FENDER & LEG SHIELD.webp',
    desc: 'Built with a tough steel body shell including the front fender and leg shield to withstand daily city riding with high durability.',
  }
]

const accessoriesList = [
  {
    title: 'Seat Cover (Premium Brown)',
    img: '/images/scooters/Access/accessories/SEAT COVER (BROWN).webp',
    desc: 'Premium dual-tone brown seat cover offering high comfort and a sophisticated vintage feel.',
  },
  {
    title: 'Seat Cover (Classic Maroon)',
    img: '/images/scooters/Access/accessories/SEAT COVER (MAROON).webp',
    desc: 'Signature maroon colored seat cover that adds a bold and custom retro appearance to your Access.',
  },
  {
    title: 'Stylish Meter Visor',
    img: '/images/scooters/Access/accessories/Meter Visor.webp',
    desc: 'Aerodynamic tinted visor mounted on the handlebar to shield the console and add a sporty edge.',
  },
  {
    title: 'Designer Floor Mat (Black)',
    img: '/images/scooters/Access/accessories/FLOOR MAT (BLACK).webp',
    desc: 'Durable, non-slip designer rubber floor mat in black to protect the floorboard from mud and scratches.',
  },
  {
    title: 'Designer Floor Mat (Red)',
    img: '/images/scooters/Access/accessories/FLOOR MAT (RED).webp',
    desc: 'Contrast red designer rubber floor mat that pairs beautifully with matching seat covers.',
  },
  {
    title: 'Premium Rear Footrest',
    img: '/images/scooters/Access/accessories/REAR FOOTREST.webp',
    desc: 'Rugged, lightweight aluminum step bar for passenger pillion comfort and safe grip.',
  }
]

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

export default function Access125Page() {
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
            <Link href="/products/scooters"
              className="inline-flex items-center text-slate-600 hover:text-suzuki-blue mb-4 transition-colors text-sm font-medium">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Scooters
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

      {/* SECTION: OVERVIEW */}
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
                      <Image src={selectedColor.image} alt={'Scooter ' + selectedColor.name} fill
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
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Choose Your Edition</h3>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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
                        <span className={'text-[10px] font-black uppercase tracking-tight text-center ' + (
                          selectedColor.name === c.name ? 'text-suzuki-blue' : 'text-gray-400'
                        )}>{c.color}</span>
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

      {/* STICKY TAB BAR */}
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
      <section id="section-features" className="scroll-mt-32 bg-gray-50 pt-8 pb-16 sm:pt-12 sm:pb-24">
        <div className="w-full relative overflow-hidden mb-16 shadow-xl border-y border-gray-200">
          <Image
            src="/images/Banner/Access-New-Blue_Website-Banner_1920-x-965.jpg"
            alt="Suzuki Access 125 Banner"
            width={1920}
            height={965}
            className="w-full h-auto block"
            unoptimized
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="What Sets It Apart" title="Key" accent="Features"
            subtitle="Every detail of the Suzuki Access 125 is engineered to deliver performance, convenience, and retro style." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {featuresList.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-shadow duration-300 group">
                <div className="relative h-56 overflow-hidden bg-gray-50">
                  <Image src={f.img} alt={f.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                </div>
                <div className="p-5">
                  <h3 className="font-extrabold text-slate-900 text-base uppercase tracking-wide mb-2">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: ACCESSORIES */}
      <section id="section-accessories" className="scroll-mt-32 bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Personalise Your Ride" title="Official" accent="Accessories" subtitle="Genuine Suzuki accessories designed to fit perfectly and built to last." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {accessoriesList.map((item, i) => (
              <motion.div key={item.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: (i % 3) * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-suzuki-blue/30 hover:-translate-y-1 transition-all group">
                <div className="relative h-56 overflow-hidden bg-gray-100 rounded-xl mb-4 flex items-center justify-center p-4">
                  <Image src={item.img} alt={item.title} fill className="object-contain p-2 group-hover:scale-105 transition-transform duration-500" unoptimized />
                </div>
                <h3 className="text-base font-extrabold text-gray-900 uppercase tracking-wider mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: SPECIFICATIONS */}
      <section id="section-specifications" className="scroll-mt-32 bg-gray-50 py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Technical Data" title="Complete" accent="Specifications"
            subtitle="Every detail engineered to perfection — explore the full technical breakdown of the Access 125." />
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
            subtitle="Download the official brochures and technical specifications for the All-New Access 125." 
          />
          
          <div className="mt-12 grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.a
              href="/pdf/access-125-brochure.pdf"
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -4 }} 
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center gap-4 bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-suzuki-blue/30 transition-all group"
            >
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-200">
                <Image 
                  src="/images/scooters/access-125/brochure-1.png" 
                  alt="Access Download Brochure" 
                  fill 
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                  unoptimized 
                />
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mt-2 group-hover:text-suzuki-blue transition-colors">Access Download Brochure</h3>
            </motion.a>

            <motion.a
              href="/pdf/access-125-abs-brochure.pdf"
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -4 }} 
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center gap-4 bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-suzuki-blue/30 transition-all group"
            >
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-200">
                <Image 
                  src="/images/scooters/access-125/brochure-2.png" 
                  alt="Access ABS Download Brochure" 
                  fill 
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                  unoptimized 
                />
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mt-2 group-hover:text-suzuki-blue transition-colors">Access ABS Download Brochure</h3>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Zoom Modal */}
      <ZoomableImageModal
        src={selectedColor.image}
        alt={`Zoomed Access 125 ${selectedColor.name}`}
        isOpen={isZoomed}
        onClose={closeZoom}
      />
    </div>
  )
}
