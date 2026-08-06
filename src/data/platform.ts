/*
|--------------------------------------------------------------------------
| Engineering Platform Architecture
|--------------------------------------------------------------------------
|
| This is the single source of truth for the platform architecture.
|
| It is used to generate:
|
|   - Architecture diagram
|   - Platform component cards
|   - Technology explanations
|   - Project and dashboard links
|
| To add a platform component, add another object to this array.
|
*/

import type { PlatformNode } from './types';

export const platformNodes: PlatformNode[] = [
  /*
  |--------------------------------------------------------------------------
  | Edge Layer
  |--------------------------------------------------------------------------
  */

  {
    id: 'internet',
    title: 'Internet',
    category: 'External Traffic',
    description:
      'Public users, automated clients and internet traffic accessing externally published services.',
    status: 'Online',
    layer: 'edge',
    connectsTo: ['cloudflare'],
  },

  {
    id: 'cloudflare',
    title: 'Cloudflare',
    category: 'DNS and Edge',
    description:
      'Provides public DNS, TLS proxying, edge protection and controlled exposure of internet-facing services.',
    status: 'Protected',
    layer: 'edge',
    connectsTo: ['nginx-proxy-manager'],
  },

  /*
  |--------------------------------------------------------------------------
  | Access Layer
  |--------------------------------------------------------------------------
  */

  {
    id: 'nginx-proxy-manager',
    title: 'Nginx Proxy Manager',
    category: 'Reverse Proxy',
    description:
      'Routes public requests to internal services and manages HTTPS certificates and proxy-host configuration.',
    status: 'Online',
    layer: 'access',
    projectId: 'docker-platform',
    connectsTo: [
      'portfolio',
      'grafana',
      'birdnet',
      'authelia',
      'crowdsec',
    ],
  },

  {
    id: 'authelia',
    title: 'Authelia',
    category: 'Identity and Access',
    description:
      'Protects selected services with authentication and multi-factor access policies.',
    status: 'Protected',
    layer: 'access',
    projectId: 'docker-platform',
  },

  /*
  |--------------------------------------------------------------------------
  | Platform Layer
  |--------------------------------------------------------------------------
  */

  {
    id: 'docker',
    title: 'Docker Platform',
    category: 'Container Platform',
    description:
      'Hosts the portfolio, monitoring, authentication, security and application workloads using Docker Compose.',
    status: 'Active',
    layer: 'platform',
    projectId: 'docker-platform',
    connectsTo: [
      'portfolio',
      'grafana',
      'prometheus',
      'loki',
      'crowdsec',
      'birdnet',
    ],
  },

  {
    id: 'kubernetes',
    title: 'Kubernetes Platform',
    category: 'Container Orchestration',
    description:
      'A K3s engineering environment using Traefik, MetalLB and Git-based deployment practices.',
    status: 'Active',
    layer: 'platform',
    projectId: 'kubernetes',
  },

  {
    id: 'aws',
    title: 'AWS Cloud Platform',
    category: 'Cloud Engineering',
    description:
      'A modular Terraform-based cloud platform using remote state, IAM and reusable infrastructure components.',
    status: 'Active',
    layer: 'platform',
    projectId: 'aws-cloud-platform',
  },

  /*
  |--------------------------------------------------------------------------
  | Application and Service Layer
  |--------------------------------------------------------------------------
  */

  {
    id: 'portfolio',
    title: 'Engineering Portfolio',
    category: 'Astro Application',
    description:
      'The public portfolio application presenting engineering projects, architecture and live operational evidence.',
    status: 'Online',
    layer: 'services',
  },

  {
    id: 'birdnet',
    title: 'BirdNET-Go',
    category: 'Specialist Workload',
    description:
      'Processes live audio to identify bird species and exports operational metrics for monitoring.',
    status: 'Monitored',
    layer: 'services',
    projectId: 'birdnet',
    dashboardId: 'birdnet',
  },

  /*
  |--------------------------------------------------------------------------
  | Observability Layer
  |--------------------------------------------------------------------------
  */

  {
    id: 'prometheus',
    title: 'Prometheus',
    category: 'Metrics Collection',
    description:
      'Scrapes and stores infrastructure, container, application and security metrics.',
    status: 'Online',
    layer: 'observability',
    projectId: 'monitoring',
    dashboardId: 'platform',
    connectsTo: ['grafana'],
  },

  {
    id: 'grafana',
    title: 'Grafana',
    category: 'Visualisation and Alerting',
    description:
      'Provides operational dashboards, public telemetry views and alerting across the engineering platform.',
    status: 'Online',
    layer: 'observability',
    projectId: 'monitoring',
    dashboardId: 'platform',
  },

  {
    id: 'loki',
    title: 'Loki',
    category: 'Log Aggregation',
    description:
      'Centralises platform and application logs for investigation and operational troubleshooting.',
    status: 'Online',
    layer: 'observability',
    projectId: 'monitoring',
  },

  /*
  |--------------------------------------------------------------------------
  | Security Layer
  |--------------------------------------------------------------------------
  */

  {
    id: 'crowdsec',
    title: 'CrowdSec',
    category: 'Threat Detection',
    description:
      'Analyses proxy logs, detects malicious behaviour and creates automated security decisions.',
    status: 'Protected',
    layer: 'security',
    projectId: 'crowdsec',
    dashboardId: 'security',
    connectsTo: ['firewall'],
  },

  {
    id: 'firewall',
    title: 'Linux Firewall',
    category: 'Traffic Enforcement',
    description:
      'Applies CrowdSec decisions and drops traffic from known or locally detected malicious sources.',
    status: 'Protected',
    layer: 'security',
    projectId: 'crowdsec',
  },
];

/*
|--------------------------------------------------------------------------
| Architecture Helper Functions
|--------------------------------------------------------------------------
*/

/*
 * Return all nodes belonging to a particular architecture layer.
 */
export function getPlatformNodesByLayer(
  layer: PlatformNode['layer'],
): PlatformNode[] {
  return platformNodes.filter((node) => node.layer === layer);
}

/*
 * Find an individual platform node.
 */
export function getPlatformNodeById(
  id: string,
): PlatformNode | undefined {
  return platformNodes.find((node) => node.id === id);
}
