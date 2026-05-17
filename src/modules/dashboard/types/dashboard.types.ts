export type RequestStatus =
  | 'submitted'
  | 'under_review'
  | 'documents_pending'
  | 'processing'
  | 'approved'
  | 'completed'
  | 'rejected';

export type RequestPriority = 'low' | 'medium' | 'high';

export type DocumentCategory = 'PAN' | 'Aadhaar' | 'GST' | 'FSSAI' | 'Trademark';
export type DocumentVerificationStatus = 'verified' | 'pending' | 'attention';

export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded';
export type EscrowStatus = 'held' | 'released' | 'pending';

export interface DashboardStat {
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down';
  description: string;
}

export interface RequestStage {
  id: string;
  title: string;
  date: string;
  status: RequestStatus;
  note: string;
}

export interface RequestItem {
  id: string;
  title: string;
  client: string;
  service: string;
  status: RequestStatus;
  priority: RequestPriority;
  progress: number;
  submittedAt: string;
  estimatedCompletion: string;
  amount: string;
  timeline: RequestStage[];
  documents: string[];
  adminNotes: string[];
}

export interface DocumentItem {
  id: string;
  name: string;
  category: DocumentCategory;
  status: DocumentVerificationStatus;
  uploadedAt: string;
  expiresAt: string;
  previewLabel: string;
}

export interface PaymentItem {
  id: string;
  invoice: string;
  amount: string;
  method: string;
  status: PaymentStatus;
  date: string;
  escrow: EscrowStatus;
  description: string;
  refundEligible: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  receivedAt: string;
  unread: boolean;
  category: 'system' | 'request' | 'payment' | 'support';
}

export interface SupportMessage {
  id: string;
  author: 'user' | 'agent';
  message: string;
  timestamp: string;
  attachment?: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'pending' | 'closed';
  updatedAt: string;
  unreadCount: number;
}

export interface BusinessProfile {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  gstNumber: string;
  panNumber: string;
  businessType: string;
  address: string;
  website: string;
}

export interface DashboardData {
  stats: DashboardStat[];
  requests: RequestItem[];
  documents: DocumentItem[];
  payments: PaymentItem[];
  notifications: NotificationItem[];
  supportMessages: SupportMessage[];
  supportTickets: SupportTicket[];
  profile: BusinessProfile;
}
