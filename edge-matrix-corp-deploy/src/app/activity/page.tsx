import { Metadata } from 'next';
import { Navbar, Footer } from '@/components/layout';
import { PageHeader, GlassPanel } from '@/components/shared';
import Link from 'next/link';
import { ActivityDashboard } from './_components/activity-dashboard';

export const metadata: Metadata = {
  title: 'Activity & Innovation | Edge Matrix Corporation',
  description: 'Explore our latest research, technical achievements, and open-source contributions in the field of AI and Robotics.',
};

const ACTIVITIES = [
  {
    type: 'AI System',
    title: 'Detection',
    date: '2026',
    desc: 'Custom Detection system is a customizable vision AI system for Detections. We provide a global standard custom object detection service with our Matrix Vision AI system. Detection combines classification and localization to determine what objects are in the image or video and specify where they are in the image.',
    icon: 'code' as const,
    color: 'primary' as const,
    visualizerId: 'detection',
    category: 'AI Systems',
    image: '/images/activity/detection.png',
    featured: true,
  },
  {
    type: 'NLP Model',
    title: 'Matrix Voice AI',
    date: '2026',
    desc: 'Natural language processing (NLP) is a branch of artificial intelligence within computer science that focuses on helping computers to understand the way that humans write and speak. This is a difficult task because it involves a lot of unstructured data.',
    icon: 'terminal' as const,
    color: 'accent' as const,
    visualizerId: 'voiceAi',
    category: 'NLP Models',
    image: '/images/activity/voice-ai.png',
    featured: false,
  },
  {
    type: 'AI System',
    title: 'Pose Estimation',
    date: '2026',
    desc: 'Matrix Pose Estimation system is a highly specialized model for estimating the Human body Gesture. We provide a premium quality pose estimation system with highest possible accuracy as it is optimized for best performance.',
    icon: 'zap' as const,
    color: 'highlight' as const,
    visualizerId: 'poseEstimation',
    category: 'AI Systems',
    image: '/images/activity/pose-estimation-v2.png',
    featured: true,
  },
  {
    type: 'Robotics',
    title: 'Warehouse Robots',
    date: '2026',
    desc: 'These are new generation of multi-sensing autonomous vehicles from Edge Matrix Corporation, used for indoor intralogistics tasks. It can autonomously transport items and navigate freely in its environment. As a mobile robot, it makes the labor of the workers easier and improves business efficiency.',
    icon: 'bookOpen' as const,
    color: 'primary' as const,
    visualizerId: 'warehouseRobots',
    category: 'Robotics',
    image: '/images/activity/warehouse-robots.png',
    featured: false,
  },
  {
    type: 'AI System',
    title: 'Segmentation',
    date: '2026',
    desc: 'Segmentation is one which segments the target from the background and show to the users. Any image consists of both useful and useless information, depending on the user\'s interest. Image segmentation separates an image into regions, each with its particular shape and border.',
    icon: 'code' as const,
    color: 'accent' as const,
    visualizerId: 'segmentation',
    category: 'AI Systems',
    image: '/images/activity/segmentation.png',
    featured: false,
  },
  {
    type: 'NLP Model',
    title: 'Environmental Noise Detection',
    date: '2026',
    desc: 'Environmental Noise Detection system is an NLP based system which detects the noise in the environment. It is designed more precisely using Matrix Voice AI architecture with various environmental sounds to have a great performance.',
    icon: 'terminal' as const,
    color: 'highlight' as const,
    visualizerId: 'noiseDetection',
    category: 'NLP Models',
    image: '/images/activity/noise-detection.png',
    featured: false,
  },
  {
    type: 'NLP Model',
    title: 'Accent Recognition',
    date: '2026',
    desc: 'This is an intelligent system which recognises the accent of the person. This employs Deep Neural Networks based on convolutional function to give best performance.',
    icon: 'zap' as const,
    color: 'primary' as const,
    visualizerId: 'accentRecognition',
    category: 'NLP Models',
    image: '/images/activity/accent-recognition.png',
    featured: false,
  },
  {
    type: 'NLP Model',
    title: 'Speech Emotion Recognition',
    date: '2026',
    desc: 'An NLP based intelligent system is one which processes the speech of the person to recognise the emotions of the person. This employs a multi model classification methodology which also takes Accent characteristics into an account.',
    icon: 'code' as const,
    color: 'accent' as const,
    visualizerId: 'emotionRecognition',
    category: 'NLP Models',
    image: '/images/activity/emotion-recognition.png',
    featured: false,
  },
  {
    type: 'Robotics',
    title: 'Autonomous Vehicle',
    date: '2026',
    desc: 'Automated guided vehicle (AGV) systems are used in many industrial applications characterized by physical path guidance in the form of embedded magnets or wires, painted lines or magnetic tape, or other electrical or mechanical path-defining means.',
    icon: 'bookOpen' as const,
    color: 'highlight' as const,
    visualizerId: 'autonomousVehicle',
    category: 'Robotics',
    image: '/images/activity/autonomous-vehicle-v2.png',
    featured: true,
  },
  {
    type: 'AI System',
    title: 'Hand Gesture Recognitions',
    date: '2026',
    desc: 'Hand gesture recognition system is a premium AI system that can recognize the hand gestures of humans and interpret what they are trying to communicate. We provide a top notch hand gesture recognition system to control and regulate the commodities.',
    icon: 'zap' as const,
    color: 'primary' as const,
    visualizerId: 'handGesture',
    category: 'AI Systems',
    image: '/images/activity/hand-gesture-v2.png',
    featured: false,
  },
  {
    type: 'Analytics',
    title: 'Predictive Analytics',
    date: '2026',
    desc: 'Predictive Analytics is a form of advanced analytics that uses current data and historical data to forecast different activities, customer behaviors, and future trends. It uses many techniques data mining, statistics, data modeling, machine learning, and artificial intelligence.',
    icon: 'terminal' as const,
    color: 'accent' as const,
    visualizerId: 'predictiveAnalytics',
    category: 'Analytics',
    image: '/images/activity/predictive-analytics.png',
    featured: false,
  },
  {
    type: 'AI System',
    title: 'Classification',
    date: '2026',
    desc: 'Classification is a machine learning task for determining which objects are in an image or video. It refers to training machine learning models with the intent of finding out which classes (objects) are present.',
    icon: 'code' as const,
    color: 'highlight' as const,
    visualizerId: 'classification',
    category: 'AI Systems',
    image: '/images/activity/classification.png',
    featured: false,
  },
  {
    type: 'Architecture',
    title: 'Digital Twin',
    date: '2026',
    desc: 'Digital twin technology, with engineering data at its core, is helping engineers gain control over their assets. By connecting the right people to the right data and the right processes, engineers gain greater end-to-end insights.',
    icon: 'bookOpen' as const,
    color: 'primary' as const,
    visualizerId: 'digitalTwin',
    category: 'Architecture',
    image: '/images/activity/digital-twin.png',
    featured: true,
  }
];

export default function ActivityPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" role="main">
        <PageHeader
          title="Activity & Innovation"
          subtitle="A showcase of our latest research, technical milestones, and contributions to the global AI and Robotics community."
          badge="Our Work"
          breadcrumbs={[{ label: 'Activity' }]}
          pattern="dots"
          gradientColor="primary"
        />

        <section className="em-section pt-0">
          <div className="em-container">
            <ActivityDashboard activities={ACTIVITIES} />
          </div>
        </section>

        <section className="em-section border-t border-em-border bg-em-surface/30">
          <div className="em-container">
            <GlassPanel intensity="strong" className="p-8 md:p-12 text-center max-w-4xl mx-auto">
              <h2 className="font-[var(--font-heading)] text-3xl font-bold mb-4">Contribute to the Future</h2>
              <p className="text-em-text-secondary mb-8 max-w-2xl mx-auto">
                We actively collaborate with leading universities and research institutions. If you are conducting research in AI, computer vision, or robotics, we provide access to our enterprise datasets and computational resources.
              </p>
              <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-em-primary hover:bg-em-primary/90 rounded-xl transition-colors hover:shadow-[0_0_30px_rgba(230,0,38,0.35)]">
                Partner With Us
              </Link>
            </GlassPanel>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
