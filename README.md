# Vectorail — Intelligent Railway Traffic Management

> Full-stack Railway Traffic Control Center application.

## Architecture

```
                    VECTORAIL
                        │
             ┌──────────┴──────────┐
             │                     │
         FRONTEND               BACKEND
        React/Vite             Spring Boot
             │                     │
             └──────── REST ───────┘
                                   │
                              Database
```

## Project Structure

```
Vectorail/
├── frontend/     # React + Vite application
├── backend/      # Spring Boot Java API (Phase 2 - Part 2)
├── .gitignore
└── README.md
```

## Technology Stack

| Layer    | Technology                                  |
|----------|---------------------------------------------|
| Frontend | React 18, Vite, JavaScript, Tailwind CSS    |
| UI       | shadcn/ui (Radix UI), Lucide React          |
| Routing  | React Router v6                             |
| Charts   | Recharts                                    |
| Backend  | Spring Boot 4.x, Java 26, Maven             |
| Database | TBD (Phase 3+)                              |

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev       # Dev server at http://localhost:3000
npm run build     # Production build
```

### Backend *(Phase 2 - Part 2)*

```bash
cd backend
.\mvnw.cmd spring-boot:run    # Windows
./mvnw spring-boot:run        # Linux/macOS
```

## Application Routes

| Route          | Description                      |
|----------------|----------------------------------|
| `/`            | Redirects to `/dashboard`        |
| `/dashboard`   | Operations Command Center        |
| `/network`     | Railway Network Topology Map     |
| `/trains`      | Active Train Fleet & Telemetry   |
| `/alerts`      | Operations Alarms & Alerts       |
| `/analytics`   | Traffic KPIs & Analytics         |
| `/optimization`| AI Dispatch Optimization         |
| `/simulation`  | Timetable Simulation Sandbox     |
| `/settings`    | Console System Settings          |
| `/login`       | Operator Authentication Portal   |

## API Endpoints *(Phase 2 - Part 2)*

| Method | Endpoint      | Description              |
|--------|---------------|--------------------------|
| GET    | `/api/health` | Backend health check     |

## Phase Roadmap

- **Phase 1** ✅ — Frontend foundation, dark operations theme, routing, mock data layer
- **Phase 2** 🔄 — Rebranding to Vectorail, frontend/backend separation, Spring Boot foundation
- **Phase 3** — Dashboard, network map, live train telemetry
- **Phase 4** — Alerts, analytics, Recharts visualizations
- **Phase 5** — AI optimization engine, simulation sandbox
- **Phase 6** — Authentication, production database, deployment
