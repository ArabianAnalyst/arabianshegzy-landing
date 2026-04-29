import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SECTIONS = [
  {
    title: 'Acceptance of Terms',
    body: `By accessing or using olurabian.com, you agree to be bound by these Terms of Service. If you do not agree, please do not use this site.`,
  },
  {
    title: 'Services',
    body: `ARABA (operating as Olurabian) provides AI-powered creative services including web design, video production, content creation, and digital courses. Service terms, deliverables, timelines, and pricing for client projects are agreed upon separately in writing before work begins.`,
  },
  {
    title: 'Digital Products and Courses',
    body: `All digital products and courses sold through this site are non-refundable once access has been granted. If you experience a technical issue that prevents access, contact us within 7 days of purchase at araba@olurabian.com and we will resolve it. We reserve the right to update course content at any time.`,
  },
  {
    title: 'Client Work',
    body: `For agency engagements, a separate client agreement governs scope, payment, and intellectual property. Until full payment is received, all deliverables remain the property of ARABA. Upon receipt of final payment, ownership transfers to the client as specified in the project agreement.`,
  },
  {
    title: 'Intellectual Property',
    body: `All content on this website — including text, visuals, videos, and code — is owned by ARABA unless otherwise stated. You may not reproduce, distribute, or use any content from this site without explicit written permission.`,
  },
  {
    title: 'Limitation of Liability',
    body: `ARABA is not liable for any indirect, incidental, or consequential damages arising from the use of this website or any services provided. Our total liability to you for any claim is limited to the amount you paid for the relevant service.`,
  },
  {
    title: 'Governing Law',
    body: `These terms are governed by the laws of the Federal Republic of Nigeria. Any disputes will be resolved in the appropriate courts of Nigeria.`,
  },
  {
    title: 'Changes to These Terms',
    body: `We may update these terms at any time. Continued use of the site after changes are posted constitutes your acceptance of the revised terms.`,
  },
  {
    title: 'Contact',
    body: `For any questions about these terms, contact us at: araba@olurabian.com`,
  },
]

export default function Terms() {
  return (
    <>
      <Navbar />
      <main style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="max-w-[760px] mx-auto px-6">

          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E8D832', marginBottom: '16px' }}>
            Legal
          </p>

          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#EDEAE3', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '16px' }}>
            Terms of Service
          </h1>

          <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.85rem', color: '#555555', marginBottom: '64px' }}>
            Last updated: April 2026
          </p>

          <div style={{ width: '48px', height: '3px', background: '#E8D832', marginBottom: '64px' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {SECTIONS.map(({ title, body }) => (
              <div key={title}>
                <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '1.1rem', color: '#EDEAE3', letterSpacing: '-0.02em', marginBottom: '12px' }}>
                  {title}
                </h2>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1rem', color: '#888888', lineHeight: 1.75 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
