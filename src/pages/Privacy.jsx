import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SECTIONS = [
  {
    title: 'Information We Collect',
    body: `When you visit olurabian.com, we may collect your name and email address if you sign up for our newsletter or submit a contact form. We also collect standard usage data through analytics tools — pages visited, time on site, device type — to understand how people use the site. We do not sell your data.`,
  },
  {
    title: 'How We Use Your Information',
    body: `Your email is used to send updates, content, and offers related to ARABA's work — courses, tools, and creative services. You can unsubscribe from any email at any time. Usage data is used to improve the website experience and content. We do not share your personal information with third parties except where required to deliver services (e.g., email platforms like Mailchimp or ConvertKit).`,
  },
  {
    title: 'Cookies',
    body: `This site uses cookies to remember your preferences and analyze traffic. By using this site, you consent to cookies. You can disable cookies in your browser settings, though some features may not work as expected.`,
  },
  {
    title: 'Third-Party Services',
    body: `We use tools such as Google Analytics, email marketing platforms, and payment processors. Each of these services has its own privacy policy. We encourage you to review them. We are not responsible for the data practices of third-party services.`,
  },
  {
    title: 'Data Retention',
    body: `We retain your information for as long as necessary to provide services or comply with legal obligations. You may request deletion of your data at any time by contacting us at thetimemethod@gmail.com.`,
  },
  {
    title: 'Your Rights',
    body: `You have the right to access, update, or delete your personal information. If you are in the EU or UK, you have rights under GDPR. If you are in California, you have rights under CCPA. To exercise any of these rights, contact us directly.`,
  },
  {
    title: 'Contact',
    body: `For any privacy-related questions, contact us at: araba@olurabian.com`,
  },
]

export default function Privacy() {
  return (
    <>
      <Navbar />
      <main style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="max-w-[760px] mx-auto px-6">

          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E8D832', marginBottom: '16px' }}>
            Legal
          </p>

          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#EDEAE3', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '16px' }}>
            Privacy Policy
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
