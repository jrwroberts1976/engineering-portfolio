/*
|--------------------------------------------------------------------------
| Professional Profile Data
|--------------------------------------------------------------------------
|
| This file is the single source of truth for professional experience,
| strengths, leadership examples and career direction.
|
| Update this file when your role, experience or career focus changes.
|
*/

export interface ProfessionalStrength {
  title: string;
  description: string;
}

export interface LeadershipExample {
  title: string;
  category: string;
  description: string;
  outcomes: string[];
}

export interface CareerStage {
  period: string;
  title: string;
  description: string;
}

export const professionalSummary = {
  name: 'James Roberts',

  headline:
    'Infrastructure and systems professional developing modern platform, cloud and DevOps engineering capability.',

  introduction:
    'I have more than 20 years of experience supporting UNIX, Linux, enterprise infrastructure and operationally critical services.',

  currentFocus:
    'My current development work focuses on Linux engineering, Docker, Kubernetes, AWS, Azure, infrastructure automation, monitoring, observability and security engineering.',

  workingStyle:
    'I focus on practical, supportable solutions. I consider how systems will be monitored, maintained, secured and documented after deployment rather than treating implementation as the end of the work.',
};

export const professionalStrengths: ProfessionalStrength[] = [
  {
    title: 'Infrastructure Operations',
    description:
      'Supporting Linux, UNIX and enterprise systems through incident resolution, maintenance, performance investigation and operational improvement.',
  },

  {
    title: 'Technical Troubleshooting',
    description:
      'Investigating complex issues across applications, infrastructure, networking, monitoring and service dependencies.',
  },

  {
    title: 'Platform Engineering',
    description:
      'Building practical capability with Docker, Kubernetes, cloud platforms, automation and infrastructure as code.',
  },

  {
    title: 'Monitoring and Observability',
    description:
      'Designing dashboards, metrics, alerts and operational views using Prometheus, Grafana and related tooling.',
  },

  {
    title: 'Security Engineering',
    description:
      'Implementing authentication, MFA, threat detection, firewall enforcement and controlled external access.',
  },

  {
    title: 'Technical Leadership',
    description:
      'Leading implementation activity, mentoring engineers and helping teams understand and resolve complex technical problems.',
  },
];

export const leadershipExamples: LeadershipExample[] = [
  {
    title: 'DrayTek SIM Upgrade Programme',
    category: 'Technical Delivery',
    description:
      'Provided technical leadership for a programme of SIM upgrades affecting deployed DrayTek network equipment.',
    outcomes: [
      'Supported technical planning and implementation.',
      'Provided escalation support for complex upgrade issues.',
      'Helped reduce operational risk during the rollout.',
      'Bridged technical understanding between support and delivery teams.',
    ],
  },

  {
    title: 'Grafana Monitoring Proof of Concept',
    category: 'Monitoring and Service Improvement',
    description:
      'Developed a Grafana monitoring proof of concept to improve visibility of product and infrastructure behaviour.',
    outcomes: [
      'Demonstrated the value of centralised dashboards.',
      'Improved understanding of service health and operational trends.',
      'Created a foundation for more proactive support.',
      'Presented monitoring information in a format accessible to technical teams.',
    ],
  },

  {
    title: 'Engineer Mentoring',
    category: 'People Development',
    description:
      'Supported first- and second-line engineers in developing confidence with more complex technical issues.',
    outcomes: [
      'Encouraged engineers to take ownership of technical investigations.',
      'Provided structured guidance during escalations.',
      'Improved knowledge transfer within the team.',
      'Helped colleagues build confidence with unfamiliar systems.',
    ],
  },

  {
    title: 'Development and Support Collaboration',
    category: 'Cross-Team Leadership',
    description:
      'Helped bridge the gap between product development and operational support teams.',
    outcomes: [
      'Translated operational issues into clear technical information.',
      'Improved communication during complex investigations.',
      'Helped align product behaviour with support requirements.',
      'Supported more effective escalation and resolution.',
    ],
  },

  {
    title: 'Network Separation Project',
    category: 'Infrastructure Change',
    description:
      'Acted as a technical leader during work to separate network services and reduce operational dependencies.',
    outcomes: [
      'Supported technical planning and risk identification.',
      'Helped coordinate implementation activity.',
      'Maintained focus on service continuity.',
      'Improved clarity around infrastructure responsibilities.',
    ],
  },

  {
    title: 'Patching Process Transition',
    category: 'Operational Improvement',
    description:
      'Supported the transition of patching activity to an offshore delivery team.',
    outcomes: [
      'Helped document technical requirements and procedures.',
      'Supported knowledge transfer.',
      'Reduced reliance on individual technical knowledge.',
      'Improved repeatability of operational work.',
    ],
  },
];

export const careerJourney: CareerStage[] = [
  {
    period: 'Foundation',
    title: 'UNIX and Enterprise Infrastructure',
    description:
      'Built extensive experience supporting operationally critical UNIX and enterprise systems.',
  },

  {
    period: 'Expansion',
    title: 'Linux and Infrastructure Management',
    description:
      'Developed wider responsibility across Linux platforms, infrastructure operations and technical service delivery.',
  },

  {
    period: 'Leadership',
    title: 'Technical Delivery and Mentoring',
    description:
      'Led technical implementation work, supported escalations and helped colleagues develop stronger engineering capability.',
  },

  {
    period: 'Modern Engineering',
    title: 'Cloud, Containers and Automation',
    description:
      'Expanded practical capability across Docker, Kubernetes, AWS, Azure, Terraform and Git-based delivery.',
  },

  {
    period: 'Current Direction',
    title: 'Platform and Cloud Engineering',
    description:
      'Bringing long-term infrastructure experience together with modern engineering practices and operational automation.',
  },
];

export const careerGoals = [
  'Continue moving toward Platform Engineering, Cloud Infrastructure and DevOps-focused roles.',
  'Apply long-standing Linux and infrastructure experience within modern cloud and container environments.',
  'Develop further technical leadership, project delivery and service-management responsibility.',
  'Continue building practical evidence through documented engineering projects.',
];
