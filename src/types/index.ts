export type OpeningMode =
  | 'rostro'
  | 'huella'
  | 'codigo'
  | 'tarjeta'
  | 'llave'
  | 'app';

export type LockUsage = 'casa' | 'renta' | 'oficina';

export type AppType = 'Tuya / Smart Life' | 'TTLock';

export interface SmartLockModel {
  slug: string;
  code: string; // e.g. "SLS120"
  displayName: string; // e.g. "Mod. SLS120"
  verified: boolean;
  image?: string;
  shortDescription?: string;
  openingModes: OpeningMode[];
  app?: AppType;
  connection?: string;
  battery?: string;
  ipRating?: string;
  lockingType?: string;
  screen?: string;
  doorThickness?: string;
  remoteOpening?: string;
  hasVideoCall?: boolean;
  hasRemoteOpening?: boolean;
  usages?: LockUsage[];
  memory?: string;
  material?: string;
  includes?: string[];
  warranty?: string;
  specialNotes?: string;
  verifiedExtracted?: boolean;
}

export interface BranchInfo {
  name: string;
  slug: string;
  address: string | null;
  hours: string | null;
  mapUrl: string | null;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verifiedSource?: string;
}

export interface SiteConfig {
  name: string;
  phoneDisplay: string;
  phoneCallable: string;
  whatsappNumber: string;
  whatsappLink: string;
  email: string;
  warrantyYears: number;
  branches: BranchInfo[];
  reviews: ReviewItem[];
  whatsappVerificationNote: string;
  basicInstallationNotice: string;
}
