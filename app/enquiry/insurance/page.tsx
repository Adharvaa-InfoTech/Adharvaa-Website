'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function InsurancePage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    registrationNumber: '',
    insuranceType: '',
    currentPolicyExpiry: '',
    location: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState<string | null>(null)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (!/^[a-zA-Z\s\.]+$/.test(formData.name)) {
      newErrors.name = 'Name should only contain letters'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number'
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }

    if (!formData.vehicle) newErrors.vehicle = 'Required'
    if (!formData.registrationNumber.trim()) newErrors.registrationNumber = 'Required'
    if (!formData.insuranceType) newErrors.insuranceType = 'Required'
    if (!formData.location.trim()) newErrors.location = 'Required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormMessage(null)

    if (!validateForm()) {
      setFormMessage('Please fix the errors highlighted above.')
      return
    }

    setIsSubmitting(true)

    try {
      const TARGET_EMAIL = "insurance.suzuki@adharvaa.in"
      const endpoint = `https://formsubmit.co/${TARGET_EMAIL}`

      const formDataToSend = new FormData()
      formDataToSend.append('Enquiry Type', 'Insurance Inquiry')
      formDataToSend.append('Full Name', formData.name)
      formDataToSend.append('Phone Number', formData.phone)
      formDataToSend.append('Email Address', formData.email || 'Not Provided')
      formDataToSend.append('Vehicle Model', formData.vehicle)
      formDataToSend.append('Registration Number', formData.registrationNumber)
      formDataToSend.append('Insurance Type', formData.insuranceType)
      formDataToSend.append('Policy Expiry', formData.currentPolicyExpiry || 'Not Provided')
      formDataToSend.append('Location', formData.location)

      formDataToSend.append('_subject', `New Insurance Inquiry from ${formData.name}`)
      formDataToSend.append('_captcha', 'false')
      formDataToSend.append('_template', 'table')

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formDataToSend,
        headers: { 'Accept': 'application/json' }
      })

      if (response.ok) {
        setFormMessage('Insurance inquiry submitted successfully! We will contact you with policy quotes.')
        setFormData({
          name: '',
          phone: '',
          email: '',
          vehicle: '',
          registrationNumber: '',
          insuranceType: '',
          currentPolicyExpiry: '',
          location: '',
        })
      } else {
        setFormMessage('Something went wrong. Please try again later.')
      }
    } catch (error) {
      setFormMessage('Network error. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 bg-white">
      {/* Hero Banner - Careers Style */}
      <motion.section
        className="relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-100 to-suzuki-blue/20" />
        <div className="absolute -right-20 top-10 w-64 h-64 bg-suzuki-red/10 blur-3xl rounded-full" />
        <div className="absolute -left-24 -bottom-12 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <motion.p
            className="text-xs uppercase tracking-[0.25em] text-suzuki-blue mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Vehicle Insurance
          </motion.p>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 leading-tight text-slate-900"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Secure Your <span className="text-suzuki-red">Suzuki</span>
          </motion.h1>
          <motion.p
            className="text-sm sm:text-base md:text-lg text-slate-700 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Get comprehensive protection for your ride. Easy renewals and new policy quotes in just a few clicks.
          </motion.p>
        </div>
      </motion.section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="p-8 sm:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:outline-none focus:ring-2 focus:ring-suzuki-blue/20 transition-all`}
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:outline-none focus:ring-2 focus:ring-suzuki-blue/20 transition-all`}
                    placeholder="10-digit mobile number"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>

                {/* Vehicle Model */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Vehicle Model *</label>
                  <select
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.vehicle ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:outline-none focus:ring-2 focus:ring-suzuki-blue/20 transition-all`}
                  >
                    <option value="">Select Model</option>
                    <option>Access 125</option>
                    <option>Avenis</option>
                    <option>Burgman Street</option>
                    <option>Burgman Street EX</option>
                    <option>Gixxer SF 250</option>
                    <option>Gixxer 250</option>
                    <option>Gixxer SF</option>
                    <option>Gixxer</option>
                    <option>V-STROM SX</option>
                    <option>e-ACCESS</option>
                  </select>
                  {errors.vehicle && <p className="mt-1 text-xs text-red-500">{errors.vehicle}</p>}
                </div>

                {/* Registration Number */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Registration Number *</label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.registrationNumber ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:outline-none focus:ring-2 focus:ring-suzuki-blue/20 transition-all`}
                    placeholder="e.g. TN 37 AB 1234"
                  />
                  {errors.registrationNumber && <p className="mt-1 text-xs text-red-500">{errors.registrationNumber}</p>}
                </div>

                {/* Insurance Type */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Insurance Type *</label>
                  <select
                    name="insuranceType"
                    value={formData.insuranceType}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.insuranceType ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:outline-none focus:ring-2 focus:ring-suzuki-blue/20 transition-all`}
                  >
                    <option value="">Select Type</option>
                    <option>New Policy</option>
                    <option>Policy Renewal</option>
                    <option>Lapsed Policy Recovery</option>
                  </select>
                  {errors.insuranceType && <p className="mt-1 text-xs text-red-500">{errors.insuranceType}</p>}
                </div>

                {/* Expiry Date */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Current Policy Expiry</label>
                  <input
                    type="date"
                    name="currentPolicyExpiry"
                    value={formData.currentPolicyExpiry}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-suzuki-blue/20 transition-all"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.location ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:outline-none focus:ring-2 focus:ring-suzuki-blue/20 transition-all`}
                    placeholder="Enter locality/city"
                  />
                  {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:outline-none focus:ring-2 focus:ring-suzuki-blue/20 transition-all`}
                    placeholder="Optional email"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
              </div>

              {formMessage && (
                <div className={`p-4 rounded-lg text-sm font-medium ${formMessage.includes('successfully') ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-red-50 text-red-800 border border-red-100'}`}>
                  {formMessage}
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-suzuki-blue text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Get Insurance Quote'
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
