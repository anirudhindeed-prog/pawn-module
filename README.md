# Pawn Module — Kumudu Jewellery ERP

A modern full-stack application for managing jewellery pawn/girvi operations. Built with Next.js 15, Tailwind CSS, and Supabase.

## Features

- **Dashboard**: Real-time KPIs and alerts for active loans, exposure, and overdue amounts
- **Active Loans**: Searchable loan inventory with split-panel detail view
- **New Pawn Entry**: 3-step wizard for pledge creation with live LTV/valuation calculator
- **Payments**: Interest and principal payment recording
- **Customer Ledger**: Complete customer history and exposure tracking
- **Vault**: Physical gold custody inventory by location
- **Today's Collections**: Daily interest demand register with days-past-due tracking
- **Auctions / Foreclosure**: Overdue pledge auction workflow
- **Pawn Masters**: Configuration for interest schemes, penalty rules, vault locations
- **Reports**: Income, portfolio, NPA, auction, staff, and cash flow reports

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS 4
- **Backend API**: Next.js Route Handlers
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (OTP/magic link)
- **Storage**: Supabase Storage (item photos)
- **Deployment**: Vercel (frontend) + Supabase (database)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Supabase project

### Local Development

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd pawn-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

4. Add your Supabase credentials to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

5. Start the dev server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Database Schema

### Core Tables

- `customers` — customer profiles with KYC status
- `pawn_loans` — pledge receipt master
- `pawn_items` — pledged item details
- `pawn_settlements` — payment records
- `interest_schemes` — loan scheme definitions
- `penalty_rules` — late payment penalty configuration
- `vault_locations` — physical vault inventory

### Running Migrations

Database migrations are in `supabase/migrations/`. Run them in the Supabase dashboard SQL editor.

Seed data is in `supabase/seed.sql` — load it to populate demo customers and loans.

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository in Vercel dashboard
3. Set environment variables in Vercel project settings
4. Deploy — Vercel auto-detects Next.js

### Database Setup

Create a Supabase project (ap-south-1 region for India data residency), run migrations, and seed demo data.

## Architecture

### Project Structure

```
src/
  app/                  — Next.js app router pages & layouts
  components/           — React components
  lib/
    supabase/          — Supabase client instances
    interest.ts        — Interest calculation utilities
    types.ts           — TypeScript types
    utils.ts           — Helper functions
```

### Key Utilities

- **Interest Calculations**: Simple, compound, and tiered interest formulas
- **LTV Calculator**: Determines loan-to-value ratios based on gold purity and weight
- **Status Management**: Loan status (active/near/overdue) based on maturity dates

## Interest Calculation Business Rules

- **Simple Interest**: `Principal × (Rate% / 365) × Days`
- **Compound Interest**: `Principal × (1 + Rate% / 12)^Months - Principal`
- **No interest** charged on loans < 15 days
- **Interest rounded** to full month by default
- **Overdue interest** calculated using compound formula

## Testing

The app uses mock data by default. To test with real Supabase:

1. Set up database schema and seed data
2. Update `src/app/(dashboard)/page.tsx` to query from Supabase instead of mock data
3. Implement CRUD operations in `/api/loans`, `/api/customers`, etc.

## Future Enhancements

- [ ] Implement all 10 dashboard screens fully
- [ ] Migrate to NestJS for production API layer
- [ ] Add multi-tenant support with schema-per-tenant RLS
- [ ] Integrate WhatsApp notifications for maturity warnings
- [ ] Live MCX/IBJA gold rate feed
- [ ] BIS HUID hallmarking API integration
- [ ] Razorpay Dynamic QR payment support
- [ ] DPDP Act compliance with field-level encryption
- [ ] Full REST API with OpenAPI documentation

## Documentation

See `workflows/` directory for:
- `architecture_audit.md` — Full technical audit of legacy VB.NET system
- `architecture_document.md` — Cloud architecture and schema design
- `enhancements.md` — Feature rebuild and new enhancement specifications
- `rfp.md` — Full project scope and requirements

## License

Proprietary — Kumudu Software Solutions
