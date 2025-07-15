import Link from 'next/link'
import { Logo } from '@/components/ui/logo'

interface FooterProps {
  variant?: 'default' | 'simple'
}

export default function Footer({ variant = 'default' }: FooterProps) {
  if (variant === 'simple') {
    return (
      <footer className="border-t border-neutral-200 bg-white px-4 py-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-neutral-600 sm:flex-row">
            <div>© 2024 UpMentor. All rights reserved.</div>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="transition-colors hover:text-neutral-900"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="transition-colors hover:text-neutral-900"
              >
                Terms of Service
              </Link>
              <Link
                href="/help"
                className="transition-colors hover:text-neutral-900"
              >
                Help
              </Link>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo size="md" className="mb-4" />
            <p className="mb-4 max-w-md text-neutral-600">
              Connecting ambitious professionals with expert mentors to
              accelerate career growth and unlock potential.
            </p>
            <div className="text-sm text-neutral-500">
              © 2024 UpMentor. All rights reserved.
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-neutral-900">Platform</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link
                  href="/mentors"
                  className="transition-colors hover:text-neutral-900"
                >
                  Find Mentors
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="transition-colors hover:text-neutral-900"
                >
                  Become a Mentee
                </Link>
              </li>
              <li>
                <Link
                  href="/mentor-signup"
                  className="transition-colors hover:text-neutral-900"
                >
                  Become a Mentor
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="transition-colors hover:text-neutral-900"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-neutral-900">Support</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link
                  href="/help"
                  className="transition-colors hover:text-neutral-900"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-neutral-900"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-neutral-900"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-neutral-900"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
