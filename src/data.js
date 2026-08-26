export const stats = [
  { num: '99.6%', label: 'Crash‑free rate' },
  { num: '100K+', label: 'App downloads' },
  { num: '4+ yrs', label: 'Experience' },
  { num: '91.2', label: 'CEH certified score' },
]

export const languages = [
  { name: 'Bahasa Indonesia', level: 'Native' },
  { name: 'English', level: 'Intermediate' },
  { name: 'Japanese', level: 'Beginner' },
]

export const experience = [
  {
    icon: '₿',
    role: 'Founding Engineer (Frontend)',
    org: 'HATA Digital Sdn Bhd',
    meta: 'HATA Digital Sdn Bhd · Regulated digital asset exchange, Malaysia',
    dateRange: 'Aug 2023 — Present',
    bullets: [
      'Built the HATA mobile app from scratch for iOS & Android, including the initial frontend architecture and core systems.',
      'Shipped crypto wallets, transfers, staking, and Worldpay payment integration.',
      'Spearheaded Passkey (WebAuthn) authentication and a GoFeatureFlag‑powered feature flag system for instant, decoupled releases.',
      'Maintained a <strong>99.699% crash‑free rate</strong> via Sentry across 100k+ users, helping the app reach <strong>#55 in Malaysia Finance</strong>.',
      'Delivered HATA 1.0 under a strict deadline, then led the HATA 2.0 modular architecture with zero downtime.',
    ],
  },
  {
    icon: '🏆',
    role: 'Flutter Developer',
    org: 'CUiT Indonesia',
    meta: 'CUiT Indonesia · Employee advocacy platform',
    dateRange: 'Sep 2021 — May 2023',
    bullets: [
      'Owned the end‑to‑end mobile development lifecycle, acting as technical lead between engineering and C‑level stakeholders.',
      'Architected a proprietary gamified ranking system and a modular multi‑mission rewards framework, boosting session length & retention.',
      'Eliminated critical feed performance bottlenecks and re‑engineered infinite scroll as the platform scaled past 100k+ downloads.',
      'Led the Buzzco community platform integration for <strong>Bank Mandiri (IDX: BMRI)</strong>.',
    ],
  },
  {
    icon: '🏦',
    role: 'IT Development Switching',
    org: 'PT Rintis Sejahtera',
    meta: 'PT Rintis Sejahtera · National ATM switching institution',
    dateRange: 'Jun 2021 — Sep 2021',
    bullets: [
      'Built a message validator to parse ISO 8583 messages against QR payment standards.',
      'Monitored System Integration Testing (SIT) for the QR payment rollout across the ATM Prima network.',
      'Worked with ISO 8583 & Base24 programming for real‑time interbank transactions.',
    ],
  },
  {
    icon: '📡',
    role: 'Full‑stack Developer (Internship)',
    org: 'PT Gihon Telekomunikasi Indonesia',
    meta: 'PT Gihon Telekomunikasi Indonesia (IDX: GHON)',
    dateRange: 'Jul 2020 — Mar 2021',
    bullets: [
      'Digitized a mission‑critical tower site‑building process, taking it from paper workflows to a web app in under 6 months.',
      'Engineered automated lifecycle tracking for 60+ production sites, from survey to UAT.',
      'Ran field‑based UAT directly with on‑site teams to validate reliability under real operating conditions.',
    ],
  },
]

export const skillGroups = [
  {
    title: 'Languages',
    chips: ['Dart', 'Kotlin', 'Swift', 'Java', 'Go', 'Python', 'JavaScript/TS', 'C/C++', 'PHP', 'SQL', 'Bash'],
  },
  {
    title: 'Mobile & Frontend',
    chips: ['Flutter', 'Jetpack Compose', 'React', 'Riverpod', 'BLoC'],
  },
  {
    title: 'Backend & Data',
    chips: ['PostgreSQL', 'MySQL', 'MongoDB', 'REST', 'gRPC', 'ISO 8583', 'Base24'],
  },
  {
    title: 'DevOps, Tools & Practices',
    chips: ['Docker', 'CI/CD', 'GitHub Actions', 'Codemagic', 'Sentry', 'Swagger', 'Postman', 'Mockito', 'Figma', 'Localazy', 'Product Management'],
  },
]

export const achievements = [
  {
    emoji: '🚀',
    title: "Favorite SkyPreneur — Jury's Choice",
    meta: 'SkyStar Ventures Batch 8, 2021',
    body: 'Developed <strong>Dongkrak</strong>, a specialized Point of Sale (POS) system tailored for automotive workshops.',
  },
  {
    emoji: '🥉',
    title: '3rd Place — CSIC National Challenge',
    meta: 'Computer Science Innovation Challenge',
    body: 'Engineered <strong>NUSA</strong>, an interactive regional‑language learning app with real‑time chat to native speakers.',
  },
  {
    emoji: '🎓',
    title: 'Education & Certifications',
    meta: '',
    body:
      '<p><strong>Multimedia Nusantara University</strong> — BSc Computer Science, GPA 3.61/4.00</p>' +
      '<p><a  target="_blank" rel="noopener noreferrer" href="https://drive.google.com/drive/folders/19lOdZWO8WbOPr1s-QNTfVX3YvV7M0DDZ"><strong>Certified Ethical Hacker (CEH)</strong> — 91.2/100</a></p>' +
      '<p><a  target="_blank" rel="noopener noreferrer" href="https://drive.google.com/file/d/1OHg6F4vY8idCbTdfk7ARXH6rDq1iU4dS/view"><strong>TOEIC</strong> — 870/990</a></p>'
  },
]
