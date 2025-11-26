"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Users, Mail, Phone, AlertCircle, Loader2 } from "lucide-react"
import { formatDate } from "../../../lib/utils"

export default function ContactsPage() {
  const [contacts, setContacts] = useState<any[]>([])
  const [blocked, setBlocked] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const tableBodyRef = useRef<HTMLTableSectionElement>(null)

  useEffect(() => {
    loadContacts()
  }, [])

  const loadContacts = async () => {
    try {
      const res = await fetch("/api/contacts")
      const data = await res.json()

      if (data.upgradeNeeded) {
        setBlocked(true)
        setLoading(false)
        return
      }

      setContacts(data.contacts || [])
      setLoading(false)
    } catch (error) {
      console.error("Failed to load contacts:", error)
      setLoading(false)
    }
  }

  const handleScroll = useCallback(async () => {
    if (!scrollContainerRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100

    if (isNearBottom && !loadingMore && !blocked && contacts.length < 50) {
      setLoadingMore(true)
      try {
        const res = await fetch("/api/contacts")
        const data = await res.json()

        if (data.upgradeNeeded) {
          setBlocked(true)
        } else if (data.contacts) {
          setContacts((prev) => {
            const newContacts = [...prev, ...data.contacts]
            return newContacts.slice(0, 50)
          })
        }
      } catch (error) {
        console.error("Failed to load more contacts:", error)
      } finally {
        setLoadingMore(false)
      }
    }
  }, [contacts.length, loadingMore, blocked])

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
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Contacts</h1>
              <p className="text-muted-foreground text-sm mt-1">Manage and view all contacts in your system</p>
            </div>
          </div>
        </div>

        <Card className="border border-destructive bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Daily Limit Reached</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  You reached your daily limit of 50 contacts. Please upgrade to continue accessing more contacts.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 flex flex-col">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          {/* <div className="p-2 bg-primary/10 rounded-lg">
            <Users className="w-6 h-6 text-primary" />
          </div> */}
          {/* <div> */}
            {/* <h1 className="text-3xl font-bold text-foreground">Contacts</h1> */}
            <p className="text-muted-foreground text-sm mt-1">Manage and view all contacts in your system</p>
          {/* </div> */}
        </div>
      </div>

      {/* Table Card with Fixed Height and Internal Scroll */}
      <Card className="border border-border flex-1 flex flex-col overflow-hidden">
        {/* <CardHeader className="pb-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Contact Directory</CardTitle>
              <CardDescription>
                {contacts.length} {contacts.length === 1 ? "contact" : "contacts"}
                {blocked ? " - Daily limit reached" : ""}
              </CardDescription>
            </div>
          </div>
        </CardHeader> */}
        <CardContent className="flex-1 overflow-hidden flex flex-col">
          {contacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="w-12 h-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground font-medium">No contacts found</p>
              <p className="text-sm text-muted-foreground mt-1">Create your first contact to get started</p>
            </div>
          ) : (
            <>
              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto border border-border rounded-lg"
              >
                <Table>
                  <TableHeader className="sticky top-0 bg-muted/50 z-10">
                    <TableRow className="border-b border-border hover:bg-transparent">
                      <TableHead className="px-4 py-3 font-semibold text-foreground w-28">First Name</TableHead>
                      <TableHead className="px-4 py-3 font-semibold text-foreground w-28">Last Name</TableHead>
                      <TableHead className="px-4 py-3 font-semibold text-foreground w-32">Email</TableHead>
                      <TableHead className="px-4 py-3 font-semibold text-foreground w-24">Phone</TableHead>
                      <TableHead className="px-4 py-3 font-semibold text-foreground w-28">Title</TableHead>
                      <TableHead className="px-4 py-3 font-semibold text-foreground w-24">Email Type</TableHead>
                      <TableHead className="px-4 py-3 font-semibold text-foreground w-28">Department</TableHead>
                      <TableHead className="px-4 py-3 font-semibold text-foreground w-32">Agency</TableHead>
                      <TableHead className="px-4 py-3 font-semibold text-foreground w-28">Created</TableHead>
                      <TableHead className="px-4 py-3 font-semibold text-foreground w-28">Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody ref={tableBodyRef}>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <TableCell className="px-4 py-3 font-medium text-foreground">
                          {contact.first_name || "—"}
                        </TableCell>
                        <TableCell className="px-4 py-3 font-medium text-foreground">
                          {contact.last_name || "—"}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-sm">
                          {contact.email ? (
                            <a
                              href={`mailto:${contact.email}`}
                              className="text-primary hover:underline flex items-center gap-2"
                            >
                              <Mail className="w-4 h-4" />
                              {contact.email}
                            </a>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-sm">
                          {contact.phone ? (
                            <a
                              href={`tel:${contact.phone}`}
                              className="text-primary hover:underline flex items-center gap-2"
                            >
                              <Phone className="w-4 h-4" />
                              {contact.phone}
                            </a>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-sm text-foreground">{contact.title || "—"}</TableCell>
                        <TableCell className="px-4 py-3">
                          {contact.email_type ? (
                            <Badge variant="secondary" className="text-xs">
                              {contact.email_type}
                            </Badge>
                          ) : (
                            <span className="text-sm text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-sm text-foreground">{contact.department || "—"}</TableCell>
                        <TableCell className="px-4 py-3">
                          {contact.agency ? (
                            <Badge variant="outline" className="text-xs">
                              {contact.agency.name || "—"}
                            </Badge>
                          ) : (
                            <span className="text-sm text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-xs text-muted-foreground">
                          {contact.created_at ? formatDate(contact.created_at) : "—"}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-xs text-muted-foreground">
                          {contact.updated_at ? formatDate(contact.updated_at) : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {loadingMore && (
                <div className="flex items-center justify-center py-4 border-t border-border flex-shrink-0">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  <span className="ml-2 text-sm text-muted-foreground">Loading more contacts...</span>
                </div>
              )}

              {blocked && (
                <Card className="mt-4 border border-destructive bg-destructive/5 flex-shrink-0">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground">Daily Limit Reached</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          You reached your daily limit of 50 contacts. Please upgrade to continue accessing more
                          contacts.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}




// import { prisma } from "../../../lib/prisma"
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
// import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
// import { Users, Mail, Phone } from "lucide-react"
// import { formatDate } from "../../../lib/utils"

// export default async function ContactsPage() {
//   const contacts = await prisma.contact.findMany({
//     include: {
//       agency: true,
//     },
//     orderBy: {
//       created_at: "desc",
//     },
//   })

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div>
//         <div className="flex items-center gap-3 mb-2">
//           <div className="p-2 bg-primary/10 rounded-lg">
//             <Users className="w-6 h-6 text-primary" />
//           </div>
//           <div>
//             <h1 className="text-3xl font-bold text-foreground">Contacts</h1>
//             <p className="text-muted-foreground text-sm mt-1">Manage and view all contacts in your system</p>
//           </div>
//         </div>
//       </div>

//       {/* Table Card with Fixed Height and Internal Scroll */}
//       <Card className="border border-border">
//         <CardHeader className="pb-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <CardTitle>Contact Directory</CardTitle>
//               <CardDescription>
//                 {contacts.length} {contacts.length === 1 ? "contact" : "contacts"} total
//               </CardDescription>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           {contacts.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-12 text-center">
//               <Users className="w-12 h-12 text-muted-foreground/50 mb-4" />
//               <p className="text-muted-foreground font-medium">No contacts found</p>
//               <p className="text-sm text-muted-foreground mt-1">Create your first contact to get started</p>
//             </div>
//           ) : (
//             <div className="h-[600px] overflow-y-auto border border-border rounded-lg">
//               <Table>
//                 <TableHeader className="sticky top-0 bg-muted/50 z-10">
//                   <TableRow className="border-b border-border hover:bg-transparent">
//                     <TableHead className="px-4 py-3 font-semibold text-foreground w-28">First Name</TableHead>
//                     <TableHead className="px-4 py-3 font-semibold text-foreground w-28">Last Name</TableHead>
//                     <TableHead className="px-4 py-3 font-semibold text-foreground w-32">Email</TableHead>
//                     <TableHead className="px-4 py-3 font-semibold text-foreground w-24">Phone</TableHead>
//                     <TableHead className="px-4 py-3 font-semibold text-foreground w-28">Title</TableHead>
//                     <TableHead className="px-4 py-3 font-semibold text-foreground w-24">Email Type</TableHead>
//                     <TableHead className="px-4 py-3 font-semibold text-foreground w-28">Department</TableHead>
//                     <TableHead className="px-4 py-3 font-semibold text-foreground w-32">Agency</TableHead>
//                     <TableHead className="px-4 py-3 font-semibold text-foreground w-28">Created</TableHead>
//                     <TableHead className="px-4 py-3 font-semibold text-foreground w-28">Updated</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {contacts.map((contact) => (
//                     <TableRow key={contact.id} className="border-b border-border hover:bg-muted/30 transition-colors">
//                       <TableCell className="px-4 py-3 font-medium text-foreground">
//                         {contact.first_name || "—"}
//                       </TableCell>
//                       <TableCell className="px-4 py-3 font-medium text-foreground">
//                         {contact.last_name || "—"}
//                       </TableCell>
//                       <TableCell className="px-4 py-3 text-sm">
//                         {contact.email ? (
//                           <a
//                             href={`mailto:${contact.email}`}
//                             className="text-primary hover:underline flex items-center gap-2"
//                           >
//                             <Mail className="w-4 h-4" />
//                             {contact.email}
//                           </a>
//                         ) : (
//                           <span className="text-muted-foreground">—</span>
//                         )}
//                       </TableCell>
//                       <TableCell className="px-4 py-3 text-sm">
//                         {contact.phone ? (
//                           <a
//                             href={`tel:${contact.phone}`}
//                             className="text-primary hover:underline flex items-center gap-2"
//                           >
//                             <Phone className="w-4 h-4" />
//                             {contact.phone}
//                           </a>
//                         ) : (
//                           <span className="text-muted-foreground">—</span>
//                         )}
//                       </TableCell>
//                       <TableCell className="px-4 py-3 text-sm text-foreground">{contact.title || "—"}</TableCell>
//                       <TableCell className="px-4 py-3">
//                         {contact.email_type ? (
//                           <Badge variant="secondary" className="text-xs">
//                             {contact.email_type}
//                           </Badge>
//                         ) : (
//                           <span className="text-sm text-muted-foreground">—</span>
//                         )}
//                       </TableCell>
//                       <TableCell className="px-4 py-3 text-sm text-foreground">{contact.department || "—"}</TableCell>
//                       <TableCell className="px-4 py-3">
//                         {contact.agency ? (
//                           <Badge variant="outline" className="text-xs">
//                             {contact.agency.name || "—"}
//                           </Badge>
//                         ) : (
//                           <span className="text-sm text-muted-foreground">—</span>
//                         )}
//                       </TableCell>
//                       <TableCell className="px-4 py-3 text-xs text-muted-foreground">
//                         {contact.created_at ? formatDate(contact.created_at) : "—"}
//                       </TableCell>
//                       <TableCell className="px-4 py-3 text-xs text-muted-foreground">
//                         {contact.updated_at ? formatDate(contact.updated_at) : "—"}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }



