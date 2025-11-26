"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Loader2 } from "lucide-react"
import { formatDate } from "../../../lib/utils"

export default function AgenciesPage() {
  const [agencies, setAgencies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadAgencies(1)
  }, [])

  const loadAgencies = async (pageNumber: number) => {
    try {
      const res = await fetch(`/api/agencies?page=${pageNumber}`)
      const data = await res.json()

      if (pageNumber === 1) {
        setAgencies(data.agencies || [])
      } else {
        setAgencies((prev) => [...prev, ...(data.agencies || [])])
      }

      setHasMore(data.hasMore)
      setLoading(false)
    } catch (error) {
      console.error("Failed to load agencies:", error)
      setLoading(false)
    }
  }

  const handleScroll = useCallback(async () => {
    if (!scrollRef.current || loadingMore || !hasMore) return

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    const nearBottom = scrollHeight - scrollTop - clientHeight < 80

    if (nearBottom) {
      setLoadingMore(true)
      const nextPage = page + 1

      try {
        const res = await fetch(`/api/agencies?page=${nextPage}`)
        const data = await res.json()

        setAgencies((prev) => [...prev, ...(data.agencies || [])])
        setPage(nextPage)
        setHasMore(data.hasMore)
      } catch (error) {
        console.error("Failed to load more agencies:", error)
      } finally {
        setLoadingMore(false)
      }
    }
  }, [page, loadingMore, hasMore])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Loading agencies...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-muted-foreground text-sm mt-1">Manage and view all agencies in your system</p>
      </div>

      <Card className="border border-border">
        <CardContent>
          {agencies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Building2 className="w-12 h-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground font-medium">No agencies found</p>
              <p className="text-sm text-muted-foreground mt-1">Create your first agency to get started</p>
            </div>
          ) : (
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="h-96 overflow-y-auto border border-border rounded-lg"
            >
              <Table>
                <TableHeader className="sticky top-0 bg-muted/50 z-10">
                  <TableRow className="border-b border-border hover:bg-transparent">
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

              {loadingMore && (
                <div className="flex items-center justify-center py-4 border-t">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  <span className="ml-2 text-sm text-muted-foreground">Loading more…</span>
                </div>
              )}

              {!hasMore && agencies.length > 0 && (
                <div className="flex items-center justify-center py-4 border-t">
                  <p className="text-sm text-muted-foreground">No more agencies to load</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}