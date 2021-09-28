class LocalSavePurchases {
    constructor(private readonly cacheStore: CacheStore) {}
}

interface CacheStore {
    deleteCallsCount: number;
}

class CacheStoreSpy implements CacheStore {
    deleteCallsCount = 0;
}

describe("localSavePurchases", () => {
    test("Should not delete cache on sut.init", () => {
        const cacheStore = new CacheStoreSpy();
        new LocalSavePurchases(cacheStore);
        expect(cacheStore.deleteCallsCount).toBe(0);
    });
});
