"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Search, Loader2 } from "lucide-react"
import { formatDate } from "../../../lib/utils"

export default function AgenciesPage() {
  const [agencies, setAgencies] = useState<Array<{ id: string; [key: string]: any }>>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
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
        setAgencies((prev) => {
          const existingIds = new Set(prev.map((a: any) => a.id))
          const newAgencies = (data.agencies || []).filter((a: any) => !existingIds.has(a.id))
          return [...prev, ...newAgencies]
        })
      }

      setHasMore(data.hasMore || false)
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

        setAgencies((prev) => {
          const existingIds = new Set(prev.map((a: any) => a.id))
          const newAgencies = (data.agencies || []).filter((a: any) => !existingIds.has(a.id))
          return [...prev, ...newAgencies]
        })
        setPage(nextPage)
        setHasMore(data.hasMore || false)
      } catch (error) {
        console.error("Failed to load more agencies:", error)
      } finally {
        setLoadingMore(false)
      }
    }
  }, [page, loadingMore, hasMore])

  const filteredAgencies = agencies.filter((agency) =>
    agency.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading agencies...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <p className="text-muted-foreground text-sm mt-1">Manage and view all agencies in your system</p>
      </div>

      {/* Table Card with Fixed Height and Internal Scroll */}
      <Card className="border border-border">
        <CardContent className="space-y-4">
          {/* Search Input */}
          <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 border border-border rounded-lg focus-within:border-primary focus-within:bg-background transition-colors w-full md:w-80">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search agencies by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Table */}
          {filteredAgencies.length === 0 && agencies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Building2 className="w-12 h-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground font-medium">No agencies found</p>
              <p className="text-sm text-muted-foreground mt-1">Create your first agency to get started</p>
            </div>
          ) : filteredAgencies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center border border-border rounded-lg bg-muted/30">
              <MapPin className="w-8 h-8 text-muted-foreground/50 mb-2" />
              <p className="text-muted-foreground font-medium text-sm">No agencies match "{searchQuery}"</p>
              <p className="text-xs text-muted-foreground mt-1">Try a different search term</p>
            </div>
          ) : (
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="h-96 overflow-y-auto border border-border rounded-lg"
            >
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-muted/50 z-10">
                    <TableRow className="border-b border-border hover:bg-transparent">
                      <TableHead className="px-4 py-3 font-semibold text-foreground w-32">Name</TableHead>
                      <TableHead className="px-4 py-3 font-semibold text-foreground w-28">State</TableHead>
                      <TableHead className="px-4 py-3 font-semibold text-foreground w-20">Code</TableHead>
                      <TableHead className="px-4 py-3 font-semibold text-foreground w-24">Type</TableHead>
                      <TableHead className="px-4 py-3 font-semibold text-foreground w-20">Population</TableHead>
                      <TableHead className="px-4 py-3 font-semibold text-foreground hidden md:table-cell w-32">
                        County
                      </TableHead>
                      <TableHead className="px-4 py-3 font-semibold text-foreground hidden lg:table-cell w-48">
                        Website
                      </TableHead>
                      <TableHead className="px-4 py-3 font-semibold text-foreground hidden lg:table-cell w-28">
                        Created
                      </TableHead>
                      <TableHead className="px-4 py-3 font-semibold text-foreground hidden lg:table-cell w-28">
                        Updated
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAgencies.map((agency) => (
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
                        <TableCell className="px-4 py-3 text-sm text-foreground hidden md:table-cell">
                          {agency.county || "—"}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-sm hidden lg:table-cell">
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
                        <TableCell className="px-4 py-3 text-xs text-muted-foreground hidden lg:table-cell">
                          {agency.created_at ? formatDate(agency.created_at) : "—"}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-xs text-muted-foreground hidden lg:table-cell">
                          {agency.updated_at ? formatDate(agency.updated_at) : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {loadingMore && (
                <div className="flex items-center justify-center py-3 md:py-4 border-t">
                  <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin text-primary" />
                  <span className="ml-2 text-xs md:text-sm text-muted-foreground">Loading more…</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}