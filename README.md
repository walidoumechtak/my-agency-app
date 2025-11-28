# AgencyHub System Design Documentation

## Overview
AgencyHub is a modern B2B agency management platform that enables users to manage agencies and their associated contacts with real-time search and pagination features.

## Architecture

### User Flow
1. **Landing Page** → User visits landing.site
2. **Authentication** → Sign In/Sign Up via Clerk
3. **Dashboard** → Redirected to `/dashboard/agencies`
4. **Navigation** → Sidebar allows access to Agencies and Contacts pages

### Key Features

#### Agencies Page
- Display all agencies with complete information
- Real-time search by agency name
- Fixed-height scrollable table (600px)
- Responsive column layout
- Direct database queries

#### Contacts Page
- Infinite scroll pagination (10 contacts per load)
- Daily limit: 50 contacts
- Real-time search by first/last name
- Fixed header with search input
- Upgrade prompt when limit reached
- Sticky table header during scroll

## Data Models

### Agency
\`\`\`
id: String @id
name: String?
state: String?
state_code: String?
type: String?
population: Int?
website: String?
county: String?
created_at: DateTime?
updated_at: DateTime?
contacts: Contact[] (relation)
\`\`\`

### Contact
\`\`\`
id: String @id
first_name: String?
last_name: String?
email: String?
phone: String?
title: String?
email_type: String?
department: String?
agency_id: String? (foreign key)
agency: Agency? (relation)
created_at: DateTime?
updated_at: DateTime?
\`\`\`

### Relationships
- One Agency has many Contacts (1:N)
- Each Contact belongs to one Agency

## API Endpoints

### GET /api/contacts
Fetches contacts with pagination and daily limit enforcement.

**Query Parameters:**
- `page` - Pagination page number
- `limit` - Number of contacts per page (default: 10)

**Response:**
\`\`\`json
{
  "contacts": [...],
  "total": 50,
  "upgradeNeeded": false,
  "remaining": 25
}
\`\`\`

**Daily Limit Logic:**
- Maximum 50 contacts per day
- Returns `upgradeNeeded: true` when limit reached
- Shows upgrade message in UI

### GET /api/agencies
Fetches agencies with pagination. Requires authentication (Clerk). Returns agencies ordered by `created_at` descending.

Query Parameters:
- `page` - Pagination page number (integer, default: 1)

Behavior:
- Server-side page size is fixed at 10.
- Results are ordered by `created_at` (newest first).
- Returns 401 when the request is not authenticated.
- Returns 500 on server error.

Response:
```json
{
    "agencies": [ /* Array of agency objects */ ],
    "total": 123,        // total number of agencies in the database
    "page": 1,           // current page number
    "pageSize": 10,      // fixed page size
    "hasMore": true      // whether there are more pages
}
```

## Technology Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - Component library

### Backend
- **Next.js API Routes** - RESTful endpoints
- **Prisma ORM** - Database queries
- **Server Components** - Data fetching
- **Server Actions** - Form handling

### Infrastructure
- **Clerk** - Authentication & authorization
- **Prisma** - Database layer
- **Vercel** - Deployment & hosting

## Security

- **Authentication**: Clerk handles user authentication
- **Protected Routes**: Dashboard routes require authentication
- **Rate Limiting**: 50 contacts daily limit
- **SQL Injection Prevention**: Prisma parameterized queries

## Performance Considerations

1. **Pagination**: Contacts loaded in chunks (10 at a time) to reduce initial load
2. **Fixed Scroll**: Table scrolls internally, preventing page scroll jumps
3. **Real-time Search**: Client-side filtering for instant feedback
4. **Sticky Header**: Search input stays visible during scroll
5. **Lazy Loading**: Contacts loaded on-demand during scroll

## User Experience Flow

### First Time User
1. Land on public homepage
2. Click "Sign Up Free"
3. Complete Clerk authentication
4. Automatically redirected to `/dashboard/agencies`
5. View all agencies in table format
6. Can search by agency name

### Returning User
1. Land on homepage
2. Click "Sign In"
3. Complete Clerk authentication
4. Automatically redirected to `/dashboard/agencies`
5. Explore agencies and contacts

### Contacts Page Usage
1. Navigate to Contacts from sidebar
2. View initial 10 contacts
3. Search by name (real-time filtering)
4. Scroll down to load more (10 at a time)
5. Reach 50 contacts limit
6. See upgrade prompt
7. Option to upgrade for unlimited access

## Future Enhancements

- [ ] Bulk import/export functionality
- [ ] Advanced filtering and sorting
- [ ] Mobile app
