# 🎓 Campus Fair — IKAMAMIIND 2100

> Modern campus fair event & attendance management system built for **IKAMAMIIND 2100**.

Campus Fair is a web-based system designed to simplify participant registration, event management, QR-based event tickets, and real-time attendance tracking.

The system provides separate experiences for **participants**, **administrators**, and **event staff/scanners**, while keeping the application structure maintainable for future development.

---

## ✨ Features

### 👤 Participant

- Participant account registration
- Secure password hashing
- Participant login
- View available Campus Fair events
- View event details
- Register for an event
- Automatically generate participant code
- Automatically generate unique QR ticket
- View registered events from dashboard
- View event ticket and QR code
- Check event schedule and information

### 🛠️ Administrator

- Admin authentication and authorization
- Admin dashboard
- Event statistics
- Registration statistics chart
- Attendance statistics chart
- View all events
- Create new events
- Edit existing events
- Activate/deactivate events
- Soft delete events
- View event attendance
- Monitor participant check-in/check-out
- Export attendance data to CSV
- Export attendance data to Excel

### 📱 Event Scanner

- Dedicated scanner page for event staff
- QR code scanning using device camera
- Token-based scanner access
- Automatic attendance state detection
- Check-in tracking
- Check-out tracking
- Prevent duplicate check-in/check-out
- Event time validation
- Invalid QR/token handling
- Transaction-safe attendance processing

### 🔐 Security

- Auth.js authentication
- Role-based authorization
- Password hashing with bcrypt
- Zod input validation
- Soft delete for users, participants, and events
- Unique QR tokens
- Unique scanner tokens
- Database-level uniqueness constraints
- Serializable attendance transactions
- Concurrency retry handling
- CSV formula injection protection

---

## 🧩 System Flow

```text
                    ┌─────────────────────┐
                    │      Landing Page   │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │ Register / Login    │
                    └──────────┬──────────┘
                               │
                  ┌────────────┴────────────┐
                  │                         │
           PARTICIPANT                    ADMIN
                  │                         │
        ┌─────────▼─────────┐      ┌────────▼────────┐
        │ Participant       │      │ Admin Dashboard │
        │ Dashboard         │      └────────┬────────┘
        └─────────┬─────────┘               │
                  │                         │
        ┌─────────▼─────────┐      ┌────────▼────────┐
        │ Browse Events     │      │ Manage Events   │
        └─────────┬─────────┘      └────────┬────────┘
                  │                         │
        ┌─────────▼─────────┐      ┌────────▼────────┐
        │ Register Event    │      │ Attendance      │
        └─────────┬─────────┘      │ Monitoring      │
                  │                └────────┬────────┘
        ┌─────────▼─────────┐               │
        │ Generate QR       │               │
        │ Event Ticket      │               │
        └─────────┬─────────┘               │
                  │                         │
                  │                 ┌───────▼────────┐
                  │                 │ Export CSV/XLSX │
                  │                 └────────────────┘
                  │
        ┌─────────▼─────────┐
        │ Event Scanner     │
        │ QR Scan           │
        └─────────┬─────────┘
                  │
          ┌───────▼────────┐
          │ Attendance      │
          │ Check-in/out    │
          └────────────────┘
```

## 🏗️ Architecture

The project follows a layered structure to separate UI, business logic, validation, database access, and reusable utilities.

```text
UI / Pages
    │
    ▼
Components / Hooks
    │
    ▼
API Routes / Server Actions
    │
    ▼
Services
    │
    ▼
Prisma ORM
    │
    ▼
PostgreSQL
```

### Main responsibilities

| Layer              | Responsibility                                |
| ------------------ | --------------------------------------------- |
| `app/`             | Routes, pages, API endpoints                  |
| `components/`      | Reusable UI components                        |
| `hooks/`           | Client-side interaction logic                 |
| `services/`        | Business logic and database operations        |
| `lib/actions/`     | Server Actions                                |
| `lib/auth/`        | Authentication & authorization                |
| `lib/validations/` | Zod validation schemas                        |
| `lib/utils/`       | Shared utilities                              |
| `data/`            | Static application data                       |
| `types/`           | Shared TypeScript declarations                |
| `prisma/`          | Database schema, migrations, generated client |

