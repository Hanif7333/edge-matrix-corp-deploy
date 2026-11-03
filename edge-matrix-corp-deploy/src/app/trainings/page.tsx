import { Metadata } from 'next';
import { Navbar, Footer } from '@/components/layout';
import { PageHeader, AnimatedButton, KnowledgeCore3D } from '@/components/shared';
import { TrainingsSection, CTASection } from '@/sections';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Trainings & Workforce Enablement | Edge Matrix Corporation',
  description: 'Enterprise training programs in AI, Machine Learning, Computer Vision, and Robotics designed by industry experts.',
};

const FEATURES = [
  'Instructor-led remote or on-premise execution',
  'Secure sandbox environments utilizing sanitized corporate data',
  'Dedicated cloud compute clusters provisioned per cohort',
  'Continuous post-certification technical advisory',
];

const CODE_LINES = [
  { num: '01', code: 'import torch', highlight: false },
  { num: '02', code: 'import torch.nn as nn', highlight: false },
  { num: '03', code: 'from torchvision import models, transforms', highlight: false },
  { num: '04', code: '', highlight: false },
  { num: '05', code: 'class MatrixDetector(nn.Module):', highlight: true },
  { num: '06', code: '    def __init__(self, num_classes=80):', highlight: false },
  { num: '07', code: '        super().__init__()', highlight: false },
  { num: '08', code: '        self.backbone = models.resnet50(pretrained=True)', highlight: true },
  { num: '09', code: '        self.head = nn.Linear(2048, num_classes)', highlight: false },
  { num: '10', code: '', highlight: false },
  { num: '11', code: '    def forward(self, x):', highlight: false },
  { num: '12', code: '        features = self.backbone(x)', highlight: true },
  { num: '13', code: '        return self.head(features)', highlight: false },
  { num: '14', code: '', highlight: false },
  { num: '15', code: '# Initialize model with Edge Matrix weights', highlight: false },
  { num: '16', code: 'model = MatrixDetector(num_classes=120)', highlight: true },
  { num: '17', code: 'model.load_state_dict(torch.load("matrix_v4.pth"))', highlight: false },
  { num: '18', code: 'model.eval()', highlight: false },
  { num: '19', code: '', highlight: false },
  { num: '20', code: '# Run inference on production pipeline', highlight: false },
];

