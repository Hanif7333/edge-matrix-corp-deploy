// Cleaned up unused visualizer components to optimize bundle size.
export const VISUALIZERS_MAP = {};


/* ═══════════════════════════════════════════════════════════════════════════
   HUD VISUALIZER SYSTEM — Edge Matrix Corporation
   All visualizers accept { isHovered, isPlaying, speedMultiplier }
   ═══════════════════════════════════════════════════════════════════════════ */

export interface VisualizerProps {
  isHovered: boolean;
  isPlaying?: boolean;
  speedMultiplier?: number;
}

interface CanvasProps {
  children: React.ReactNode;
  label?: string;
}

function VisualizerCanvas({ children, label }: CanvasProps) {
  return (
    <div className="relative w-full h-full bg-slate-950 rounded-t-xl overflow-hidden border-b border-em-border/10 flex items-center justify-center select-none">
      {/* Micro grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-em-primary/[0.03] via-transparent to-em-accent/[0.02] pointer-events-none" />
      {/* Scan pulse */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-em-primary/[0.015] to-transparent pointer-events-none animate-[pulse_6s_infinite]" />
      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
        {children}
      </div>
      {/* HUD corner label */}
      {label && (
        <div className="absolute top-2 left-2 z-20 font-mono text-[7px] tracking-[0.2em] text-white/25 uppercase">
          {label}
        </div>
      )}
      {/* HUD corner frame decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/[0.06]" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/[0.06]" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/[0.06]" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/[0.06]" />
    </div>
  );
}

// Shared HUD telemetry readout
function HudTelemetry({ lines }: { lines: string[] }) {
  return (
    <div className="absolute bottom-2 right-2 z-20 font-mono text-[6px] tracking-wider text-white/20 flex flex-col items-end gap-px">
      {lines.map((line, i) => (
        <span key={i}>{line}</span>
      ))}
    </div>
  );
}

// Helper to get speed-adjusted duration
function spd(baseDuration: number, multiplier: number = 1): number {
  return baseDuration / multiplier;
}


/* ─── 1. Detection ───────────────────────────────────────────────────────── */
export function DetectionVisualizer({ isHovered, isPlaying = true, speedMultiplier = 1 }: VisualizerProps) {
  const d = (base: number) => spd(base, speedMultiplier);
  const playState = isPlaying ? 'running' : 'paused';
  return (
    <VisualizerCanvas label="MATRIX::DETECT_v4.2">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Sweep line */}
        <motion.div
          className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-em-primary to-transparent z-20 shadow-[0_0_12px_rgba(230,0,38,0.6)]"
          animate={isPlaying ? { top: ['8%', '92%', '8%'] } : {}}
          transition={{ duration: d(3.5), repeat: Infinity, ease: 'easeInOut' }}
          style={{ animationPlayState: playState }}
        />

        {/* Radar rings */}
        <div className="absolute w-36 h-36 rounded-full border border-white/[0.04] flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border border-white/[0.04] flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border border-white/[0.04]" />
          </div>
        </div>

        {/* Target box 1 */}
        <motion.div
          className="absolute w-[88px] h-[56px] border border-em-primary/60 bg-em-primary/[0.04] rounded-sm"
          style={{ top: '22%', left: '12%' }}
          animate={isPlaying ? { scale: isHovered ? [1, 1.06, 1] : 1, opacity: [0.8, 1, 0.8] } : {}}
          transition={{ duration: d(2.5), repeat: Infinity }}
        >
          <div className="absolute top-0.5 left-1 flex justify-between items-start w-full pr-2">
            <span className="text-[7px] text-em-primary font-bold px-1 bg-em-primary/20 rounded">ROBOT</span>
            <span className="text-[6px] text-white/50 font-mono">98.2%</span>
          </div>
          <div className="w-2 h-2 border-b border-r border-em-primary/70 absolute bottom-0 right-0" />
          <div className="w-2 h-2 border-t border-l border-em-primary/70 absolute top-0 left-0" />
          <div className="w-2 h-2 border-t border-r border-em-primary/70 absolute top-0 right-0" />
          <div className="w-2 h-2 border-b border-l border-em-primary/70 absolute bottom-0 left-0" />
        </motion.div>

        {/* Target box 2 */}
        <motion.div
          className="absolute w-[60px] h-[96px] border border-[#00F0FF]/60 bg-[#00F0FF]/[0.04] rounded-sm"
          style={{ top: '30%', right: '18%' }}
          animate={isPlaying ? { scale: isHovered ? [1, 1.04, 1] : 1, opacity: [0.7, 1, 0.7] } : {}}
          transition={{ duration: d(2.8), repeat: Infinity, delay: 0.4 }}
        >
          <div className="absolute top-0.5 left-1 flex justify-between items-start w-full pr-2">
            <span className="text-[7px] text-[#00F0FF] font-bold px-1 bg-[#00F0FF]/20 rounded">HUMAN</span>
            <span className="text-[6px] text-white/50 font-mono">94.8%</span>
          </div>
          <div className="w-2 h-2 border-b border-r border-[#00F0FF]/70 absolute bottom-0 right-0" />
          <div className="w-2 h-2 border-t border-l border-[#00F0FF]/70 absolute top-0 left-0" />
        </motion.div>

        {/* Crosshair center */}
        <motion.div
          className="absolute w-5 h-5"
          animate={isPlaying ? { rotate: 360 } : {}}
          transition={{ duration: d(10), repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 border border-dashed border-white/10 rounded-full" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/5" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-white/5" />
        </motion.div>

        <HudTelemetry lines={['FPS: 60.0', 'OBJECTS: 2', 'LAT: 0.8ms']} />
      </div>
    </VisualizerCanvas>
  );
}


/* ─── 2. Matrix Voice AI ─────────────────────────────────────────────────── */
export function VoiceAIVisualizer({ isHovered, isPlaying = true, speedMultiplier = 1 }: VisualizerProps) {
  const bars = Array.from({ length: 24 });
  const d = (base: number) => spd(base, speedMultiplier);
  return (
    <VisualizerCanvas label="VOICE::NLP_ENGINE">
      <div className="flex items-center gap-[3px] justify-center w-full px-6 h-full">
        {bars.map((_, i) => {
          const delay = i * 0.06;
          const hFactor = Math.abs(Math.sin(i * 0.45));
          const hoverH = 8 + hFactor * 64;
          const normalH = 8 + hFactor * 28;
          const dur = d(1.0 + Math.abs(Math.cos(i * 0.3)) * 0.6);
          const isMid = i > 8 && i < 16;
          return (
            <motion.div
              key={i}
              className={`w-[3px] rounded-full ${isMid ? 'bg-gradient-to-t from-em-primary to-em-primary-light' : 'bg-gradient-to-t from-em-primary/40 to-em-primary/70'}`}
              animate={isPlaying ? { height: isHovered ? [6, hoverH, 6] : [6, normalH, 6] } : { height: 8 }}
              transition={{ duration: dur, repeat: Infinity, delay, ease: 'easeInOut' }}
              style={{ minHeight: '4px' }}
            />
          );
        })}
      </div>
      <HudTelemetry lines={['SAMPLE: 48kHz', 'FFT: 1024', 'SNR: 42dB']} />
    </VisualizerCanvas>
  );
}


/* ─── 3. Pose Estimation ─────────────────────────────────────────────────── */
export function PoseEstimationVisualizer({ isHovered, isPlaying = true, speedMultiplier = 1 }: VisualizerProps) {
  const d = (base: number) => spd(base, speedMultiplier);
  return (
    <VisualizerCanvas label="POSE::KEYPOINT_v2">
      <svg className="w-full h-full max-h-44 text-em-highlight" viewBox="0 0 200 200">
        <defs>
          <filter id="skeletonGlow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <motion.g
          animate={isPlaying ? {
            y: isHovered ? [0, -8, 0] : [0, -3, 0],
            rotate: isHovered ? [-2, 2, -2] : [0, 0, 0]
          } : {}}
          transition={{ duration: d(3), repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '100px 140px' }}
          filter="url(#skeletonGlow)"
        >
          {/* Head */}
          <circle cx="100" cy="50" r="12" className="fill-em-highlight/10 stroke-em-highlight stroke-2" />
          {/* Torso */}
          <line x1="100" y1="62" x2="100" y2="120" className="stroke-em-highlight stroke-2 opacity-80" />
          {/* Shoulders */}
          <line x1="70" y1="75" x2="130" y2="75" className="stroke-em-highlight stroke-2 opacity-80" />
          {/* Left Arm */}
          <motion.line
            x1="70" y1="75" x2="55"
            animate={isPlaying ? { y2: isHovered ? [90, 55, 90] : [90, 85, 90] } : {}}
            y2="90" className="stroke-em-highlight stroke-2 opacity-80"
          />
          {/* Right Arm */}
          <motion.line
            x1="130" y1="75" x2="145"
            animate={isPlaying ? { y2: isHovered ? [55, 110, 55] : [90, 95, 90] } : {}}
            y2="90" className="stroke-em-highlight stroke-2 opacity-80"
          />
          {/* Hips */}
          <line x1="85" y1="120" x2="115" y2="120" className="stroke-em-highlight stroke-2 opacity-80" />
          {/* Legs */}
          <line x1="85" y1="120" x2="80" y2="165" className="stroke-em-highlight stroke-2 opacity-80" />
          <line x1="115" y1="120" x2="120" y2="165" className="stroke-em-highlight stroke-2 opacity-80" />
          {/* Joints */}
          <circle cx="100" cy="62" r="4" className="fill-em-highlight" />
          <circle cx="70" cy="75" r="4" className="fill-em-highlight" />
          <circle cx="130" cy="75" r="4" className="fill-em-highlight" />
          <circle cx="100" cy="120" r="4" className="fill-em-highlight" />
          <circle cx="80" cy="165" r="4" className="fill-em-highlight" />
          <circle cx="120" cy="165" r="4" className="fill-em-highlight" />
        </motion.g>
        {/* Confidence labels */}
        <text x="160" y="55" className="fill-white/20" fontSize="7" fontFamily="monospace">HEAD: 0.98</text>
        <text x="155" y="78" className="fill-white/20" fontSize="7" fontFamily="monospace">SHLDR: 0.95</text>
      </svg>
      <HudTelemetry lines={['JOINTS: 17', 'CONF: 0.96', 'FRAME: OK']} />
    </VisualizerCanvas>
  );
}


/* ─── 4. Warehouse Robots ────────────────────────────────────────────────── */
export function WarehouseRobotsVisualizer({ isHovered, isPlaying = true, speedMultiplier = 1 }: VisualizerProps) {
  const d = (base: number) => spd(base, speedMultiplier);
  return (
    <VisualizerCanvas label="AGV::NAV_CTRL">
      <div className="relative w-[85%] h-[85%] border border-white/[0.06] rounded-lg bg-slate-950/80 overflow-hidden">
        {/* Grid cells */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-1 p-2 opacity-20">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="border border-white/15 rounded-sm bg-white/[0.02]" />
          ))}
        </div>

        {/* Path line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 240 140">
          <path
            d="M 20,70 L 70,70 L 70,25 L 160,25 L 160,115 L 220,115"
            fill="none"
            stroke="rgba(230,0,38,0.15)"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          {/* Second path */}
          <path
            d="M 20,110 L 100,110 L 100,70 L 140,70 L 140,25"
            fill="none"
            stroke="rgba(0,240,255,0.1)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          {/* Moving dot 1 */}
          <motion.circle
            r="5"
            fill="#E60026"
            animate={isPlaying ? {
              cx: [20, 70, 70, 160, 160, 220],
              cy: [70, 70, 25, 25, 115, 115]
            } : {}}
            transition={{
              duration: d(isHovered ? 4 : 7),
              repeat: Infinity,
              ease: 'linear'
            }}
            className="drop-shadow-[0_0_6px_rgba(230,0,38,0.8)]"
          />
          {/* Moving dot 2 */}
          <motion.circle
            r="3.5"
            fill="#00F0FF"
            animate={isPlaying ? {
              cx: [20, 100, 100, 140, 140],
              cy: [110, 110, 70, 70, 25]
            } : {}}
            transition={{
              duration: d(isHovered ? 5 : 9),
              repeat: Infinity,
              ease: 'linear',
              delay: 1.5
            }}
            className="drop-shadow-[0_0_5px_rgba(0,240,255,0.7)]"
          />
        </svg>

        {/* Status */}
        <div className="absolute bottom-1.5 left-2 z-10 font-mono text-[7px] text-white/30 flex flex-col gap-px">
          <span>SYS_STATUS: <span className="text-green-400/60">ACTIVE</span></span>
          <span>AGV_01: <span className="text-em-primary/80">NAVIGATING</span></span>
          <span>AGV_02: <span className="text-[#00F0FF]/80">QUEUED</span></span>
        </div>
      </div>
      <HudTelemetry lines={['BOTS: 2', 'ZONE: A4', 'ETA: 12s']} />
    </VisualizerCanvas>
  );
}


/* ─── 5. Segmentation ────────────────────────────────────────────────────── */
export function SegmentationVisualizer({ isHovered, isPlaying = true, speedMultiplier = 1 }: VisualizerProps) {
  const d = (base: number) => spd(base, speedMultiplier);
  return (
    <VisualizerCanvas label="SEG::MASK_GEN">
      <div className="relative w-full h-full max-w-sm rounded-lg overflow-hidden flex items-center justify-center bg-slate-900 border border-white/[0.04]">
        {/* Raw outline layer */}
        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
          <svg className="w-3/5 h-3/5 text-white/8" viewBox="0 0 100 100">
            <polygon points="50,15 90,85 10,85" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="50" cy="55" r="18" fill="none" stroke="currentColor" strokeWidth="2" />
            <rect x="20" y="25" width="20" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Segmentation mask sweep */}
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent to-slate-950 border-r-2 border-em-primary/60 z-10 overflow-hidden"
          animate={isPlaying ? { width: isHovered ? ['0%', '100%', '0%'] : ['15%', '85%', '15%'] } : {}}
          transition={{ duration: d(5), repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute w-[300px] h-full flex items-center justify-center left-1/2 -translate-x-1/2">
            <svg className="w-3/5 h-3/5" viewBox="0 0 100 100">
              <polygon points="50,15 90,85 10,85" className="fill-em-primary/15 stroke-em-primary stroke-2" />
              <circle cx="50" cy="55" r="18" className="fill-em-highlight/20 stroke-em-highlight stroke-2" />
              <rect x="20" y="25" width="20" height="20" rx="2" className="fill-[#00F0FF]/15 stroke-[#00F0FF] stroke-1.5" />
            </svg>
          </div>
        </motion.div>

        <div className="absolute top-2 right-2 bg-black/60 px-1.5 py-0.5 rounded text-[7px] font-bold text-em-primary z-20 font-mono">
          3 MASKS
        </div>
      </div>
      <HudTelemetry lines={['CLASSES: 3', 'IoU: 0.94', 'PIX: 512²']} />
    </VisualizerCanvas>
  );
}


/* ─── 6. Environmental Noise Detection ───────────────────────────────────── */
export function NoiseDetectionVisualizer({ isHovered, isPlaying = true, speedMultiplier = 1 }: VisualizerProps) {
  const levels = Array.from({ length: 16 });
  const d = (base: number) => spd(base, speedMultiplier);
  return (
    <VisualizerCanvas label="AUDIO::ENV_MON">
      <div className="relative w-full h-full flex flex-col justify-center px-5 gap-2">
        <div className="flex justify-between items-center text-[7px] text-white/35 font-mono">
          <span>FREQ RESPONSE</span>
          <span className="text-em-highlight font-black">74.2 dB <span className="text-white/20">(PEAK)</span></span>
        </div>
        <div className="flex items-end justify-between h-[72px] w-full bg-black/50 border border-white/[0.05] rounded-lg p-2 gap-[3px]">
          {levels.map((_, idx) => {
            const isPeak = idx > 9 && idx < 13;
            const hFactor = Math.abs(Math.sin(idx * 0.7));
            const hoverH = 8 + hFactor * 52;
            const normalH = 8 + hFactor * 22;
            const dur = d(0.7 + Math.abs(Math.cos(idx * 0.4)) * 0.4);
            return (
              <motion.div
                key={idx}
                className={`w-full rounded-sm ${isPeak ? 'bg-gradient-to-t from-em-highlight to-yellow-400/80' : 'bg-gradient-to-t from-em-primary/50 to-em-primary'}`}
                animate={isPlaying ? { height: isHovered ? [6, hoverH, 6] : [6, normalH, 6] } : { height: 6 }}
                transition={{ duration: dur, repeat: Infinity, delay: idx * 0.04 }}
              />
            );
          })}
        </div>
        {/* Frequency labels */}
        <div className="flex justify-between text-[5px] font-mono text-white/15 px-2">
          <span>20Hz</span><span>500Hz</span><span>2kHz</span><span>20kHz</span>
        </div>
      </div>
      <HudTelemetry lines={['BANDS: 16', 'CLIP: NO', 'THD: 0.02%']} />
    </VisualizerCanvas>
  );
}


/* ─── 7. Accent Recognition ──────────────────────────────────────────────── */
export function AccentRecognitionVisualizer({ isHovered, isPlaying = true, speedMultiplier = 1 }: VisualizerProps) {
  const d = (base: number) => spd(base, speedMultiplier);
  return (
    <VisualizerCanvas label="ACCENT::CLASSIFY">
      <div className="relative w-36 h-36 flex items-center justify-center">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-dashed border-em-primary/15"
          animate={isPlaying ? { rotate: 360 } : {}}
          transition={{ duration: d(14), repeat: Infinity, ease: 'linear' }}
        />
        {/* Middle ring */}
        <motion.div
          className="absolute w-28 h-28 rounded-full border border-[#00F0FF]/10 flex items-center justify-center"
          animate={isPlaying ? { rotate: -360 } : {}}
          transition={{ duration: d(9), repeat: Infinity, ease: 'linear' }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-[#00F0FF] absolute top-0"
            animate={isPlaying ? { scale: isHovered ? [1, 2.2, 1] : [1, 1.3, 1] } : {}}
            transition={{ duration: d(1), repeat: Infinity }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-em-highlight absolute bottom-0"
            animate={isPlaying ? { scale: isHovered ? [1, 2.2, 1] : [1, 1.3, 1] } : {}}
            transition={{ duration: d(1), repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-em-primary absolute left-0"
            animate={isPlaying ? { scale: isHovered ? [1, 2, 1] : 1 } : {}}
            transition={{ duration: d(1.2), repeat: Infinity, delay: 0.3 }}
          />
        </motion.div>

        {/* Center sphere */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-em-primary/15 to-[#00F0FF]/15 border border-white/[0.06] flex items-center justify-center relative">
          <div className="absolute inset-2 rounded-full border border-dashed border-white/[0.04] animate-spin" style={{ animationDuration: '5s' }} />
          <span className="text-[9px] font-bold font-mono tracking-widest text-white/70">ACC_03</span>
        </div>
      </div>
      <HudTelemetry lines={['REGIONS: 8', 'LANG: EN', 'MATCH: 91%']} />
    </VisualizerCanvas>
  );
}


/* ─── 8. Speech Emotion Recognition ──────────────────────────────────────── */
export function EmotionRecognitionVisualizer({ isHovered, isPlaying = true, speedMultiplier = 1 }: VisualizerProps) {
  const d = (base: number) => spd(base, speedMultiplier);
  return (
    <VisualizerCanvas label="EMO::SPEECH_v3">
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Fluid blobs */}
        <motion.div
          className="absolute w-32 h-32 rounded-full bg-em-primary/15 filter blur-2xl"
          animate={isPlaying ? {
            scale: isHovered ? [1, 1.3, 0.85, 1] : [1, 1.1, 0.95, 1],
            x: isHovered ? [-12, 18, -6, 0] : [-4, 4, -2, 0],
            y: isHovered ? [14, -12, 10, 0] : [4, -4, 2, 0],
          } : {}}
          transition={{ duration: d(5), repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-28 h-28 rounded-full bg-[#00F0FF]/12 filter blur-2xl"
          animate={isPlaying ? {
            scale: isHovered ? [1, 0.8, 1.2, 1] : [1, 0.9, 1.05, 1],
            x: isHovered ? [16, -14, 10, 0] : [4, -4, 2, 0],
            y: isHovered ? [-12, 16, -8, 0] : [-4, 4, -2, 0],
          } : {}}
          transition={{ duration: d(4.5), repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <motion.div
          className="absolute w-20 h-20 rounded-full bg-em-highlight/10 filter blur-xl"
          animate={isPlaying ? {
            scale: isHovered ? [0.9, 1.3, 0.9] : [0.95, 1.05, 0.95],
            x: isHovered ? [8, -10, 8] : [2, -2, 2],
          } : {}}
          transition={{ duration: d(6), repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* Emotion readout */}
        <div className="absolute inset-x-0 bottom-3 text-center z-20 font-mono text-[9px] text-white/50 flex flex-col items-center gap-0.5">
          <span className="text-[#00F0FF] font-black tracking-wider uppercase">EMOTION: EXCITED</span>
          <span className="opacity-50 text-[7px]">CONFIDENCE: 92.4% | VALENCE: +0.81</span>
        </div>
      </div>
      <HudTelemetry lines={['MODEL: v3.1', 'CLASSES: 7', 'LAT: 12ms']} />
    </VisualizerCanvas>
  );
}


/* ─── 9. Autonomous Vehicle ──────────────────────────────────────────────── */
export function AutonomousVehicleVisualizer({ isHovered, isPlaying = true, speedMultiplier = 1 }: VisualizerProps) {
  const d = (base: number) => spd(base, speedMultiplier);
  return (
    <VisualizerCanvas label="AGV::LIDAR_MAP">
      <div className="relative w-[85%] h-[85%] rounded-lg border border-white/[0.05] bg-black/50 overflow-hidden flex items-center justify-center">
        {/* Vehicle */}
        <div className="absolute w-7 h-11 bg-em-highlight/80 rounded border border-white/20 z-20 flex flex-col justify-between p-1 shadow-[0_0_15px_rgba(230,0,38,0.3)]">
          <div className="w-full h-1 bg-white/40 rounded-sm" />
          <div className="w-full h-1 bg-white/40 rounded-sm" />
        </div>

        {/* Lidar pulses */}
        <motion.div
          className="absolute w-20 h-20 rounded-full border border-em-highlight/25 z-10"
          animate={isPlaying ? { scale: isHovered ? [0.5, 1.8, 0.5] : [0.7, 1.3, 0.7], opacity: [0.4, 0, 0.4] } : {}}
          transition={{ duration: d(3), repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-32 h-32 rounded-full border border-em-highlight/15 z-10"
          animate={isPlaying ? { scale: isHovered ? [0.6, 1.6, 0.6] : [0.8, 1.2, 0.8], opacity: [0.3, 0, 0.3] } : {}}
          transition={{ duration: d(3), repeat: Infinity, ease: 'linear', delay: 1 }}
        />
        <motion.div
          className="absolute w-44 h-44 rounded-full border border-dashed border-em-highlight/[0.06] z-10"
          animate={isPlaying ? { rotate: 360 } : {}}
          transition={{ duration: d(18), repeat: Infinity, ease: 'linear' }}
        />

        {/* Obstacle dots */}
        <motion.div
          className="absolute top-5 left-7 w-2.5 h-2.5 rounded-full bg-em-primary z-20"
          animate={isPlaying ? { opacity: [1, 0.3, 1] } : {}}
          transition={{ duration: d(1.5), repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-7 right-9 w-2 h-2 rounded-full bg-em-primary z-20"
          animate={isPlaying ? { opacity: [0.3, 1, 0.3] } : {}}
          transition={{ duration: d(1.8), repeat: Infinity }}
        />
        <div className="absolute top-8 right-14 w-1.5 h-1.5 rounded-full bg-yellow-400/60 z-20" />
      </div>
      <HudTelemetry lines={['SPEED: 2.4m/s', 'OBS: 3', 'PATH: OK']} />
    </VisualizerCanvas>
  );
}


/* ─── 10. Hand Gesture ───────────────────────────────────────────────────── */
export function HandGestureVisualizer({ isHovered, isPlaying = true, speedMultiplier = 1 }: VisualizerProps) {
  const d = (base: number) => spd(base, speedMultiplier);
  return (
    <VisualizerCanvas label="GESTURE::HAND_v2">
      <svg className="w-full h-full max-h-44 text-em-primary" viewBox="0 0 100 100">
        <defs>
          <filter id="handGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <motion.g
          animate={isPlaying ? {
            y: isHovered ? [0, -4, 0] : [0, 0, 0],
            rotate: isHovered ? [-5, 5, -5] : [0, 0, 0],
          } : {}}
          transition={{ duration: d(3), repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '50px 80px' }}
          filter="url(#handGlow)"
        >
          <path d="M 50,80 L 30,65 L 25,48 L 40,40 L 50,45 L 60,40 L 75,48 L 70,65 Z" fill="none" className="stroke-em-primary/15 stroke-[1.5]" />
          {/* Thumb */}
          <line x1="30" y1="65" x2="18" y2="55" className="stroke-em-primary stroke-[1.5]" />
          <line x1="18" y1="55" x2="10" y2="48" className="stroke-em-primary stroke-[1.5]" />
          <circle cx="10" cy="48" r="2.5" className="fill-em-primary" />
          {/* Index */}
          <line x1="25" y1="48" x2="22" y2="30" className="stroke-em-primary stroke-[1.5]" />
          <line x1="22" y1="30" x2="20" y2="18" className="stroke-em-primary stroke-[1.5]" />
          <circle cx="20" cy="18" r="2.5" className="fill-em-primary" />
          {/* Middle */}
          <line x1="40" y1="40" x2="40" y2="22" className="stroke-em-primary stroke-[1.5]" />
          <line x1="40" y1="22" x2="40" y2="12" className="stroke-em-primary stroke-[1.5]" />
          <circle cx="40" cy="12" r="2.5" className="fill-em-primary" />
          {/* Ring */}
          <line x1="60" y1="40" x2="60" y2="24" className="stroke-em-primary stroke-[1.5]" />
          <line x1="60" y1="24" x2="60" y2="15" className="stroke-em-primary stroke-[1.5]" />
          <circle cx="60" cy="15" r="2.5" className="fill-em-primary" />
          {/* Pinky */}
          <line x1="75" y1="48" x2="78" y2="36" className="stroke-em-primary stroke-[1.5]" />
          <line x1="78" y1="36" x2="80" y2="28" className="stroke-em-primary stroke-[1.5]" />
          <circle cx="80" cy="28" r="2.5" className="fill-em-primary" />
          {/* Joints */}
          <circle cx="30" cy="65" r="2" className="fill-em-primary/80" />
          <circle cx="25" cy="48" r="2" className="fill-em-primary/80" />
          <circle cx="40" cy="40" r="2" className="fill-em-primary/80" />
          <circle cx="60" cy="40" r="2" className="fill-em-primary/80" />
          <circle cx="75" cy="48" r="2" className="fill-em-primary/80" />
        </motion.g>
      </svg>
      <HudTelemetry lines={['POINTS: 21', 'GESTURE: OPEN', 'CONF: 97%']} />
    </VisualizerCanvas>
  );
}


/* ─── 11. Predictive Analytics ───────────────────────────────────────────── */
export function PredictiveAnalyticsVisualizer({ isHovered, isPlaying = true, speedMultiplier = 1 }: VisualizerProps) {
  const d = (base: number) => spd(base, speedMultiplier);
  return (
    <VisualizerCanvas label="PRED::FORECAST">
      <div className="relative w-[88%] h-[88%] rounded-lg border border-white/[0.05] bg-slate-900/60 p-3 overflow-hidden flex flex-col justify-between">
        <div className="flex justify-between items-center text-[7px] text-white/35 font-mono">
          <span>FORECASTING MODEL</span>
          <span className="text-[#00F0FF] font-black">99.1% <span className="text-white/20">ACC</span></span>
        </div>

        <svg className="w-full h-20" viewBox="0 0 200 80">
          {/* Grid lines */}
          <line x1="0" y1="20" x2="200" y2="20" className="stroke-white/[0.04]" strokeWidth="0.5" />
          <line x1="0" y1="40" x2="200" y2="40" className="stroke-white/[0.04]" strokeWidth="0.5" />
          <line x1="0" y1="60" x2="200" y2="60" className="stroke-white/[0.04]" strokeWidth="0.5" />

          {/* Historic line */}
          <path d="M 10,60 L 35,56 L 55,62 L 80,48 L 100,42 L 130,50" fill="none" className="stroke-white/30 stroke-[1.5]" />

          {/* Prediction cone */}
          <polygon points="130,50 190,18 190,72" className="fill-[#00F0FF]/8" />
          <line x1="130" y1="50" x2="190" y2="18" className="stroke-[#00F0FF]/30 stroke-1" strokeDasharray="3 3" />
          <line x1="130" y1="50" x2="190" y2="72" className="stroke-[#00F0FF]/30 stroke-1" strokeDasharray="3 3" />

          {/* Prediction path */}
          <motion.path
            d="M 130,50 L 155,44 L 175,38 L 190,34"
            fill="none"
            className="stroke-[#00F0FF] stroke-2"
            initial={{ pathLength: 0.2 }}
            animate={isPlaying ? { pathLength: isHovered ? 1 : 0.8 } : {}}
            transition={{ duration: d(2), ease: 'easeOut' }}
          />

          {/* Transition point */}
          <circle cx="130" cy="50" r="3" className="fill-white" />
          {/* End point */}
          <circle cx="190" cy="34" r="4" className="fill-[#00F0FF]/30" />
          <circle cx="190" cy="34" r="2.5" className="fill-[#00F0FF]" />
        </svg>

        <div className="flex justify-between text-[6px] font-mono text-white/15">
          <span>Q1</span><span>Q2</span><span>Q3</span><span className="text-[#00F0FF]/40">Q4 (pred)</span>
        </div>
      </div>
      <HudTelemetry lines={['HORIZON: 90d', 'R²: 0.991', 'DRIFT: ±0.3%']} />
    </VisualizerCanvas>
  );
}


/* ─── 12. Classification ─────────────────────────────────────────────────── */
export function ClassificationVisualizer({ isHovered, isPlaying = true, speedMultiplier = 1 }: VisualizerProps) {
  const d = (base: number) => spd(base, speedMultiplier);
  return (
    <VisualizerCanvas label="CLASS::MULTI_NET">
      <div className="relative w-[85%] h-[85%] flex items-center justify-between p-3 border border-white/[0.04] rounded-lg bg-black/40">
        {/* Input */}
        <div className="flex flex-col items-center gap-1 z-[15]">
          <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center bg-slate-900 font-mono text-[7px] text-white/80">IN</div>
          <span className="text-[5px] text-white/30 font-mono">RAW DATA</span>
        </div>

        {/* Flow paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 120">
          <path d="M 45,60 C 95,25 95,25 155,28" fill="none" className="stroke-white/[0.04] stroke-[1.5]" />
          <path d="M 45,60 C 95,60 95,60 155,60" fill="none" className="stroke-white/[0.04] stroke-[1.5]" />
          <path d="M 45,60 C 95,95 95,95 155,92" fill="none" className="stroke-white/[0.04] stroke-[1.5]" />

          <motion.circle
            r="4"
            fill="#E60026"
            animate={isPlaying ? { cx: [45, 155], cy: [60, 28] } : {}}
            transition={{ duration: d(isHovered ? 1.2 : 2.2), repeat: Infinity, ease: 'easeOut' }}
            className="drop-shadow-[0_0_4px_rgba(230,0,38,0.6)]"
          />
          <motion.circle
            r="3"
            fill="#00F0FF"
            animate={isPlaying ? { cx: [45, 155], cy: [60, 92] } : {}}
            transition={{ duration: d(isHovered ? 1.5 : 2.8), repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
            className="drop-shadow-[0_0_4px_rgba(0,240,255,0.6)]"
          />
          <motion.circle
            r="3"
            fill="#FFD600"
            animate={isPlaying ? { cx: [45, 155], cy: [60, 60] } : {}}
            transition={{ duration: d(isHovered ? 1.8 : 3), repeat: Infinity, ease: 'easeOut', delay: 1 }}
            className="drop-shadow-[0_0_4px_rgba(255,214,0,0.6)]"
          />
        </svg>

        {/* Output classes */}
        <div className="flex flex-col gap-1.5 z-[15]">
          <div className="px-2 py-1 bg-em-primary/15 border border-em-primary/25 rounded text-[7px] font-bold text-white font-mono flex items-center justify-between gap-3 min-w-[50px]">
            <span>CLASS_A</span>
            <span className="text-em-primary">92%</span>
          </div>
          <div className="px-2 py-1 bg-white/[0.03] border border-white/[0.08] rounded text-[7px] font-bold text-white/50 font-mono flex items-center justify-between gap-3 min-w-[50px]">
            <span>CLASS_B</span>
            <span>05%</span>
          </div>
          <div className="px-2 py-1 bg-[#00F0FF]/10 border border-[#00F0FF]/20 rounded text-[7px] font-bold text-white font-mono flex items-center justify-between gap-3 min-w-[50px]">
            <span>CLASS_C</span>
            <span className="text-[#00F0FF]">03%</span>
          </div>
        </div>
      </div>
      <HudTelemetry lines={['LAYERS: 152', 'BATCH: 32', 'TOP-1: 92%']} />
    </VisualizerCanvas>
  );
}


/* ─── 13. Digital Twin ───────────────────────────────────────────────────── */
export function DigitalTwinVisualizer({ isHovered, isPlaying = true, speedMultiplier = 1 }: VisualizerProps) {
  const d = (base: number) => spd(base, speedMultiplier);
  return (
    <VisualizerCanvas label="TWIN::SYNC_v4">
      <div className="relative w-full h-full flex items-center justify-center">
        <svg className="w-4/5 h-4/5" viewBox="0 0 150 150">
          <motion.g
            style={{ transformOrigin: '75px 75px' }}
            animate={isPlaying ? { rotateX: 60, rotateZ: isHovered ? 45 : 30 } : {}}
            transition={{ duration: d(12), repeat: Infinity, ease: 'linear' }}
          >
            {/* Grid */}
            <line x1="0" y1="37" x2="150" y2="37" className="opacity-[0.04] stroke-white stroke-[0.5]" />
            <line x1="0" y1="75" x2="150" y2="75" className="opacity-[0.04] stroke-white stroke-[0.5]" />
            <line x1="0" y1="113" x2="150" y2="113" className="opacity-[0.04] stroke-white stroke-[0.5]" />
            <line x1="37" y1="0" x2="37" y2="150" className="opacity-[0.04] stroke-white stroke-[0.5]" />
            <line x1="75" y1="0" x2="75" y2="150" className="opacity-[0.04] stroke-white stroke-[0.5]" />
            <line x1="113" y1="0" x2="113" y2="150" className="opacity-[0.04] stroke-white stroke-[0.5]" />

            {/* Machine blocks */}
            <rect x="25" y="25" width="40" height="40" fill="none" className="stroke-em-primary stroke-[1.5]" rx="2" />
            <rect x="85" y="85" width="40" height="40" fill="none" className="stroke-[#00F0FF] stroke-[1.5]" rx="2" />
            <rect x="85" y="25" width="40" height="40" fill="none" className="stroke-em-highlight/50 stroke-1" rx="2" />

            {/* Telemetry connections */}
            <motion.line
              x1="65" y1="45" x2="85" y2="105"
              className="stroke-em-primary/40 stroke-[1.5]"
              strokeDasharray="4 4"
              animate={isPlaying ? { strokeDashoffset: [0, -24] } : {}}
              transition={{ duration: d(2.5), repeat: Infinity, ease: 'linear' }}
            />
            <motion.line
              x1="105" y1="65" x2="105" y2="85"
              className="stroke-[#00F0FF]/30 stroke-1"
              strokeDasharray="3 3"
              animate={isPlaying ? { strokeDashoffset: [0, -18] } : {}}
              transition={{ duration: d(2), repeat: Infinity, ease: 'linear' }}
            />
          </motion.g>
        </svg>

        <div className="absolute top-2 left-2 z-10 bg-em-primary/15 border border-em-primary/25 px-1.5 py-0.5 rounded text-[7px] font-black text-white/80 font-mono">
          TWIN_ACTIVE
        </div>
        <div className="absolute top-2 right-8 z-10 bg-[#00F0FF]/10 border border-[#00F0FF]/20 px-1.5 py-0.5 rounded text-[7px] font-bold text-[#00F0FF]/70 font-mono">
          SYNC: LIVE
        </div>
      </div>
      <HudTelemetry lines={['NODES: 3', 'LINK: OK', 'δt: 2.1ms']} />
    </VisualizerCanvas>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════
   VISUALIZER MAP
   ═══════════════════════════════════════════════════════════════════════════ */
export const VISUALIZERS_MAP: Record<string, React.ComponentType<VisualizerProps>> = {
  detection: DetectionVisualizer,
  voiceAi: VoiceAIVisualizer,
  poseEstimation: PoseEstimationVisualizer,
  warehouseRobots: WarehouseRobotsVisualizer,
  segmentation: SegmentationVisualizer,
  noiseDetection: NoiseDetectionVisualizer,
  accentRecognition: AccentRecognitionVisualizer,
  emotionRecognition: EmotionRecognitionVisualizer,
  autonomousVehicle: AutonomousVehicleVisualizer,
  handGesture: HandGestureVisualizer,
  predictiveAnalytics: PredictiveAnalyticsVisualizer,
  classification: ClassificationVisualizer,
  digitalTwin: DigitalTwinVisualizer,
};
