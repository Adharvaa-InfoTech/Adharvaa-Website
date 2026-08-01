'use client'

import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import ZoomableImageModal from '../../../../components/ZoomableImageModal'

const colorVariants = [
  {
    "name": "Blue",
    "hex": "#1E40AF",
    "image": "/images/bikes/gixxer-sf-250/Gixxer SF 250 Blue Colour.png"
  },
  {
    "name": "Red",
    "hex": "#DC2626",
    "image": "/images/bikes/gixxer-sf-250/Gixxer SF 250 Red Colour.png"
  },
  {
    "name": "Black",
    "hex": "#000000",
    "image": "/images/bikes/gixxer-sf-250/Gixxer SF 250 Black Colour.png"
  }
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
    "id": "engine",
    "label": "Engine",
    "rows": [
      { "label": "Engine Type",       "value": "4-Cycle, 1-Cylinder, Oil Cooled" },
      { "label": "Valve System",       "value": "SOHC" },
      { "label": "Displacement",       "value": "249 cm³" },
      { "label": "Bore x Stroke",      "value": "76mm x 54.9mm" },
      { "label": "Compression Ratio",  "value": "10.7 : 1" },
      { "label": "Max Power",          "value": "26.5 PS @ 9,300 rpm (E20)" },
      { "label": "Max Torque",         "value": "22.2 Nm @ 7,300 rpm" },
      { "label": "Fuel System",        "value": "Fuel Injection" },
      { "label": "Starter System",     "value": "Electric" },
      { "label": "Lubrication System", "value": "Wet Sump" },
      { "label": "Transmission Type",  "value": "6 Speed, MT" }
    ]
  },
  {
    "id": "dimensions",
    "label": "Dimensions & Weight",
    "rows": [
      { "label": "Wheels",             "value": "Cast" },
      { "label": "Overall Length",     "value": "2010 mm" },
      { "label": "Overall Width",      "value": "740 mm" },
      { "label": "Overall Height",     "value": "1035 mm" },
      { "label": "Wheel Base",         "value": "1345 mm" },
      { "label": "Ground Clearance",   "value": "165 mm" },
      { "label": "Seat Height",        "value": "800 mm" },
      { "label": "Kerb Mass",          "value": "161 kg" },
      { "label": "Fuel Tank Capacity", "value": "12 L" }
    ]
  },
  {
    "id": "chassis",
    "label": "Chassis & Brakes",
    "rows": [
      { "label": "Frame Type",         "value": "Trellis / Diamond" },
      { "label": "Front Suspension",   "value": "Telescopic" },
      { "label": "Rear Suspension",    "value": "Swing Arm" },
      { "label": "Front Brake",        "value": "Disc" },
      { "label": "Rear Brake",         "value": "Disc" },
      { "label": "ABS",                "value": "Dual Channel ABS" },
      { "label": "Front Tyre",         "value": "110/70R17M/C 54S" },
      { "label": "Rear Tyre",          "value": "150/60R17M/C 66S" },
      { "label": "Battery",            "value": "Maintenance Free, 12V 6Ah" },
      { "label": "Headlight",          "value": "LED" },
      { "label": "Tail Light",         "value": "LED" }
    ]
  }
]

