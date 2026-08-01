'use client'

import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import ZoomableImageModal from '../../../../components/ZoomableImageModal'

const colorVariants = [
  {
    name: 'Metallic Matte Dark Blue',
    color: 'EX',
    hex: '#1E3A8A',
    image: '/images/scooters/Burgman Street Ex/Burgman Street Ex.png',
  }
]

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'features', label: 'Features' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'specifications', label: 'Specifications' },
  { id: 'downloads', label: 'Downloads' },
]

const specTabs = [
  {
    id: "engine",
    label: "Engine",
    rows: [
      { label: "Engine Type", value: "4-Stroke, 1-Cylinder, Air-Cooled, SOHC, 2-Valve" },
      { label: "Displacement", value: "124 cm³" },
      { label: "Bore x Stroke", value: "52.5 mm x 57.4 mm" },
      { label: "Max Power", value: "8.6 PS @ 6,500 rpm" },
      { label: "Max Torque", value: "10.0 Nm @ 5,500 rpm" },
      { label: "Fuel System", value: "Fuel Injection" },
      { label: "Starter System", value: "Kick and Electric (Silent Starter)" },
      { label: "Transmission Type", value: "CVT" }
    ]
  },
  {
    id: "dimensions",
    label: "Dimensions & Weight",
    rows: [
      { label: "Overall Length", value: "1,875 mm" },
      { label: "Overall Width", value: "700 mm" },
      { label: "Overall Height", value: "1,140 mm" },
      { label: "Wheelbase", value: "1,290 mm" },
      { label: "Ground Clearance", value: "160 mm" },
      { label: "Seat Height", value: "780 mm" },
      { label: "Kerb Mass", value: "111 kg" },
      { label: "Fuel Tank Capacity", value: "5.5 L" }
    ]
  },
  {
    id: "chassis",
    label: "Chassis & Suspension",
    rows: [
      { label: "Front Suspension", value: "Telescopic, Coil Spring, Oil Damped" },
      { label: "Rear Suspension", value: "Swing Arm" },
      { label: "Front Brake", value: "Disc" },
      { label: "Rear Brake", value: "Drum" },
      { label: "Front Tyre", value: "90/90-12 54J Tubeless" },
      { label: "Rear Tyre", value: "100/80-12 56L Tubeless" },
      { label: "Battery", value: "Maintenance Free, 12V 3Ah" },
      { label: "Headlight", value: "LED" }
    ]
  }
]

const bikeData = {
  category: "Executive Luxury Scooter",
  namePart1: "Burgman Street",
  namePart2: "EX",
  fullName: "Suzuki Burgman Street EX",
  tagline: "The exclusive Burgman variant with enhanced luxury, advanced tech, and a premium road presence.",
  brochureUrl: "/pdf/burgman-street-ex-brochure.pdf",
  description: "The Suzuki Burgman Street EX features Suzuki Eco Performance Alpha (SEP-α), a larger 12-inch rear wheel, and advanced features like the Engine Auto Stop-Start system for an unmatched executive ride.",
  quickStats: [
    { label: "Engine", value: "124 cc" },
    { label: "Max Power", value: "8.6 PS" },
    { label: "Max Torque", value: "10.0 Nm" },
    { label: "Fuel Tank", value: "5.5 L" }
  ],
  highlightsStrip: [
    { icon: "⚡", label: "Max Power", value: "8.6 PS", sub: "@6500 rpm" },
    { icon: "🔩", label: "Max Torque", value: "10.0 Nm", sub: "@5500 rpm" },
    { icon: "👷", label: "Cooling", value: "Air Cooled", sub: "4-Stroke" },
    { icon: "🛑", label: "Braking", value: "Disc/Drum", sub: "CBS" },
    { icon: "⛽", label: "Fuel Tank", value: "5.5 L", sub: "Capacity" },
    { icon: "🏍️", label: "Kerb Mass", value: "111 kg", sub: "Ready to Ride" }
  ]
}