export default function TrainingsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" role="main">
        <PageHeader
          title="Edge Matrix Corporation provides premium training programs"
          subtitle="Training"
          badge="Global Education"
          breadcrumbs={[{ label: 'Trainings' }]}
          pattern="grid"
          gradientColor="primary"
        />

        <TrainingsSection />

        <section className="em-section pt-0 pb-10">
          <div className="em-container">
            <KnowledgeCore3D />
          </div>
        </section>

        {/* ─── Upcoming Courses Section ─────────────────────────────────── */}
        <section className="em-section pt-0 border-t border-em-border">
          <div className="em-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-em-primary bg-em-primary/[0.06] border border-em-primary/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-em-primary animate-pulse" />
                  Custom Programs
                </div>

                <h2 className="font-[var(--font-heading)] text-3xl lg:text-4xl font-bold text-em-text mb-6 leading-tight">
                  Upcoming{' '}
                  <span className="text-em-primary">Courses</span>
                </h2>

                <p className="text-em-text-secondary mb-8 leading-relaxed text-[15px]">
                  Standardized curriculums cannot address proprietary industrial pipelines. We architect bespoke technical training programs mapped directly to your organization&apos;s unique tech stack, internal datasets, and strategic digital transformation objectives.
                </p>

                <ul className="space-y-4 mb-10">
                  {FEATURES.map((item) => (
                    <li key={item} className="flex items-start gap-3 group">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 bg-em-primary/[0.06] border border-em-primary/15">
                        <CheckCircle2 className="w-3.5 h-3.5 text-em-primary" />
                      </div>
                      <span className="text-sm text-em-text font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <AnimatedButton href="/contact" variant="primary">
                  Request Custom Training
                </AnimatedButton>
              </div>

              {/* Right: Animated Code Editor */}
              <div className="relative">
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: '#0A0A0A',
                    border: '1px solid rgba(230,0,38,0.1)',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.2), 0 0 60px rgba(230,0,38,0.03)',
                  }}
                >
                  {/* Editor title bar */}
                  <div
                    className="flex items-center gap-3 px-5 py-3.5 border-b"
                    style={{ borderColor: 'rgba(255,255,255,0.04)' }}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#E60026]/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <span className="text-[10px] font-mono text-white/25 tracking-wider">matrix_training.py</span>
                    </div>
                    <span className="text-[8px] font-mono text-white/15">Python 3.11</span>
                  </div>

                  {/* Editor tabs */}
                  <div
                    className="flex items-center gap-0 px-0 border-b"
                    style={{ borderColor: 'rgba(255,255,255,0.03)' }}
                  >
                    <div
                      className="px-4 py-2 text-[10px] font-mono text-[#E60026] border-b-2 border-[#E60026]"
                      style={{ background: 'rgba(230,0,38,0.04)' }}
                    >
                      model.py
                    </div>
                    <div className="px-4 py-2 text-[10px] font-mono text-white/20">
                      train.py
                    </div>
                    <div className="px-4 py-2 text-[10px] font-mono text-white/20">
                      config.yaml
                    </div>
                  </div>

                  {/* Code content */}
                  <div className="p-5 font-mono text-[11px] leading-[1.8] overflow-hidden max-h-[420px]">
                    {CODE_LINES.map((line, i) => (
                      <div
                        key={i}
                        className="flex gap-4 transition-colors duration-200"
                        style={{
                          background: line.highlight ? 'rgba(230,0,38,0.04)' : 'transparent',
                          borderLeft: line.highlight ? '2px solid rgba(230,0,38,0.4)' : '2px solid transparent',
                          paddingLeft: '8px',
                          marginLeft: '-10px',
                          paddingRight: '8px',
                          borderRadius: '2px',
                        }}
                      >
                        <span className="text-white/15 select-none w-5 text-right shrink-0">{line.num}</span>
                        <span className={line.code.startsWith('#')
                          ? 'text-white/20 italic'
                          : line.code.includes('class ') || line.code.includes('def ')
                            ? 'text-[#E60026]'
                            : line.code.includes('import') || line.code.includes('from')
                              ? 'text-[#E60026]/70'
                              : line.code.includes('=')
                                ? 'text-white/50'
                                : 'text-white/35'
                        }>
                          {line.code || '\u00A0'}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom status bar */}
                  <div
                    className="flex items-center justify-between px-5 py-2 border-t"
                    style={{ borderColor: 'rgba(255,255,255,0.03)' }}
                  >
                    <div className="flex items-center gap-3 text-[8px] font-mono text-white/15">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                        Ready
                      </span>
                      <span>UTF-8</span>
                      <span>Ln 16, Col 42</span>
                    </div>
                    <div className="flex items-center gap-3 text-[8px] font-mono text-white/15">
                      <span>Spaces: 4</span>
                      <span>Python</span>
                    </div>
                  </div>
                </div>

                {/* Floating info card */}
                <div className="absolute -bottom-4 -left-4 md:left-auto md:-right-4 p-4 rounded-xl max-w-[220px] z-10 bg-em-bg border border-em-border shadow-[0_8px_30px_rgba(0,0,0,0.08),0_0_20px_rgba(230,0,38,0.03)]">
                  <h3 className="font-bold text-em-text text-sm mb-1.5">Matrix Learning Platform</h3>
                  <p className="text-[10px] text-em-text-muted leading-relaxed">
                    Secure, cloud-hosted Jupyter environments provisioned instantly for every student.
                  </p>
                  <div className="mt-2.5 flex items-center gap-2">
                    <span className="text-[8px] font-mono text-em-primary px-1.5 py-0.5 rounded bg-em-primary/8 border border-em-primary/15">GPU</span>
                    <span className="text-[8px] font-mono text-em-primary px-1.5 py-0.5 rounded bg-em-primary/8 border border-em-primary/15">A100</span>
                    <span className="text-[8px] font-mono text-em-text-muted px-1.5 py-0.5 rounded bg-em-surface border border-em-border">80GB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
