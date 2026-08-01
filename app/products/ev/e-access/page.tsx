'use client'

import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import ZoomableImageModal from '../../../../components/ZoomableImageModal'

const colorVariants = [
  {
    name: 'Metallic Mat Black & Metallic Mat Bordeaux Red',
    color: 'CUU',
    hex: '#1A1A1A',
    image: '/images/scooters/e-access/variant-black.png',
  },
  {
    name: 'Pearl Grace White & Metallic Mat Fibroin Gray',
    color: 'C1B',
    hex: '#F0F0F0',
    image: '/images/scooters/e-access/variant-white.png',
  },
  {
    name: 'Pearl Jabe Green & Metallic Mat Fibroin Gray',
    color: 'C1A',
    hex: '#5F7367',
    image: '/images/scooters/e-access/variant-green.png',
  },
  {
    name: 'Metallic Mat Stellar Blue & Metallic Mat Fibroin Gray',
    color: 'CAU',
    hex: '#2B4B7B',
    image: '/images/scooters/e-access/variant-blue.png',
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
    id: "motor-battery",
    label: "Motor & Battery",
    rows: [
      { label: "Battery Type", value: "51.2V LFP (Lithium Iron Phosphate)" },
      { label: "Battery Capacity", value: "60 Ah (3.072 kWh)" },
      { label: "Range", value: "95 km (As per AIS 040)" },
      { label: "Max Power", value: "4.1 kW" },
      { label: "Max Torque", value: "15 Nm" },
      { label: "Drive Modes", value: "SDMS-e (Eco, Ride A, Ride B)" },
      { label: "Charging (Standard 0-100%)", value: "6 Hours 20 Minutes" },
      { label: "Charging (Fast 0-100%)", value: "2 Hours 12 Minutes" },
    ]
  },
  {
    id: "chassis-brakes",
    label: "Chassis & Brakes",
    rows: [
      { label: "Front Suspension", value: "Telescopic, Coil Spring, Oil Damped" },
      { label: "Rear Suspension", value: "Swing Arm Type, Coil Spring, Oil Damped" },
      { label: "Front Brake", value: "Disc Brake" },
      { label: "Rear Brake", value: "Drum Brake" },
      { label: "Front Tyre Size", value: "90/90-12 Tubeless" },
      { label: "Rear Tyre Size", value: "90/100-10 Tubeless" },
      { label: "Drive System", value: "Maintenance-Free Toothed Belt Drive" },
    ]
  },
  {
    id: "dimensions-weight",
    label: "Dimensions & Weight",
    rows: [
      { label: "Overall Length", value: "1,870 mm" },
      { label: "Overall Width", value: "690 mm" },
      { label: "Overall Height", value: "1,160 mm" },
      { label: "Wheel Base", value: "1,265 mm" },
      { label: "Ground Clearance", value: "160 mm" },
      { label: "Seat Height", value: "773 mm" },
      { label: "Kerb Mass", value: "122 kg" },
    ]
  }
]

const vehicleHighlights = [
  {
    icon: '⚡',
    label: 'Max Power',
    value: '4.1 kW',
    sub: 'Peak Output'
  },
  {
    icon: '🔩',
    label: 'Max Torque',
    value: '15 Nm',
    sub: 'Instant Torque'
  },
  {
    icon: '⚙️',
    label: 'Drive Belt',
    value: 'Auto-Tension',
    sub: 'Maintenance-Free'
  },
  {
    icon: '🔋',
    label: 'Battery Life',
    value: '4X LFP',
    sub: 'Lithium Phosphate'
  },
  {
    icon: '🏁',
    label: 'True Range',
    value: '95 km',
    sub: 'As per AIS-040'
  },
  {
    icon: '🐎',
    label: 'Weight',
    value: '122 kg',
    sub: 'Kerb Mass'
  }
]

