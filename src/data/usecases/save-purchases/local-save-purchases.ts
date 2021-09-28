import { CacheStore } from "@/data/protocols/cache";
import { SavePurchases } from "@/domain/usecases/save-purchases";

export class LocalSavePurchases {
    constructor(private readonly cacheStore: CacheStore) {}

    async save(): Promise<void> {
        this.cacheStore.delete("purchases");
    }
}
