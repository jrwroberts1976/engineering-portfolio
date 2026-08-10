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
    url:
      import.meta.env.PUBLIC_GRAFANA_SECURITY_DASHBOARD ?? '',
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
    id: 'birdnet',
    category: 'Specialist Workload',
    title: 'BirdNET Garden Wildlife Monitor',
    description:
      'Wildlife detection telemetry demonstrating a specialist audio-processing workload and custom Prometheus monitoring.',
    projectId: 'birdnet',
    url:
      import.meta.env.PUBLIC_GRAFANA_BIRDNET_DASHBOARD ?? '',
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
