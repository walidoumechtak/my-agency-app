"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Users, Mail, Phone, AlertCircle, Loader2 } from "lucide-react"
import { formatDate } from "../../../lib/utils"

export default function ContactsPage() {
  const [contacts, setContacts] = useState<any[]>([])
  const [blocked, setBlocked] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Loading contacts...</p>
      </div>
    )
  }

  if (blocked && contacts.length === 0) {
    return (
      <div className="space-y-6">
        <Card className="border border-destructive bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <AlertCircle className="w-8 h-8 text-destructive" />
              <div>
                <h3 className="font-semibold">Daily Limit Reached</h3>
                <p className="text-sm text-muted-foreground mt-1">
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
    <div className="space-y-6">
      <p className="text-muted-foreground text-sm mt-1">
        Manage and view all contacts in your system
      </p>

      <Card className="border">
        <CardContent className="pt-0">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="h-96 overflow-y-auto border rounded-lg"
          >
            {contacts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Users className="w-12 h-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground font-medium">No contacts found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Create your first contact to get started
                </p>
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader className="sticky top-0 bg-muted/50 z-10">
                    <TableRow className="border-b hover:bg-transparent">
                      <TableHead className="px-4 py-3 w-28">First Name</TableHead>
                      <TableHead className="px-4 py-3 w-28">Last Name</TableHead>
                      <TableHead className="px-4 py-3 w-32">Email</TableHead>
                      <TableHead className="px-4 py-3 w-24">Phone</TableHead>
                      <TableHead className="px-4 py-3 w-28">Title</TableHead>
                      <TableHead className="px-4 py-3 w-24">Email Type</TableHead>
                      <TableHead className="px-4 py-3 w-28">Department</TableHead>
                      <TableHead className="px-4 py-3 w-32">Agency</TableHead>
                      <TableHead className="px-4 py-3 w-28">Created</TableHead>
                      <TableHead className="px-4 py-3 w-28">Updated</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {contacts.map((c) => (
                      <TableRow
                        key={c.id}
                        className="border-b hover:bg-muted/30 transition"
                      >
                        <TableCell className="px-4 py-3 font-medium">
                          {c.first_name || "—"}
                        </TableCell>
                        <TableCell className="px-4 py-3 font-medium">
                          {c.last_name || "—"}
                        </TableCell>

                        <TableCell className="px-4 py-3 text-sm">
                          {c.email ? (
                            <a className="flex items-center gap-2 text-primary" href={`mailto:${c.email}`}>
                              <Mail className="w-4 h-4" /> {c.email}
                            </a>
                          ) : (
                            "—"
                          )}
                        </TableCell>

                        <TableCell className="px-4 py-3 text-sm">
                          {c.phone ? (
                            <a className="flex items-center gap-2 text-primary" href={`tel:${c.phone}`}>
                              <Phone className="w-4 h-4" /> {c.phone}
                            </a>
                          ) : (
                            "—"
                          )}
                        </TableCell>

                        <TableCell className="px-4 py-3 text-sm">{c.title || "—"}</TableCell>

                        <TableCell className="px-4 py-3">
                          {c.email_type ? (
                            <Badge variant="secondary" className="text-xs">{c.email_type}</Badge>
                          ) : (
                            "—"
                          )}
                        </TableCell>

                        <TableCell className="px-4 py-3 text-sm">{c.department || "—"}</TableCell>

                        <TableCell className="px-4 py-3">
                          {c.agency ? (
                            <Badge variant="outline" className="text-xs">{c.agency.name}</Badge>
                          ) : (
                            "—"
                          )}
                        </TableCell>

                        <TableCell className="px-4 py-3 text-xs text-muted-foreground">
                          {c.created_at ? formatDate(c.created_at) : "—"}
                        </TableCell>

                        <TableCell className="px-4 py-3 text-xs text-muted-foreground">
                          {c.updated_at ? formatDate(c.updated_at) : "—"}
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

                {blocked && (
                  <div className="p-4 border-t bg-destructive/10 flex gap-3 items-center">
                    <AlertCircle className="w-6 h-6 text-destructive" />
                    <p className="text-sm text-destructive">
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