const featuresList = [
  {
    title: "Suzuki e-Technology",
    img: "/images/products/e-access/features/Suzuki E Technology.jpeg",
    desc: "Stringent testing and advanced LFP battery management for superior safety and drivability."
  },
  {
    title: "Long Years of LFP Battery Life",
    img: "/images/products/e-access/features/LONG YEARS OF LFP BATTERY LIFE.jpg",
    desc: "Lithium Iron Phosphate (LFP) batteries offer four times the cycle life of standard NMC batteries."
  },
  {
    title: "Durable & Safe EV Drivetrain",
    img: "/images/products/e-access/features/DURABLE & SAFE EV DRIVETRAIN.jpg",
    desc: "Built to highest safety standards to withstand water, dust, and diverse weather conditions."
  },
  {
    title: "Constant Power Delivery",
    img: "/images/products/e-access/features/CONSTANT POWER DELIVERY EVEN AT LOW BATTERY CHARGE.jpg",
    desc: "Enjoy consistent performance and quick acceleration even when the battery charge drops."
  },
  {
    title: "Smooth Pickup & Throttle",
    img: "/images/products/e-access/features/SMOOTH PICKUP WITH SYNCHRONISED THROTTLE RESPONSE.jpg",
    desc: "Seamless, lag-free power delivery and smooth pickup for effortless daily city riding."
  },
  {
    title: "Multi-Info Color TFT LCD",
    img: "/images/products/e-access/features/MULTI INFORMATION COLOR TFT LCD DISPLAY.jpg",
    desc: "High-contrast display showing speed, range, battery status, navigation, and alerts."
  },
  {
    title: "Fast Charger",
    img: "/images/products/e-access/features/FAST CHARGER.jpg",
    desc: "Rapid charging capability that charges the battery from 0% to 100% in 2h 12m."
  },
  {
    title: "Portable Charger",
    img: "/images/products/e-access/features/PORTABLE CHARGER - EASY TO CARRY.jpg",
    desc: "A compact and light charger to plug into standard 15A home sockets for easy flexibility."
  },
  {
    title: "Maintenance-Free Drive Belt",
    img: "/images/products/e-access/features/Maintenance Free Drive Belt.jpg",
    desc: "Clean, quiet, and durable toothed belt drive with auto-tensioner technology."
  },
  {
    title: "Distinctive LED Headlamp",
    img: "/images/products/e-access/features/Distinctive Led Head Lamo.jpg",
    desc: "Sleek and bright LED headlamp providing superior road illumination and modern style."
  },
  {
    title: "New LED Position Lamp",
    img: "/images/products/e-access/features/New Led Position Lamp.jpg",
    desc: "Stylish front LED position lights that enhance both daytime safety and aesthetics."
  },
  {
    title: "LED Tail Lamp",
    img: "/images/products/e-access/features/Led Tail Lamp.jpg",
    desc: "Sharp and bright rear LED tail lamp ensuring high visibility for tailing vehicles."
  },
  {
    title: "Distinctive Raised Emblems",
    img: "/images/products/e-access/features/Distinctive Raised Emblems.jpg",
    desc: "Premium raised chrome emblems highlighting the Suzuki heritage and e-Access brand."
  },
  {
    title: "Front Disc Brake",
    img: "/images/products/e-access/features/Front Disc Brake.jpg",
    desc: "Front disc brake provides strong, reliable stopping power for safe urban maneuvering."
  },
  {
    title: "Front USB Charging Port",
    img: "/images/products/e-access/features/FRONT USB CHARGING PORT.jpg",
    desc: "Conveniently located USB charger in the front pocket to keep your phone powered."
  },
  {
    title: "Long Ergonomic Seat",
    img: "/images/products/e-access/features/Long Ergonomic Seat.jpg",
    desc: "Extremely spacious and well-padded seat designed for maximum rider and passenger comfort."
  },
  {
    title: "Under-Seat Storage",
    img: "/images/products/e-access/features/UNDER SEAT STORAGE.jpg",
    desc: "Large and practical under-seat storage space to accommodate helmets, bags, and items."
  },
  {
    title: "Motor Start/Stop Switch",
    img: "/images/products/e-access/features/Motor Start stop switch.jpg",
    desc: "Convenient handlebar mounted switch to instantly start or stop the motor system."
  },
  {
    title: "Hazard Switch",
    img: "/images/products/e-access/features/Hazard Switch.jpg",
    desc: "Integrated hazard light switch to warn other vehicles in low-visibility situations."
  },
  {
    title: "Alloy Wheels & Tires",
    img: "/images/products/e-access/features/INCH FRONT AND REAR.jpg",
    desc: "Styled alloy wheels offering exceptional road stability and riding comfort."
  },
  {
    title: "Seat Lock",
    img: "/images/products/e-access/features/Seat Lock.jpg",
    desc: "Integrated multi-function key slot for easy and secure under-seat lock operation."
  },
  {
    title: "Under-Seat Hook",
    img: "/images/products/e-access/features/Under Seat Hook.jpg",
    desc: "Convenient foldaway hook under the seat to carry shopping bags securely."
  }
]

