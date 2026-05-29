# ESG Data Ingestion and Review Platform

## Overview

This project is a prototype ESG (Environmental, Social, and Governance) data ingestion and review platform designed to collect, normalize, validate, and review emissions-related operational data before audit sign-off.

The platform supports ingestion from multiple enterprise sources, normalizes records into a common schema, flags suspicious entries, and enables analyst approval workflows with audit logging.

---

## Features

### Data Ingestion

* Upload CSV files from multiple source systems
* Supports:

  * SAP Fuel Data
  * Utility Consumption Data
  * Travel Data

### Data Normalization

* Converts source-specific records into a unified EmissionRecord model
* Maintains source traceability

### ESG Scope Classification

* Scope 1: Fuel Consumption
* Scope 2: Electricity Consumption
* Scope 3: Travel Activities

### Suspicious Record Detection

Automatically flags:

* Fuel consumption > 10,000 L
* Electricity consumption < 0 kWh
* Travel distance > 20,000 km

### Analyst Review Workflow

* View all records
* View suspicious records
* Approve records
* Reject records

### Audit Logging

Tracks:

* Approvals
* Rejections
* Record status changes

### Dashboard

* Upload CSV files directly from the UI
* Summary statistics
* Filter records by:

  * All
  * Suspicious
  * Approved
  * Pending

---

## Technology Stack

### Backend

* Python
* Django
* Django REST Framework
* Pandas
* SQLite

### Frontend

* React
* Vite
* Axios
* Tailwind CSS

---

## Project Structure

```text
breathe-esg-platform/
│
├── backend/
│   ├── audit/
│   ├── emissions/
│   ├── ingestion/
│   ├── reviews/
│   ├── tenants/
│   ├── config/
│   └── manage.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── MODEL.md
├── DECISIONS.md
├── TRADEOFFS.md
├── SOURCES.md
└── README.md
```

---

## Data Model

### Organization

Represents a tenant company.

### DataSource

Stores uploaded source files and ingestion metadata.

### EmissionRecord

Stores normalized ESG activity data.

### ReviewAction

Stores analyst review decisions.

### AuditLog

Stores audit trail events.

For detailed information, see:

* MODEL.md

---

## Setup Instructions

### Backend Setup

Navigate to backend:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate environment:

Git Bash:

```bash
source venv/Scripts/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py migrate
```

Create admin user:

```bash
python manage.py createsuperuser
```

Start backend server:

```bash
python manage.py runserver
```

---

### Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://127.0.0.1:8000
```

---

## API Endpoints

### Upload Data

```http
POST /api/ingestion/upload/
```

### All Records

```http
GET /api/emissions/records/
```

### Suspicious Records

```http
GET /api/emissions/suspicious/
```

### Approve Record

```http
POST /api/reviews/approve/<record_id>/
```

### Reject Record

```http
POST /api/reviews/reject/<record_id>/
```

---

## Sample Data

### SAP

```csv
fuel_type,quantity,unit
Diesel,500,L
Petrol,300,L
Diesel,15000,L
```

### Utility

```csv
meter_id,kwh
M001,2500
M002,3500
M003,-200
```

### Travel

```csv
employee,travel_type,distance_km
John,Flight,1200
Mary,Hotel,3
David,Flight,25000
```

---

## Current Limitations

* CSV-based ingestion only
* No authentication
* SQLite for local development
* Single-stage approval workflow
* Local file storage

See:

* TRADEOFFS.md

---

## Future Enhancements

* PostgreSQL support
* Role-based access control
* Direct SAP integration
* Cloud file storage
* AI-based anomaly detection
* Emission factor calculations
* Advanced ESG reporting

---

## Documentation

Additional project documentation:

* MODEL.md
* DECISIONS.md
* TRADEOFFS.md
* SOURCES.md

---

## Author

**Umesh H S**

* Bachelor of Engineering (Computer Science Engineering)
* Expected Graduation: 2026

Project developed as part of an ESG Data Ingestion and Review Platform assignment.
