# TRADEOFFS.md

# Tradeoffs and Limitations

This document describes the tradeoffs made during implementation and explains features that were intentionally simplified or deferred due to assignment scope and time constraints.

---

# Overview

The primary goal of the project was to demonstrate:

* ESG data ingestion
* Data normalization
* Multi-source integration
* Analyst review workflows
* Auditability

The implementation prioritizes a working end-to-end solution over enterprise-scale complexity.

---

# 1. CSV Uploads Instead of Direct System Integrations

## Current Approach

The platform accepts CSV uploads from:

* SAP
* Utility systems
* Travel systems

## Alternative

Direct integrations using:

* SAP APIs
* Utility provider APIs
* Travel management APIs

## Tradeoff

Direct integrations require:

* Authentication
* Vendor-specific APIs
* Extensive testing

These integrations were outside the scope of the assignment.

## Future Enhancement

Implement scheduled connectors and API-based ingestion.

---

# 2. Rule-Based Validation Instead of AI-Based Detection

## Current Approach

Suspicious records are identified using predefined business rules.

Examples:

* Fuel consumption > 10,000 liters
* Negative electricity usage
* Travel distance > 20,000 km

## Alternative

Machine learning anomaly detection.

## Tradeoff

Rule-based validation is:

* Easier to understand
* Easier to test
* More predictable

## Future Enhancement

Introduce statistical and machine learning anomaly detection models.

---

# 3. SQLite Instead of PostgreSQL

## Current Approach

SQLite is used for local development.

## Alternative

PostgreSQL

## Tradeoff

SQLite simplifies setup and evaluation.

PostgreSQL would provide:

* Better scalability
* Improved concurrency
* Enterprise-grade performance

## Future Enhancement

Migrate to PostgreSQL for production deployment.

---

# 4. Single Demo Organization

## Current Approach

The frontend uses a fixed organization identifier.

```text
organization_id = 1
```

## Alternative

Authenticated multi-tenant user experience.

## Tradeoff

A fixed organization simplified the demo workflow and reduced implementation complexity.

## Future Enhancement

Allow users to belong to specific organizations and automatically associate records with their tenant.

---

# 5. Simplified Review Workflow

## Current Approach

Records can be:

* Approved
* Rejected

by a single reviewer.

## Alternative

Multi-stage approval workflow.

Example:

Analyst
→ Manager
→ Compliance Officer
→ Audit Lock

## Tradeoff

A single-stage workflow demonstrates review functionality while keeping implementation manageable.

## Future Enhancement

Support configurable multi-level approvals.

---

# 6. No Authentication or Authorization

## Current Approach

The application focuses on ingestion and review functionality.

## Alternative

Role-based access control.

Examples:

* Analyst
* Reviewer
* Administrator
* Auditor

## Tradeoff

Authentication was excluded to prioritize core ESG workflows.

## Future Enhancement

Implement JWT authentication and role-based permissions.

---

# 7. Simplified ESG Calculations

## Current Approach

The platform stores normalized activity data.

Examples:

* Fuel usage
* Electricity consumption
* Travel distance

## Alternative

Full carbon emissions calculations using emission factors.

Example:

Fuel Consumption
× Emission Factor
=================

CO₂e Emissions

## Tradeoff

The assignment focuses on ingestion and review rather than detailed emissions accounting.

## Future Enhancement

Integrate region-specific emission factors and calculate CO₂e values.

---

# 8. Basic Dashboard UI

## Current Approach

The dashboard provides:

* Upload functionality
* Summary cards
* Record filtering
* Record table

## Alternative

Advanced analytics dashboard with:

* Charts
* Trends
* Drill-down reports
* Benchmarking

## Tradeoff

A simpler dashboard allowed focus on backend architecture and review workflows.

## Future Enhancement

Add visual analytics and ESG reporting dashboards.

---

# 9. Local File Storage

## Current Approach

Uploaded files are stored locally using Django media storage.

## Alternative

Cloud storage solutions.

Examples:

* AWS S3
* Google Cloud Storage
* Azure Blob Storage

## Tradeoff

Local storage simplifies development and testing.

## Future Enhancement

Move uploaded files to cloud object storage.

---

# 10. Audit Logging Scope

## Current Approach

Audit logs are generated for approval and rejection actions.

## Alternative

Comprehensive audit tracking of every field-level change.

## Tradeoff

The implemented approach demonstrates traceability while remaining lightweight.

## Future Enhancement

Capture detailed field-level modifications and user activity history.

---

# Summary

The implementation prioritizes:

* Working functionality
* Clear architecture
* Auditability
* Simplicity

The current design demonstrates a complete ESG ingestion and analyst review workflow while leaving room for future enterprise-scale enhancements such as authentication, direct integrations, advanced analytics, and automated emissions calculations.
