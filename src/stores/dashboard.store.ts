import { create } from 'zustand';
import type {
  RequestStatus,
  DocumentCategory,
  PaymentStatus,
  SupportTicket,
} from '../modules/dashboard/types/dashboard.types';

interface DashboardStore {
  selectedRequestId: string | null;
  searchQuery: string;
  statusFilter: RequestStatus | 'all';
  sortBy: 'date' | 'priority' | 'progress';
  documentCategory: DocumentCategory | 'all';
  paymentStatus: PaymentStatus | 'all';
  selectedTicketId: string | null;
  compactMode: boolean;
  draftMessage: string;
  setSelectedRequestId: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: RequestStatus | 'all') => void;
  setSortBy: (sort: 'date' | 'priority' | 'progress') => void;
  setDocumentCategory: (category: DocumentCategory | 'all') => void;
  setPaymentStatus: (status: PaymentStatus | 'all') => void;
  setSelectedTicketId: (id: string | null) => void;
  setCompactMode: (value: boolean) => void;
  setDraftMessage: (message: string) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  selectedRequestId: null,
  searchQuery: '',
  statusFilter: 'all',
  sortBy: 'date',
  documentCategory: 'all',
  paymentStatus: 'all',
  selectedTicketId: null,
  compactMode: false,
  draftMessage: '',
  setSelectedRequestId: (id) => set({ selectedRequestId: id }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setDocumentCategory: (category) => set({ documentCategory: category }),
  setPaymentStatus: (status) => set({ paymentStatus: status }),
  setSelectedTicketId: (id) => set({ selectedTicketId: id }),
  setCompactMode: (value) => set({ compactMode: value }),
  setDraftMessage: (message) => set({ draftMessage: message }),
}));
