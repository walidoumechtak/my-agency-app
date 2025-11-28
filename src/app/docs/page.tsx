"use client"

export default function SystemDesign() {
  return (
    <div className="w-full bg-background p-8 overflow-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">AgencyHub System Design</h1>
        <p className="text-muted-foreground mb-12">Architecture Overview & Data Flow</p>

        {/* User Flow Diagram */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">1. User Flow Diagram</h2>
          <div className="bg-card border border-border rounded-lg p-8">
            <svg viewBox="0 0 1000 900" className="w-full" style={{ minHeight: "900px" }}>
              {/* Define arrow markers */}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="var(--foreground)" />
                </marker>
                <marker id="arrowhead-accent" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="var(--accent)" />
                </marker>
              </defs>

              {/* Landing Page - Now the starting point */}
              <rect
                x="350"
                y="40"
                width="300"
                height="60"
                fill="#3b82f6"
                stroke="var(--foreground)"
                strokeWidth="2"
                rx="8"
              />
              <text x="500" y="75" textAnchor="middle" fill="white" className="font-bold" fontSize="16">
                Landing Page
              </text>

              {/* Arrow down */}
              <path d="M 500 100 L 500 160" stroke="var(--foreground)" strokeWidth="2" markerEnd="url(#arrowhead)" />

              {/* Decision: Sign In or Sign Up */}
              <polygon
                points="500,160 650,230 500,300 350,230"
                fill="#e0e7ff"
                stroke="var(--foreground)"
                strokeWidth="2"
              />
              <text x="500" y="235" textAnchor="middle" fill="var(--foreground)" className="font-bold" fontSize="14">
                Sign In or
              </text>
              <text x="500" y="255" textAnchor="middle" fill="var(--foreground)" className="font-bold" fontSize="14">
                Sign Up?
              </text>

              {/* Left Arrow - Sign In */}
              <path d="M 350 230 L 200 230" stroke="var(--foreground)" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <text x="270" y="220" fontSize="12" fill="var(--muted-foreground)" textAnchor="middle">
                Sign In
              </text>

              {/* Right Arrow - Sign Up */}
              <path d="M 650 230 L 800 230" stroke="var(--foreground)" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <text x="730" y="220" fontSize="12" fill="var(--muted-foreground)" textAnchor="middle">
                Sign Up
              </text>

              {/* Sign In Box (Left) */}
              <rect
                x="50"
                y="200"
                width="150"
                height="60"
                fill="#3b82f6"
                stroke="var(--foreground)"
                strokeWidth="2"
                rx="8"
              />
              <text x="125" y="235" textAnchor="middle" fill="white" className="font-bold" fontSize="12">
                Clerk Login
              </text>

              {/* Sign Up Box (Right) */}
              <rect
                x="800"
                y="200"
                width="150"
                height="60"
                fill="#3b82f6"
                stroke="var(--foreground)"
                strokeWidth="2"
                rx="8"
              />
              <text x="875" y="235" textAnchor="middle" fill="white" className="font-bold" fontSize="12">
                Clerk Registration
              </text>

              {/* Arrows down from both */}
              <path d="M 125 260 L 125 320" stroke="var(--foreground)" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <path d="M 875 260 L 875 320" stroke="var(--foreground)" strokeWidth="2" markerEnd="url(#arrowhead)" />

              {/* Authentication Successful - Merge point */}
              <path
                d="M 125 320 L 500 380 M 875 320 L 500 380"
                stroke="var(--foreground)"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />

              {/* Authentication Success Box */}
              <rect
                x="350"
                y="380"
                width="300"
                height="60"
                fill="#f97316"
                stroke="var(--foreground)"
                strokeWidth="2"
                rx="30"
              />
              <text x="500" y="415" textAnchor="middle" fill="white" className="font-bold" fontSize="16">
                Authentication Successful
              </text>

              {/* Arrow down to Dashboard */}
              <path d="M 500 440 L 500 500" stroke="var(--foreground)" strokeWidth="2" markerEnd="url(#arrowhead)" />

              {/* Dashboard Redirect */}
              <rect
                x="350"
                y="500"
                width="300"
                height="60"
                fill="#3b82f6"
                stroke="var(--foreground)"
                strokeWidth="2"
                rx="8"
              />
              <text x="500" y="535" textAnchor="middle" fill="white" className="font-bold" fontSize="16">
                Redirect to Dashboard
              </text>

              {/* Arrow down to Dashboard Menu */}
              <path d="M 500 560 L 500 620" stroke="var(--foreground)" strokeWidth="2" markerEnd="url(#arrowhead)" />

              {/* Decision: Choose Section */}
              <polygon
                points="500,620 650,690 500,760 350,690"
                fill="#e0e7ff"
                stroke="var(--foreground)"
                strokeWidth="2"
              />
              <text x="500" y="695" textAnchor="middle" fill="var(--foreground)" className="font-bold" fontSize="14">
                View Agencies
              </text>
              <text x="500" y="715" textAnchor="middle" fill="var(--foreground)" className="font-bold" fontSize="12">
                or Contacts?
              </text>

              {/* Left branch - Agencies */}
              <path d="M 350 690 L 200 690" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arrowhead-accent)" />
              <text x="270" y="680" fontSize="12" fill="var(--muted-foreground)" textAnchor="middle">
                Agencies
              </text>

              {/* Right branch - Contacts */}
              <path d="M 650 690 L 800 690" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arrowhead-accent)" />
              <text x="730" y="680" fontSize="12" fill="var(--muted-foreground)" textAnchor="middle">
                Contacts
              </text>
            </svg>
          </div>
        </section>

        {/* Authentication Flow */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">2. Authentication Flow</h2>
          <div className="bg-card border border-border rounded-lg p-8">
            <svg viewBox="0 0 1000 200" className="w-full" style={{ minHeight: "200px" }}>
              {/* Landing Page */}
              <rect
                x="50"
                y="50"
                width="150"
                height="80"
                fill="var(--primary)"
                stroke="var(--foreground)"
                strokeWidth="2"
                rx="8"
              />
              <text x="125" y="95" textAnchor="middle" fill="var(--primary-foreground)" className="font-bold">
                Landing Page
              </text>

              {/* Clerk Auth */}
              <rect
                x="280"
                y="50"
                width="150"
                height="80"
                fill="var(--primary)"
                stroke="var(--foreground)"
                strokeWidth="2"
                rx="8"
              />
              <text x="355" y="95" textAnchor="middle" fill="var(--primary-foreground)" className="font-bold">
                Clerk Auth
              </text>

              {/* Arrow 1 */}
              <path d="M 200 90 L 280 90" stroke="var(--foreground)" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <text x="240" y="80" fontSize="12" fill="var(--muted-foreground)">
                Sign In/Up
              </text>

              {/* Dashboard */}
              <rect
                x="510"
                y="50"
                width="150"
                height="80"
                fill="var(--primary)"
                stroke="var(--foreground)"
                strokeWidth="2"
                rx="8"
              />
              <text x="585" y="95" textAnchor="middle" fill="var(--primary-foreground)" className="font-bold">
                Dashboard
              </text>

              {/* Arrow 2 */}
              <path d="M 430 90 L 510 90" stroke="var(--foreground)" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <text x="465" y="80" fontSize="12" fill="var(--muted-foreground)">
                Redirect to
              </text>
              <text x="465" y="95" fontSize="12" fill="var(--muted-foreground)">
                /dashboard/agencies
              </text>

              {/* defs */}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="var(--foreground)" />
                </marker>
              </defs>
            </svg>
          </div>
        </section>

        {/* Data Models */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">3. Data Models & Relationships</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Agency Model */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-primary">Agency Model</h3>
              <div className="space-y-2 font-mono text-sm">
                <div>id: String (PK)</div>
                <div>name: String</div>
                <div>state: String</div>
                <div>state_code: String</div>
                <div>type: String</div>
                <div>population: Int</div>
                <div>website: String</div>
                <div>county: String</div>
                <div>created_at: DateTime</div>
                <div>updated_at: DateTime</div>
                <div className="text-primary pt-2">contacts: Contact[]</div>
              </div>
            </div>

            {/* Contact Model */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-primary">Contact Model</h3>
              <div className="space-y-2 font-mono text-sm">
                <div>id: String (PK)</div>
                <div>first_name: String</div>
                <div>last_name: String</div>
                <div>email: String</div>
                <div>phone: String</div>
                <div>title: String</div>
                <div>email_type: String</div>
                <div>department: String</div>
                <div>created_at: DateTime</div>
                <div>updated_at: DateTime</div>
                <div className="text-primary pt-2">agency_id: String (FK)</div>
              </div>
            </div>
          </div>

          {/* Relationship */}
          <div className="mt-6 bg-card border border-border rounded-lg p-6">
            <h3 className="font-bold mb-3">Relationship</h3>
            <p className="text-muted-foreground">One Agency has Many Contacts (1:N relationship)</p>
            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="text-center">
                <div className="bg-primary/10 border border-primary rounded px-4 py-2 font-bold">Agency</div>
                <div className="text-sm text-muted-foreground mt-2">1</div>
              </div>
              <div className="flex-1 border-t-2 border-primary"></div>
              <div className="text-sm text-muted-foreground">has many</div>
              <div className="flex-1 border-t-2 border-primary"></div>
              <div className="text-center">
                <div className="bg-primary/10 border border-primary rounded px-4 py-2 font-bold">Contact</div>
                <div className="text-sm text-muted-foreground mt-2">N</div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Structure */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">4. Application Structure</h2>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 border border-primary rounded px-3 py-1 text-sm font-mono">app/</div>
                <div className="flex-1">
                  <div className="space-y-2 text-sm">
                    <div className="ml-4">page.tsx - Landing Page (Public)</div>
                    <div className="ml-4">layout.tsx - Root Layout with Clerk Provider</div>
                    <div className="ml-4">globals.css - Design System & Tailwind Config</div>
                    <div className="ml-8">dashboard/</div>
                    <div className="ml-12">layout.tsx - Fixed Sidebar + Main Content</div>
                    <div className="ml-12">agencies/</div>
                    <div className="ml-16">page.tsx - Agencies Table with Search</div>
                    <div className="ml-12">contacts/</div>
                    <div className="ml-16">page.tsx - Contacts Table with Infinite Scroll & Search</div>
                    <div className="ml-4">api/</div>
                    <div className="ml-8">contacts.ts - Fetch Contacts with Daily Limit (50)</div>
                    <div className="ml-8">agencies.ts - Fetch Agencies</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features & Constraints */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">5. Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-4 text-primary">Agencies Page</h3>
              <ul className="space-y-2 text-sm">
                <li>✓ Display all agencies with detailed info</li>
                <li>✓ Search by agency name (real-time)</li>
                <li>✓ Fixed height scrollable table</li>
                <li>✓ Responsive design</li>
                <li>✓ Direct database queries</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-4 text-primary">Contacts Page</h3>
              <ul className="space-y-2 text-sm">
                <li>✓ Infinite scroll pagination (10 per load)</li>
                <li>✓ Daily limit: 50 contacts</li>
                <li>✓ Search by first/last name (real-time)</li>
                <li>✓ Fixed header with search input</li>
                <li>✓ Upgrade prompt at 50 contacts</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-4 text-primary">Authentication</h3>
              <ul className="space-y-2 text-sm">
                <li>✓ Clerk.com integration</li>
                <li>✓ Email/Password authentication</li>
                <li>✓ Protected routes on dashboard</li>
                <li>✓ Automatic redirect after auth</li>
                <li>✓ User session management</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-4 text-primary">UI/UX</h3>
              <ul className="space-y-2 text-sm">
                <li>✓ Fixed sidebar navigation</li>
                <li>✓ Responsive design (mobile/desktop)</li>
                <li>✓ Modern design system (shadcn/ui)</li>
                <li>✓ Dark mode support</li>
                <li>✓ Loading states & empty states</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Data Flow Diagram */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">6. Contact Data Flow</h2>
          <div className="bg-card border border-border rounded-lg p-8">
            <svg viewBox="0 0 1000 300" className="w-full" style={{ minHeight: "300px" }}>
              {/* User */}
              <circle cx="100" cy="50" r="40" fill="var(--primary)" stroke="var(--foreground)" strokeWidth="2" />
              <text x="100" y="55" textAnchor="middle" fill="var(--primary-foreground)" className="font-bold">
                User
              </text>

              {/* Scroll to load */}
              <path d="M 140 50 L 200 50" stroke="var(--foreground)" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <text x="165" y="40" fontSize="12" fill="var(--muted-foreground)" textAnchor="middle">
                Scroll
              </text>

              {/* Frontend */}
              <rect
                x="200"
                y="20"
                width="140"
                height="60"
                fill="var(--primary)"
                stroke="var(--foreground)"
                strokeWidth="2"
                rx="8"
              />
              <text x="270" y="55" textAnchor="middle" fill="var(--primary-foreground)" className="font-bold">
                Frontend
              </text>
              <text x="270" y="72" textAnchor="middle" fill="var(--primary-foreground)" fontSize="10">
                (Contacts Page)
              </text>

              {/* API Call */}
              <path d="M 340 50 L 420 50" stroke="var(--foreground)" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <text x="375" y="40" fontSize="12" fill="var(--muted-foreground)" textAnchor="middle">
                fetch('/api/contacts')
              </text>

              {/* API Route */}
              <rect
                x="420"
                y="20"
                width="140"
                height="60"
                fill="var(--primary)"
                stroke="var(--foreground)"
                strokeWidth="2"
                rx="8"
              />
              <text x="490" y="55" textAnchor="middle" fill="var(--primary-foreground)" className="font-bold">
                API Route
              </text>
              <text x="490" y="72" textAnchor="middle" fill="var(--primary-foreground)" fontSize="10">
                /api/contacts
              </text>

              {/* Database Query */}
              <path d="M 560 50 L 640 50" stroke="var(--foreground)" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <text x="600" y="40" fontSize="12" fill="var(--muted-foreground)" textAnchor="middle">
                Query
              </text>

              {/* Database */}
              <rect
                x="640"
                y="20"
                width="140"
                height="60"
                fill="var(--primary)"
                stroke="var(--foreground)"
                strokeWidth="2"
                rx="8"
              />
              <text x="710" y="55" textAnchor="middle" fill="var(--primary-foreground)" className="font-bold">
                Database
              </text>
              <text x="710" y="72" textAnchor="middle" fill="var(--primary-foreground)" fontSize="10">
                (Prisma)
              </text>

              {/* Response Back */}
              <path d="M 640 100 L 560 100" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arrowhead-accent)" />
              <text x="600" y="120" fontSize="12" fill="var(--muted-foreground)" textAnchor="middle">
                Contacts Data
              </text>

              <path d="M 420 100 L 340 100" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arrowhead-accent)" />
              <text x="375" y="120" fontSize="12" fill="var(--muted-foreground)" textAnchor="middle">
                JSON Response
              </text>

              <path d="M 200 100 L 140 100" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arrowhead-accent)" />
              <text x="165" y="120" fontSize="12" fill="var(--muted-foreground)" textAnchor="middle">
                Update State
              </text>

              {/* Limit Check */}
              <rect
                x="200"
                y="180"
                width="280"
                height="80"
                fill="var(--card)"
                stroke="var(--border)"
                strokeWidth="2"
                rx="8"
                strokeDasharray="5,5"
              />
              <text x="340" y="205" textAnchor="middle" fill="var(--foreground)" className="font-bold">
                Limit Logic
              </text>
              <text x="340" y="225" textAnchor="middle" fill="var(--muted-foreground)" fontSize="12">
                If total_contacts &lt; 50:
              </text>
              <text x="340" y="245" textAnchor="middle" fill="var(--muted-foreground)" fontSize="12">
                Load next 10 contacts
              </text>
              <text x="340" y="265" textAnchor="middle" fill="var(--muted-foreground)" fontSize="12">
                Else: Show upgrade message
              </text>

              {/* defs */}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="var(--foreground)" />
                </marker>
                <marker id="arrowhead-accent" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="var(--accent)" />
                </marker>
              </defs>
            </svg>
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <h2 className="text-2xl font-bold mb-6">7. Tech Stack</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-4 text-primary">Frontend</h3>
              <ul className="space-y-2 text-sm">
                <li>Next.js 16 (App Router)</li>
                <li>React 19</li>
                <li>TypeScript</li>
                <li>Tailwind CSS v4</li>
                <li>shadcn/ui</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-4 text-primary">Backend</h3>
              <ul className="space-y-2 text-sm">
                <li>Next.js API Routes</li>
                <li>Prisma ORM</li>
                <li>Server Components</li>
                <li>Server Actions</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-4 text-primary">Infrastructure</h3>
              <ul className="space-y-2 text-sm">
                <li>Clerk Authentication</li>
                <li>Prisma Database</li>
                <li>Vercel (Deployment)</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
