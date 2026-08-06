/*
|--------------------------------------------------------------------------
| Engineering Journey Data
|--------------------------------------------------------------------------
|
| This file is the single source of truth for the Engineering Journey page.
|
| Keep dates broad where exact dates are not important. The purpose of this
| page is to explain professional and technical development rather than
| duplicate the full employment history contained in the CV.
|
*/

export interface JourneyMilestone {
  id: string;
  period: string;
  title: string;
  category:
    | 'Career'
    | 'Infrastructure'
    | 'Leadership'
    | 'Operations'
    | 'Cloud'
    | 'Platform Engineering'
    | 'Current Development';
  summary: string;
  details: string[];
  technologies?: string[];
  relatedLinks?: {
    label: string;
    href: string;
  }[];
}

export interface JourneyTheme {
  title: string;
  description: string;
  stages: string[];
}

export interface JourneyPrinciple {
  title: string;
  description: string;
}

/*
|--------------------------------------------------------------------------
| Main Journey Timeline
|--------------------------------------------------------------------------
*/

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: 'first-line-support',
    period: 'Career Foundation',
    title: 'First-Line IT Support',
    category: 'Career',
    summary:
      'Began my career supporting users, resolving incidents and learning how technology affects day-to-day business operations.',
    details: [
      'Developed a strong customer-service and troubleshooting foundation.',
      'Learned to gather accurate information before escalating technical issues.',
      'Built an understanding of service priorities, business impact and incident ownership.',
      'Progressed by taking responsibility for increasingly complex technical problems.',
    ],
    technologies: [
      'Desktop Support',
      'Networking',
      'Incident Management',
      'Customer Support',
    ],
    relatedLinks: [
      {
        label: 'Professional profile',
        href: '/about',
      },
    ],
  },

  {
    id: 'enterprise-infrastructure',
    period: 'Infrastructure Development',
    title: 'Enterprise Systems and Infrastructure',
    category: 'Infrastructure',
    summary:
      'Moved into infrastructure support across business-critical systems, servers, networks and enterprise applications.',
    details: [
      'Supported operationally important technology environments.',
      'Developed experience across server, application and infrastructure dependencies.',
      'Built stronger diagnostic skills through complex technical incidents.',
      'Learned the importance of resilience, change control and reliable operational procedures.',
    ],
    technologies: [
      'Enterprise Infrastructure',
      'Servers',
      'Networking',
      'Storage',
      'Operational Support',
    ],
    relatedLinks: [
      {
        label: 'Engineering Lab',
        href: '/lab',
      },
    ],
  },

  {
    id: 'unix-linux',
    period: 'Technical Specialism',
    title: 'UNIX and Red Hat Linux',
    category: 'Infrastructure',
    summary:
      'Developed deep operational experience supporting UNIX and Linux platforms, including Red Hat systems.',
    details: [
      'Became a subject-matter expert across several infrastructure areas.',
      'Supported Linux and UNIX systems through maintenance, troubleshooting and operational change.',
      'Developed practical understanding of performance, services, filesystems and system dependencies.',
      'Applied structured diagnosis during complex and business-impacting incidents.',
    ],
    technologies: [
      'UNIX',
      'Red Hat Linux',
      'Shell',
      'System Administration',
      'Performance Analysis',
    ],
    relatedLinks: [
      {
        label: 'About my experience',
        href: '/about',
      },
      {
        label: 'Docker platform',
        href: '/projects/docker-platform',
      },
    ],
  },

  {
    id: 'infrastructure-management',
    period: 'Leadership Development',
    title: 'Infrastructure Management and Technical Leadership',
    category: 'Leadership',
    summary:
      'Progressed into senior technical and infrastructure leadership responsibilities while remaining close to operational delivery.',
    details: [
      'Provided direction during technical incidents and infrastructure changes.',
      'Supported engineers and helped teams resolve complex problems.',
      'Balanced technical requirements with service continuity and business priorities.',
      'Developed experience coordinating work across internal and external teams.',
    ],
    technologies: [
      'Technical Leadership',
      'Infrastructure Management',
      'Incident Leadership',
      'Stakeholder Communication',
    ],
    relatedLinks: [
      {
        label: 'Technical leadership',
        href: '/leadership',
      },
    ],
  },

  {
    id: 'governance-risk-dr',
    period: 'Operational Governance',
    title: 'Governance, Disaster Recovery and Risk',
    category: 'Operations',
    summary:
      'Contributed to governance, disaster recovery, cyber-response planning and infrastructure risk management.',
    details: [
      'Considered technology decisions in the context of business continuity.',
      'Supported disaster-recovery and operational-resilience activities.',
      'Contributed to cyber-response strategy and risk discussions.',
      'Helped ensure that technical change remained controlled and supportable.',
    ],
    technologies: [
      'Governance',
      'Disaster Recovery',
      'Cyber Response',
      'Risk Management',
      'Operational Resilience',
    ],
    relatedLinks: [
      {
        label: 'Operational approach',
        href: '/lab',
      },
    ],
  },

  {
    id: 'offshore-patching',
    period: 'Service Transition',
    title: 'Offshore Patching Transition',
    category: 'Leadership',
    summary:
      'Led the transition of routine infrastructure patching to an offshore service provider.',
    details: [
      'Planned the technical and operational transition.',
      'Documented repeatable patching procedures and support requirements.',
      'Managed security concerns, supplier dependencies and operational risk.',
      'Coordinated knowledge transfer across cultural, language and time-zone differences.',
      'Helped deliver a consistent and cost-effective process with minimal business disruption.',
    ],
    technologies: [
      'Project Delivery',
      'Supplier Management',
      'Patching',
      'Knowledge Transfer',
      'Risk Management',
    ],
    relatedLinks: [
      {
        label: 'Leadership case studies',
        href: '/leadership',
      },
    ],
  },

  {
    id: 'environment-separation',
    period: 'Infrastructure Change',
    title: 'IT Environment Separation',
    category: 'Leadership',
    summary:
      'Worked with a third-party provider to separate a shared IT solution so two organisations could operate independently.',
    details: [
      'Helped define technical scope, dependencies and delivery requirements.',
      'Coordinated internal teams, external suppliers and technical workstreams.',
      'Managed operational risk and service-continuity considerations.',
      'Addressed internal resistance through clear communication and structured planning.',
      'Supported the transition from a shared environment to independent operations.',
    ],
    technologies: [
      'Infrastructure Separation',
      'Project Coordination',
      'Stakeholder Management',
      'Supplier Management',
      'Change Delivery',
    ],
    relatedLinks: [
      {
        label: 'Technical leadership',
        href: '/leadership',
      },
    ],
  },

  {
    id: 'hosting-evolution',
    period: 'Technology Evolution',
    title: 'From On-Premises to Hosted and Cloud Platforms',
    category: 'Cloud',
    summary:
      'Experienced the evolution of enterprise hosting from local server rooms through third-party data centres to modern public cloud services.',
    details: [
      'Supported traditional on-premises infrastructure.',
      'Worked with privately hosted data-centre environments.',
      'Developed understanding of the operational differences between hosting models.',
      'Expanded practical cloud capability across AWS and Microsoft Azure.',
    ],
    technologies: [
      'On-Premises Infrastructure',
      'Data Centres',
      'AWS',
      'Microsoft Azure',
      'Cloud Operations',
    ],
    relatedLinks: [
      {
        label: 'AWS Cloud Platform',
        href: '/projects/aws-cloud-platform',
      },
    ],
  },

  {
    id: 'monitoring-observability',
    period: 'Modern Operations',
    title: 'Monitoring and Observability',
    category: 'Platform Engineering',
    summary:
      'Expanded from reactive infrastructure support into proactive monitoring, metrics, dashboards and alerting.',
    details: [
      'Developed Grafana monitoring proofs of concept.',
      'Implemented Prometheus metrics collection and exporters.',
      'Created dashboards for infrastructure, applications and security activity.',
      'Configured alerts for service health and operational conditions.',
      'Used monitoring to improve technical understanding and support decisions.',
    ],
    technologies: [
      'Prometheus',
      'Grafana',
      'Loki',
      'Alerting',
      'Observability',
    ],
    relatedLinks: [
      {
        label: 'Monitoring platform',
        href: '/projects/monitoring',
      },
      {
        label: 'Live dashboards',
        href: '/#live-dashboards',
      },
    ],
  },

  {
    id: 'containers',
    period: 'Platform Development',
    title: 'Docker and Container Platforms',
    category: 'Platform Engineering',
    summary:
      'Built and operated a Docker-based engineering platform supporting applications, monitoring, security and authentication.',
    details: [
      'Deployed services using Docker Compose.',
      'Designed container networks and persistent storage.',
      'Integrated reverse proxying, authentication and public DNS.',
      'Implemented monitoring, logging and automated security controls.',
      'Documented the environment as a supportable platform rather than an isolated lab.',
    ],
    technologies: [
      'Docker',
      'Docker Compose',
      'Nginx Proxy Manager',
      'Authelia',
      'Cloudflare',
    ],
    relatedLinks: [
      {
        label: 'Docker Engineering Platform',
        href: '/projects/docker-platform',
      },
      {
        label: 'Engineering Lab',
        href: '/lab',
      },
    ],
  },

  {
    id: 'security-platform',
    period: 'Security Engineering',
    title: 'CrowdSec Security Monitoring',
    category: 'Platform Engineering',
    summary:
      'Implemented automated threat detection, community intelligence and Linux firewall enforcement.',
    details: [
      'Integrated CrowdSec with reverse-proxy logs.',
      'Configured behavioural detection scenarios and community decisions.',
      'Implemented automated blocking through a firewall bouncer.',
      'Created Prometheus metrics, Grafana dashboards and security alerts.',
      'Published a sanitised, read-only dashboard as live portfolio evidence.',
    ],
    technologies: [
      'CrowdSec',
      'Linux Firewall',
      'Prometheus',
      'Grafana',
      'Security Monitoring',
    ],
    relatedLinks: [
      {
        label: 'CrowdSec case study',
        href: '/projects/crowdsec',
      },
    ],
  },

  {
    id: 'infrastructure-as-code',
    period: 'Automation Development',
    title: 'Terraform and Infrastructure as Code',
    category: 'Cloud',
    summary:
      'Developed modular cloud infrastructure using Terraform, remote state and documented engineering decisions.',
    details: [
      'Created reusable Terraform modules and environment structures.',
      'Configured remote state using Amazon S3.',
      'Implemented state locking using DynamoDB.',
      'Developed AWS networking and infrastructure components.',
      'Maintained architecture, progress and decision documentation alongside the code.',
    ],
    technologies: [
      'Terraform',
      'AWS',
      'S3',
      'DynamoDB',
      'Infrastructure as Code',
    ],
    relatedLinks: [
      {
        label: 'AWS Cloud Platform',
        href: '/projects/aws-cloud-platform',
      },
    ],
  },

  {
    id: 'kubernetes',
    period: 'Container Orchestration',
    title: 'Kubernetes Engineering',
    category: 'Platform Engineering',
    summary:
      'Built a practical K3s environment to develop orchestration, ingress and load-balancing capability.',
    details: [
      'Deployed and operated a K3s control-plane node.',
      'Configured MetalLB for local load-balancer addressing.',
      'Used Traefik for ingress routing.',
      'Deployed applications through Kubernetes manifests.',
      'Created operational and architectural documentation for the platform.',
    ],
    technologies: [
      'Kubernetes',
      'K3s',
      'MetalLB',
      'Traefik',
      'containerd',
    ],
    relatedLinks: [
      {
        label: 'Kubernetes Homelab',
        href: '/projects/kubernetes',
      },
    ],
  },

  {
    id: 'engineering-portfolio',
    period: 'Current',
    title: 'Engineering Portfolio and Live Platform Evidence',
    category: 'Current Development',
    summary:
      'Created a professional Astro portfolio that brings together projects, architecture, leadership and live operational telemetry.',
    details: [
      'Built a reusable, data-driven Astro application.',
      'Separated portfolio content from the technical training platform.',
      'Connected public Grafana dashboards to project case studies.',
      'Documented the Engineering Lab and platform architecture.',
      'Designed the portfolio itself as an engineering project.',
    ],
    technologies: [
      'Astro',
      'TypeScript',
      'Docker',
      'Grafana',
      'GitHub Actions',
    ],
    relatedLinks: [
      {
        label: 'Portfolio home',
        href: '/',
      },
      {
        label: 'Platform architecture',
        href: '/architecture',
      },
    ],
  },

  {
    id: 'future-development',
    period: 'Next Stage',
    title: 'Cloud, Platform and Delivery Leadership',
    category: 'Current Development',
    summary:
      'Continuing to develop toward roles combining infrastructure engineering, cloud platforms, technical leadership and project delivery.',
    details: [
      'Expanding practical Microsoft Azure experience.',
      'Developing deeper Terraform and cloud-automation capability.',
      'Continuing Kubernetes and platform-engineering development.',
      'Building further CI/CD and documentation-as-code workflows.',
      'Applying project-management principles to technical delivery.',
    ],
    technologies: [
      'Azure',
      'Platform Engineering',
      'Cloud Infrastructure',
      'Project Delivery',
      'Automation',
    ],
    relatedLinks: [
      {
        label: 'Professional direction',
        href: '/about',
      },
    ],
  },
];

