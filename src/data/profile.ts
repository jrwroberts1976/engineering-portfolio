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
    'Infrastructure and systems professional combining long-term operational experience with modern platform, cloud, security and automation engineering.',

  introduction:
    'I have more than 20 years of experience supporting UNIX, Linux, enterprise infrastructure and operationally critical services, with a current focus on building and operating modern infrastructure platforms.',

  currentFocus:
    'My current engineering work brings together Linux, Proxmox VE, Docker, Kubernetes, Ansible, AWS, Azure, infrastructure automation, Git-based delivery, networking, monitoring, observability, vulnerability management, backup and recovery, and security engineering.',

  workingStyle:
    'I focus on practical, supportable solutions. I consider how systems will be monitored, maintained, secured, tested and documented after deployment rather than treating implementation as the end of the work.',
};

export const professionalStrengths: ProfessionalStrength[] = [
  {
    title: 'Infrastructure Operations',
    description:
      'Supporting Linux, UNIX and enterprise systems through incident resolution, maintenance, performance investigation, patch management and operational improvement.',
  },

  {
    title: 'Virtualisation',
    description:
      'Extensive virtualisation experience across VMware, Oracle VM (OVM) and Proxmox VE environments, covering virtual machine administration, operational support, troubleshooting, migration, platform maintenance, backup and recovery. Current hands-on work includes the design and operation of a clustered Proxmox VE environment.',
  },

  {
    title: 'Platform Engineering',
    description:
      'Building and operating practical Docker and Kubernetes platforms, with container lifecycle management, service health checks, networking and production deployment processes.',
  },

  {
    title: 'Automation and Configuration Management',
    description:
      'Automating repeatable infrastructure work with Ansible and Bash, backed by Git-controlled configuration, validation, idempotency checks and rollback-aware change practices.',
  },

  {
    title: 'Cloud and Infrastructure as Code',
    description:
      'Developing practical capability across AWS, Microsoft Azure, Terraform, Git-based workflows and repeatable infrastructure and application deployment.',
  },

  {
    title: 'Monitoring and Observability',
    description:
      'Building operational visibility with Prometheus, Grafana, Loki, Blackbox Exporter and custom metrics, dashboards and alerting across multiple hosts and services.',
  },

  {
    title: 'Networking and Troubleshooting',
    description:
      'Working across switching, VLANs, routing, DNS, VPNs, firewalls and service dependencies, using evidence-led troubleshooting to isolate faults across the infrastructure stack.',
  },

  {
    title: 'Security Engineering',
    description:
      'Applying layered security through Suricata, CrowdSec, Greenbone vulnerability scanning, firewall controls, authentication, secure external access and continuous security checks.',
  },

  {
    title: 'Delivery and Technical Leadership',
    description:
      'Leading implementation activity, coordinating teams and suppliers, mentoring engineers, managing technical risk and turning complex infrastructure work into supportable operational services.',
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
    period: '1998–2008',
    title: 'IT Support — Rias plc / JRL plc',
    description:
      'Progressed from Help Desk through first-, second- and third-line systems support, building the operational troubleshooting and customer-support foundations for my infrastructure career.',
  },

  {
    period: '2005',
    title: 'Red Hat RHCT & RHCE Certifications',
    description:
      'Achieved Red Hat Certified Technician (RHCT) and Red Hat Certified Engineer (RHCE) certifications, formally validating Linux systems administration and engineering skills developed through hands-on commercial experience.',
  },

  {
    period: '2008–2012',
    title: 'Level 2 IT Consultant — Hampshire County Council',
    description:
      'Moved into enterprise UNIX and Linux infrastructure, including Solaris-to-IBM AIX migrations, AIX LPAR administration, Red Hat on VMware, hosted LAMP services, monitoring, backups, recovery testing and formal technical change control.',
  },

  {
    period: '2012–2020',
    title: 'Technical Operations Analyst (UNIX) — LV=',
    description:
      'Provided BAU and out-of-hours UNIX/Linux support in a 24/7 enterprise environment, handling incidents, senior escalations, patching and recovery activity. Automated Red Hat patching from Bash into Ansible and acted as a technical lead during a major data-centre migration.',
  },

  {
    period: '2017',
    title: 'Patching Service Transition — LV=',
    description:
      'Led the transition of the Linux patching process to a third-party team based in India. Documented and transferred the operational process, trained the engineers who would carry out the work, and supported the team through the handover to establish a repeatable and supportable service.',
  },

  {
    period: '2019',
    title: 'Network Migration Project Delivered — LV=',
    description:
      'Delivered a major network migration project, coordinating technical implementation and troubleshooting through the migration window to complete the change successfully and maintain service continuity.',
  },

  {
    period: '2020–2024',
    title: 'Technical BC/DR Manager — LV=',
    description:
      'Led technical business-continuity and disaster-recovery activity, defining recovery requirements, coordinating annual recovery testing and multi-team physical DR exercises, and driving remediation from test findings.',
  },

  {
    period: '2025',
    title: 'Infrastructure Manager — Yunex Traffic',
    description:
      'Managed and mentored a team of infrastructure engineers supporting AWS services, acting as an escalation point and focusing on availability, reliability, automation, monitoring and operational improvement.',
  },

  {
    period: '2025–Present',
    title: 'Third Line Product Support Technician — Appello Group',
    description:
      'Provides third-line escalation for complex incidents and service requests, coordinating technical investigation across teams, restoring services within SLA and supporting the development of first- and second-line engineers.',
  },

  {
    period: 'Current Engineering',
    title: 'Modern Infrastructure & Systems Engineering',
    description:
      'Continues hands-on development across Linux, virtualisation, containers, automation, monitoring, networking, security, backup and recovery, combining current technologies with more than 20 years of operational infrastructure experience.',
  },
];

export const careerGoals = [
  'Continue moving toward Platform Engineering, Cloud Infrastructure and DevOps-focused roles.',
  'Apply long-standing Linux and infrastructure experience within modern cloud and container environments.',
  'Develop further technical leadership, project delivery and service-management responsibility.',
  'Continue building practical evidence through documented engineering projects and production-grade automation.',
];
