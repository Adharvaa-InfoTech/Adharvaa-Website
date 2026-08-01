'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function FinancePage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    loanAmount: '',
    employmentType: '',
    monthlyIncome: '',
    location: '',
    message: '',
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
    if (!formData.loanAmount.trim()) newErrors.loanAmount = 'Required'
    if (!formData.employmentType) newErrors.employmentType = 'Required'
    if (!formData.monthlyIncome.trim()) newErrors.monthlyIncome = 'Required'
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
      const TARGET_EMAIL = "finance.suzuki@adharvaa.in"
      const endpoint = `https://formsubmit.co/${TARGET_EMAIL}`

      const formDataToSend = new FormData()
      formDataToSend.append('Enquiry Type', 'Finance Application')
      formDataToSend.append('Full Name', formData.name)
      formDataToSend.append('Phone Number', formData.phone)
      formDataToSend.append('Email Address', formData.email || 'Not Provided')
      formDataToSend.append('Vehicle Model', formData.vehicle)
      formDataToSend.append('Expected Loan Amount', formData.loanAmount)
      formDataToSend.append('Employment Type', formData.employmentType)
      formDataToSend.append('Monthly Income', formData.monthlyIncome)
      formDataToSend.append('Location', formData.location)
      formDataToSend.append('Message', formData.message || 'No message provided')

      formDataToSend.append('_subject', `New Finance Inquiry from ${formData.name}`)
      formDataToSend.append('_captcha', 'false')
      formDataToSend.append('_template', 'table')

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formDataToSend,
        headers: { 'Accept': 'application/json' }
      })

      if (response.ok) {
        setFormMessage('Finance inquiry submitted successfully! Our representative will contact you with EMI options.')
        setFormData({
          name: '',
          phone: '',
          email: '',
          vehicle: '',
          loanAmount: '',
          employmentType: '',
          monthlyIncome: '',
          location: '',
          message: '',
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
            Two Wheeler Finance
          </motion.p>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 leading-tight text-slate-900"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Easy <span className="text-suzuki-red">EMI</span> Schemes
          </motion.h1>
          <motion.p
            className="text-sm sm:text-base md:text-lg text-slate-700 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Make your dream Suzuki a reality with our flexible finance options and quick approval process.
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
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Vehicle *</label>
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

                {/* Loan Amount */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Expected Loan Amount *</label>
                  <input
                    type="number"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.loanAmount ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:outline-none focus:ring-2 focus:ring-suzuki-blue/20 transition-all`}
                    placeholder="e.g. 75000"
                  />
                  {errors.loanAmount && <p className="mt-1 text-xs text-red-500">{errors.loanAmount}</p>}
                </div>

                {/* Employment */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Employment Type *</label>
                  <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.employmentType ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:outline-none focus:ring-2 focus:ring-suzuki-blue/20 transition-all`}
                  >
                    <option value="">Select Employment</option>
                    <option>Salaried</option>
                    <option>Self Employed / Business</option>
                    <option>Student / Pensioner</option>
                  </select>
                  {errors.employmentType && <p className="mt-1 text-xs text-red-500">{errors.employmentType}</p>}
                </div>

                {/* Monthly Income */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Monthly Income *</label>
                  <input
                    type="number"
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.monthlyIncome ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:outline-none focus:ring-2 focus:ring-suzuki-blue/20 transition-all`}
                    placeholder="e.g. 25000"
                  />
                  {errors.monthlyIncome && <p className="mt-1 text-xs text-red-500">{errors.monthlyIncome}</p>}
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

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Additional Comments</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-suzuki-blue/20 transition-all resize-none"
                  placeholder="Any specific questions about financing?"
                />
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
                  'Check Finance Eligibility'
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
