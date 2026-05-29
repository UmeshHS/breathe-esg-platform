# DECISIONS.md

# Architectural Decisions

This document explains the key design and implementation decisions made while developing the ESG Data Ingestion and Review Platform.

---

# 1. Django + Django REST Framework for Backend

## Decision

Use Django and Django REST Framework (DRF) for backend development.

## Reasoning

Django provides:

* Rapid development
* Built-in admin interface
* ORM for database management
* Strong ecosystem support

Django REST Framework provides:

* Fast API development
* Serialization support
* Browsable API for testing
* Authentication and permission extensibility

## Benefits

* Faster implementation
* Production-ready architecture
* Easy future expansion

---

# 2. React + Vite for Frontend

## Decision

Use React with Vite for frontend development.

## Reasoning

React provides a component-based architecture and is widely adopted for dashboard applications.

Vite was selected because it offers:

* Fast startup
* Fast hot reloading
* Simple configuration

## Benefits

* Improved developer productivity
* Responsive user interface
* Easy API integration

---

# 3. CSV-Based Data Ingestion

## Decision

Use CSV uploads as the ingestion mechanism.

## Reasoning

Enterprise systems commonly export operational data in CSV format.

Examples:

* SAP reports
* Utility consumption reports
* Travel management reports

Direct integration with enterprise systems was considered out of scope for the assignment timeline.

## Benefits

* Simple implementation
* Easy testing
* Demonstrates ingestion workflow clearly

---

# 4. Multi-Tenant Architecture

## Decision

Create a dedicated Organization model.

## Reasoning

Multiple companies may use the platform.

Each record should belong to a specific organization.

## Benefits

* Tenant isolation
* Future scalability
* Easier reporting and filtering

---

# 5. Source Traceability

## Decision

Introduce a DataSource model.

## Reasoning

Every emission record should be traceable to its original uploaded file.

This supports:

* Auditing
* Compliance reviews
* Data validation

## Benefits

* Full ingestion history
* Better transparency
* Easier debugging

---

# 6. Centralized EmissionRecord Model

## Decision

Normalize all incoming data into a single EmissionRecord model.

## Reasoning

SAP, Utility, and Travel systems have different schemas.

A common model simplifies:

* Reporting
* Filtering
* Analytics
* Dashboard development

## Benefits

* Consistent structure
* Reduced frontend complexity
* Easier future integrations

---

# 7. Scope Classification Strategy

## Decision

Map records into Scope 1, Scope 2, and Scope 3 categories.

## Mapping

### Scope 1

Direct emissions.

Examples:

* Diesel
* Petrol
* Fuel consumption

### Scope 2

Purchased electricity.

Examples:

* Utility electricity usage

### Scope 3

Indirect business activities.

Examples:

* Flights
* Hotels
* Employee travel

## Benefits

* Aligns with ESG reporting standards
* Improves reporting consistency

---

# 8. Suspicious Record Detection

## Decision

Implement rule-based anomaly detection.

## Rules

### SAP

Flag values greater than 10,000 liters.

### Utility

Flag negative electricity consumption.

### Travel

Flag travel distances greater than 20,000 km.

## Reasoning

Analysts should focus attention on potentially invalid or unusual records.

## Benefits

* Faster review process
* Improved data quality

---

# 9. Analyst Review Workflow

## Decision

Introduce record approval and rejection.

## Workflow

Upload
→ Review
→ Approve / Reject
→ Audit Log

## Benefits

* Supports governance requirements
* Prevents unreviewed records from being finalized

---

# 10. Audit Logging

## Decision

Record important actions in an AuditLog model.

## Tracked Events

* Uploads
* Approvals
* Rejections
* Status changes

## Benefits

* Accountability
* Compliance support
* Historical tracking

---

# 11. Dashboard-First User Experience

## Decision

Provide a dashboard showing:

* Total records
* Suspicious records
* Approved records
* Pending records

and record filtering capabilities.

## Reasoning

Analysts need visibility into the review queue and system status.

## Benefits

* Better usability
* Faster decision making
* Improved analyst workflow

---

# Future Enhancements

The current implementation is intentionally lightweight and can be extended with:

* Authentication and role-based access control
* Direct SAP API integration
* Utility bill parsing
* Emission factor calculations
* AI-based anomaly detection
* Advanced reporting and analytics
* Multi-user approval workflows

These enhancements can be added without significant changes to the existing architecture.