## 📁 Project Structure

```text
campusfair/
├── .gitignore
├── .vscode/
│ └── extensions.json
├── README.md
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── prisma.config.ts
├── prisma/
│ ├── generated/
│ │ ├── browser.ts
│ │ ├── client.ts
│ │ ├── commonInputTypes.ts
│ │ ├── enums.ts
│ │ ├── internal/
│ │ │ ├── class.ts
│ │ │ ├── prismaNamespace.ts
│ │ │ └── prismaNamespaceBrowser.ts
│ │ ├── models.ts
│ │ └── models/
│ │ ├── AttendanceLog.ts
│ │ ├── Event.ts
│ │ ├── EventParticipant.ts
│ │ ├── ParticipantProfile.ts
│ │ └── User.ts
│ ├── migrations/
│ │ ├── 20260822121122_init/
│ │ │ └── migration.sql
│ │ ├── 20260822145506_replace_attendance_tokens/
│ │ │ └── migration.sql
│ │ ├── 20260823052117_prevent_duplicate_attendance/
│ │ │ └── migration.sql
│ │ ├── 20260823063751_add_event_description/
│ │ │ └── migration.sql
│ │ ├── 20260823095946_init/
│ │ │ └── migration.sql
│ │ └── migration_lock.toml
│ ├── schema.prisma
│ └── seed.ts
├── public/
│ ├── arrow-drawing.png
│ ├── bersama.jpg
│ ├── campus-logo/
│ │ ├── ipb.jpeg
│ │ ├── itb.png
│ │ ├── its.jpg
│ │ ├── telyu.png
│ │ ├── ub.jpeg
│ │ ├── ugm.jpeg
│ │ ├── ui.png
│ │ ├── uin.png
│ │ ├── unair.png
│ │ ├── undip.jpeg
│ │ ├── unesa.jpeg
│ │ ├── unnes.png
│ │ ├── uns.png
│ │ └── upi.png
│ │ ├── logo.jpg
│ │ └── texture-background.jpg
│ └── ...
├── src/
│ ├── app/
│ │ ├── (auth)/
│ │ │ ├── login/
│ │ │ │ └── page.tsx
│ │ │ └── register/
│ │ │ └── page.tsx
│ │ ├── (participant)/
│ │ │ ├── dashboard/
│ │ │ │ └── page.tsx
│ │ │ └── events/
│ │ │ ├── [eventId]/
│ │ │ │ ├── page.tsx
│ │ │ │ └── ticket/
│ │ │ │ └── page.tsx
│ │ │ └── page.tsx
│ │ ├── admin/
│ │ │ ├── attendance/
│ │ │ │ ├── [eventId]/
│ │ │ │ │ └── page.tsx
│ │ │ │ └── page.tsx
│ │ │ ├── events/
│ │ │ │ ├── [id]/
│ │ │ │ │ └── edit/
│ │ │ │ │ └── page.tsx
│ │ │ │ ├── new/
│ │ │ │ │ └── page.tsx
│ │ │ │ └── page.tsx
│ │ │ └── page.tsx
│ │ ├── api/
│ │ │ ├── admin/
│ │ │ │ └── attendance/
│ │ │ │ └── [eventId]/
│ │ │ │ ├── export-csv/
│ │ │ │ │ └── route.ts
│ │ │ │ └── export-excel/
│ │ │ │ └── route.ts
│ │ │ ├── auth/
│ │ │ │ ├── [...nextauth]/
│ │ │ │ │ └── route.ts
│ │ │ │ └── register/
│ │ │ │ └── route.ts
│ │ │ ├── events/
│ │ │ │ └── register/
│ │ │ │ └── route.ts
│ │ │ ├── health/
│ │ │ │ └── route.ts
│ │ │ └── scanner/
│ │ │ └── route.ts
│ │ ├── dev/
│ │ │ └── design-system/
│ │ │ └── page.tsx
│ │ ├── favicon.ico
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ └── scanner/
│ │ └── [token]/
│ │ └── page.tsx
│ ├── components/
│ │ ├── admin/
│ │ │ ├── admin-header.tsx
│ │ │ ├── admin-hero.tsx
│ │ │ ├── attendance-chart.tsx
│ │ │ ├── delete-event-button.tsx
│ │ │ ├── edit-event-form.tsx
│ │ │ ├── event-form.tsx
│ │ │ └── registration-chart.tsx
│ │ ├── auth/
│ │ │ ├── login-form.tsx
│ │ │ ├── logout-button.tsx
│ │ │ └── register-form.tsx
│ │ ├── landing/
│ │ │ ├── about-section.tsx
│ │ │ ├── event-info.tsx
│ │ │ ├── hero.tsx
│ │ │ ├── highlights-section.tsx
│ │ │ ├── landing-footer.tsx
│ │ │ ├── landing-navbar.tsx
│ │ │ └── registration-cta.tsx
│ │ ├── participant/
│ │ │ ├── event-registration.tsx
│ │ │ └── participant-qr.tsx
│ │ ├── scanner/
│ │ │ ├── qr-scanner.tsx
│ │ │ └── scanner-page.tsx
│ │ └── shared/
│ │ ├── badge.tsx
│ │ ├── breadcrumbs.tsx
│ │ ├── button.tsx
│ │ ├── card.tsx
│ │ ├── driftwall.tsx
│ │ ├── graphic-card.tsx
│ │ ├── input.tsx
│ │ └── modal.tsx
│ ├── data/
│ │ ├── campusLogo.ts
│ │ └── highlights.ts
│ ├── hooks/
│ │ ├── auth/
│ │ │ ├── use-login.ts
│ │ │ └── use-register.ts
│ │ ├── participant/
│ │ │ └── use-event-registration.ts
│ │ └── scanner/
│ │ └── use-attendance-scan.ts
│ ├── lib/
│ │ ├── actions/
│ │ │ └── admin/
│ │ │ ├── createEvent.ts
│ │ │ ├── deleteEvent.ts
│ │ │ ├── generateUniqueSlug.ts
│ │ │ └── updateEvent.ts
│ │ ├── auth/
│ │ │ ├── auth.ts
│ │ │ ├── permission.ts
│ │ │ └── require-admin.ts
│ │ ├── db/
│ │ │ └── prisma.ts
│ │ ├── utils/
│ │ │ ├── date.ts
│ │ │ ├── format-date.ts
│ │ │ └── slug.ts
│ │ └── validations/
│ │ ├── attendance.ts
│ │ ├── auth.ts
│ │ └── event.ts
│ ├── proxy.ts
│ ├── services/
│ │ ├── admin/
│ │ │ ├── attendance/
│ │ │ │ └── get-attendance-export-data.ts
│ │ │ ├── get-attendance-events.ts
│ │ │ ├── get-dashboard-data.ts
│ │ │ ├── get-event-attendance.ts
│ │ │ ├── get-event.ts
│ │ │ └── get-events.ts
│ │ ├── attendance/
│ │ │ ├── attendance-error.ts
│ │ │ ├── get-scanner-event.ts
│ │ │ └── process-attendance.ts
│ │ ├── auth/
│ │ │ └── register-participant.ts
│ │ └── participant/
│ │ ├── get-dashboard-data.ts
│ │ ├── get-event-detail.ts
│ │ ├── get-event-ticket.ts
│ │ ├── get-events.ts
│ │ └── register-to-event.ts
│ └── types/
│ └── next-auth.d.ts
└── tsconfig.json
```

