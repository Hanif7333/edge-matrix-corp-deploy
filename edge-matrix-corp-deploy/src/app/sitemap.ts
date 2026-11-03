import { MetadataRoute } from 'next';
import { SERVICES } from '@/constants/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.edgematrixcorp.com';

  // Core static routes
  const routes = [
    '',
    '/about',
    '/services',
    '/activity',
    '/trainings',
    '/careers',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic service routes (generated from constants)
  const serviceRoutes = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...serviceRoutes];
}
