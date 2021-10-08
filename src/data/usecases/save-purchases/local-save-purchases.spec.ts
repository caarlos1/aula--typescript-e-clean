import { CacheStore } from "@/data/protocols/cache";
import { LocalSavePurchases } from "@/data/usecases";
import { SavePurchases } from "@/domain";

class CacheStoreSpy implements CacheStore {
    deleteCallsCount = 0;
    insertCallsCount = 0;
    deleteKey: string;
    insertKey: string;
    insertValues: Array<SavePurchases.Params> = [];

    delete(key: string): void {
        this.deleteCallsCount++;
        this.deleteKey = key;
    }

    insert(key: string, value: Array<SavePurchases.Params>): void {
        this.insertCallsCount++;
        this.insertKey = key;
        this.insertValues = value;
    }

    simulateDeleteError(): void {
        jest.spyOn(CacheStoreSpy.prototype, "delete").mockImplementationOnce(() => {
            throw new Error();
        });
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

const mockPurchases = (): Array<SavePurchases.Params> => [
    { id: "1", date: new Date(), value: 50 },
    { id: "2", date: new Date(), value: 300 },
];

describe("localSavePurchases", () => {
    test("Should not delete cache on sut.init", () => {
        const { cacheStore } = makeSut();
        expect(cacheStore.deleteCallsCount).toBe(0);
    });

    test("Should delete old cache on sut.init", async () => {
        const { sut, cacheStore } = makeSut();

        await sut.save(mockPurchases());

        expect(cacheStore.deleteCallsCount).toBe(1);
        expect(cacheStore.deleteKey).toBe("purchases");
    });

    test("Should not insert new Cache if delete fails", () => {
        const { sut, cacheStore } = makeSut();

        cacheStore.simulateDeleteError()

        const promise = sut.save(mockPurchases());

        expect(cacheStore.insertCallsCount).toBe(0);
        expect(promise).rejects.toThrow();
    });

    test("Should insert new Cache if delete succeeds", async () => {
        const { sut, cacheStore } = makeSut();

        const purchases = mockPurchases();
        sut.save(purchases);

        expect(cacheStore.deleteCallsCount).toBe(1);
        expect(cacheStore.insertCallsCount).toBe(1);
        expect(cacheStore.insertKey).toBe("purchases");
        expect(cacheStore.insertValues).toBe(purchases);
    });
});
