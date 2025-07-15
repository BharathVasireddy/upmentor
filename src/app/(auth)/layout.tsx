import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="simple" />

      {/* Main Content - Let individual pages handle their own styling */}
      <main className="flex-1">{children}</main>

      <Footer variant="simple" />
    </div>
  )
}