---

## 🛠️ Tech Stack

- Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Recharts
- html5-qrcode
- Backend
- Next.js App Router
- Auth.js
- Server Actions
- REST API Routes
- Zod
- Database
- PostgreSQL
- Prisma ORM 7
- Utilities
- bcryptjs — password hashing
- crypto — secure QR/scanner token generation
- ExcelJS — attendance Excel export

---

## 🔐 Authentication & Authorization

The application uses Auth.js with a JWT-based session strategy.

#### There are two main roles:

```text
 PARTICIPANT
 ADMIN
 Participant
```

#### Participants can:

- Access their dashboard
- Browse events
- Register for events
- View their own QR ticket
- View their own registration information
- Admin

#### Admins can:

- Access the admin dashboard
- Manage events
- View attendance
- Export attendance data

#### Protected routes are handled through:

```text
 src/proxy.ts
 src/lib/auth/auth.ts
 src/lib/auth/permission.ts
 src/lib/auth/require-admin.ts
```

The server still performs authorization checks even when routes are protected by the proxy.

---

## 📱 QR Attendance System

Each event has its own scanner token.

Each participant registration receives a unique QR token.

```text
Participant
│
│ Register Event
▼
EventParticipant
│
├── participantCode
│
└── qrToken
│
▼
QR Ticket
│
▼
Event Scanner
│
▼
Scanner API
│
▼
Attendance Processor
│
┌─────┴─────┐
▼ ▼
CHECK_IN CHECK_OUT
```

