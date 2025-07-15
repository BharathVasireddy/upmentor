import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 dark:bg-neutral-900">
      <Header variant="simple" />

      {/* Main Content - Centered Form */}
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-xl border border-neutral-200 bg-white p-8 shadow-soft dark:border-neutral-700 dark:bg-neutral-800">
            {children}
          </div>
        </div>
      </main>

      <Footer variant="simple" />
    </div>
  )
}
