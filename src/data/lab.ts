/*
|--------------------------------------------------------------------------
| Engineering Lab Data
|--------------------------------------------------------------------------
|
| This file contains the information displayed on the Engineering Lab page.
|
| Update this file when hardware, services or current projects change.
| The page itself should not contain duplicated infrastructure data.
|
*/

export interface LabStatistic {
  value: string;
  label: string;
  description: string;
}

export interface LabSystem {
  id: string;
  title: string;
  role: string;
  description: string;
  technologies: string[];
  status: 'Operational' | 'Active' | 'In development';
  projectHref?: string;
}

export interface LabCapability {
  title: string;
  description: string;
  technologies: string[];
}

export interface CurrentFocus {
  title: string;
  description: string;
  status: 'Active' | 'Developing' | 'Planned';
  href?: string;
}

/*
|--------------------------------------------------------------------------
| Lab Summary Statistics
|--------------------------------------------------------------------------
|
| These are intentionally approximate portfolio summaries rather than
| automatically collected live metrics.
|
*/

export const labStatistics: LabStatistic[] = [
  {
    value: '20+',
    label: 'Containerised services',
    description:
      'Applications, monitoring services, security tools and supporting infrastructure.',
  },
  {
    value: '3',
    label: 'Raspberry Pi systems',
    description:
      'Dedicated systems supporting Docker, Kubernetes and specialist workloads.',
  },
  {
    value: '2',
    label: 'Container platforms',
    description:
      'Docker Compose and Kubernetes provide separate engineering environments.',
  },
  {
    value: '24/7',
    label: 'Operational monitoring',
    description:
      'Prometheus, Grafana and alerting provide continuous platform visibility.',
  },
];

/*
|--------------------------------------------------------------------------
| Core Lab Systems
|--------------------------------------------------------------------------
*/

export const labSystems: LabSystem[] = [
  {
    id: 'docker-host',
    title: 'Main Docker Platform',
    role: 'Application and Infrastructure Host',
    description:
      'Hosts the public portfolio, monitoring stack, reverse proxy, identity services, security tools and self-hosted applications.',
    technologies: [
      'Linux',
      'Docker',
      'Docker Compose',
      'Nginx Proxy Manager',
      'Authelia',
      'Cloudflare',
    ],
    status: 'Operational',
    projectHref: '/projects/docker-platform',
  },

  {
    id: 'kubernetes-node',
    title: 'Kubernetes Platform',
    role: 'Container Orchestration Environment',
    description:
      'A practical K3s environment used to develop Kubernetes, ingress, load-balancing and deployment skills.',
    technologies: [
      'K3s',
      'Kubernetes',
      'MetalLB',
      'Traefik',
      'containerd',
      'Git',
    ],
    status: 'Active',
    projectHref: '/projects/kubernetes',
  },

  {
    id: 'birdnet-system',
    title: 'BirdNET Monitoring System',
    role: 'Specialist Audio Workload',
    description:
      'Processes live audio through a USB microphone to identify bird species and expose operational telemetry.',
    technologies: [
      'BirdNET-Go',
      'Linux',
      'Docker',
      'ALSA',
      'Prometheus',
      'Grafana',
    ],
    status: 'Operational',
    projectHref: '/projects/birdnet',
  },

  {
    id: 'aws-platform',
    title: 'AWS Engineering Platform',
    role: 'Cloud Infrastructure Lab',
    description:
      'Provides a modular environment for developing Terraform, cloud networking, IAM and remote-state management skills.',
    technologies: [
      'AWS',
      'Terraform',
      'S3',
      'DynamoDB',
      'IAM',
      'GitHub',
    ],
    status: 'In development',
    projectHref: '/projects/aws-cloud-platform',
  },
];

/*
|--------------------------------------------------------------------------
| Engineering Capabilities
|--------------------------------------------------------------------------
*/

export const labCapabilities: LabCapability[] = [
  {
    title: 'Container Platforms',
    description:
      'Applications are deployed using Docker Compose and Kubernetes, providing practical experience across container lifecycle management.',
    technologies: [
      'Docker',
      'Docker Compose',
      'Kubernetes',
      'K3s',
      'containerd',
    ],
  },

  {
    title: 'Monitoring and Observability',
    description:
      'Metrics, logs, dashboards and alerts provide operational visibility across hosts, containers, applications and security controls.',
    technologies: [
      'Prometheus',
      'Grafana',
      'Loki',
      'Promtail',
      'cAdvisor',
      'Node Exporter',
    ],
  },

  {
    title: 'Security Engineering',
    description:
      'Internet-facing services are protected using edge controls, authentication, behavioural threat detection and firewall enforcement.',
    technologies: [
      'Cloudflare',
      'Authelia',
      'CrowdSec',
      'Linux Firewall',
      'MFA',
      'TLS',
    ],
  },

  {
    title: 'Networking and Access',
    description:
      'The environment includes DNS, reverse proxying, Docker networks, Kubernetes load balancing and controlled external access.',
    technologies: [
      'DNS',
      'Nginx Proxy Manager',
      'Cloudflare',
      'MetalLB',
      'Traefik',
      'Docker Networking',
    ],
  },

  {
    title: 'Automation and Delivery',
    description:
      'Git-based workflows, infrastructure as code and deployment pipelines make changes repeatable and auditable.',
    technologies: [
      'Git',
      'GitHub',
      'GitHub Actions',
      'Terraform',
      'Docker Compose',
      'Shell scripting',
    ],
  },

  {
    title: 'Documentation and Mentoring',
    description:
      'Architecture, deployment procedures, training material and operational guidance are maintained as version-controlled documentation.',
    technologies: [
      'Astro',
      'MkDocs',
      'Markdown',
      'Git',
      'Documentation as Code',
    ],
  },
];

/*
|--------------------------------------------------------------------------
| Current Development Focus
|--------------------------------------------------------------------------
*/

export const currentFocus: CurrentFocus[] = [
  {
    title: 'Engineering Portfolio',
    description:
      'Building a professional Astro-based portfolio with live operational dashboards and structured case studies.',
    status: 'Active',
    href: '/',
  },

  {
    title: 'AWS Cloud Platform',
    description:
      'Developing modular Terraform infrastructure, remote state and reusable cloud components.',
    status: 'Developing',
    href: '/projects/aws-cloud-platform',
  },

  {
    title: 'Kubernetes Engineering',
    description:
      'Expanding the K3s environment with applications, monitoring and Git-based deployment practices.',
    status: 'Developing',
    href: '/projects/kubernetes',
  },

  {
    title: 'Public Monitoring Dashboards',
    description:
      'Preparing sanitised Grafana views for platform health, security monitoring and BirdNET activity.',
    status: 'Active',
    href: '/projects/monitoring',
  },

  {
    title: 'Azure Engineering Lab',
    description:
      'Planning practical Azure infrastructure, identity and automation projects.',
    status: 'Planned',
  },

  {
    title: 'Engineering Training Platform',
    description:
      'Separating structured technical training content into its own dedicated platform.',
    status: 'Planned',
  },
];
