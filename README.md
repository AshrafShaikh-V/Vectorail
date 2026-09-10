# Vectorail

**Intelligent Railway Traffic Management System**

Vectorail is an Intelligent Railway Traffic Management System (IRTM) designed to assist railway operations controllers and dispatchers with real-time train monitoring, topological network visualization, operations safety alerts, capacity analytics, AI-driven traffic optimization, and disruption simulation.

---

## 1. System Architecture

```text
                    VECTORAIL
                        │
              ┌─────────┴─────────┐
              │                   │
          FRONTEND              BACKEND
        React + Vite          Spring Boot
              │                   │
              └──── REST API ─────┘
                                  │
                              Database
```

* **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui component architecture, React Router v6, Lucide React icons, and Recharts.
* **Backend**: Java 21/26, Spring Boot 3.4.x, Spring MVC REST APIs, layered architecture with DTOs, controllers, services, repositories, and domain packages.
* **Communication**: Decoupled HTTP/JSON REST API with configured CORS support for local development (`http://localhost:5173`, `http://localhost:3000`).

---

## 2. Directory Structure

```text
Vectorail/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── cards/          # Specialized railway status cards
│   │   │   ├── charts/         # Analytics charts & telemetry wrappers
│   │   │   ├── common/         # Common shared UI widgets
│   │   │   ├── navigation/     # Sidebar, Header, Breadcrumbs
│   │   │   └── ui/             # shadcn/ui design foundation (Button, Card, Badge, Table, Dialog, etc.)
│   │   ├── data/               # Static and mock dataset definitions
│   │   ├── features/           # Modular domain feature slices
│   │   │   ├── alerts/
│   │   │   ├── analytics/
│   │   │   ├── network/
│   │   │   ├── optimization/
│   │   │   ├── simulation/
│   │   │   └── trains/
│   │   ├── hooks/              # Custom React hooks (e.g., useDebounce)
│   │   ├── layouts/            # App shell layout (AppLayout)
│   │   ├── lib/                # Utility helpers (cn, tailwind merge)
│   │   ├── pages/              # Route pages (Dashboard, Login, Placeholders)
│   │   ├── services/           # Centralized API clients (trainService, alertService, etc.)
│   │   ├── types/              # Shared TypeScript domain models
│   │   ├── utils/              # Helper utilities
│   │   ├── App.tsx             # Root router configuration
│   │   ├── main.tsx            # React application entry point
│   │   └── index.css           # Control-center dark theme design tokens
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── backend/
│   ├── mvnw / mvnw.cmd
│   ├── pom.xml
│   └── src/
│       ├── main/
│       │   ├── java/com/vectorail/vectorail/
│       │   │   ├── config/              # WebMvc CORS configuration
│       │   │   ├── controller/          # REST Controllers (HealthController)
│       │   │   ├── domain/              # Future domain packages (train, alert, station, etc.)
│       │   │   ├── dto/                 # Data Transfer Objects (HealthResponse)
│       │   │   ├── model/               # Persistence entities
│       │   │   ├── repository/          # Spring Data repositories
│       │   │   ├── service/             # Service interfaces & business logic
│       │   │   └── VectorailApplication.java
│       │   └── resources/
│       │       └── application.properties
│       └── test/
│           └── java/com/vectorail/vectorail/
│               ├── VectorailApplicationTests.java
│               └── controller/HealthControllerTest.java
│
├── .gitignore
└── README.md
```

---

## 3. Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 18, Vite |
| **Language** | TypeScript |
| **Styling & Design System** | Tailwind CSS, Lucide React, Custom Dark Operations Theme |
| **Routing** | React Router v6 |
| **Backend Framework** | Spring Boot 3.4.3 |
| **Language & Runtime** | Java 21 / 26 (SE Runtime) |
| **Build & Toolchain** | Apache Maven (with `mvnw` wrapper), Node.js / npm |

---

## 4. Frontend Setup & Run Guide

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Copy environment file:
   ```bash
   cp .env.example .env
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start development server:
   ```bash
   npm run dev
   ```
   The frontend runs by default at `http://localhost:5173`.

5. Build for production:
   ```bash
   npm run build
   ```

---

## 5. Backend Setup & Run Guide

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Build and verify test suites using the Maven wrapper:
   ```bash
   ./mvnw test
   ```
   *(On Windows PowerShell: `.\mvnw.cmd test`)*

3. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend starts by default on port `8080`.

---

## 6. Health API

### Health Verification Endpoint
* **URL**: `GET /api/health`
* **Response**: `200 OK`
* **Content-Type**: `application/json`

**Sample Response**:
```json
{
  "status": "UP",
  "application": "Vectorail"
}
```

When both services are running, the frontend Dashboard queries this endpoint dynamically and updates the operational indicator to **`Backend: Connected`**.

---

## 7. Frontend Routes

| Route | View | Description |
|---|---|---|
| `/login` | Operator Sign-In | Control desk access |
| `/` | Redirect | Automatically directs to `/dashboard` |
| `/dashboard` | Control Center | System status, live backend ping, architecture grid |
| `/network` | Network View | Topology and signal layout (Phase 2) |
| `/trains` | Trains Telemetry | Active fleet and position tracking (Phase 3) |
| `/alerts` | Incident Dispatch | Real-time safety & network alerts (Phase 4) |
| `/analytics` | Operations Analytics | Delay metrics and capacity trends (Phase 5) |
| `/optimization` | AI Traffic Optimization | Dispatch recommendation engine (Phase 6) |
| `/simulation` | Traffic Simulator | Disruption modeling sandbox (Phase 7) |
| `/settings` | Settings | Telemetry rates and controller preferences |

---

## 8. Future Roadmap

- **Phase 2**: Railway Network Topology & Interactive Node Map
- **Phase 3**: Train Fleet Telemetry & Block Section Occupancy
- **Phase 4**: Automated Safety Conflict & Alert Engine
- **Phase 5**: Punctuality & Load Analytics Dashboard
- **Phase 6**: AI-Assisted Dispatch & Speed Optimization
- **Phase 7**: Disruption Simulation & Scenario Modeling Sandbox
