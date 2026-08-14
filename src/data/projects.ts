/*
|--------------------------------------------------------------------------
| Portfolio Projects
|--------------------------------------------------------------------------
|
| This file is the single source of truth for project summary information.
|
| It is used by:
|
|   - Homepage featured-project cards
|   - Projects overview page
|   - Related-project sections
|   - Future technology pages
|   - Future architecture navigation
|
| To add a project:
|
|   1. Add an object to the projects array.
|   2. Create the corresponding project page.
|   3. Set featured to true if it should appear on the homepage.
|
*/

import type { Project } from './types';

export const projects: Project[] = [
  {
    id: 'greenbone',
    category: 'Vulnerability Management',
    title: 'Greenbone Vulnerability Management',
    shortTitle: 'Greenbone Vulnerability Management',
    description:
      'A managed vulnerability-management workflow that turns Greenbone scan evidence into prioritised, reviewable remediation for the Linux homelab.',
    href: '/projects/greenbone',
    status: 'Live',
    technologies: [
      'Greenbone',
      'OpenVAS',
      'Docker Compose',
      'Prometheus',
      'Linux',
    ],
    featured: true,
  },

  {
    id: 'crowdsec',
    category: 'Security Engineering',
    title: 'CrowdSec Security Platform',
    shortTitle: 'CrowdSec Security Platform',
    description:
      'A production-style threat detection and automated firewall enforcement platform with Prometheus metrics, Grafana dashboards and community threat intelligence.',
    href: '/projects/crowdsec',
    status: 'Live',
    technologies: [
      'CrowdSec',
      'Linux Firewall',
      'Prometheus',
      'Grafana',
      'Docker',
    ],
    featured: true,
    dashboardKey: 'security',
  },

  {
    id: 'docker-platform',
    category: 'Container Platforms',
    title: 'Docker Engineering Platform',
    shortTitle: 'Docker Engineering Platform',
    description:
      'A self-hosted container platform supporting reverse proxying, authentication, monitoring, security and automated application deployment.',
    href: '/projects/docker-platform',
    status: 'Active project',
    technologies: [
      'Docker',
      'Docker Compose',
      'Nginx Proxy Manager',
      'Authelia',
      'Cloudflare',
    ],
    featured: true,
    dashboardKey: 'docker-platform',
  },

  {
    id: 'kubernetes',
    category: 'Kubernetes',
    title: 'Kubernetes Homelab',
    shortTitle: 'Kubernetes Homelab',
    description:
      'A practical K3s environment demonstrating container orchestration, load balancing, ingress management and Git-based deployment.',
    href: '/projects/kubernetes',
    status: 'Active project',
    technologies: [
      'K3s',
      'Kubernetes',
      'MetalLB',
      'Traefik',
      'containerd',
    ],
    featured: true,
    repositoryUrl:
      'https://github.com/jrwroberts1976/kubernetes-homelab',
  },

  {
    id: 'aws-cloud-platform',
    category: 'Cloud Engineering',
    title: 'AWS Cloud Platform',
    shortTitle: 'AWS Cloud Platform',
    description:
      'A modular AWS engineering platform built with Terraform, remote state management, networking modules and documented architecture decisions.',
    href: '/projects/aws-cloud-platform',
    status: 'Active project',
    technologies: [
      'AWS',
      'Terraform',
      'S3',
      'DynamoDB',
      'IAM',
    ],
    featured: false,
    repositoryUrl:
      'https://github.com/jrwroberts1976/cloud-platform',
  },

  {
    id: 'monitoring',
    category: 'Observability',
    title: 'Monitoring and Observability Platform',
    shortTitle: 'Monitoring Platform',
    description:
      'Centralised infrastructure monitoring using Prometheus, Grafana, Loki, exporters, dashboards and operational alerting.',
    href: '/projects/monitoring',
    status: 'Live',
    technologies: [
      'Prometheus',
      'Grafana',
      'Loki',
      'Promtail',
      'cAdvisor',
    ],
    featured: false,
    dashboardKey: 'platform',
  },
    {
    id: 'disaster-recovery',
    category: 'Infrastructure Resilience',
    title: 'Homelab Disaster Recovery Platform',
    shortTitle: 'Disaster Recovery Platform',
    description:
      'A practical disaster recovery framework using Restic backups, automation, monitoring and recovery validation to rebuild infrastructure after failure.',
    href: '/projects/disaster-recovery',
    status: 'Active project',
    technologies: [
      'Restic',
      'Linux',
      'Docker',
      'Raspberry Pi',
      'Prometheus',
      'Grafana',
      'Backup Automation',
    ],
    featured: true,
  },

  {
    id: 'birdnet',
    category: 'Specialist Workload',
    title: 'BirdNET Monitoring',
    shortTitle: 'BirdNET Monitoring',
    description:
      'A wildlife detection workload integrated with Docker, audio hardware, custom metrics and Grafana visualisation.',
    href: '/projects/birdnet',
    status: 'Historical Dataset',
    technologies: [
      'BirdNET-Go',
      'Docker',
      'Prometheus',
      'Grafana',
      'ALSA',
    ],
    featured: false,
    dashboardKey: 'birdnet',
  },
];

/*
|--------------------------------------------------------------------------
| Project Helper Functions
|--------------------------------------------------------------------------
|
| These functions keep filtering and lookups consistent across the site.
|
*/

/*
 * Return projects marked for homepage display.
 */
export const featuredProjects = projects.filter(
  (project) => project.featured,
);

/*
 * Find a project using its unique ID.
 */
export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

/*
 * Return every project using a particular technology.
 *
 * This will later power technology pages such as:
 *
 *   /technologies/docker
 */
export function getProjectsByTechnology(
  technology: string,
): Project[] {
  const normalisedTechnology = technology.toLowerCase();

  return projects.filter((project) =>
    project.technologies.some(
      (item) => item.toLowerCase() === normalisedTechnology,
    ),
  );
}