const featuresList = [
  {
    title: 'Engine Auto Stop-Start (EASS)',
    img: '/images/scooters/burgman-street-ex/features/ENGINE_AUTO_STOP-START_(EASS).jpg',
    desc: 'Automatically stops the engine at traffic lights to reduce fuel consumption and emissions.',
  },
  {
    title: 'Silent Starter System',
    img: '/images/scooters/burgman-street-ex/features/SILENT_STARTER_SYSTEM.jpg',
    desc: 'Ensures a smooth, quiet engine start every time you turn the key.',
  },
  {
    title: '12 Inch Rear Wheel',
    img: '/images/scooters/burgman-street-ex/features/12_INCH_REAR_WHEEL_(30.48CM).jpg',
    desc: 'Larger 12-inch rear wheel enhances stability and provides a smoother ride on rough roads.',
  },
  {
    title: 'Bluetooth Enabled Digital Console',
    img: '/images/scooters/burgman-street-ex/features/BLUETOOTHr_ENABLED_DIGITAL_CONSOLE.jpg',
    desc: 'Connect your smartphone via Bluetooth to view Turn-by-Turn navigation, Call/SMS alerts, and more.',
  },
  {
    title: 'Luxurious LED Headlights',
    img: '/images/scooters/burgman-street-ex/features/LUXURIOUS_LED_HEADLIGHTS_AND_POSITION_LIGHTS.jpg',
    desc: 'Bright, stylish LED headlamp and position lights for superior visibility and a premium look.',
  },
  {
    title: 'LED Rear Combination Light',
    img: '/images/scooters/burgman-street-ex/features/LED_REAR_COMBINATION_LIGHT.jpg',
    desc: 'Elegant and bright LED tail light ensuring you are always visible on the road.',
  },
  {
    title: '21.5L Under Seat Storage',
    img: '/images/scooters/burgman-street-ex/features/21.5_L_UNDER_SEAT_STORAGE.webp',
    desc: 'Spacious under-seat compartment to securely store your helmet and daily essentials.',
  },
  {
    title: '2L Glove Box & Rack',
    img: '/images/scooters/burgman-street-ex/features/2L_GLOVE_BOX_&_RACK_FOR_STORAGE.jpg',
    desc: 'Convenient front storage options for your wallet, phone, or water bottle.',
  },
  {
    title: 'USB Socket',
    img: '/images/scooters/burgman-street-ex/features/USB_SOCKET.jpg',
    desc: 'Charge your smartphone on the go with the easily accessible front USB socket.',
  },
  {
    title: 'Flexible Foot Position',
    img: '/images/scooters/burgman-street-ex/features/FLEXIBLE_FOOT_POSITION_FOR_RIDER.jpg',
    desc: 'Spacious floorboard allowing flexible foot positions for maximum comfort during long rides.',
  },
  {
    title: 'Dual Tone Seat Cover',
    img: '/images/scooters/burgman-street-ex/features/DUAL_TONE_SEAT_COVER.jpg',
    desc: 'Premium dual-tone seat cover that adds a touch of luxury and comfort to your daily commute.',
  },
  {
    title: 'Aluminium Pillion Footrest',
    img: '/images/scooters/burgman-street-ex/features/ALUMINIUM_PILLION_FOOTREST.jpg',
    desc: 'Sturdy and stylish aluminium footrests for the comfort of the pillion rider.',
  },
  {
    title: 'Front Disc Brake',
    img: '/images/scooters/burgman-street-ex/features/FRONT_DISC_BRAKE.jpg',
    desc: 'High-quality front disc brake ensures reliable and secure stopping power.',
  },
  {
    title: 'Side Stand Interlock',
    img: '/images/scooters/burgman-street-ex/features/SIDE_STAND_INTERLOCK.webp',
    desc: 'Safety feature that prevents the engine from starting if the side stand is engaged.',
  },
  {
    title: 'Shutter Key with Central Lock',
    img: '/images/scooters/burgman-street-ex/features/SHUTTER_KEY_WITH_CENTRAL_SEAT_LOCK.jpg',
    desc: 'Advanced security shutter key mechanism with integrated seat opening function.',
  },
  {
    title: 'Compact Body Mount Windscreen',
    img: '/images/scooters/burgman-street-ex/features/COMPACT_BODY_MOUNT_WINDSCREEN.jpg',
    desc: 'Reduces wind blast for a more comfortable riding experience at higher speeds.',
  },
  {
    title: 'Sporty Muffler Cover',
    img: '/images/scooters/burgman-street-ex/features/SPORTY_MUFFLER_COVER.jpg',
    desc: 'Adds a sporty and dynamic aesthetic to the exhaust system.',
  },
  {
    title: 'Dual Tone Inner Leg Shield',
    img: '/images/scooters/burgman-street-ex/features/DUAL_TONE_INNER_LEG_SHIELD.jpg',
    desc: 'Premium dual-tone finish on the inner leg shield elevates the overall design.',
  },
  {
    title: 'Convenient Dual Luggage Hooks',
    img: '/images/scooters/burgman-street-ex/features/CONVENIENT_DUAL_LUGGAGE_HOOKS.jpg',
    desc: 'Practical hooks to securely hang your shopping bags and luggage.',
  }
]

