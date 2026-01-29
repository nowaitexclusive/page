
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  CAMPAIGN_WIZARD = 'CAMPAIGN_WIZARD',
  CRM_PIPELINE = 'CRM_PIPELINE',
  HISTORY = 'HISTORY',
  INBOX = 'INBOX',
  SETTINGS = 'SETTINGS'
}

export enum SendingStatus {
  IDLE = 'IDLE',
  SENDING = 'SENDING',
  WAITING_DELAY = 'WAITING_DELAY',
  WAITING_LINK = 'WAITING_LINK',
  PAUSED_SAFETY = 'PAUSED_SAFETY',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export enum PipelineStage {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  REPLIED = 'REPLIED',
  INTERESTED = 'INTERESTED',
  CONVERTED = 'CONVERTED',
  LOST = 'LOST'
}

// Used for the Frontend UI (legacy support)
export interface ClientData {
  id: string;
  name: string;
  phone: string;
  status: SendingStatus;
  pipelineStage: PipelineStage;
  tags: string[];
  lastMessageSent?: string;
  lastInteractionAt?: string;
  errorMessage?: string;
  isValid?: boolean; // New: For list cleaning
}

// --- BACKEND SIMULATION MODELS ---

export interface DbContact {
  id: string; // uuid
  phone: string; // UNIQUE E.164 (+55...)
  name?: string;
  instance_id?: string;
  source?: string;
  pipeline_stage: PipelineStage; // Mapped to CRM
  tags: string[];
  opt_out: boolean;
  last_inbound_at?: string; // ISO String
  last_outbound_at?: string; // ISO String
  created_at: string; // ISO String
}

export interface DbConversation {
  id: string; // uuid
  contact_id: string;
  instance_id: string;
  status: 'OPEN' | 'CLOSED';
  last_message_preview: string;
  last_message_at: string; // ISO String
  unread_count: number;
  created_at: string;
}

export interface DbMessage {
  id: string; // uuid
  conversation_id: string;
  direction: 'inbound' | 'outbound';
  text: string;
  provider: string; // 'z-api', 'wpp-connect', etc
  provider_message_id: string; // UNIQUE (idempotency)
  instance_id: string;
  created_at: string; // ISO String
}

// --- API PAYLOADS ---

export interface UpsertContactPayload {
  phone: string;
  instance_id: string;
  source?: string;
  name?: string;
}

export interface IncomingMessagePayload {
  direction: 'inbound';
  phone: string;
  text: string;
  provider: string;
  provider_message_id: string;
  instance_id: string;
}

export interface MarkRepliedPayload {
  phone: string;
  instance_id: string;
}

// --- UTILS & OTHERS ---

export interface HistoryItem {
  id: string;
  name: string;
  phone: string;
  messagePreview: string;
  status: 'SUCCESS' | 'ERROR';
  sentAt: string;
  errorMessage?: string;
  hasAttachment?: boolean;
  variationUsed: number;
}

export interface DelayConfig {
  min: number;
  max: number;
  microPauseAfter: number;
  microPauseDurationMin: number;
  microPauseDurationMax: number;
}

export interface SendRange {
  start: number;
  end: number;
}

export interface SavedTemplate {
  id: string;
  title: string;
  variations: string[];
}

export interface RawSheetRow {
  "Nome do Cliente"?: string;
  "Telefone do Cliente"?: string | number;
  [key: string]: any;
}

export interface AppSettings {
  webhookUrl: string;
  instanceName: string;
}

export interface MonitorLog {
  id: string;
  time: string;
  type: 'info' | 'success' | 'error' | 'warning';
  message: string;
  phone?: string;
}
