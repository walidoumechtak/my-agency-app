import { prisma } from "../../../lib/prisma"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin } from "lucide-react"
import { formatDate } from "../../../lib/utils"

export default async function AgenciesPage() {
  const agencies = await prisma.agency.findMany({
    orderBy: {
      created_at: "desc",
    },
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          {/* <div className="p-2 bg-primary/10 rounded-lg">
            <Building2 className="w-6 h-6 text-primary" />
          </div> */}
          <div>
            {/* <h1 className="text-3xl font-bold text-foreground">Agencies</h1> */}
            <p className="text-muted-foreground text-sm mt-1">Manage and view all agencies in your system</p>
          </div>
        </div>
      </div>

      {/* Table Card with Fixed Height and Internal Scroll */}
      <Card className="border border-border">
        {/* <CardHeader> */}
          {/* <div className="flex items-center justify-between">
            <div>
              <CardTitle>Agency Directory</CardTitle> 
              <CardDescription>
                {agencies.length} {agencies.length === 1 ? "agency" : "agencies"} total
              </CardDescription>
            </div>
          </div> */}
        {/* </CardHeader> */}
        <CardContent>
          {agencies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Building2 className="w-12 h-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground font-medium">No agencies found</p>
              <p className="text-sm text-muted-foreground mt-1">Create your first agency to get started</p>
            </div>
          ) : (
            <div className="h-[600px] overflow-y-auto border border-border rounded-lg">
              <Table>
                <TableHeader className="sticky top-0 bg-muted/50 z-10">
                  <TableRow className="border-b border-border hover:bg-transparent">
                    <TableHead className="px-4 py-3 font-semibold text-foreground w-24">ID</TableHead>
                    <TableHead className="px-4 py-3 font-semibold text-foreground w-32">Name</TableHead>
                    <TableHead className="px-4 py-3 font-semibold text-foreground w-28">State</TableHead>
                    <TableHead className="px-4 py-3 font-semibold text-foreground w-20">Code</TableHead>
                    <TableHead className="px-4 py-3 font-semibold text-foreground w-24">Type</TableHead>
                    <TableHead className="px-4 py-3 font-semibold text-foreground w-20">Population</TableHead>
                    <TableHead className="px-4 py-3 font-semibold text-foreground w-32">County</TableHead>
                    <TableHead className="px-4 py-3 font-semibold text-foreground w-48">Website</TableHead>
                    <TableHead className="px-4 py-3 font-semibold text-foreground w-28">Created</TableHead>
                    <TableHead className="px-4 py-3 font-semibold text-foreground w-28">Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agencies.map((agency) => (
                    <TableRow key={agency.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <TableCell className="px-4 py-3 text-xs text-muted-foreground font-mono">
                        {agency.id.slice(0, 8)}...
                      </TableCell>
                      <TableCell className="px-4 py-3 font-medium text-foreground">{agency.name || "—"}</TableCell>
                      <TableCell className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">{agency.state || "—"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <Badge variant="outline" className="text-xs">
                          {agency.state_code || "—"}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        {agency.type ? (
                          <Badge variant="secondary" className="text-xs">
                            {agency.type}
                          </Badge>
                        ) : (
                          <span className="text-sm text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-sm text-foreground">
                        {agency.population ? agency.population.toLocaleString() : "—"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-sm text-foreground">{agency.county || "—"}</TableCell>
                      <TableCell className="px-4 py-3 text-sm">
                        {agency.website ? (
                          <a
                            href={agency.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline truncate max-w-xs block"
                          >
                            {agency.website}
                          </a>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-xs text-muted-foreground">
                        {agency.created_at ? formatDate(agency.created_at) : "—"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-xs text-muted-foreground">
                        {agency.updated_at ? formatDate(agency.updated_at) : "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
