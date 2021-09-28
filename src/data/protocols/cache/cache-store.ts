export interface CacheStore {
    deleteCallsCount: number;
    key: string;
    delete: (key: string) => void;
}