Attendance state is determined automatically from the participant's previous attendance record.

```text
No attendance
↓
CHECK_IN
↓
CHECK_OUT
↓
ALREADY_CHECKED_OUT
```

The attendance transaction uses a serializable isolation level and retry handling to reduce race conditions when multiple scanners process scans at nearly the same time.

---

## 🗄️ Database

Main entities:

```text
User
│
└── ParticipantProfile
│
└── EventParticipant
│
├── Event
│
└── AttendanceLog
```

#### Main models

- User
- ParticipantProfile
- Event
- EventParticipant
- AttendanceLog
- Important constraints
- UUID primary keys
- Unique user email
- Unique event slug
- Unique scanner token
- Unique QR token
- One participant registration per event
- Unique participant code per event
- One check-in per event participant
- One check-out per event participant
- Soft delete support

---

## 🌏 Timezone

The application uses:

```text
Asia/Jakarta
```

Event date/time input and formatting are handled consistently through shared date utilities.

This prevents differences between the browser timezone, server timezone, and database timestamp representation.

---

## ⚙️ Requirements

Before running the project, make sure you have:

```text
Node.js
npm
PostgreSQL
Git
```

Recommended environment:

```text
Node.js 24+
npm 11+
PostgreSQL 18+
```

## 🚀 Getting Started

#### 1. Clone the repository

```text
git clone <repository-url>
cd campusfair
```

#### 2. Install dependencies

```text
npm install
```

#### 3. Configure environment variables

Create:

```text
.env
```

Example:

```text
DATABASE_URL="postgresql://postgres:password@localhost:5432/campusfair"

AUTH_SECRET="your-auth-secret"

ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="your-admin-password"
```

> Do not commit .env to Git.

#### 4. Generate Prisma Client

```
npx prisma generate
```

#### 5. Run database migrations

```
npx prisma migrate dev
```

#### 6. Seed the database

```
npx prisma db seed
```

#### 7. Start development server

