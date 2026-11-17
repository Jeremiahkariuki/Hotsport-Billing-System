# RadaLink - Hotspot & PPPoE Billing System

**RadaLink** is a modern, full-stack ISP Hotspot & PPPoE billing and bandwidth management platform tailored for MikroTik routers and Safaricom Daraja M-Pesa automated payments.

---

## ⚡ What is RadaLink?

*Rada* (meaning alert, connected, and in-tune) + *Link* (uninterrupted internet connection). **RadaLink** provides ISPs, hoteliers, cafes, universities, and neighborhood wireless providers with a hands-free, automated revenue collection engine.

---

## 🚀 Key Modules & Capabilities

- **Captive Portal Engine with Live Mobile Preview**:
  - Live interactive mobile preview inside the admin dashboard.
  - 8 modern responsive portal templates: *Midnight/Premium, Classic, Minimal/Modern, Sales/Conversion, Forest/Natural, Corporate/Business, Voucher/Reseller, Loyalty/Rewards*.
  - **Smart TV & Non-Browser Device Direct Access**: Users can register MAC addresses for streaming devices (Apple TV, Android TV, PS5, Xbox) that lack a captive browser.
- **Dynamic Bandwidth & Package Management**:
  - Download & upload speed limit sliders (`256K`, `1M`, `5M`, `20M`, `50M+`) or uncapped.
  - Duration presets (`15m`, `30m`, `1h`, `3h`, `6h`, `12h`, `24h`, `1W`, and custom).
  - Pricing in `KSh` (e.g. `KSh 3.00`, `KSh 5.00`, `KSh 10.00`, etc.).
  - Device concurrency (1, 2+ simultaneous devices).
  - Strict MAC binding (locks to first device) vs. Flexible locking (auto-transfers after idle timeout).
- **Safaricom Daraja M-Pesa Integration**:
  - Express STK Push payment flow.
  - Automated voucher generation and network authorization upon payment receipt.
  - Built-in simulation mode for development/sandbox testing.
- **MikroTik RouterOS Integration**:
  - Remote active session monitoring and disconnect/kick actions.
  - Automated 1-click RouterOS Terminal Setup Script (`.rsc`) configuring API access, Walled Garden for M-Pesa, and Captive Portal redirects.
- **Voucher Management**:
  - Batch voucher generator with custom prefixes (e.g., `RL-8472`).
  - Printable voucher scratch-card sheets.
- **PPPoE Subscribers Management**:
  - Manage monthly home and business fiber/wireless clients, static IPs, and speed profiles.

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router, React 18, TypeScript)
- **Styling**: Tailwind CSS, Lucide Icons
- **Database & ORM**: SQLite / PostgreSQL with Prisma ORM
- **Router Connector**: RouterOS API & REST API Client
- **Payments**: Safaricom M-Pesa Daraja API

---

## 💻 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Jeremiahkariuki/Hotsport-Billing-System.git
cd Hotsport-Billing-System
```

### 2. Install dependencies
```bash
npm install
```

### 3. Initialize the database
```bash
npx prisma db push
node prisma/seed.js
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Key Routes

- **Portal Designer**: `/hotspot/portal`
- **Packages Management**: `/hotspot/packages`
- **Active Hotspot Sessions**: `/hotspot/sessions`
- **Vouchers**: `/hotspot/vouchers`
- **MikroTik Router Setup Script**: `/hotspot/setup`
- **Settings & M-Pesa Credentials**: `/hotspot/settings`
- **PPPoE Customers**: `/pppoe`
- **Public Guest Captive Portal**: `/portal`
