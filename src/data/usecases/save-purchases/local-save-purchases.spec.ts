import { CacheStore } from "@/data/protocols/cache";
import { LocalSavePurchases } from "@/data/usecases";

class CacheStoreSpy implements CacheStore {
    deleteCallsCount = 0;
    insertCallsCount = 0;
    deleteKey: string;
    insertKey: string;

    delete(key: string): void {
        this.deleteCallsCount++;
        this.deleteKey = key;
    }

    insert(key: string): void {
        this.insertCallsCount++;
        this.insertKey = key;
    }
}

type SutTypes = {
    cacheStore: CacheStoreSpy;
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
        expect(cacheStore.deleteKey).toBe("purchases");
    });

    test("Should not insert new Cache if delete fails", () => {
        const { sut, cacheStore } = makeSut();

        jest.spyOn(cacheStore, "delete").mockImplementationOnce(() => {
            throw new Error();
        });

        const promise = sut.save();

        expect(cacheStore.insertCallsCount).toBe(0);
        expect(promise).rejects.toThrow();
    });

    test("Should insert new Cache if delete succeeds", async () => {
        const { sut, cacheStore } = makeSut();

        sut.save();

        expect(cacheStore.deleteCallsCount).toBe(1);
        expect(cacheStore.insertCallsCount).toBe(1);
        expect(cacheStore.insertKey).toBe("purchases");
    });
});
