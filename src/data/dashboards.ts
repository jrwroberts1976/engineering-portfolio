/*
|--------------------------------------------------------------------------
| Public Grafana Dashboards
|--------------------------------------------------------------------------
|
| Dashboard URLs are loaded from public Astro environment variables.
|
| These URLs are deliberately public and are compiled into the static site.
|
| Variables:
|
|   PUBLIC_GRAFANA_SECURITY_DASHBOARD
|   PUBLIC_GRAFANA_PLATFORM_DASHBOARD
|   PUBLIC_GRAFANA_BIRDNET_DASHBOARD
|
| When a URL is empty, the dashboard card displays "Preparing".
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
    title: 'Engineering Platform Health',
    description:
      'Infrastructure health, container availability, resource utilisation and monitoring coverage.',
    projectId: 'monitoring',
    url:
      import.meta.env.PUBLIC_GRAFANA_PLATFORM_DASHBOARD ?? '',
    status: 'Live',
  },

  {
    id: 'birdnet',
    category: 'Specialist Workload',
    title: 'BirdNET Activity',
    description:
      'Live wildlife detections and operational monitoring of an audio-processing workload.',
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
