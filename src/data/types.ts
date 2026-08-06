/*
|--------------------------------------------------------------------------
| Shared Portfolio Types
|--------------------------------------------------------------------------
|
| These interfaces define the structure of project, dashboard and
| architecture data used throughout the portfolio.
|
*/

export type ProjectStatus =
  | 'Live'
  | 'Active project'
  | 'In development'
  | 'Planned';

export type DashboardKey =
  | 'security'
  | 'platform'
  | 'birdnet';

export type PlatformNodeStatus =
  | 'Online'
  | 'Active'
  | 'Protected'
  | 'Monitored'
  | 'Planned';

/*
|--------------------------------------------------------------------------
| Project
|--------------------------------------------------------------------------
*/

export interface Project {
  id: string;
  category: string;
  title: string;
  shortTitle: string;
  description: string;
  href: string;
  status: ProjectStatus;
  technologies: string[];
  featured: boolean;
  repositoryUrl?: string;
  dashboardKey?: DashboardKey;
}

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

export interface Dashboard {
  id: DashboardKey;
  category: string;
  title: string;
  description: string;
  projectId: string;
  url: string;
  status: string;
}

/*
|--------------------------------------------------------------------------
| Architecture Node
|--------------------------------------------------------------------------
|
| Each node represents one component of the engineering platform.
|
*/

export interface PlatformNode {
  /*
   * Unique ID used for relationships and CSS classes.
   */
  id: string;

  /*
   * Short title shown in the architecture diagram.
   */
  title: string;

  /*
   * Technology or service category.
   */
  category: string;

  /*
   * Explanation of why this component exists.
   */
  description: string;

  /*
   * Current operational status.
   */
  status: PlatformNodeStatus;

  /*
   * Layer controls the order in the architecture diagram.
   */
  layer:
    | 'edge'
    | 'access'
    | 'platform'
    | 'services'
    | 'observability'
    | 'security';

  /*
   * Optional related portfolio project.
   */
  projectId?: string;

  /*
   * Optional related public dashboard.
   */
  dashboardId?: DashboardKey;

  /*
   * IDs of components this node connects to.
   *
   * These relationships can later be used for a full SVG diagram.
   */
  connectsTo?: string[];
}
