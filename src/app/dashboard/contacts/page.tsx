"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Users, Mail, Phone, AlertCircle, Loader2, Search } from "lucide-react"
import { formatDate } from "../../../lib/utils"

export default function ContactsPage() {
  const [contacts, setContacts] = useState<any[]>([])
  const [blocked, setBlocked] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadContacts(1)
  }, [])

  const loadContacts = async (pageNumber: number) => {
    try {
      const res = await fetch(`/api/contacts?page=${pageNumber}`)
      const data = await res.json()

      if (data.upgradeNeeded) {
        setBlocked(true)
        setLoading(false)
        return
      }

      if (pageNumber === 1) {
        setContacts(data.contacts || [])
      } else {
        setContacts((prev) => [...prev, ...(data.contacts || [])])
      }

      setLoading(false)
    } catch (error) {
      console.error("Failed to load contacts:", error)
      setLoading(false)
    }
  }

  const handleScroll = useCallback(async () => {
    if (!scrollRef.current || blocked || loadingMore) return

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    const nearBottom = scrollHeight - scrollTop - clientHeight < 80

    if (nearBottom) {
      setLoadingMore(true)
      const nextPage = page + 1

      try {
        const res = await fetch(`/api/contacts?page=${nextPage}`)
        const data = await res.json()

        if (data.upgradeNeeded) {
          setBlocked(true)
        } else {
          setContacts((prev) => [...prev, ...(data.contacts || [])])
          setPage(nextPage)
        }
      } catch (error) {
        console.error("Failed to load more contacts:", error)
      } finally {
        setLoadingMore(false)
      }
    }
  }, [page, blocked, loadingMore])

  const filteredContacts = contacts.filter((contact) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    const firstName = (contact.first_name || "").toLowerCase()
    const lastName = (contact.last_name || "").toLowerCase()
    return firstName.includes(query) || lastName.includes(query)
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading contacts...</p>
      </div>
    )
  }

  if (blocked && contacts.length === 0) {
    return (
      <div className="space-y-4 md:space-y-6">
        <Card className="border border-destructive bg-destructive/5">
          <CardContent className="p-4 md:pt-6">
            <div className="flex items-start gap-3 md:gap-4">
              <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm md:text-base">Daily Limit Reached</h3>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">
                  You reached the daily limit of 50 contacts. Upgrade to access more.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <p className="text-muted-foreground text-xs md:text-sm mt-1">
        Manage and view all contacts in your system
      </p>

      <Card className="border">
        <CardContent className="space-y-4">
            {/* Search Input */}
          <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 border border-border rounded-lg focus-within:border-primary focus-within:bg-background transition-colors w-full md:w-80">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search contacts by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>
          
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="h-64 md:h-96 overflow-y-auto border rounded-lg"
          >
            {filteredContacts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 md:py-12 text-center">
                <Users className="w-10 h-10 md:w-12 md:h-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground font-medium text-sm md:text-base">
                  {contacts.length === 0 ? "No contacts found" : "No matching contacts"}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">
                  {contacts.length === 0 
                    ? "Create your first contact to get started"
                    : "Try a different search term"}
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="sticky top-0 bg-muted/50 z-10">
                      <TableRow className="border-b hover:bg-transparent">
                        <TableHead className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-semibold w-20 md:w-28">
                          First Name
                        </TableHead>
                        <TableHead className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-semibold w-20 md:w-28">
                          Last Name
                        </TableHead>
                        <TableHead className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-semibold w-24 md:w-32 hidden sm:table-cell">
                          Email
                        </TableHead>
                        <TableHead className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-semibold w-20 md:w-24 hidden md:table-cell">
                          Phone
                        </TableHead>
                        <TableHead className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-semibold w-20 md:w-28 hidden lg:table-cell">
                          Title
                        </TableHead>
                        <TableHead className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-semibold w-20 md:w-24 hidden sm:table-cell">
                          Email Type
                        </TableHead>
                        <TableHead className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-semibold w-20 md:w-28 hidden lg:table-cell">
                          Department
                        </TableHead>
                        <TableHead className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-semibold w-20 md:w-32 hidden md:table-cell">
                          Agency
                        </TableHead>
                        <TableHead className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-semibold w-20 md:w-28 hidden lg:table-cell">
                          Created
                        </TableHead>
                        <TableHead className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-semibold w-20 md:w-28 hidden lg:table-cell">
                          Updated
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {filteredContacts.map((c) => (
                        <TableRow
                          key={c.id}
                          className="border-b hover:bg-muted/30 transition"
                        >
                          <TableCell className="px-2 md:px-4 py-2 md:py-3 font-medium text-xs md:text-sm">
                            {c.first_name || "—"}
                          </TableCell>
                          <TableCell className="px-2 md:px-4 py-2 md:py-3 font-medium text-xs md:text-sm">
                            {c.last_name || "—"}
                          </TableCell>

                          <TableCell className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm hidden sm:table-cell">
                            {c.email ? (
                              <a className="flex items-center gap-1 md:gap-2 text-primary hover:underline truncate" href={`mailto:${c.email}`}>
                                <Mail className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" /> 
                                <span className="truncate">{c.email}</span>
                              </a>
                            ) : (
                              "—"
                            )}
                          </TableCell>

                          <TableCell className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm hidden md:table-cell">
                            {c.phone ? (
                              <a className="flex items-center gap-1 md:gap-2 text-primary hover:underline" href={`tel:${c.phone}`}>
                                <Phone className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                                <span className="truncate">{c.phone}</span>
                              </a>
                            ) : (
                              "—"
                            )}
                          </TableCell>

                          <TableCell className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm hidden lg:table-cell">
                            {c.title || "—"}
                          </TableCell>

                          <TableCell className="px-2 md:px-4 py-2 md:py-3 hidden sm:table-cell">
                            {c.email_type ? (
                              <Badge variant="secondary" className="text-xs">{c.email_type}</Badge>
                            ) : (
                              "—"
                            )}
                          </TableCell>

                          <TableCell className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm hidden lg:table-cell">
                            {c.department || "—"}
                          </TableCell>

                          <TableCell className="px-2 md:px-4 py-2 md:py-3 hidden md:table-cell">
                            {c.agency ? (
                              <Badge variant="outline" className="text-xs">{c.agency.name}</Badge>
                            ) : (
                              "—"
                            )}
                          </TableCell>

                          <TableCell className="px-2 md:px-4 py-2 md:py-3 text-xs text-muted-foreground hidden lg:table-cell">
                            {c.created_at ? formatDate(c.created_at) : "—"}
                          </TableCell>

                          <TableCell className="px-2 md:px-4 py-2 md:py-3 text-xs text-muted-foreground hidden lg:table-cell">
                            {c.updated_at ? formatDate(c.updated_at) : "—"}
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

                {blocked && (
                  <div className="p-3 md:p-4 border-t bg-destructive/10 flex gap-2 md:gap-3 items-start">
                    <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-destructive flex-shrink-0 mt-0.5" />
                    <p className="text-xs md:text-sm text-destructive">
                      You have reached your daily limit of 50 contacts. Please upgrade your plan to view more.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}