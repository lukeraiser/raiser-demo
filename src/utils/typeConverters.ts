import { DatabaseProject, DatabaseGrant, DatabaseMetric, Project, Grant, Metric } from '@/types/kanban';

export function convertDbProjectToProject(dbProject: DatabaseProject): Project {
  return {
    ...dbProject,
    createdAt: new Date(dbProject.createdAt),
    updatedAt: new Date(dbProject.updatedAt),
    metrics: dbProject.metrics.map(convertDbMetricToMetric),
    grants: [] // Since we don't have grants in the database response
  };
}

export function convertDbMetricToMetric(dbMetric: DatabaseMetric): Metric {
  return {
    ...dbMetric,
    createdAt: new Date(dbMetric.createdAt),
    updatedAt: new Date(dbMetric.updatedAt)
  };
}

export function convertDbGrantToGrant(dbGrant: DatabaseGrant): Grant {
  return {
    ...dbGrant,
    createdAt: new Date(dbGrant.createdAt),
    updatedAt: new Date(dbGrant.updatedAt),
    deadline: dbGrant.deadline ? new Date(dbGrant.deadline) : null,
    projects: dbGrant.projects.map(convertDbProjectToProject)
  };
} 