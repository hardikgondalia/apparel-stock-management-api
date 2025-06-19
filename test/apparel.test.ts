import { dataStore } from "../src/utils/dataStore";

describe("Apparel Data Store", () => {
  beforeEach(() => {
    dataStore.updateApparelStock("APL001", "M", 10, 29.99);
  });

  test("should update apparel stock", () => {
    const result = dataStore.updateApparelStock("APL001", "M", 15, 34.99);
    expect(result.success).toBe(true);
    expect(result.message).toBe("Apparel stock updated successfully");

    const apparel = dataStore.getApparelByCode("APL001");
    expect(apparel?.sizes.find((s) => s.size === "M")?.quantity).toBe(15);
    expect(apparel?.sizes.find((s) => s.size === "M")?.price).toBe(34.99);
  });

  test("should return false for non-existent apparel", () => {
    const result = dataStore.updateApparelStock("NONEXISTENT", "M", 10, 29.99);
    expect(result.success).toBe(false);
    expect(result.message).toBe("Apparel not found");
  });
});
