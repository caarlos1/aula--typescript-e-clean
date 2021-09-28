class LocalSavePurchases {
    constructor(private readonly cacheStore: CacheStore) {}

    async save(): Promise<void> {
        this.cacheStore.delete();
    }
}

interface CacheStore {
    deleteCallsCount: number;
    delete: () => void;
}

class CacheStoreSpy implements CacheStore {
    deleteCallsCount = 0;

    delete(): void {
        this.deleteCallsCount++;
    }
}

type SutTypes = {
    cacheStore: CacheStore;
    sut: LocalSavePurchases;
};

const makeSut = (): SutTypes => {
    const cacheStore = new CacheStoreSpy();
    const sut = new LocalSavePurchases(cacheStore);
    return {
        cacheStore,
        sut,
    };
};

describe("localSavePurchases", () => {
    test("Should not delete cache on sut.init", () => {
        const { cacheStore } = makeSut();
        expect(cacheStore.deleteCallsCount).toBe(0);
    });

    test("Should delete old cache on sut.init", async () => {
        const { sut, cacheStore } = makeSut();
        await sut.save();
        expect(cacheStore.deleteCallsCount).toBe(1);
    });
});
