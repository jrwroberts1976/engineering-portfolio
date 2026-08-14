# Backup & Disaster Recovery Portfolio Update

Date: 2026-08-14

## Summary

Added new engineering portfolio content covering the homelab backup platform and disaster recovery testing work.

## Projects Added

### Homelab Backup & Recovery Platform

Documents the design and implementation of the Restic backup platform:

- Central Restic backup server hosted on `ids-01`
- Protected hosts:
  - `ids-01`
  - `TestServer`
  - `k3s-node-01`
  - `DietPi`
- Automated backup scheduling
- Retention management
- Backup verification
- Prometheus backup metrics
- Grafana backup health dashboards

Metrics covered:

- Backup success
- Backup age
- Snapshot status
- Repository size
- Storage health
- Replica health

## Disaster Recovery Testing

Added documentation for validating recovery rather than only backup creation.

Initial recovery exercise:

- New Raspberry Pi 4 as recovery target
- Restore from Restic backups
- Validate Linux rebuild process
- Restore k3s workloads
- Restore Docker services
- Validate monitoring recovery
- Measure RPO and RTO

## Deployment Process

The portfolio site is deployed using the existing production deployment workflow:

1. Build Astro site
2. Synchronise production files
3. Validate Docker Compose configuration
4. Build production image
5. Recreate application container
6. Run health checks

## Engineering Outcome

This extends the portfolio from infrastructure deployment into operational resilience:

`Infrastructure -> Monitoring -> Backup -> Recovery Testing -> Documented Engineering Practice`
