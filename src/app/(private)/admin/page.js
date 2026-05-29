import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">
            Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/private/admin/sessions/create" className="bg-blue-500 text-white px-4 py-2 rounded">
               Create Sessions
            </Link>
            <Link href="/private/admin/events/create" className="bg-green-500 text-white px-4 py-2 rounded">
                Create Events
            </Link>
            <Link href="/private/admin/rooms/create" className="bg-purple-500 text-white px-4 py-2 rounded">
                Create Rooms
            </Link>
        </div>
    </div>
  );
}