```
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 🧪 Development Commands

### Start Development Server

```
npm run dev
```

Lint

```
npm run lint
```

Production build

```
npm run build
```

Start production server

```
npm run start
```

Prisma

```
npx prisma generate
npx prisma migrate dev
npx prisma migrate status
npx prisma studio
```

---

## 📊 Admin Dashboard

The admin dashboard provides an overview of Campus Fair activity.

It includes:

- 👥 Total participants
- 🎫 Total events
- 📝 Total registrations
- 📍 Attendance overview
- 📈 Event registration statistics
- 🕒 Recent events

Charts are implemented using Recharts.

---

## 📤 Attendance Export

Administrators can export attendance records in:

- CSV
- Excel (.xlsx)

Exported data can include

- Participant information
- Event information
- Attendance status
- Check-in time
- Check-out time

CSV output also applies protection against spreadsheet formula injection.

## 🧹 Code Organization Principles

The project follows several conventions to keep the codebase maintainable.

#### 1. Pages should stay clean

Pages focus primarily on:

- authentication checks
- fetching required data
- composing components

Business logic belongs in services.

#### 2. Business logic belongs in services

Example:

```
src/services/participant/register-to-event.ts
```

instead of placing registration logic directly inside a page or component.

#### 3. Reusable UI belongs in components

Shared UI is placed under:

```
src/components/shared/
```

Feature-specific UI is organized by domain:

```
src/components/admin/
src/components/participant/
src/components/scanner/
src/components/auth/
```

#### 4. Client-side interaction belongs in hooks

Examples:

```
src/hooks/auth/
src/hooks/participant/
src/hooks/scanner/ 5. Validation is centralized
```

Zod schemas are stored under:

```
src/lib/validations/ 6. Database access uses Prisma
```

Database operations are centralized through services and:

```
src/lib/db/prisma.ts
```

---

## 🛡️ Security Notes

Current security measures include:

- 🔐 Password hashing with bcrypt
- 🎟️ JWT-based authentication
- 👤 Role-based authorization
- 🛡️ Server-side authorization checks
- ✅ Zod input validation
- 🔑 Unique QR tokens
- 🔑 Unique scanner tokens
- 🗑️ Soft deletion
- 🔄 Transaction-safe attendance processing
- 🔒 Serializable attendance transactions
- ♻️ Concurrency retry handling
- 📄 CSV formula injection protection
- ❤️ Generic public health endpoint without database details

---

## 📱 Scanner Access

The event scanner intentionally uses a token-based URL:

```
/scanner/[token]
```

This allows designated event devices to access the scanner without requiring a participant/admin login.

The scanner token is:

- Event-specific
- Securely generated
- Used to identify the event being scanned

---

## ⚠️ Current Limitations / Future Improvements

The system is functional for the current Campus Fair workflow.

Several production-hardening improvements can be considered in the future:

- 🚦 Rate limiting for public registration and scanner endpoints
- 🔑 Admin password management/reset
- 📋 Attendance audit trail
- 🧪 Automated tests
- 🔄 CI/CD pipeline
- 🚀 Production deployment documentation
- 📝 More detailed operational logging
- 📡 Additional monitoring for scanner availability

> These improvements are not required for the current core event workflow, but would be useful for future production deployments.

---

## 🎯 Project Status

#### Core System

| Feature                     | Status |
| --------------------------- | :----: |
| Landing Page                |   ✅   |
| Participant Registration    |   ✅   |
| Participant Login           |   ✅   |
| Auth & Roles                |   ✅   |
| Participant Dashboard       |   ✅   |
| Event Listing               |   ✅   |
| Event Registration          |   ✅   |
| QR Ticket                   |   ✅   |
| QR Scanner                  |   ✅   |
| Check-in                    |   ✅   |
| Check-out                   |   ✅   |
| Admin Dashboard             |   ✅   |
| Registration Chart          |   ✅   |
| Attendance Chart            |   ✅   |
| Event Management            |   ✅   |
| Attendance Monitoring       |   ✅   |
| CSV Export                  |   ✅   |
| Excel Export                |   ✅   |
| Soft Delete                 |   ✅   |
| Timezone Handling           |   ✅   |
| Concurrency-safe Attendance |   ✅   |

---

## 🧑‍💻 Development Philosophy

Campus Fair is intentionally structured around clarity, maintainability, and practical event operations.

The goal is not to over-engineer the application, but to make sure that:

> Pages handle presentation, services handle business logic, and the database remains the source of truth.

The project structure is designed so future developers can add features without turning the codebase into a maze of tightly coupled components.

---

## 📄 License

This project is developed for the **IKAMAMIIND 2100 Campus Fair** project.

---

<p align="center"> Built with ☕, TypeScript, and a suspicious amount of QR codes. </p> ```
