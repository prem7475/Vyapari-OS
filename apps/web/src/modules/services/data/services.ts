export type ServiceCategory =
  | 'Registrations'
  | 'Licenses'
  | 'Brand'
  | 'Marketplace'
  | 'Banking'
  | 'Compliance';

export type ServiceFaq = {
  q: string;
  a: string;
};

export type ServiceProcessStep = {
  title: string;
  description: string;
  eta: string;
};

export type PricingPlan = {
  id: 'starter' | 'business' | 'priority';
  name: string;
  priceLabel: string;
  timelineLabel: string;
  supportLabel: string;
  bullets: string[];
  recommended?: boolean;
};

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  categories: ServiceCategory[];
  badges: string[];
  highlights: string[];
  timelines: {
    starter: string;
    business: string;
    priority: string;
  };
  requiredDocuments: { label: string; notes?: string }[];
  process: ServiceProcessStep[];
  pricing: PricingPlan[];
  faqs: ServiceFaq[];
};

export const serviceCategories: { key: ServiceCategory; label: string }[] = [
  { key: 'Registrations', label: 'Registrations' },
  { key: 'Licenses', label: 'Licenses' },
  { key: 'Brand', label: 'Brand' },
  { key: 'Marketplace', label: 'Marketplace' },
  { key: 'Banking', label: 'Banking' },
  { key: 'Compliance', label: 'Compliance' },
];

