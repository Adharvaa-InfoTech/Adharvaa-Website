'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const stats = [
  { value: '20+', label: 'VARIANTS' },
  { value: '10K+', label: 'HAPPY CUSTOMERS' },
  { value: '50K+', label: 'VEHICLE SERVICED' },
]

export default function About() {
  return (
    <section id="about" className="py-12 sm:py-20 md:py-24 bg-gradient-to-br from-suzuki-blue to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            About Adharvaa Suzuki
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Discover Adharvaa Suzuki, where excellence meets passion for Suzuki two-wheelers.
            As a premium dealership, we're devoted to delivering unparalleled customer experiences.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <motion.p
              className="text-base sm:text-lg mb-4 text-gray-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Adharvaa Suzuki takes pride in being your trusted authorised Suzuki dealer and the ultimate
              destination for all Suzuki Motorcycle and Scooter enthusiasts in Coimbatore. From a powerful
              Suzuki bike to a stylish Suzuki scooter, our Suzuki bike showroom, Coimbatore will get you
              the most extensive range of two-wheelers to match your riding preferences.
            </motion.p>
            <motion.p
              className="text-base sm:text-lg mb-6 text-gray-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Excellence is what we commit ourselves to, so every customer gets the best service and
              unbeatable prices. We believe in giving you a hassle-free experience to make us the perfect
              Suzuki two-wheeler showroom in Coimbatore.
            </motion.p>
            <Link href="/about">
              <motion.button
                className="inline-block bg-suzuki-red hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-2xl transition-all duration-300 w-full sm:w-auto text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                Know More
              </motion.button>
            </Link>
          </motion.div>
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <div className="bg-white rounded-lg p-8 shadow-2xl">
              <motion.div
                className="aspect-video relative rounded-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/adharvaa-showroom-exterior.png"
                  alt="Adharvaa Suzuki Showroom"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid - Enhanced for mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 md:p-8 text-center border border-white border-opacity-20"
            >
              <motion.div
                className="text-4xl sm:text-5xl font-bold text-suzuki-red mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1 + 0.3,
                  type: "spring",
                  stiffness: 200
                }}
              >
                {stat.value}
              </motion.div>
              <motion.div
                className="text-gray-300 font-semibold text-sm sm:text-base"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
