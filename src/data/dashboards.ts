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

export const dashboards: Dashboard[] = [];

/*
 * Find a dashboard by its unique ID.
 */
export function getDashboardById(
  id: string,
): Dashboard | undefined {
  return dashboards.find((dashboard) => dashboard.id === id);
}