const bikeData = {
  "category": "Performance Sport",
  "namePart1": "GIXXER SF",
  "namePart2": "250",
  "fullName": "GIXXER SF 250",
  "tagline": "Unleash the racer within with the GIXXER SF 250. Engineered for high-speed performance and precision handling, it is the ultimate quarter-liter sportbike.",
  "brochureUrl": "/pdf/gixxer-sf-250-brochure.pdf",
  "description": "The GIXXER SF 250 is a pure racing-inspired sportbike featuring Suzuki Oil Cooling System (SOCS) technology. Designed to deliver high power output, excellent efficiency, and precise handling characteristics for the streets and track.",
  "quickStats": [
    {
      "label": "Engine",
      "value": "249 cc SOCS"
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
      "label": "Tyres",
      "value": "Radials"
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
      "icon": "🔗",
      "label": "Gearbox",
      "value": "6-Speed",
      "sub": "Manual"
    },
    {
      "icon": "🛑",
      "label": "ABS",
      "value": "Dual Ch.",
      "sub": "Braking"
    },
    {
      "icon": "🏁",
      "label": "Cooling",
      "value": "SOCS",
      "sub": "Oil Cooled"
    },
    {
      "icon": "🐎",
      "label": "Weight",
      "value": "161 kg",
      "sub": "Kerb Mass"
    }
  ],
  "featuresList": [
    {
      "icon": "🔗",
      "title": "SOCS Engine Masterpiece",
      "desc": "Suzuki Oil Cooling System (SOCS) offers high power outputs without the weight of water jackets, maintaining engine longevity."
    },
    {
      "icon": "💡",
      "title": "Sporty LED Headlamp",
      "desc": "Wide-angle, compact LED headlamp layout gives excellent visibility and a sleek forward profile."
    },
    {
      "icon": "📈",
      "title": "Twin-Muffler Exhaust",
      "desc": "Dual-exit exhaust canister tuned for high-rev acoustics, finished in deep brushed chrome accents."
    },
    {
      "icon": "📊",
      "title": "Full Digital Console",
      "desc": "Full LCD dash with shift timing lights, gear indicator, odometer, and trip readings."
    },
    {
      "icon": "🛡️",
      "title": "Dual Channel ABS",
      "desc": "State-of-the-art ABS controller watches wheel lockup under severe sports braking."
    },
    {
      "icon": "🧲",
      "title": "Clip-on Handlebars",
      "desc": "Racy clip-on bars offer an aerodynamic sport tuck position for cornering stability."
    }
  ],
  "accessoriesList": [
    {
      "icon": "🛡️",
      "title": "Carbon Tank Pad",
      "desc": "Sleek carbon-fiber texture adhesive protector prevents paint scratches from riding gear."
    },
    {
      "icon": "🔧",
      "title": "Billet Handlebar Ends",
      "desc": "Heavy weight anodized aluminum bar ends to minimize high frequency vibrations."
    },
    {
      "icon": "🏁",
      "title": "Pillion Seat Cowl",
      "desc": "Body-colored single seat cowl that easily snaps on for a pure race track aesthetic."
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



      {/* SECTION: COLOR PICKER / HERO (Above Tabs) */}
      <section className="scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">

            {/* Sticky bike image */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
              className="lg:sticky lg:top-36">
              <motion.div
                className="relative h-[380px] sm:h-[500px] lg:h-[620px] bg-slate-50 rounded-3xl overflow-hidden shadow-2xl cursor-crosshair group"
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
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-full font-medium tracking-wider pointer-events-none">
                  Click to Zoom
                </div>
              </motion.div>
            </motion.div>

            {/* Info card */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}>
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">{bikeData.fullName}</h2>
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
                          selectedColor.name === c.name ? 'border-suzuki-blue scale-110' : 'border-gray-300'
                        )} style={{ backgroundColor: c.hex }} />
                        <span className={'text-xs font-semibold ' + (
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
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">{s.label}</p>
                      <p className="text-xl font-extrabold text-suzuki-blue">{s.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button onClick={openZoom} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-4 rounded-xl font-bold flex items-center justify-center gap-2 border border-gray-200 text-sm">
                    <svg className="w-5 h-5 text-suzuki-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                    Zoom View
                  </motion.button>
                  <Link href="/enquiry/get-quote" className="flex-1">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="w-full bg-suzuki-blue text-white px-5 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-suzuki-blue/20 text-sm">
                      Get a Quote
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Highlights strip */}
        <div className="bg-slate-900 py-10 sm:py-14 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-center text-white/70 text-xs font-bold uppercase tracking-[0.2em] mb-8">KEY VEHICLE HIGHLIGHTS</h3>
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
      {/* SECTION: OVERVIEW (Real screenshots from Suzuki official site) */}
      <section id="section-overview" className="scroll-mt-32 bg-white">
        <div className="w-full">
          <Image src="/images/bikes/gixxer-sf-250/tabs/overview-1.png" alt="Gixxer SF 250 Overview" width={1920} height={1080} className="w-full h-auto" unoptimized />
        </div>
      </section>

      {/* SECTION: FEATURES */}
      <section id="section-features" className="scroll-mt-32 bg-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="What Sets It Apart" title="Key" accent="Features" subtitle="Every detail of the Gixxer SF 250 is engineered to deliver a thrilling, confident ride." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              { title: 'LED Headlamp',                img: '/images/bikes/gixxer-sf-250/features/LED_HEADLAMP.webp',                desc: 'Bright, sharp LED headlamp for superior night visibility and a sporty modern look.' },
              { title: 'LED Tail Lamp',               img: '/images/bikes/gixxer-sf-250/features/LED_TAIL_LAMP.jpg',                desc: 'Distinctive LED tail lamp that ensures you are always noticed on the road.' },
              { title: 'Suzuki Easy Start System',    img: '/images/bikes/gixxer-sf-250/features/Suzuki_Easy_Start_System.jpg',     desc: 'Start the bike effortlessly with a single button press — no choke required.' },
              { title: '250cc SEP Engine',            img: '/images/bikes/gixxer-sf-250/features/SEP_ENGINE.jpg',                   desc: 'Advanced SEP engine delivering strong linear power, high durability and low fuel consumption.' },
              { title: '6-Speed Gearbox',             img: '/images/bikes/gixxer-sf-250/features/6-Speed_Gearbox.jpg',             desc: 'Smooth 6-speed constant mesh transmission for confident, precise gear shifts.' },
              { title: 'Front Bigger Disc + Dual ABS',img: '/images/bikes/gixxer-sf-250/features/Front_Bigger_Disc_ABS.jpg',       desc: 'Bigger front disc brake with dual channel ABS for safe, confident stopping power.' },
              { title: 'Wider Tyres',                 img: '/images/bikes/gixxer-sf-250/features/Wider_Tyres.webp',                 desc: 'Wide tyres provide exceptional grip and stability on all road conditions.' },
              { title: 'Rear Tyre Hugger',            img: '/images/bikes/gixxer-sf-250/features/REAR_TYRE_HUGGER.jpg',            desc: 'Rear tyre hugger for a clean, sporty silhouette and effective mud protection.' },
              { title: 'Split Seat & Grab Rail',      img: '/images/bikes/gixxer-sf-250/features/SPLIT_SEAT_Grab_Rail.jpg',        desc: 'Ergonomically designed split seat with grab rail for rider and pillion comfort.' },
              { title: 'Clip-On Handle Bars',         img: '/images/bikes/gixxer-sf-250/features/CLIP-ON_HANDLE_BAR_(FOR_GIXXER_SF).jpg', desc: 'Sporty clip-on handlebars for an aggressive riding posture and precise steering.' },
              { title: 'Twin Muffler',                img: '/images/bikes/gixxer-sf-250/features/TWIN_MUFFLER.jpg',                desc: 'Chrome twin muffler with a deep, sporty exhaust note that turns heads.' },
              { title: 'Side Stand Interlock',        img: '/images/bikes/gixxer-sf-250/features/SIDE_STAND_INTERLOCK.webp',       desc: 'Side stand interlock system prevents accidental riding with the stand deployed.' },
            ].map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <Image src={f.img} alt={f.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized onError={(e) => { (e.target as HTMLImageElement).style.display='none' }} />
                </div>
                <div className="p-5">
                  <h3 className="font-extrabold text-slate-900 text-base uppercase tracking-wide mb-1">{f.title}</h3>
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
            {[
              { title: 'DC Socket',                img: '/images/bikes/gixxer-sf-250/accessories/DC_Socket.webp',               desc: 'USB/DC charging socket to keep your devices powered on the go.' },
              { title: 'Front Bumper',             img: '/images/bikes/gixxer-sf-250/accessories/Front_Bumper.webp',            desc: 'Sturdy front bumper guard to protect the engine from impacts.' },
              { title: 'Knuckle Cover',            img: '/images/bikes/gixxer-sf-250/accessories/Knuckle_Cover.webp',           desc: 'Sporty knuckle covers providing hand protection and a premium look.' },
              { title: 'Meter Visor',              img: '/images/bikes/gixxer-sf-250/accessories/Meter_Visor.webp',             desc: 'Clear meter visor to shield the instrument cluster from glare and dust.' },
              { title: 'Seat Cover',               img: '/images/bikes/gixxer-sf-250/accessories/Seat_Cover.webp',              desc: 'Premium seat cover for enhanced comfort and style on long rides.' },
              { title: 'Tank Pad Silver',          img: '/images/bikes/gixxer-sf-250/accessories/Tap_Set_Tank_Pad_Silver.webp', desc: 'Silver tank pad tape set to protect the fuel tank from scratches.' },
              { title: 'Tank Pad Blue',            img: '/images/bikes/gixxer-sf-250/accessories/Tape_Set_Tank_Pad_Blue.webp',  desc: 'Blue tank pad tape set matching the signature Suzuki blue colour.' },
              { title: 'Knee Grip Pad',            img: '/images/bikes/gixxer-sf-250/accessories/Tape_Set_Knee_Grip_pad.webp',  desc: 'Anti-slip knee grip pad tape set for better control and comfort.' },
              { title: 'Protection Tape Set',      img: '/images/bikes/gixxer-sf-250/accessories/Tape_Set_Protection.webp',     desc: 'Full protection tape set to guard key areas of the bike from wear.' },
            ].map((item, i) => (
              <motion.div key={item.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-shadow duration-300 group">
                <div className="relative h-56 overflow-hidden bg-gray-50">
                  <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                </div>
                <div className="p-5">
                  <h3 className="font-extrabold text-slate-900 text-base uppercase tracking-wide mb-1">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enquire CTA */}
          <div className="mt-12 text-center">
            <Link href="/contact">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="bg-suzuki-blue text-white px-10 py-4 rounded-full font-bold shadow-lg shadow-suzuki-blue/20 inline-flex items-center gap-2">
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
      <section id="section-specifications" className="scroll-mt-32 bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Technical Data" title="Complete" accent="Specifications"
            subtitle="Every detail engineered to perfection — explore the full technical breakdown of the machine." />
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-10 mb-8">
            {specTabs.map((tab) => (
              <motion.button key={tab.id} onClick={() => setSpecTab(tab.id)}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className={'px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border-2 ' + (
                  specTab === tab.id
                    ? 'bg-suzuki-blue text-white border-suzuki-blue shadow-lg'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-suzuki-blue hover:text-suzuki-blue'
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
                <div className="bg-gradient-to-r from-suzuki-blue to-blue-700 px-6 sm:px-10 py-5">
                  <h3 className="text-white text-xl sm:text-2xl font-extrabold tracking-wide uppercase">{tab.label}</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {tab.rows.map((row, i) => (
                    <motion.div key={row.label}
                      className="grid grid-cols-2 px-6 sm:px-10 py-4 hover:bg-suzuki-blue/5 transition-colors"
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}>
                      <span className="text-suzuki-blue font-semibold text-sm sm:text-base">{row.label}</span>
                      <span className="text-gray-800 font-bold text-sm sm:text-base">{row.value}</span>
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
            subtitle="Download the official brochures and technical specifications for the GIXXER SF 250." 
          />
          
          <div className="mt-12 grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.a
              href="/pdf/gixxer-sf-250-brochure.pdf"
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -4 }} 
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center gap-4 bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-suzuki-blue/30 transition-all group"
            >
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-gray-50 flex items-center justify-center">
                <Image 
                  src="/images/bikes/gixxer-sf-250/gixxer-sf-250-ffv-brochure-thumb.jpg" 
                  alt="GIXXER SF 250 FFV Download Brochure" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  unoptimized 
                />
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mt-2 group-hover:text-suzuki-blue transition-colors">GIXXER SF 250 FFV Download Brochure</h3>
            </motion.a>

            <motion.a
              href="/pdf/gixxer-sf-250-brochure.pdf"
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -4 }} 
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center gap-4 bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-suzuki-blue/30 transition-all group"
            >
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-gray-50 flex items-center justify-center">
                <Image 
                  src="/images/bikes/gixxer-sf-250/gixxer-sf-250-brochure-thumb.jpg" 
                  alt="GIXXER SF 250 Download Brochure" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  unoptimized 
                />
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mt-2 group-hover:text-suzuki-blue transition-colors">GIXXER SF 250 Download Brochure</h3>
            </motion.a>
          </div>
        </div>
      </section>


      {/* Final CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">Ready to Ride?</h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Visit Adharvaa Suzuki and take a test ride today. Our experts are ready to help you find your perfect companion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/enquiry/get-quote">
                <motion.button whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(228,0,43,0.4)' }} whileTap={{ scale: 0.95 }}
                  className="bg-suzuki-red text-white px-10 py-4 rounded-full font-extrabold text-base shadow-lg flex items-center gap-2">
                  Book a Test Ride
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="border-2 border-white/30 text-white px-10 py-4 rounded-full font-bold text-base hover:bg-white/10 transition-all">
                  Talk to an Expert
                </motion.button>
              </Link>
            </div>
          </motion.div>
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