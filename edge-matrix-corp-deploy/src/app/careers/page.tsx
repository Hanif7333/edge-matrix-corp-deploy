import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { Navbar, Footer } from '@/components/layout';
import { PageHeader } from '@/components/shared';
import CareersPageContent from './careers-content';

export const metadata: Metadata = {
  title: 'Careers — Membership, Internships & Training | Edge Matrix Corporation',
  description: 'Join Edge Matrix Corporation\'s annual tech membership, apply for production-grade internships, or enroll in industry-designed AI, Robotics, and IoT training programmes.',
};

type GalleryPhoto = {
  src: string;
  caption: string;
  category: 'partnerships' | 'exhibitions' | 'workshops' | 'achievements' | 'networking';
  featured: boolean;
};

const PHOTO_META: Record<string, { caption: string; category: GalleryPhoto['category']; featured: boolean }> = {
  'main': {
    caption: 'Research Grant Distribution by Chief Minister — University Research Park recognition ceremony for Edge Matrix.',
    category: 'achievements',
    featured: true,
  },
  'event-1': {
    caption: 'MoU signed between JBAS College for Women, Chennai & Edge Matrix for B.Sc. Maths Industrial AI & Deep Learning internships.',
    category: 'partnerships',
    featured: false,
  },
  'event-2': {
    caption: "FXEC students' victory and congratulatory recognition for winning at VISAI 2025 under the Matrix Annual Membership Program.",
    category: 'achievements',
    featured: false,
  },
  'event-3': {
    caption: 'Felicitation and presentation ceremony at Vivekanandha College of Technology for Women.',
    category: 'partnerships',
    featured: false,
  },
  'event-4': {
    caption: 'MoU signing ceremony and partnership launch with the Principal at Sri Sairam Institute of Technology.',
    category: 'partnerships',
    featured: false,
  },
  'event-5': {
    caption: 'FXEC students secure 1st Prize in Vel Tech VISAI 2026 under the Matrix Annual Membership Program.',
    category: 'achievements',
    featured: true,
  },
  'event-6': {
    caption: 'Press coverage of MoU signing between National Engineering College, Kovilpatti and Edge Matrix for electronic systems design.',
    category: 'partnerships',
    featured: false,
  },
  'event-7': {
    caption: 'AI-Driven Embedded Systems & IoT workshop inaugural session at Mangayarkarasi College of Engineering.',
    category: 'workshops',
    featured: false,
  },
  'event-8': {
    caption: 'Inaugural lamp lighting ceremony by Edge Matrix CEO Farhath Manas at a partner college symposium.',
    category: 'workshops',
    featured: true,
  },
  'event-9': {
    caption: 'Interactive classroom seminar on Machine Learning paradigms and Edge AI architecture.',
    category: 'workshops',
    featured: false,
  },
  'event-10': {
    caption: 'Direct student mentorship and code review session during a campus outreach event.',
    category: 'workshops',
    featured: false,
  },
  'event-11': {
    caption: 'Certificate distribution for students completing the AI-Driven Embedded Systems workshop at Mangayarkarasi College.',
    category: 'achievements',
    featured: false,
  },
  'event-12': {
    caption: 'Participant appreciation and certificate group photo at Mangayarkarasi College of Engineering.',
    category: 'achievements',
    featured: false,
  },
  'event-13': {
    caption: 'Hands-on project development and IoT hardware prototyping session.',
    category: 'workshops',
    featured: false,
  },
  'event-15': {
    caption: 'Edge Matrix team engaging visitors with brochures at the Technology Business Incubator exhibition, Thiagarajar College.',
    category: 'exhibitions',
    featured: false,
  },
  'event-16': {
    caption: 'Edge Matrix Corporation exhibition booth #39 — team with industry leaders at the trade expo.',
    category: 'exhibitions',
    featured: true,
  },
  'event-17': {
    caption: 'Edge Matrix product showcase — AI Vision Systems, robotics and membership poster at the TCETBI stall.',
    category: 'exhibitions',
    featured: false,
  },
  'event-18': {
    caption: 'Edge Matrix team at the #Vanakkam Startups event — startup ecosystem networking and innovation expo.',
    category: 'networking',
    featured: true,
  },
  'event-19': {
    caption: 'CII Exclusive Session — "Business Opportunities in Russia & Armenia", panel discussion with industry leaders, Feb 2026, Madurai.',
    category: 'networking',
    featured: true,
  },
  'event-20': {
    caption: 'Handshake moment — Networking with international delegates backstage at the CII business summit.',
    category: 'networking',
    featured: false,
  },
  'event-21': {
    caption: 'Product demonstration of AI-Driven Smart Water Irrigation System and drone technology to a VIP dignitary at the exhibition.',
    category: 'exhibitions',
    featured: false,
  },
  'event-22': {
    caption: 'Innovation, Design & Entrepreneurship (IDE) Bootcamp — Mr. Farhad Manas from Edge Matrix on the Entrepreneur Talk panel.',
    category: 'networking',
    featured: false,
  },
};

export default function CareersPage() {
  const galleryDir = path.join(process.cwd(), 'public', 'images', 'careers', 'gallery');
  let photos: GalleryPhoto[] = [];

  try {
    if (fs.existsSync(galleryDir)) {
      const files = fs.readdirSync(galleryDir);

      const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.tiff', '.bmp', '.svg'];

      const imageFiles = files.filter(file => {
        const nameLower = file.toLowerCase();
        const ext = path.extname(file).toLowerCase();
        // Include event-* files and Main.JPG
        return (nameLower.startsWith('event-') || nameLower === 'main.jpg') && imageExtensions.includes(ext);
      });

      // Sort: Main first (as hero), then events numerically
      imageFiles.sort((a, b) => {
        const aIsMain = a.toLowerCase() === 'main.jpg';
        const bIsMain = b.toLowerCase() === 'main.jpg';
        if (aIsMain) return -1;
        if (bIsMain) return 1;
        const numA = parseInt(a.replace(/[^0-9]/g, ''), 10) || 0;
        const numB = parseInt(b.replace(/[^0-9]/g, ''), 10) || 0;
        return numA - numB;
      });

      photos = imageFiles.map(file => {
        const nameWithoutExt = file.substring(0, file.lastIndexOf('.')).toLowerCase();
        const meta = PHOTO_META[nameWithoutExt];
        return {
          src: `/images/careers/gallery/${file}`,
          caption: meta?.caption || nameWithoutExt.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
          category: meta?.category || 'workshops',
          featured: meta?.featured || false,
        };
      });
    }
  } catch (error) {
    console.error('Error reading gallery directory:', error);
  }

  return (
    <>
      <Navbar />
      <main id="main-content" role="main">
        <PageHeader
          title="Build Your Future in Deep-Tech Engineering"
          subtitle="Membership programmes, structured internships, and industry-designed training tracks — your launchpad into production-grade AI, robotics, and IoT."
          badge="Careers & Growth"
          breadcrumbs={[{ label: 'Careers' }]}
          pattern="grid"
          gradientColor="primary"
        />

        <CareersPageContent photos={photos} />
      </main>
      <Footer />
    </>
  );
}
