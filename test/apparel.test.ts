import { dataStore } from '../src/utils/dataStore';

describe("Apparel Data Store", () => {
  beforeEach(() => {
    dataStore.updateApparel("APL001", "M", 10, 29.99);
  });

  test("should update apparel stock", () => {
    const success = dataStore.updateApparel("APL001", "M", 15, 34.99);
    expect(success).toBe(true);

    const apparel = dataStore.getApparelByCode("APL001");
    expect(apparel?.sizes.find((s) => s.size === "M")?.quantity).toBe(15);
    expect(apparel?.sizes.find((s) => s.size === "M")?.price).toBe(34.99);
  });

  test("should return false for non-existent apparel", () => {
    const success = dataStore.updateApparel("NONEXISTENT", "M", 10, 29.99);
    expect(success).toBe(false);
  });
});
