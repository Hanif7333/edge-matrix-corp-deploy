'use client';

// ============================================================================
// Edge Matrix Corporation — Voice AI Section v2
// Reversed split layout: cards (left) | description+waveform (right)
// ============================================================================

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Mic, Languages, Shield, AudioLines, Radio, MessageSquare,
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { DURATION, EASE } from '@/animations/variants';

const CAPABILITIES = [
  { icon: Mic, title: 'Speech Emotion Recognition', desc: 'Detect emotional states from voice patterns for customer experience and workplace safety applications.' },
  { icon: Languages, title: 'Accent Recognition', desc: 'Multi-accent, multi-language speech understanding for globally diverse enterprise environments.' },
  { icon: Shield, title: 'Voice Biometrics', desc: 'Speaker verification and voice-based authentication for secure access control systems.' },
  { icon: AudioLines, title: 'Environmental Noise Detection', desc: 'Identify machinery sounds, alarms, and anomalous audio patterns in industrial settings.' },
  { icon: Radio, title: 'Real-Time Transcription', desc: 'Enterprise-grade speech-to-text with domain-specific vocabularies and context awareness.' },
  { icon: MessageSquare, title: 'Conversational AI', desc: 'Voice-driven interfaces for hands-free industrial operations and intelligent command systems.' },
];

function WaveformVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const bars = 40;
    const barWidth = (w / bars) * 0.55;
    const gap = w / bars;

    let t = 0;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < bars; i++) {
        const x = i * gap + gap / 2 - barWidth / 2;
        const amplitude =
          Math.sin(t * 0.025 + i * 0.3) * 0.3 +
          Math.sin(t * 0.015 + i * 0.5) * 0.2 +
          0.15;
        const barH = Math.max(amplitude * h * 0.5, 2);
        const y = (h - barH) / 2;

        const gradient = ctx.createLinearGradient(x, y, x, y + barH);
        gradient.addColorStop(0, 'rgba(230, 0, 38, 0.6)');
        gradient.addColorStop(1, 'rgba(230, 0, 38, 0.05)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barH, 2);
        ctx.fill();
      }

      t++;
      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-16 opacity-60" />;
}

export function VoiceAISection() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="relative em-section overflow-hidden"
      id="voice-ai"
      aria-label="Matrix Voice AI"
    >
      <div className="absolute inset-0 em-grid-bg opacity-[0.02]" aria-hidden="true" />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(230,0,38,0.03) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="em-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — Capability cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 order-2 lg:order-1">
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: DURATION.fast, delay: 0.2 + i * 0.06, ease: EASE.cinematic }}
                className="rounded-xl bg-em-surface/40 border border-em-border p-5 transition-all duration-500 hover:border-em-highlight/15 hover:bg-em-surface/55"
              >
                <cap.icon className="w-5 h-5 text-em-highlight/60 mb-3" />
                <h3 className="text-sm font-semibold text-em-text mb-1.5">{cap.title}</h3>
                <p className="text-[11px] text-em-text-muted leading-relaxed">{cap.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Right — Description + Waveform */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: DURATION.slow, ease: EASE.cinematic }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-em-highlight/[0.06] border border-em-highlight/15 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-em-highlight animate-pulse-glow" />
              <span className="text-xs font-medium text-em-highlight tracking-wide uppercase">Voice Intelligence</span>
            </div>

            <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08] mb-6">
              Matrix <span className="em-text-gradient-highlight">Voice AI</span>
            </h2>

            <p className="text-base text-em-text-secondary leading-relaxed mb-10 max-w-lg">
              Enterprise voice intelligence that understands speech, emotion, and
              intent — enabling hands-free operations, voice-driven analytics, and
              intelligent audio monitoring at industrial scale.
            </p>

            {/* Waveform visualization */}
            <div className="em-glass rounded-xl p-5 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-em-highlight animate-pulse-glow" />
                <span className="text-[11px] text-em-text-muted uppercase tracking-wider">Live Audio Processing</span>
              </div>
              <WaveformVisualizer />
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { v: '50+', l: 'Languages' },
                { v: '<200ms', l: 'Latency' },
                { v: '97.3%', l: 'Accuracy' },
              ].map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: DURATION.fast, delay: 0.6 + i * 0.1, ease: EASE.cinematic }}
                  className="text-center"
                >
                  <div className="font-[var(--font-heading)] text-lg font-bold em-text-gradient-highlight">{s.v}</div>
                  <div className="text-[10px] text-em-text-muted uppercase tracking-wider">{s.l}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
