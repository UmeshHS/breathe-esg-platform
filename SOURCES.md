# SOURCES.md

# Data Sources and Assumptions

This document describes the source systems, sample datasets, assumptions, and references used while building the ESG Data Ingestion and Review Platform.

---

# Overview

The platform was designed to ingest ESG-related operational data from three representative enterprise source systems:

1. SAP (Fuel Consumption)
2. Utility Consumption
3. Travel Management

These sources were selected because they commonly contribute to ESG and carbon accounting workflows.

---

# 1. SAP Data Source

## Purpose

Represents operational fuel consumption data typically exported from ERP systems.

## Sample Dataset

```csv
fuel_type,quantity,unit
Diesel,500,L
Petrol,300,L
Diesel,15000,L
```

## ESG Mapping

| Fuel Type | ESG Scope |
| --------- | --------- |
| Diesel    | Scope 1   |
| Petrol    | Scope 1   |

## Assumptions

* Quantity represents fuel consumed.
* Unit is provided in liters.
* Values greater than 10,000 liters are considered suspicious for review.

---

# 2. Utility Data Source

## Purpose

Represents purchased electricity consumption.

## Sample Dataset

```csv
meter_id,kwh
M001,2500
M002,3500
M003,-200
```

## ESG Mapping

| Activity                | ESG Scope |
| ----------------------- | --------- |
| Electricity Consumption | Scope 2   |

## Assumptions

* Electricity is measured in kWh.
* Negative consumption values are considered invalid.
* Negative values are automatically flagged as suspicious.

---

# 3. Travel Data Source

## Purpose

Represents employee business travel activity.

## Sample Dataset

```csv
employee,travel_type,distance_km
John,Flight,1200
Mary,Hotel,3
David,Flight,25000
```

## ESG Mapping

| Activity | ESG Scope |
| -------- | --------- |
| Flight   | Scope 3   |
| Hotel    | Scope 3   |

## Assumptions

* Distance is measured in kilometers.
* Travel distances greater than 20,000 km are considered suspicious.
* Flights and hotels are treated as indirect emissions.

---

# ESG Scope Classification Reference

The application categorizes records using the Greenhouse Gas Protocol framework.

## Scope 1

Direct emissions from owned or controlled sources.

Examples:

* Diesel consumption
* Petrol consumption

## Scope 2

Indirect emissions from purchased energy.

Examples:

* Electricity consumption

## Scope 3

Indirect emissions from value chain activities.

Examples:

* Flights
* Hotels
* Employee travel

---

# Normalization Assumptions

The platform stores both:

* Original source values
* Normalized values

This preserves source traceability while enabling consistent reporting.

Examples:

| Original Value | Normalized Value |
| -------------- | ---------------- |
| 500 L          | 500 L            |
| 2 MWh          | 2000 kWh         |
| 100 miles      | 160.93 km        |

Current sample data uses matching original and normalized units for simplicity.

---

# Validation Rules

The following rules are implemented for anomaly detection:

| Source  | Rule                 |
| ------- | -------------------- |
| SAP     | Quantity > 10,000    |
| Utility | Consumption < 0      |
| Travel  | Distance > 20,000 km |

Records matching these conditions are flagged as suspicious and surfaced for analyst review.

---

# External References

The implementation was informed by publicly available ESG reporting concepts and industry practices:

* Greenhouse Gas Protocol (GHG Protocol)
* Corporate Sustainability Reporting workflows
* Enterprise ERP export patterns
* Utility billing export formats
* Travel management reporting formats

No proprietary datasets or third-party APIs were used.

---

# Sample Data Disclaimer

All datasets used in the project are synthetic and were created solely for demonstration and evaluation purposes.

The sample records do not represent real organizations, customers, employees, utility accounts, or operational data.

They are intended only to demonstrate:

* Data ingestion
* Normalization
* Validation
* Analyst review workflows
* Audit logging functionality

within the scope of the assignment.