/*
|--------------------------------------------------------------------------
| Development Themes
|--------------------------------------------------------------------------
*/

export const journeyThemes: JourneyTheme[] = [
  {
    title: 'Infrastructure Evolution',
    description:
      'My career has followed the wider evolution of infrastructure delivery.',
    stages: [
      'On-premises systems',
      'Enterprise data centres',
      'Virtualised infrastructure',
      'Hosted services',
      'Public cloud',
      'Containers',
      'Platform engineering',
    ],
  },

  {
    title: 'Operational Evolution',
    description:
      'My approach has developed from reactive support toward proactive and automated operations.',
    stages: [
      'Incident response',
      'Problem investigation',
      'Standardisation',
      'Monitoring',
      'Observability',
      'Automation',
      'Continuous improvement',
    ],
  },

  {
    title: 'Leadership Evolution',
    description:
      'Technical responsibility expanded into delivery, mentoring and organisational change.',
    stages: [
      'Support engineer',
      'Technical specialist',
      'Senior engineer',
      'Infrastructure manager',
      'Technical lead',
      'Mentor',
      'Technical delivery leader',
    ],
  },
];

/*
|--------------------------------------------------------------------------
| Engineering Principles
|--------------------------------------------------------------------------
*/

export const journeyPrinciples: JourneyPrinciple[] = [
  {
    title: 'Supportable',
    description:
      'Technology should be understandable and maintainable by the teams responsible for operating it.',
  },

  {
    title: 'Observable',
    description:
      'Health, performance and failure conditions should be visible through metrics, logs and alerts.',
  },

  {
    title: 'Secure',
    description:
      'Access, external exposure, operational risk and threat response should be considered from the beginning.',
  },

  {
    title: 'Repeatable',
    description:
      'Automation, documentation and version control should reduce reliance on individual knowledge.',
  },

  {
    title: 'Business-aware',
    description:
      'Engineering decisions should account for service continuity, cost, risk and organisational outcomes.',
  },

  {
    title: 'Continually improving',
    description:
      'Platforms and processes should evolve as technology, requirements and operational understanding develop.',
  },
];
