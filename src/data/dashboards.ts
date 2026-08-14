/*
|--------------------------------------------------------------------------
| Public Grafana Dashboards
|--------------------------------------------------------------------------
|
| Public dashboards are deliberately linked from the static portfolio as
| operational evidence.
|
| Variables:
|
|   PUBLIC_GRAFANA_SECURITY_DASHBOARD
|   PUBLIC_GRAFANA_BIRDNET_DASHBOARD
|
*/

import type { Dashboard } from './types';

export const dashboards: Dashboard[] = [
  {
    id: 'security',
    category: 'Security Operations',
    title: 'CrowdSec Security Monitoring',
    description:
      'Live CrowdSec detections, firewall activity and community threat intelligence.',
    projectId: 'crowdsec',
    url: 'https://grafana.jrwroberts.co.uk/public-dashboards/cff751c416f940d38d75d68cba0e9129',
    status: 'Live',
  },

  {
    id: 'platform',
    category: 'Platform Operations',
    title: 'Homelab Operations Centre',
    description:
      'Live multi-host Linux operations view covering service availability, infrastructure capacity, monitoring health and security services.',
    projectId: 'monitoring',
    url: 'https://grafana.jrwroberts.co.uk/public-dashboards/9f2c1f2f843741c6bcb402b676ebf20c',
    status: 'Live',
  },

  {
    id: 'docker-platform',
    category: 'Container Platform',
    title: 'Docker Engineering Platform',
    description:
      'Live multi-host Docker operations view covering container health, workload utilisation, cAdvisor coverage and platform telemetry.',
    projectId: 'docker-platform',
    url: 'https://grafana.jrwroberts.co.uk/public-dashboards/92a1055e3e4a44218a10f9e49bb8fc1c',
    status: 'Live',
  },

  {
    id: 'backup-health',
    category: 'Platform Operations',
    title: 'Homelab Backup & Storage Health',
    description:
      'Live backup success, backup age in hours, repository health and storage capacity across the homelab.',
    projectId: 'monitoring',
    url: 'https://grafana.jrwroberts.co.uk/public-dashboards/179670263ce243cb972f80ac17d9e0d3',
    status: 'Live',
  },

  {
    id: 'birdnet',
    category: 'Specialist Workload',
    title: 'BirdNET Garden Wildlife Monitor',
    description:
      'Wildlife detection telemetry demonstrating a specialist audio-processing workload and custom Prometheus monitoring.',
    projectId: 'birdnet',
    url: 'https://grafana.jrwroberts.co.uk/public-dashboards/6f1ecaee735a4add9d69824ef1b48d2b',
    status: 'Live',
  },
];

/*
 * Find a dashboard by its unique ID.
 */
export function getDashboardById(
  id: string,
): Dashboard | undefined {
  return dashboards.find((dashboard) => dashboard.id === id);
}