const placeholderAccessories = [
  { title: 'Floor Mat (Black)', img: '/images/products/e-access/accessories/Floor Mat Balck.webp', desc: 'Custom fit anti-slip black floor mat to protect the footboard from dust and wear.' },
  { title: 'Meter Visor (Tinted)', img: '/images/products/e-access/accessories/METER VISOR (TINTED).webp', desc: 'Tinted meter visor to shield the digital instrument console from sun glare and dust.' },
  { title: 'Rear Footrest', img: '/images/products/e-access/accessories/REAR FOOTREST.webp', desc: 'Sturdy, high-quality rear pillion footrest for additional safety and comfort.' },
  { title: 'Seat Cover (Black)', img: '/images/products/e-access/accessories/SEAT COVER (BLACK).webp', desc: 'Premium black seat cover offering advanced grip and protection against heat.' },
  { title: 'Premium Seat Cover', img: '/images/products/e-access/accessories/SEAT COVER.webp', desc: 'Durable, high-density styled seat cover to protect upholstery from wear.' },
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
        {title} <span className="text-suzuki-blue">{accent}</span>
      </h2>
      <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg">{subtitle}</p>
    </motion.div>
  )
}

export default function EAccessPage() {
  const [selectedColor, setSelectedColor] = useState(colorVariants[0])
  const [zoomedImage, setZoomedImage] = useState<{src: string, alt: string} | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [specTab, setSpecTab] = useState('motor-battery')

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })
  const tabBarRef = useRef<HTMLDivElement>(null)

  const openZoom = (src: string, alt: string) => {
    setZoomedImage({ src, alt })
    document.body.style.overflow = 'hidden'
  }

  const closeZoom = () => {
    setZoomedImage(null)
    document.body.style.overflow = 'unset'
  }

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
      
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-50 to-blue-100/30" />
        <div className="absolute -right-20 top-10 w-64 h-64 bg-suzuki-blue/10 blur-3xl rounded-full" />
        <div className="absolute -left-24 -bottom-12 w-72 h-72 bg-blue-400/10 blur-3xl rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full flex justify-start"
          >
            <Link href="/products/ev" className="inline-flex items-center text-slate-600 hover:text-suzuki-blue mb-4 transition-colors text-sm font-medium">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to EV
            </Link>
          </motion.div>
          
          <motion.p
            className="text-xs uppercase tracking-[0.25em] text-suzuki-blue mb-3 font-bold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            The Future of Urban Mobility
          </motion.p>
          
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-slate-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            e-<span className="text-suzuki-blue">Access</span>
          </motion.h1>
          
          <motion.p
            className="text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Experience the legendary Access style in its most advanced form. Suzuki's first electric scooter delivers silent performance with zero emissions.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link href="/enquiry/get-quote">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-suzuki-blue text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-suzuki-blue/20 hover:bg-blue-700 transition-all flex items-center gap-2"
              >
                Get Quote
              </motion.button>
            </Link>
            
            <a href="#section-downloads">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white border-2 border-suzuki-blue text-suzuki-blue px-8 py-3 rounded-full font-bold hover:bg-suzuki-blue hover:text-white transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Download Brochure
              </motion.button>
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* SECTION: OVERVIEW (Above the sticky tab bar) */}
      <section id="section-overview" className="scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-start">
            
            {/* Interactive Image Container */}
            <div>
              <motion.div
                className="relative aspect-square sm:aspect-video lg:aspect-square bg-slate-50 rounded-[40px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] cursor-crosshair group"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width - 0.5;
                  const y = (e.clientY - rect.top) / rect.height - 0.5;
                  mouseX.set(x * 20);
                  mouseY.set(y * 20);
                }}
                onMouseLeave={() => {
                  mouseX.set(0);
                  mouseY.set(0);
                }}
                onClick={() => openZoom(selectedColor.image, selectedColor.name)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedColor.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className="relative w-full h-full p-8"
                    style={{ rotateX: springY, rotateY: springX, transformStyle: "preserve-3d" }}
                  >
                    <Image
                      src={selectedColor.image}
                      alt={selectedColor.name}
                      fill
                      className="object-contain drop-shadow-[0_45px_100px_rgba(0,0,0,0.15)]"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Highlight Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/50 text-xs font-bold uppercase tracking-widest text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">
                  Interactive 3D View
                </div>
              </motion.div>
              
              {/* Color Selector */}
              <div className="mt-10">
                <div className="flex flex-col mb-6">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Available Colours</h3>
                  <p className="text-suzuki-blue font-bold text-lg transition-all duration-300">
                    {selectedColor.name}
                  </p>
                </div>
                <div className="flex flex-wrap gap-5">
                  {colorVariants.map((variant) => (
                    <motion.button
                      key={variant.color}
                      onClick={() => setSelectedColor(variant)}
                      className={`group relative p-1 rounded-full transition-all duration-300 ${
                        selectedColor.color === variant.color 
                          ? 'ring-2 ring-suzuki-blue ring-offset-4 scale-110' 
                          : 'hover:scale-110'
                      }`}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div 
                        className="w-12 h-12 rounded-full border border-slate-200 shadow-md"
                        style={{ backgroundColor: variant.hex }}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Left Column: 3 Things to Know (As shown in the second screenshot) */}
              <div className="mt-16">
                <h3 className="text-xl font-bold mb-6">3 Things to Know About E Access</h3>
                <div className="space-y-6">
                  {[
                    {
                      title: 'Colour TFT LCD',
                      desc: 'Colour TFT LCD has good visibility in day and night displaying real-time data. Also has Bluetooth connectivity.',
                      image: '/images/products/e-access/highlight-tft-real.jpg'
                    },
                    {
                      title: 'Smart Performance',
                      desc: 'With its seamless throttle response, ride modes help extract the best range/performance as required.',
                      image: '/images/products/e-access/highlight-throttle-real.jpg'
                    },
                    {
                      title: 'Superior Comfort',
                      desc: 'Suspension setup is excellent in terms of comfort and handling characteristics.',
                      image: '/images/products/e-access/highlight-suspension-real.jpg'
                    }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 flex items-center group cursor-zoom-in"
                      whileHover={{ x: 10 }}
                      onClick={() => openZoom(item.image, item.title)}
                    >
                      <div className="relative w-32 h-24 sm:w-40 sm:h-28 overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="p-4 sm:p-5 flex flex-col">
                        <h4 className="font-bold text-sm mb-1 group-hover:text-suzuki-blue transition-colors">{item.title}</h4>
                        <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Details & Book Your e-Access specs box */}
            <div className="space-y-12 lg:sticky lg:top-24">
              {/* Main Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <p className="text-3xl font-black text-suzuki-blue">95 km</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1 text-nowrap">True EV Range</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <p className="text-3xl font-black text-suzuki-blue">1.2h</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1 text-nowrap">Fast Charging (80%)</p>
                </div>
              </div>

              {/* Overview Features Teaser */}
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-slate-700">Premium Tech Teaser</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <span className="text-suzuki-blue text-base">⚡</span> 4X Longer LFP Battery Life Cycle
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <span className="text-suzuki-blue text-base">🛡️</span> Durable & Safe Waterproof EV Drivetrain
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <span className="text-suzuki-blue text-base">🔄</span> Maintenance-Free Toothed Drive Belt
                  </li>
                </ul>
              </div>

              {/* CTA Section (Matching second image, Book Your e-Access box on the right) */}
              <section className="bg-slate-900 rounded-[40px] p-8 sm:p-12 text-white">
                <h3 className="text-2xl font-bold mb-4 text-suzuki-blue uppercase tracking-wider">e-Access Specifications</h3>
                <p className="text-sm text-slate-400 mb-8">Experience zero emissions, instant torque, and silent performance in the classic style of Access.</p>
                <div className="space-y-4">
                  {[
                    { label: 'Battery Capacity', value: '3.072 kWh' },
                    { label: 'Max Power', value: '4.1 kW' },
                    { label: 'Certified Range', value: '95 km' },
                    { label: 'Charging (Fast)', value: '0-100% in 2h 12m' },
                  ].map((spec, i) => (
                    <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                      <span className="text-slate-400 text-sm font-medium">{spec.label}</span>
                      <span className="text-sm font-bold text-white">{spec.value}</span>
                    </div>
                  ))}
                </div>
                <Link href="/enquiry/get-quote" className="inline-block w-full mt-10">
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: '#ffffff', color: '#004A99' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-suzuki-blue text-white py-4 rounded-2xl font-bold transition-all shadow-xl text-center block"
                  >
                    Book Your e-Access
                  </motion.button>
                </Link>
              </section>
            </div>
          </div>
        </div>

        {/* Highlights strip (Navy/Gray style matching Image 1) */}
        <div className="bg-slate-900 py-10 sm:py-14 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-center text-white/70 text-xs font-bold uppercase tracking-[0.2em] mb-8">KEY VEHICLE HIGHLIGHTS</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {vehicleHighlights.map((item, i) => (
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

      {/* STICKY TAB BAR (Placed directly below Key Vehicle Highlights, matching other pages) */}
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
      <section id="section-features" className="scroll-mt-32 bg-gray-50 pb-16 sm:pb-24 border-t border-gray-100">
        {/* Full-width Overview Banner at the top of Features, matching Gixxer/V-Strom banner placement */}
        <div className="w-full relative overflow-hidden shadow-xl border-b border-gray-200 bg-slate-50 mb-16">
          <Image
            src="/images/products/e-access/overview-ev.png"
            alt="Suzuki e-Access Overview Banner"
            width={1600}
            height={800}
            className="w-full h-auto object-cover max-h-[75vh] cursor-zoom-in"
            onClick={() => openZoom('/images/products/e-access/overview-ev.png', 'Suzuki e-Access Overview Banner')}
            unoptimized
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            eyebrow="Safety & Technology" 
            title="Premium" 
            accent="Features" 
            subtitle="Discover the advanced technology and design elements that set the e-Access apart."
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {featuresList.map((feature, i) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} 
                transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 group cursor-zoom-in"
                onClick={() => openZoom(feature.img, feature.title)}
              >
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <Image 
                    src={feature.img} 
                    alt={feature.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    unoptimized 
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-extrabold text-slate-900 text-base uppercase tracking-wide mb-2 group-hover:text-suzuki-blue transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: ACCESSORIES */}
      <section id="section-accessories" className="scroll-mt-32 bg-white py-16 sm:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            eyebrow="Personalise Your Ride" 
            title="Official" 
            accent="Accessories" 
            subtitle="Genuine Suzuki accessories designed to fit perfectly and built to last." 
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {placeholderAccessories.map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} 
                transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-shadow duration-300 group"
              >
                <div className="relative h-56 overflow-hidden bg-gray-50">
                  <Image 
                    src={item.img} 
                    alt={item.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    unoptimized 
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-extrabold text-slate-900 text-base uppercase tracking-wide mb-1">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/contact">
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="bg-suzuki-blue text-white px-10 py-4 rounded-full font-bold shadow-lg shadow-suzuki-blue/20 inline-flex items-center gap-2"
              >
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
      <section id="section-specifications" className="scroll-mt-32 bg-gray-50 py-16 sm:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            eyebrow="Technical Data" 
            title="Complete" 
            accent="Specifications"
            subtitle="Every detail engineered to perfection — explore the full technical breakdown of the machine." 
          />
          
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-10 mb-8">
            {specTabs.map((tab) => (
              <motion.button 
                key={tab.id} 
                onClick={() => setSpecTab(tab.id)}
                whileHover={{ scale: 1.04 }} 
                whileTap={{ scale: 0.96 }}
                className={'px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border-2 ' + (
                  specTab === tab.id
                    ? 'bg-suzuki-blue text-white border-suzuki-blue shadow-lg'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-suzuki-blue hover:text-suzuki-blue'
                )}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
          
          <AnimatePresence mode="wait">
            {specTabs.filter(t => t.id === specTab).map(tab => (
              <motion.div 
                key={tab.id}
                initial={{ opacity: 0, y: 16 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
              >
                <div className="bg-gradient-to-r from-suzuki-blue to-blue-700 px-6 sm:px-10 py-5">
                  <h3 className="text-white text-xl sm:text-2xl font-extrabold tracking-wide uppercase">
                    {tab.label}
                  </h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {tab.rows.map((row, i) => (
                    <motion.div 
                      key={row.label}
                      className="grid grid-cols-2 px-6 sm:px-10 py-4 hover:bg-suzuki-blue/5 transition-colors"
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <span className="text-suzuki-blue font-semibold text-sm sm:text-base">
                        {row.label}
                      </span>
                      <span className="text-gray-800 font-bold text-sm sm:text-base">
                        {row.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* SECTION: DOWNLOADS */}
      <section id="section-downloads" className="scroll-mt-32 py-16 sm:py-24 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader 
            eyebrow="Resources" 
            title="Official" 
            accent="Downloads"
            subtitle="Download technical sheets and the official vehicle brochure." 
          />
          
          <div className="mt-12 grid sm:grid-cols-1 gap-8 max-w-xl mx-auto">
            <motion.a
              href="/pdf/e-access-brochure.pdf"
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -4 }} 
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center gap-4 bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-suzuki-blue/30 transition-all group"
            >
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-gray-50 flex items-center justify-center">
                <Image 
                  src="/images/products/e-access/e-access-brochure-thumb.png" 
                  alt="eAccess Download Brochure" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  unoptimized 
                />
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mt-2 group-hover:text-suzuki-blue transition-colors">eAccess Download Brochure</h3>
            </motion.a>
          </div>

          {/* Final CTA */}
          <motion.div 
            className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 sm:p-12 text-center"
            initial={{ opacity: 0, y: 24 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">Ready to Ride?</h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Visit Adharvaa Suzuki and experience the silent electric revolution today. Book a test ride or get a quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/enquiry/get-quote">
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="bg-suzuki-blue text-white px-10 py-4 rounded-full font-extrabold text-base shadow-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                  Book a Test Ride
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white/30 text-white px-10 py-4 rounded-full font-bold text-base hover:bg-white/10 transition-all"
                >
                  Talk to an Expert
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal for viewing zoomed-in images */}
      <ZoomableImageModal
        src={zoomedImage?.src || ''}
        alt={zoomedImage?.alt || ''}
        isOpen={!!zoomedImage}
        onClose={closeZoom}
      />
    </div>
  )
}
