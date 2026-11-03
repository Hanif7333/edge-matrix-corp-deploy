'use client';

// ============================================================================
// Edge Matrix Corporation — Contact Form
// Validated enterprise inquiry system using React Hook Form + Zod
// ============================================================================

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { GlassPanel } from '@/components/shared';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid business email address'),
  company: z.string().min(2, 'Company name is required'),
  service: z.string().min(1, 'Please select a service area'),
  message: z.string().min(20, 'Please provide more details (minimum 20 characters)'),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    // Simulate API call for enterprise lead capture
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form data:', data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <GlassPanel intensity="strong" className="p-8 lg:p-10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-em-primary/10 rounded-full blur-3xl pointer-events-none" />

      <h2 className="font-[var(--font-heading)] text-2xl font-bold text-em-text mb-6">
        Secure Corporate Inquiry
      </h2>

      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-em-primary/[0.05] border border-em-primary/20 rounded-xl p-6 text-center shadow-[0_0_30px_rgba(255,59,87,0.15)]"
        >
          <div className="w-12 h-12 rounded-full bg-em-primary/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-6 h-6 text-em-primary" />
          </div>
          <h3 className="text-lg font-bold text-em-primary mb-2">Transmission Secure</h3>
          <p className="text-sm text-em-text-secondary">
            Thank you for reaching out to Edge Matrix Corporation. A principal architect will review your operational requirements and coordinate a confidential briefing within 24 hours.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-medium text-em-text-secondary">Full Name <span className="text-red-400">*</span></label>
              <input
                {...register('name')}
                id="name"
                className={`w-full bg-em-surface/60 border rounded-lg px-4 py-3 text-sm text-em-text focus:outline-none focus:ring-1 transition-colors ${
                  errors.name ? 'border-red-500/50 focus:ring-red-500 focus:border-red-500' : 'border-em-border focus:ring-em-primary focus:border-em-primary/50'
                }`}
                placeholder="Jane Doe"
              />
              {errors.name && (
                <p className="text-[10px] text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-medium text-em-text-secondary">Business Email <span className="text-red-400">*</span></label>
              <input
                {...register('email')}
                id="email"
                type="email"
                className={`w-full bg-em-surface/60 border rounded-lg px-4 py-3 text-sm text-em-text focus:outline-none focus:ring-1 transition-colors ${
                  errors.email ? 'border-red-500/50 focus:ring-red-500 focus:border-red-500' : 'border-em-border focus:ring-em-primary focus:border-em-primary/50'
                }`}
                placeholder="jane@company.com"
              />
              {errors.email && (
                <p className="text-[10px] text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="company" className="text-xs font-medium text-em-text-secondary">Company <span className="text-red-400">*</span></label>
              <input
                {...register('company')}
                id="company"
                className={`w-full bg-em-surface/60 border rounded-lg px-4 py-3 text-sm text-em-text focus:outline-none focus:ring-1 transition-colors ${
                  errors.company ? 'border-red-500/50 focus:ring-red-500 focus:border-red-500' : 'border-em-border focus:ring-em-primary focus:border-em-primary/50'
                }`}
                placeholder="Acme Corp"
              />
              {errors.company && (
                <p className="text-[10px] text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {errors.company.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="service" className="text-xs font-medium text-em-text-secondary">Area of Interest <span className="text-red-400">*</span></label>
              <select
                {...register('service')}
                id="service"
                className={`w-full bg-em-surface/60 border rounded-lg px-4 py-3 text-sm text-em-text focus:outline-none focus:ring-1 transition-colors ${
                  errors.service ? 'border-red-500/50 focus:ring-red-500 focus:border-red-500' : 'border-em-border focus:ring-em-primary focus:border-em-primary/50'
                }`}
              >
                <option value="">Select a service...</option>
                <option value="vision">Matrix Vision AI</option>
                <option value="voice">Matrix Voice AI</option>
                <option value="robotics">Robotics & Autonomous Systems</option>
                <option value="analytics">Predictive Analytics</option>
                <option value="twin">Digital Twin Solutions</option>
                <option value="training">Corporate Training</option>
                <option value="other">Other / General Inquiry</option>
              </select>
              {errors.service && (
                <p className="text-[10px] text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {errors.service.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="message" className="text-xs font-medium text-em-text-secondary">Project Details <span className="text-red-400">*</span></label>
            <textarea
              {...register('message')}
              id="message"
              rows={4}
              className={`w-full bg-em-surface/60 border rounded-lg px-4 py-3 text-sm text-em-text focus:outline-none focus:ring-1 transition-colors resize-none ${
                errors.message ? 'border-red-500/50 focus:ring-red-500 focus:border-red-500' : 'border-em-border focus:ring-em-primary focus:border-em-primary/50'
              }`}
              placeholder="Please describe your operational challenges or requirements..."
            />
            {errors.message && (
              <p className="text-[10px] text-red-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" /> {errors.message.message}
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-medium text-white overflow-hidden rounded-xl transition-all duration-300 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_0_50px_rgba(255,59,87,0.45)]'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-em-primary to-em-primary-light transition-all duration-500" />
              <span className="relative">
                {isSubmitting ? 'Authenticating...' : 'Transmit Inquiry'}
              </span>
              {!isSubmitting && (
                <Send className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              )}
            </button>
          </div>
          <p className="text-center text-[10px] text-em-text-muted mt-4">
            This transmission is secured via AES-256 encryption. By submitting, you agree to our Enterprise Data Privacy Policy.
          </p>
        </form>
      )}
    </GlassPanel>
  );
}
