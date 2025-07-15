'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-br from-brand-50 to-brand-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 font-display text-4xl font-bold text-neutral-900 lg:text-5xl">
              Terms of Service
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-neutral-600">
              Please read these terms carefully before using our platform. By
              using UpMentor, you agree to these terms.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-neutral max-w-none space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-neutral-900">
                Acceptance of Terms
              </h2>
              <p className="text-neutral-700">
                By accessing and using UpMentor, you accept and agree to be
                bound by the terms and provision of this agreement. These terms
                apply to all users of the service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-900">
                Use of Service
              </h2>
              <p className="text-neutral-700">
                UpMentor provides a platform for connecting students with
                mentors. You agree to use the service only for lawful purposes
                and in accordance with these terms. You are responsible for
                maintaining the confidentiality of your account.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-900">
                User Responsibilities
              </h2>
              <p className="text-neutral-700">
                Users must provide accurate information, treat others with
                respect, and comply with all applicable laws. You are
                responsible for all activities that occur under your account.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-900">
                Payment Terms
              </h2>
              <p className="text-neutral-700">
                Payment for services is due at the time of booking. Refunds are
                provided according to our cancellation policy. All fees are
                non-transferable.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-900">
                Intellectual Property
              </h2>
              <p className="text-neutral-700">
                All content on UpMentor, including text, graphics, logos, and
                software, is the property of UpMentor or its licensors and is
                protected by copyright and other laws.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-900">
                Limitation of Liability
              </h2>
              <p className="text-neutral-700">
                UpMentor shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, including without
                limitation, loss of profits or revenues.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-900">
                Termination
              </h2>
              <p className="text-neutral-700">
                We may terminate or suspend your account at any time for conduct
                that we believe violates these terms or is harmful to other
                users or the service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-900">
                Changes to Terms
              </h2>
              <p className="text-neutral-700">
                We reserve the right to modify these terms at any time.
                Continued use of the service after changes constitutes
                acceptance of the new terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-900">
                Contact Information
              </h2>
              <p className="text-neutral-700">
                If you have any questions about these Terms of Service, please
                contact us at legal@upmentor.com.
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