const accessoriesList = [
  {
    title: 'Bar Set, Accessories',
    img: '/images/scooters/burgman-street-ex/accessories/BAR_SET,_ACCESSORIES.jpg',
    desc: 'Stylish bar set for adding functionality and a premium look.',
  },
  {
    title: 'Rear Footrest Side',
    img: '/images/scooters/burgman-street-ex/accessories/REAR_FOOTREST_SIDE.jpg',
    desc: 'Enhances passenger comfort and safety during the ride.',
  },
  {
    title: 'Seat Cover',
    img: '/images/scooters/burgman-street-ex/accessories/SEAT_COVER.jpg',
    desc: 'Protect your original seat while adding an extra layer of style.',
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

export default function BurgmanStreetExPage() {
  const [selectedColor, setSelectedColor] = useState(colorVariants[0])
  const [isZoomed, setIsZoomed] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [specTab, setSpecTab] = useState('engine')

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })
  const tabBarRef = useRef<HTMLDivElement>(null)

  const openZoom = () => { setIsZoomed(true); document.body.style.overflow = 'hidden' }
  const closeZoom = () => { setIsZoomed(false); document.body.style.overflow = 'unset' }

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
                  mouseX.set(((e.clientX - r.left) / r.width - 0.5) * 20)
                  mouseY.set(((e.clientY - r.top) / r.height - 0.5) * 20)
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
            src="/images/scooters/burgman-street-ex/overview_image_v2.webp"
            alt="Suzuki Burgman Street EX Overview"
            width={1920}
            height={600}
            className="w-full h-auto block"
            unoptimized
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="What Sets It Apart" title="Key" accent="Features"
            subtitle="Every detail of the Suzuki Burgman Street EX is engineered to deliver performance, convenience, and retro style." />
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
            subtitle="Every detail engineered to perfection — explore the full technical breakdown of the Burgman Street EX." />
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
            subtitle="Download the official brochures and technical specifications for the All-New Burgman Street EX."
          />

          <div className="mt-12 grid sm:grid-cols-1 gap-8 max-w-xl mx-auto">
            <motion.a
              href="/pdf/burgman-street-ex-brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center gap-4 bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-suzuki-blue/30 transition-all group"
            >
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-sm border border-gray-200">
                <Image
                  src="/images/scooters/burgman-street-ex/overview_image_v2.webp"
                  alt="Burgman Street EX Download Brochure"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-4">
                  <span className="flex items-center gap-2 text-white text-sm font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download PDF
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mt-2 group-hover:text-suzuki-blue transition-colors">Burgman Street EX Download Brochure</h3>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Zoom Modal */}
      <ZoomableImageModal
        src={selectedColor.image}
        alt={`Zoomed Burgman Street EX ${selectedColor.name}`}
        isOpen={isZoomed}
        onClose={closeZoom}
      />
    </div>
  )
}

