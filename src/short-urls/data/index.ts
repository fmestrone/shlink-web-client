import { Nullable, OptionalString } from '../../utils/utils';
import { Order } from '../../utils/helpers/ordering';

export interface EditShortUrlData {
  longUrl?: string;
  tags?: string[];
  title?: string | null;
  validFrom?: Date | string | null;
  validUntil?: Date | string | null;
  maxVisits?: number | null;
  validateUrl?: boolean;
  crawlable?: boolean;
  forwardQuery?: boolean;
  password?: string | null;
}

export interface ShortUrlData extends EditShortUrlData {
  longUrl: string;
  customSlug?: string;
  shortCodeLength?: number;
  domain?: string;
  findIfExists?: boolean;
}

export interface ShortUrl {
  shortCode: string;
  shortUrl: string;
  qrShortUrl: string;
  longUrl: string;
  dateCreated: string;
  visitsCount: number;
  meta: Required<Nullable<ShortUrlMeta>>;
  tags: string[];
  domain: string | null;
  title?: string | null;
  crawlable?: boolean;
  forwardQuery?: boolean;
  password?: string | null;
}

export interface ShortUrlMeta {
  validFrom?: string;
  validUntil?: string;
  maxVisits?: number;
}

export interface ShortUrlModalProps {
  shortUrl: ShortUrl;
  isOpen: boolean;
  toggle: () => void;
}

export interface ShortUrlIdentifier {
  shortCode: string;
  domain: OptionalString;
}

export const SHORT_URLS_ORDERABLE_FIELDS = {
  dateCreated: 'Created at',
  shortCode: 'Short URL',
  longUrl: 'Long URL',
  title: 'Title',
  visits: 'Visits',
};

export type ShortUrlsOrderableFields = keyof typeof SHORT_URLS_ORDERABLE_FIELDS;

export type ShortUrlsOrder = Order<ShortUrlsOrderableFields>;

export interface ExportableShortUrl {
  createdAt: string;
  title: string;
  shortUrl: string;
  longUrl: string;
  tags: string;
  visits: number;
}
