export interface ShortLink {
    alias: string;
    url: string;
    createdAt: Date;
    time?: string;
}

export interface CreateLinkRequest {
    url: string;
    alias: string;
}

export const LINKS_COLLECTION = "links";
export const ENTRIES_COLLECTION = "entries";