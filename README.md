# ClassFinder – Smart Classroom Finder & Reservation System

An ultra-modern, dark futuristic full-stack web application designed for college faculty to instantly find, check, and reserve available classrooms and laboratories (**Room 401, Room 402, Lab 1, Lab 2**), see real-time timetable occupancy with exact **"Available At"** calculations, prevent scheduling collisions, and manage reservations.

---

## 🌟 Core USP: "Available At" Prediction Engine
ClassFinder immediately answers:
1. *"Can I use this classroom at this time?"* (🟢 **AVAILABLE** vs 🔴 **OCCUPIED** vs 🟡 **RESERVED**)
2. If **NO**, it instantly answers: ***"When will it become available?"***
   - The system tracks official timetable classes and teacher reservations.
   - For an occupied room, it calculates contiguous subsequent sessions and calculates the exact release time (e.g., `Available at: 3:15 PM`).
   - If available, it indicates how long the room remains free before the next lecture (e.g., `Available until: 11:05 AM`).

---

## 🏛️ Spaces Covered
- **Room 401**: 60-seat Lecture Auditorium (Smart 4K Laser Projector, Wireless Audio, VRV AC)
- **Room 402**: 60-seat Interactive Lecture Hall (86" Interactive Touch Whiteboard, Hybrid Capture, AC)
- **Lab 1**: 35-seat Computer Engineering Laboratory (Dual Monitors, Core i7, Gigabit LAN, AC)
- **Lab 2**: 35-seat AI & IoT Laboratory (NVIDIA RTX 4070 GPU Rigs, Raspberry Pi & ESP32 Benches, AC)

---

## 📊 BScAT Occupancy Matrix & Timetable Digitization
The system incorporates structured timetable data transcribed directly from the uploaded BScAT timetable schedules:
- **BScAT Class 1 (FY)**: First Year schedule covering Room 402 and Lab 2 (CT, Maths, BDP, CS, FAIDA, AIP).
- **BScAT Class 2 (SY)**: Second Year schedule covering Room 401, Lab 1, and Lab 2 (NT, DSA, SE, DI, PP).
- **BScAT Class 3 (TY)**: Third Year schedule covering Room 402, Lab 1, and Lab 2 (DPUIX, AI, VCG, IoT, SPM, AP, RPA, EJ).
- **BScAT Class 4 (Final Year)**: Capstone, Cloud Computing, and advanced project slots.

### Supported Academic Time Slots:
- `6:45 AM – 7:45 AM`
- `7:45 AM – 8:45 AM`
- `8:55 AM – 9:55 AM`
- `9:55 AM – 10:55 AM`
- `11:05 AM – 12:05 PM`
- `12:05 PM – 1:05 PM`
- `1:15 PM – 2:15 PM`
- `2:15 PM – 3:15 PM`
- `3:25 PM – 4:25 PM`

---

## 🚀 Key Features

1. **Interactive 3D Campus Floor Twin (Three.js / React Three Fiber)**:
   - Isometric 3D floor plan representing all 4 spaces on the 4th floor.
   - Dynamic real-time status glow:
     - 🟢 Neon Green for Available
     - 🔴 Neon Red for Occupied
     - 🟡 Amber for Reserved
   - Smooth elevation on hover, orbit controls, and 1-click room inspection drawer with today's full timeline.

2. **Smart Classroom Finder (`/find`)**:
   - Filter by Date, Start/End Time, Room / Any Room, and Minimum Capacity.
   - 1-Click quick academic time-slot chips.
   - Live availability cards with the glowing **"Available At: HH:MM"** badge for occupied rooms.
   - [View Schedule] modal and instant [Reserve] drawer.

3. **BScAT Occupancy Matrix (`/occupancy`)**:
   - Multi-dimensional matrix view with Day tabs (Monday–Saturday + All Days).
   - Filter by Class (All 4 BScAT classes), Room, or search by Subject / Faculty.
   - Toggle between **Visual Matrix Grid** and **List Table View**.

4. **Faculty Reservation Management (`/reservations`)**:
   - View Upcoming, Previous, and Cancelled bookings.
   - Unique Human-Readable Reservation IDs (`RES-2026-XXXX`).
   - 1-Click cancellation that immediately releases the classroom for other teachers.

5. **Clean Admin Panel (`/admin`)**:
   - **Zero Dashboards / Analytics** per project specifications.
   - Focused purely on facility management:
     - Classrooms (Capacities, facilities, floor wings)
     - Teachers (Add, manage faculty roster)
     - BScAT Classes (Batch numbers, student sizes)
     - Subjects (Course titles, codes, faculty initials)
     - Timetable Scheduler (Add/edit/delete with real-time clash prevention)
     - Reservations (Campus-wide ledger with admin override/cancel)
     - Settings (Operating hours & booking constraints)

---

## 🔐 Authentication & Demo Credentials

| Role | Email | Password | Pre-configured Access |
|---|---|---|---|
| **Teacher** | `teacher@classfinder.edu` | `teacher123` | Prof. Yug Borda (Find rooms, check status, book, cancel own reservations) |
| **Admin** | `admin@classfinder.edu` | `admin123` | Campus Facilities Admin (Full CRUD for timetable, rooms, teachers, reservations) |

*Note: Both login pages feature a **1-Click Instant Demo Login** button for frictionless testing.*

---

## 🛠️ Technology Stack
- **Framework**: Next.js 14 (App Router, React 18, TypeScript)
- **Styling**: Tailwind CSS (Dark Futuristic Theme, Glassmorphism, Neon Glows)
- **3D Visualization**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Database & ORM**: Prisma ORM with SQLite (`prisma/dev.db`)
- **Authentication**: Stateless JSON Web Tokens (HS256) stored in HTTP-only cookies, `bcryptjs` password hashing
- **Icons & Animations**: `lucide-react`, `canvas-confetti`, `framer-motion`

---

## 💻 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Push database schema & seed timetable
npx prisma db push
npx tsx prisma/seed.ts

# 3. Start development server
npm run dev

# Or build and start production server
npm run build
npm run start
```
The application will be live at `http://localhost:3000`.
