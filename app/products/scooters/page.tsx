'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface Variant {
  name: string
  image: string
}

interface ScooterCard {
  id: string
  name: string
  description: string
  cardImage: string
  link: string
  variants: Variant[]
}

const scooterCards: ScooterCard[] = [

  {
    id: 'access-125',
    name: 'Access 125',
    description: 'Trusted, efficient and comfortable everyday scooter.',
    cardImage: '/images/scooters/cards/Access 125.jpg',
    link: '/products/scooters/access-125',
    variants: [
      { name: 'Standard Edition', image: '/images/scooters/Access/Access Standard Edition.png' },
      { name: 'Special Edition', image: '/images/scooters/Access/Access Special Edition.png' },
      { name: 'Ride Connect Edition', image: '/images/scooters/Access/Access Ride Connect Edition.png' },
      { name: 'Connect TFT Edition', image: '/images/scooters/Access/Access Connect TFT Edition.png' },
    ],
  },
  {
    id: 'avenis',
    name: 'Avenis',
    description: 'Sporty and stylish scooter for the modern urban rider.',
    cardImage: '/images/scooters/cards/Avenis.jpg',
    link: '/products/scooters/avenis',
    variants: [
      { name: 'Yellow', image: '/images/scooters/Avenis/Avenis_Yellow.png' },
      { name: 'Red', image: '/images/scooters/Avenis/Avenis_Red.png' },
      { name: 'White', image: '/images/scooters/Avenis/Avenis_White.png' },
      { name: 'Black', image: '/images/scooters/Avenis/Avenis_Black.png' },
      { name: 'Silver', image: '/images/scooters/Avenis/Avenis_Silver.png' },
    ],
  },
  {
    id: 'burgman-street',
    name: 'Burgman Street',
    description: 'Maxi-styled premium scooter with outstanding comfort.',
    cardImage: '/images/scooters/cards/Burgman Street.jpg',
    link: '/products/scooters/burgman-street',
    variants: [
      { name: 'Standard Edition', image: '/images/scooters/Burgman Street/Burgman Street Standard Edition/Metallic Matte Black.png' },
      { name: 'Ride Connect Edition', image: '/images/scooters/Burgman Street/Burgman Street Ride Connect Edition/Metallic Matte Black No.2.png' },
    ],
  },
  {
    id: 'burgman-street-ex',
    name: 'Burgman Street EX',
    description: 'Exclusive variant with advanced features and premium finish.',
    cardImage: '/images/scooters/cards/Burgman Street Ex.jpg',
    link: '/products/scooters/burgman-street-ex',
    variants: [
      { name: 'Metallic Matte Dark Blue', image: '/images/scooters/Burgman Street Ex/Burgman Street Ex.png' },
    ],
  },
]

export default function ScootersPage() {
  const [modalCard, setModalCard] = useState<ScooterCard | null>(null)

  const openModal = (card: ScooterCard, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setModalCard(card)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setModalCard(null)
    document.body.style.overflow = 'unset'
  }

  return (
    <div className="min-h-screen pt-24 bg-white text-slate-900">
      {/* Header Section */}
      <motion.section
        className="relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-100 to-suzuki-blue/20" />
        <div className="absolute -right-20 top-10 w-64 h-64 bg-suzuki-red/10 blur-3xl rounded-full" />
        <div className="absolute -left-24 -bottom-12 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <motion.p
            className="text-xs uppercase tracking-[0.25em] text-suzuki-blue mb-3 font-bold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            Urban Excellence
          </motion.p>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-slate-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Premium <span className="text-suzuki-red">Scooters</span>
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Sleek, efficient, and feature-packed scooters designed for effortless urban commuting and unmatched reliability.
          </motion.p>
        </div>
      </motion.section>

      {/* Scooter Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          {scooterCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50, scale: 0.9, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                type: 'spring',
                stiffness: 120,
                damping: 15,
              }}
            >
              <motion.div
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 h-full flex flex-col group"
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
              >
                {/* Card Image — clicking opens modal */}
                <div
                  className="relative h-56 sm:h-64 md:h-72 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden cursor-pointer"
                  onClick={(e) => openModal(card, e)}
                >
                  <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={card.cardImage}
                      alt={card.name}
                      fill
                      className={`${card.id === 'e-access' ? 'object-cover object-[80%_center]' : 'object-cover'} group-hover:scale-110 transition-transform duration-500`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      priority={index < 4}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        const parent = target.parentElement
                        if (parent) {
                          parent.innerHTML = '<div class="text-7xl flex items-center justify-center h-full">🛵</div>'
                        }
                      }}
                    />
                  </motion.div>
                  {/* Dark overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* View Variants label */}
                  <motion.div
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full pointer-events-none"
                    initial={{ y: 10, opacity: 0.7 }}
                    animate={{ y: [10, 0, 10], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <span>View Variants</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                  </motion.div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col">
                  <motion.h3
                    className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-suzuki-blue transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    {card.name}
                  </motion.h3>
                  <motion.p
                    className="text-gray-600 mb-5 flex-1 text-sm sm:text-base"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {card.description}
                  </motion.p>
                  {/* Explore Variants — navigates to detail page */}
                  <Link href={card.link}>
                    <motion.div
                      className="flex items-center text-suzuki-blue font-semibold hover:gap-3 transition-all duration-300 cursor-pointer"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      <span>Explore Variants</span>
                      <motion.svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info Section */}
        <motion.div
          className="mt-16 sm:mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Need Help Choosing?
          </motion.h2>
          <motion.p
            className="text-gray-600 mb-8 text-base sm:text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Our expert team is ready to help you pick the perfect scooter that matches your daily commute and riding preferences.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(30, 64, 175, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-suzuki-blue hover:bg-opacity-90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition duration-300 shadow-lg"
              >
                Contact Us
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* View Variants Modal */}
      <AnimatePresence>
        {modalCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 250, damping: 25 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <div>
                  <p className="text-xs uppercase tracking-widest text-suzuki-blue font-bold mb-1">Colour Variants</p>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">{modalCard.name}</h3>
                </div>
                <motion.button
                  onClick={closeModal}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* Variant Images Grid */}
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {modalCard.variants.map((variant, i) => (
                  <motion.div
                    key={variant.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:border-suzuki-blue/40 transition-colors shadow-sm"
                  >
                    <div className="relative h-48 sm:h-52">
                      <Image
                        src={variant.image}
                        alt={`${modalCard.name} — ${variant.name}`}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                    <div className="px-4 py-3 border-t border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">{variant.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="px-6 pb-6">
                <Link href={modalCard.link} onClick={closeModal}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-suzuki-blue text-white py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>Explore Full Details</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
