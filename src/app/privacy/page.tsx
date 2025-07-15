'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-br from-brand-50 to-brand-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 font-display text-4xl font-bold text-neutral-900 lg:text-5xl">
              Privacy Policy
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-neutral-600">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your information.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-neutral max-w-none space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-neutral-900">
                Information We Collect
              </h2>
              <p className="text-neutral-700">
                We collect information you provide directly to us, such as when
                you create an account, book a session, or contact us for
                support. This includes your name, email address, phone number,
                and any other information you choose to provide.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-900">
                How We Use Your Information
              </h2>
              <p className="text-neutral-700">
                We use the information we collect to provide, maintain, and
                improve our services, process transactions, send you updates and
                promotional materials, and respond to your comments and
                questions.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-900">
                Information Sharing
              </h2>
              <p className="text-neutral-700">
                We do not sell, trade, or rent your personal information to
                third parties. We may share your information in certain limited
                circumstances, such as with your consent, to comply with legal
                obligations, or to protect our rights.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-900">
                Data Security
              </h2>
              <p className="text-neutral-700">
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-900">
                Your Rights
              </h2>
              <p className="text-neutral-700">
                You have the right to access, update, or delete your personal
                information. You may also opt out of receiving promotional
                communications from us at any time.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-900">
                Contact Us
              </h2>
              <p className="text-neutral-700">
                If you have any questions about this Privacy Policy, please
                contact us at privacy@upmentor.com.
              </p>
            </div>

            <div className="border-t border-neutral-200 pt-8">
              <p className="text-sm text-neutral-500">
                Last updated: January 2024
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
