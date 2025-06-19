import { dataStore } from "../src/utils/dataStore";

describe("Order Processing", () => {
  beforeAll(() => {
    // Setup test data
    dataStore.updateApparelStock("APL001", "M", 10, 29.99);
    dataStore.updateApparelStock("APL002", "L", 5, 39.99);
  });

  test("should check order fulfillment", () => {
    dataStore.updateApparelStock("APL001", "M", 10, 29.99);
    dataStore.updateApparelStock("APL002", "L", 5, 39.99);

    const result = dataStore.canFulfillOrder([
      { code: "APL001", size: "M", quantity: 2 },
      { code: "APL002", size: "L", quantity: 1 },
    ]);

    expect(result).toEqual({
      canFulfill: true,
      unfulfilledItems: [],
    });
  });

  test("should return false for unfulfillable order with details", () => {
    dataStore.updateApparelStock("APL001", "M", 10, 29.99);

    const result = dataStore.canFulfillOrder([
      { code: "APL001", size: "M", quantity: 20 },
    ]);
    const expected = {
      canFulfill: false,
      unfulfilledItems: [
        {
          item: { code: "APL001", size: "M", quantity: 20 },
          available: 10,
        },
      ],
    };

    expect(result.canFulfill).toBe(expected.canFulfill);
    expect(result.unfulfilledItems).toHaveLength(1);
    expect(result.unfulfilledItems[0].item).toEqual(
      expected.unfulfilledItems[0].item
    );
    expect(result.unfulfilledItems[0].available).toBe(
      expected.unfulfilledItems[0].available
    );
  });

  test("should calculate lowest order cost", () => {
    const cost = dataStore.getLowestOrderCost([
      { code: "APL001", size: "M", quantity: 2 },
      { code: "APL002", size: "L", quantity: 1 },
    ]);
    expect(cost).toBe(2 * 29.99 + 1 * 39.99);
  });
});
