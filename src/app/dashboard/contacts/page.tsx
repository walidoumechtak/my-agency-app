'use client';
import { useEffect, useState } from 'react';

export default function ContactsPage() {
    const [contacts, setContacts] = useState<any[]>([]);
    const [blocked, setBlocked] = useState(false);

    useEffect(() => {
        fetch('/api/contacts')
            .then((r) => r.json())
            .then((data) => {
                if (data.upgradeNeeded) setBlocked(true);
                else setContacts(data.contacts || []);
            });
    }, []);

    if (blocked) return <div>You reached your daily limit (50). Please upgrade to continue.</div>;

    return (
        <div>
            <h1 className="text-xl font-semibold mb-4">Contacts</h1>
            <div className="overflow-auto">
                <table className="min-w-full border">
                    <thead>
                        <tr>
                            <th className="p-2">Name</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Phone</th>
                            <th className="p-2">Agency</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((c) => (
                            <tr key={c.id} className="border-t">
                                <td className="p-2">{c.name ?? '—'}</td>
                                <td className="p-2">{c.email ?? '—'}</td>
                                <td className="p-2">{c.phone ?? '—'}</td>
                                <td className="p-2">{c.agencyId ?? 'Unknown'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}