export const services: Service[] = [
  {
    slug: 'gst-registration',
    title: 'GST Registration',
    shortDescription: 'End-to-end GST registration with checklist-driven documents and clear status updates.',
    longDescription:
      'Get GST registration without back-and-forth. Vyapari OS guides you through eligibility, document collection, application filing, and tracking — with an operational timeline and secure document vault.',
    categories: ['Registrations', 'Compliance'],
    badges: ['Most Popular', 'Fast Turnaround', 'Invoice-ready'],
    highlights: [
      'Document checklist tailored to your business type',
      'Operational tracking with transparent next actions',
      'Professional filing with verification-first review',
    ],
    timelines: {
      starter: '5–7 business days',
      business: '3–5 business days',
      priority: '2–3 business days',
    },
    requiredDocuments: [
      { label: 'PAN (Proprietor/Partner/Director)', notes: 'Clear photo/scan required' },
      { label: 'Aadhaar (Proprietor/Partner/Director)', notes: 'Masked Aadhaar accepted for upload' },
      { label: 'Business address proof', notes: 'Electricity bill / rent agreement / NOC' },
      { label: 'Bank proof', notes: 'Cancelled cheque / bank statement (first page)' },
      { label: 'Photograph', notes: 'Passport size (digital)' },
    ],
    process: [
      { title: 'Eligibility & profile setup', description: 'Confirm business type, address, and signatory details.', eta: '15–30 mins' },
      { title: 'Document upload & verification', description: 'Upload required files; we validate clarity and completeness.', eta: 'Same day' },
      { title: 'Application filing', description: 'We file your GST application with accurate classification and details.', eta: '1–2 days' },
      { title: 'Follow-ups & updates', description: 'We handle clarification if required and keep you updated.', eta: '2–5 days' },
      { title: 'GSTIN issued', description: 'Receive GSTIN and confirmation with downloadable records.', eta: 'On approval' },
    ],
    pricing: [
      {
        id: 'starter',
        name: 'Starter',
        priceLabel: '₹1,499',
        timelineLabel: '5–7 business days',
        supportLabel: 'Standard support',
        bullets: ['Document checklist', 'Filing & tracking', 'Email updates', 'Basic verification'],
      },
      {
        id: 'business',
        name: 'Business',
        priceLabel: '₹2,499',
        timelineLabel: '3–5 business days',
        supportLabel: 'Priority chat',
        bullets: ['Everything in Starter', 'Faster turnaround', 'Priority support chat', 'Enhanced verification'],
        recommended: true,
      },
      {
        id: 'priority',
        name: 'Priority Processing',
        priceLabel: '₹3,999',
        timelineLabel: '2–3 business days',
        supportLabel: 'Dedicated ops manager',
        bullets: ['Everything in Business', 'Dedicated ops handling', 'Proactive follow-ups', 'Same-day reviews'],
      },
    ],
    faqs: [
      {
        q: 'Who needs GST registration?',
        a: 'Businesses crossing turnover thresholds, operating inter-state, selling on marketplaces, or under specific categories often require GST. We confirm eligibility based on your profile.',
      },
      {
        q: 'How do you keep documents secure?',
        a: 'Documents are stored in a structured vault with access controls and audit-friendly workflows. You upload once and reuse across services.',
      },
      {
        q: 'What if clarification is raised by the department?',
        a: 'We guide you through the response and handle follow-ups. You’ll see clear next actions inside the workflow timeline.',
      },
    ],
  },
  {
    slug: 'fssai-license',
    title: 'FSSAI License',
    shortDescription: 'Licensing workflow for food businesses with predictable timelines and document verification.',
    longDescription:
      'Whether you run a cloud kitchen, restaurant, packaged foods, or home-based food business — Vyapari OS provides a guided FSSAI license workflow with checklists, document review, and status tracking.',
    categories: ['Licenses', 'Compliance'],
    badges: ['Food Businesses', 'Checklist-driven', 'Ops Support'],
    highlights: [
      'Correct license selection (Basic/State/Central)',
      'Clear requirements for food businesses',
      'Operational timeline with review checkpoints',
    ],
    timelines: {
      starter: '7–10 business days',
      business: '5–7 business days',
      priority: '3–5 business days',
    },
    requiredDocuments: [
      { label: 'PAN & Aadhaar', notes: 'Owner/authorized signatory' },
      { label: 'Passport size photo', notes: 'Digital' },
      { label: 'Address proof', notes: 'Rent agreement / electricity bill / NOC' },
      { label: 'Kitchen/Unit photos', notes: 'For premises verification' },
      { label: 'Food safety plan (if applicable)', notes: 'We provide template guidance' },
    ],
    process: [
      { title: 'License type selection', description: 'We choose Basic/State/Central based on turnover and operations.', eta: '30 mins' },
      { title: 'Document checklist & upload', description: 'Upload documents; we validate for clarity and accuracy.', eta: 'Same day' },
      { title: 'Application drafting', description: 'We prepare the filing with correct details and declarations.', eta: '1–2 days' },
      { title: 'Submission & tracking', description: 'We submit and track progress with timeline updates.', eta: '3–7 days' },
      { title: 'License issued', description: 'Receive your FSSAI certificate and downloadable records.', eta: 'On approval' },
    ],
    pricing: [
      {
        id: 'starter',
        name: 'Starter',
        priceLabel: '₹1,999',
        timelineLabel: '7–10 business days',
        supportLabel: 'Standard support',
        bullets: ['License type selection', 'Document checklist', 'Filing & tracking', 'Email updates'],
      },
      {
        id: 'business',
        name: 'Business',
        priceLabel: '₹2,999',
        timelineLabel: '5–7 business days',
        supportLabel: 'Priority chat',
        bullets: ['Everything in Starter', 'Faster reviews', 'Priority support chat', 'Improved document checks'],
        recommended: true,
      },
      {
        id: 'priority',
        name: 'Priority Processing',
        priceLabel: '₹4,499',
        timelineLabel: '3–5 business days',
        supportLabel: 'Dedicated ops manager',
        bullets: ['Everything in Business', 'Dedicated ops handling', 'Proactive follow-ups', 'Same-day doc review'],
      },
    ],
    faqs: [
      { q: 'Which FSSAI license do I need?', a: 'It depends on turnover, location, and operations. We confirm the correct license type during onboarding.' },
      { q: 'Do I need FSSAI for home-based food businesses?', a: 'In many cases, yes. We’ll validate requirements and suggest the right path.' },
      { q: 'Can I track status updates?', a: 'Yes. You get a timeline view with clear updates and next actions.' },
    ],
  },
  {
    slug: 'trademark-registration',
    title: 'Trademark Registration',
    shortDescription: 'Protect your brand with a guided filing workflow and evidence-ready document vault.',
    longDescription:
      'Trademark registration can be intimidating. Vyapari OS makes it structured: class selection, filing preparation, evidence collection, and progress tracking — in a clean, operational workflow.',
    categories: ['Brand'],
    badges: ['Founder-ready', 'Class Selection', 'Evidence Vault'],
    highlights: [
      'Trademark class selection support',
      'Evidence-ready document vault',
      'Status tracking with timeline updates',
    ],
    timelines: {
      starter: '7–12 business days (filing)',
      business: '5–8 business days (filing)',
      priority: '3–5 business days (filing)',
    },
    requiredDocuments: [
      { label: 'Brand name/logo', notes: 'High-resolution logo (if applicable)' },
      { label: 'Applicant PAN', notes: 'Individual/Company/LLP' },
      { label: 'Address proof', notes: 'Applicant address proof' },
      { label: 'Usage proof (optional)', notes: 'Invoices, website screenshots, packaging photos' },
    ],
    process: [
      { title: 'Brand & class mapping', description: 'Identify correct trademark class and filing strategy.', eta: '30–60 mins' },
      { title: 'Document upload', description: 'Upload applicant documents and optional usage proof.', eta: 'Same day' },
      { title: 'Draft & approval', description: 'We prepare the draft and share a final review checkpoint.', eta: '1–2 days' },
      { title: 'Filing submission', description: 'We submit and provide acknowledgement and reference IDs.', eta: '1 day' },
      { title: 'Tracking & updates', description: 'Receive workflow updates as the application progresses.', eta: 'Ongoing' },
    ],
    pricing: [
      {
        id: 'starter',
        name: 'Starter',
        priceLabel: '₹2,499',
        timelineLabel: '7–12 business days (filing)',
        supportLabel: 'Standard support',
        bullets: ['Class selection guidance', 'Draft + filing', 'Acknowledgement & tracking', 'Email updates'],
      },
      {
        id: 'business',
        name: 'Business',
        priceLabel: '₹3,499',
        timelineLabel: '5–8 business days (filing)',
        supportLabel: 'Priority chat',
        bullets: ['Everything in Starter', 'Priority draft review', 'Evidence checklist', 'Priority support chat'],
        recommended: true,
      },
      {
        id: 'priority',
        name: 'Priority Processing',
        priceLabel: '₹4,999',
        timelineLabel: '3–5 business days (filing)',
        supportLabel: 'Dedicated ops manager',
        bullets: ['Everything in Business', 'Dedicated ops handling', 'Same-day review slots', 'Proactive follow-ups'],
      },
    ],
    faqs: [
      { q: 'Does trademark registration guarantee approval?', a: 'Approval depends on examination. We help file correctly and keep you updated through the workflow.' },
      { q: 'Can I register a logo and name together?', a: 'Yes. We’ll recommend the best filing strategy based on your brand assets.' },
      { q: 'What counts as usage proof?', a: 'Invoices, packaging, website screenshots, social presence, or any proof of use can help.' },
    ],
  },
  {
    slug: 'udyam-msme-registration',
    title: 'MSME / Udyam Registration',
    shortDescription: 'Get your Udyam certificate with guided inputs, verification checks, and clean records.',
    longDescription:
      'Udyam registration is one of the fastest ways to unlock MSME benefits. Vyapari OS provides a guided flow to collect accurate information, validate entries, and keep your records organized.',
    categories: ['Registrations'],
    badges: ['Quick Setup', 'MSME Benefits', 'Clean Records'],
    highlights: [
      'Guided form inputs to reduce errors',
      'Operational checklist and verification steps',
      'Downloadable certificate and record vault',
    ],
    timelines: {
      starter: '2–3 business days',
      business: '1–2 business days',
      priority: 'Same/Next day',
    },
    requiredDocuments: [
      { label: 'Aadhaar of proprietor/partner/director', notes: 'Masked Aadhaar accepted for upload' },
      { label: 'PAN of business/entity', notes: 'PAN mandatory' },
      { label: 'Business details', notes: 'NIC code, address, bank details' },
    ],
    process: [
      { title: 'Business profile setup', description: 'Confirm entity type and business details.', eta: '15–25 mins' },
      { title: 'Verification checks', description: 'Validate entries to avoid rejection or mismatch.', eta: 'Same day' },
      { title: 'Submission', description: 'We submit and share confirmation details.', eta: 'Same/Next day' },
      { title: 'Certificate issued', description: 'Receive your Udyam certificate and store it in the vault.', eta: 'On approval' },
    ],
    pricing: [
      {
        id: 'starter',
        name: 'Starter',
        priceLabel: '₹499',
        timelineLabel: '2–3 business days',
        supportLabel: 'Standard support',
        bullets: ['Guided inputs', 'Verification checks', 'Submission', 'Certificate vault'],
      },
      {
        id: 'business',
        name: 'Business',
        priceLabel: '₹799',
        timelineLabel: '1–2 business days',
        supportLabel: 'Priority chat',
        bullets: ['Everything in Starter', 'Faster processing', 'Priority support chat', 'Same-day review'],
        recommended: true,
      },
      {
        id: 'priority',
        name: 'Priority Processing',
        priceLabel: '₹1,199',
        timelineLabel: 'Same/Next day',
        supportLabel: 'Dedicated ops manager',
        bullets: ['Everything in Business', 'Dedicated ops handling', 'Proactive follow-ups', 'Priority submission'],
      },
    ],
    faqs: [
      { q: 'What are MSME benefits?', a: 'Benefits include easier credit access, subsidies in some schemes, and improved tender eligibility. We guide you based on your business.' },
      { q: 'Is Udyam registration mandatory?', a: 'Not mandatory for all, but helpful for many businesses. We’ll help you decide.' },
      { q: 'Can I update details later?', a: 'Yes. Your records remain accessible so updates are easier.' },
    ],
  },
  {
    slug: 'swiggy-zomato-onboarding',
    title: 'Swiggy / Zomato Onboarding',
    shortDescription: 'Operational onboarding support with checklists, document verification, and timeline tracking.',
    longDescription:
      'Get your outlet onboarded faster. Vyapari OS helps you collect and verify documents, complete platform requirements, and track progress with clear next actions and support.',
    categories: ['Marketplace', 'Compliance'],
    badges: ['Restaurant-ready', 'Checklist-driven', 'Fast Activation'],
    highlights: [
      'Outlet document checklist and verification',
      'Operational tracking for activation steps',
      'Support-led follow-ups and status visibility',
    ],
    timelines: {
      starter: '7–10 business days',
      business: '5–7 business days',
      priority: '3–5 business days',
    },
    requiredDocuments: [
      { label: 'FSSAI certificate', notes: 'Required for activation' },
      { label: 'GSTIN (if applicable)', notes: 'Depends on business' },
      { label: 'PAN & bank proof', notes: 'Cancelled cheque / bank statement' },
      { label: 'Outlet photos', notes: 'Kitchen/front photos as required' },
      { label: 'Menu/price list', notes: 'Digital menu recommended' },
    ],
    process: [
      { title: 'Outlet profile setup', description: 'Capture outlet details, menu type, and operational hours.', eta: '30–45 mins' },
      { title: 'Document upload & verification', description: 'We validate documents for clarity and completeness.', eta: 'Same day' },
      { title: 'Platform submission', description: 'We assist with portal submission and checklist alignment.', eta: '1–2 days' },
      { title: 'Activation tracking', description: 'Track approvals, changes, and next actions on a timeline.', eta: '3–7 days' },
      { title: 'Go live', description: 'Outlet activated and ready to accept orders.', eta: 'On approval' },
    ],
    pricing: [
      {
        id: 'starter',
        name: 'Starter',
        priceLabel: '₹2,999',
        timelineLabel: '7–10 business days',
        supportLabel: 'Standard support',
        bullets: ['Checklist + docs review', 'Submission guidance', 'Status tracking', 'Email updates'],
      },
      {
        id: 'business',
        name: 'Business',
        priceLabel: '₹3,999',
        timelineLabel: '5–7 business days',
        supportLabel: 'Priority chat',
        bullets: ['Everything in Starter', 'Faster activation support', 'Priority support chat', 'Proactive follow-ups'],
        recommended: true,
      },
      {
        id: 'priority',
        name: 'Priority Processing',
        priceLabel: '₹5,999',
        timelineLabel: '3–5 business days',
        supportLabel: 'Dedicated ops manager',
        bullets: ['Everything in Business', 'Dedicated ops handling', 'Same-day reviews', 'Activation escalations'],
      },
    ],
    faqs: [
      { q: 'Do I need FSSAI before onboarding?', a: 'In most cases, yes. If you don’t have it yet, we can help you get FSSAI first.' },
      { q: 'Can you help with menu readiness?', a: 'We provide checklist guidance and can help structure the menu information required for onboarding.' },
      { q: 'How do I track progress?', a: 'Your onboarding workflow includes a timeline with clear next steps and updates.' },
    ],
  },
  {
    slug: 'business-bank-account-setup',
    title: 'Business Bank Account Setup',
    shortDescription: 'Open a business bank account with guided document readiness and operational support.',
    longDescription:
      'A clean banking setup improves compliance and payments. Vyapari OS helps you prepare documents, verify them, and complete bank onboarding steps with a clear, tracked workflow.',
    categories: ['Banking'],
    badges: ['KYC-ready', 'Document Vault', 'Operational Support'],
    highlights: [
      'KYC checklist and verification checks',
      'Reusable vault for business documents',
      'Workflow-based onboarding and tracking',
    ],
    timelines: {
      starter: '5–8 business days',
      business: '3–5 business days',
      priority: '2–3 business days',
    },
    requiredDocuments: [
      { label: 'PAN & Aadhaar (Authorized signatory)', notes: 'Clear scan required' },
      { label: 'Business registration proof', notes: 'Certificate/registration docs depending on entity' },
      { label: 'Address proof', notes: 'Office address proof' },
      { label: 'Board resolution/authorization (if required)', notes: 'For companies/LLPs as applicable' },
    ],
    process: [
      { title: 'KYC checklist setup', description: 'Confirm entity type and required documents.', eta: '20–30 mins' },
      { title: 'Document upload & checks', description: 'We validate documents and reduce KYC back-and-forth.', eta: 'Same day' },
      { title: 'Application onboarding', description: 'Submit onboarding details and schedule verification if needed.', eta: '1–2 days' },
      { title: 'Account activation tracking', description: 'Track progress with clear timeline updates.', eta: '2–6 days' },
      { title: 'Account ready', description: 'Receive confirmation and store account documents securely.', eta: 'On approval' },
    ],
    pricing: [
      {
        id: 'starter',
        name: 'Starter',
        priceLabel: '₹1,999',
        timelineLabel: '5–8 business days',
        supportLabel: 'Standard support',
        bullets: ['KYC checklist', 'Document review', 'Onboarding support', 'Status tracking'],
      },
      {
        id: 'business',
        name: 'Business',
        priceLabel: '₹2,999',
        timelineLabel: '3–5 business days',
        supportLabel: 'Priority chat',
        bullets: ['Everything in Starter', 'Faster reviews', 'Priority support chat', 'Proactive follow-ups'],
        recommended: true,
      },
      {
        id: 'priority',
        name: 'Priority Processing',
        priceLabel: '₹4,499',
        timelineLabel: '2–3 business days',
        supportLabel: 'Dedicated ops manager',
        bullets: ['Everything in Business', 'Dedicated ops handling', 'Same-day doc review', 'Activation escalations'],
      },
    ],
    faqs: [
      { q: 'Is this tied to a specific bank?', a: 'We help prepare and execute onboarding. Bank selection can be based on your preferences and eligibility.' },
      { q: 'What if KYC gets rejected?', a: 'We highlight the reason and guide resubmission with corrected documents.' },
      { q: 'Can I reuse docs for other services?', a: 'Yes. Your vault keeps documents structured and reusable across workflows.' },
    ],
  },
  {
    slug: 'compliance-filing',
    title: 'Compliance Filing',
    shortDescription: 'Never miss due dates. File compliances with reminders, checklists, and tracked submissions.',
    longDescription:
      'Compliance is continuous. Vyapari OS helps you track filings, store documents, and follow a verified checklist so you can stay compliant without last-minute panic.',
    categories: ['Compliance'],
    badges: ['Reminders', 'Audit-friendly', 'Timeline Tracking'],
    highlights: [
      'Due date reminders and action lists',
      'Checklist-driven filing workflows',
      'History and records stored in the vault',
    ],
    timelines: {
      starter: 'As per due date',
      business: 'As per due date (priority slot)',
      priority: 'Same/Next day processing',
    },
    requiredDocuments: [
      { label: 'Previous filings (if any)', notes: 'Optional but useful' },
      { label: 'Invoices / sales records', notes: 'As applicable' },
      { label: 'Purchase records', notes: 'As applicable' },
      { label: 'Bank statements', notes: 'If required' },
    ],
    process: [
      { title: 'Compliance calendar setup', description: 'Identify the filings relevant to your business.', eta: '30 mins' },
      { title: 'Record collection', description: 'Upload records and validate completeness.', eta: 'Same day' },
      { title: 'Filing execution', description: 'We file with verified checks and provide receipts.', eta: '1–3 days' },
      { title: 'History & audit trail', description: 'All filings stored with timeline and references.', eta: 'Continuous' },
    ],
    pricing: [
      {
        id: 'starter',
        name: 'Starter',
        priceLabel: 'From ₹499',
        timelineLabel: 'As per due date',
        supportLabel: 'Standard support',
        bullets: ['Filing checklist', 'Document vault', 'Submission receipts', 'Email updates'],
      },
      {
        id: 'business',
        name: 'Business',
        priceLabel: '₹999 / month',
        timelineLabel: 'Priority slot',
        supportLabel: 'Priority chat',
        bullets: ['Reminders + calendar', 'Priority queue', 'Monthly compliance tracking', 'Priority support chat'],
        recommended: true,
      },
      {
        id: 'priority',
        name: 'Priority Processing',
        priceLabel: 'Custom',
        timelineLabel: 'Same/Next day',
        supportLabel: 'Dedicated ops manager',
        bullets: ['Dedicated ops handling', 'Same-day review slots', 'Proactive follow-ups', 'Advanced reporting'],
      },
    ],
    faqs: [
      { q: 'Do you handle monthly filings?', a: 'Yes. Business plan supports ongoing compliance workflows with reminders and priority processing.' },
      { q: 'Will I get receipts and records?', a: 'Yes. We store submission receipts and references in your vault.' },
      { q: 'Can I export compliance history?', a: 'Your history is available in a structured format for audits and reporting.' },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}

