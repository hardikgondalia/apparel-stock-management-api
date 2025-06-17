import { dataStore } from '../src/utils/dataStore';

describe('Order Processing', () => {
    beforeAll(() => {
        // Setup test data
        dataStore.updateApparel('APL001', 'M', 10, 29.99);
        dataStore.updateApparel('APL002', 'L', 5, 39.99);
    });

    test('should check order fulfillment', () => {
        const canFulfill = dataStore.canFulfillOrder([
            { code: 'APL001', size: 'M', quantity: 2 },
            { code: 'APL002', size: 'L', quantity: 1 }
        ]);
        expect(canFulfill).toBe(true);
    });

    test('should return false for unfulfillable order', () => {
        const canFulfill = dataStore.canFulfillOrder([
            { code: 'APL001', size: 'M', quantity: 20 }
        ]);
        expect(canFulfill).toBe(false);
    });

    test('should calculate lowest order cost', () => {
        const cost = dataStore.getLowestOrderCost([
            { code: 'APL001', size: 'M', quantity: 2 },
            { code: 'APL002', size: 'L', quantity: 1 }
        ]);
        expect(cost).toBe(2 * 29.99 + 1 * 39.99);
    });
});