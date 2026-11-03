// ============================================================================
// Edge Matrix Corporation — Services Data (Phase 7 Refinement)
// Enterprise service offerings content with premium positioning
// ============================================================================

import { ServiceItem } from '@/types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'ai-vision',
    title: 'MATRIX VISION AI',
    subtitle: 'Industrial Visual Intelligence',
    description:
      'Deploy enterprise-grade computer vision models at the edge. We transform unstructured visual data into real-time operational intelligence, enabling high-precision anomaly detection and automated quality assurance across critical manufacturing pipelines.',
    icon: 'Eye',
    features: [
      'Edge-Optimized Defect Recognition',
      'Real-Time Assembly Line Analytics',
      'Autonomous Surveillance & Security',
      'Thermal & Multispectral Inspection',
      'Predictive Visual Quality Assurance',
      'Scalable Multicam Orchestration',
    ],
    gradient: 'from-blue-600 to-cyan-500',
  },
  {
    id: 'voice-ai',
    title: 'MATRIX EDGE AI',
    subtitle: 'Cognitive Acoustic Systems',
    description:
      'Acoustic intelligence engineered for extreme industrial environments. Our proprietary Voice AI filters heavy machinery noise to execute precise hands-free commands, verify biometric security, and detect mechanical failures through acoustic anomalies.',
    icon: 'AudioLines',
    features: [
      'Industrial Noise-Cancellation NLU',
      'Acoustic Mechanical Diagnostics',
      'Secure Biometric Voice Authentication',
      'Hands-Free Floor Operations',
      'Real-Time Multilingual Translation',
      'Offline Edge Voice Processing',
    ],
    gradient: 'from-violet-600 to-purple-500',
  },
  {
    id: 'robotics',
    title: 'MATRIX VOICE AI',
    subtitle: 'Intelligent Kinetic Orchestration',
    description:
      'Transition from automated to autonomous. We engineer the central intelligence layer for enterprise robotics, enabling seamless human-machine collaboration, dynamic path planning, and swarm intelligence across logistics and manufacturing facilities.',
    icon: 'Bot',
    features: [
      'Autonomous Mobile Fleet Management',
      'Dynamic Obstacle Avoidance Systems',
      'Human-Cobot Collaboration Protocols',
      'Kinematic Path Optimization',
      'Swarm Logistics Orchestration',
      'Safety-Critical Failover Systems',
    ],
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    id: 'predictive-analytics',
    title: 'AIML',
    subtitle: 'Data-Driven Operational Resilience',
    description:
      'Eliminate unplanned downtime. By processing terabytes of IIoT telemetry data, our predictive engines forecast mechanical failures, optimize supply chain routing, and quantify operational risks weeks before they manifest physically.',
    icon: 'TrendingUp',
    features: [
      'Zero-Downtime Maintenance Forecasting',
      'Supply Chain Volatility Modeling',
      'Energy Consumption Optimization',
      'Algorithmic Risk Assessment',
      'Telemetry-Driven Yield Prediction',
      'Automated Inventory Replenishment',
    ],
    gradient: 'from-emerald-500 to-green-500',
  },
  {
    id: 'digital-twin',
    title: 'IIOT',
    subtitle: 'Synchronized Virtual Operations',
    description:
      'Command your physical infrastructure through high-fidelity virtual replicas. Our digital twin solutions allow executive teams to simulate operational changes, stress-test facility layouts, and optimize workflows in a risk-free synthetic environment.',
    icon: 'Layers',
    features: [
      'High-Fidelity Facility Replication',
      'Real-Time Sensor Synchronization',
      'Synthetic Stress-Testing Scenarios',
      'Production Line Optimization Models',
      'Remote Command & Control',
      'Lifecycle Degradation Simulation',
    ],
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'ai-ml',
    title: 'ROBOTICS',
    subtitle: 'Custom Machine Intelligence',
    description:
      'Bespoke algorithmic engineering for unique enterprise challenges. From proprietary foundation models to secure MLOps pipelines, we build resilient, scalable AI infrastructures that maintain strict data sovereignty and compliance.',
    icon: 'Brain',
    features: [
      'Proprietary Foundation Models',
      'Secure Enterprise MLOps Pipelines',
      'On-Premise LLM Deployment',
      'Continuous Learning Infrastructures',
      'Data Sovereignty Compliance',
      'Algorithmic Bias Auditing',
    ],
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    id: 'iiot',
    title: 'DIGITAL TWIN',
    subtitle: 'Decentralized Neural Networks',
    description:
      'Build the nervous system of your smart facility. We deploy highly secure, low-latency IIoT architectures that push computational power to the edge, ensuring critical industrial systems remain operational even when cloud connectivity drops.',
    icon: 'Network',
    features: [
      'Low-Latency Edge Computing Nodes',
      'Secure Industrial Protocol Bridging',
      'Decentralized Data Processing',
      'Resilient Offline Mode Operations',
      'Automated Device Provisioning',
      'End-to-End Payload Encryption',
    ],
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    id: 'autonomous-systems',
    title: 'SMART ROBOTS',
    subtitle: 'Self-Governing Infrastructures',
    description:
      'Engineer the next generation of self-governing technology. We develop safety-critical perception and decision-making frameworks for autonomous vehicles, industrial drones, and heavy machinery operating in unpredictable environments.',
    icon: 'Radar',
    features: [
      'Sensor Fusion Perception Pipelines',
      'Safety-Critical Decision Frameworks',
      'Unmanned Aerial Vehicle Intelligence',
      'Autonomous Heavy Machinery Control',
      'Real-Time Environmental Mapping',
      'Redundant Failsafe Engineering',
    ],
    gradient: 'from-sky-500 to-blue-600',
  },
];
