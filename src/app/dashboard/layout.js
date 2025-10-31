import Navbar from '@/components/Navbar'

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '2rem' }}>
        {children}
      </main>
    </div>
  )
}