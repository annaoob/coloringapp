"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const list_1 = require("./list");
const assoc_1 = require("./assoc");
// Note: the tests provided here may exceed the minimum number required by our
// course guidelines
describe('assoc', function () {
    it('set_value', function () {
        // Add many new pairs and confirm they are all added
        const L0 = (0, assoc_1.set_value)("d", -12, (0, assoc_1.set_value)("c", 7, (0, assoc_1.set_value)("b", 5, (0, assoc_1.set_value)("a", 1, list_1.nil))));
        assert.strictEqual((0, assoc_1.get_value)("d", L0), -12);
        assert.strictEqual((0, assoc_1.get_value)("b", L0), 5);
        assert.strictEqual((0, assoc_1.get_value)("c", L0), 7);
        assert.strictEqual((0, assoc_1.get_value)("a", L0), 1);
        // First initialize a list and confirm key's value is retrieved correctly
        const L1 = (0, list_1.cons)(["b", 2], list_1.nil);
        assert.strictEqual((0, assoc_1.get_value)("b", L1), 2);
        // Change value of key and confirm change occurred
        const L2 = (0, assoc_1.set_value)("b", 3, L1);
        assert.notStrictEqual((0, assoc_1.get_value)("b", L2), 2);
        assert.strictEqual((0, assoc_1.get_value)("b", L2), 3);
        const L3 = (0, assoc_1.set_value)("b", 2, L2);
        assert.strictEqual((0, assoc_1.get_value)("b", L3), 2);
    });
    it('contains_key', function () {
        assert.strictEqual((0, assoc_1.contains_key)("a", list_1.nil), false);
        assert.strictEqual((0, assoc_1.contains_key)("b", list_1.nil), false);
        const L0 = (0, list_1.cons)(["b", 2], list_1.nil);
        assert.strictEqual((0, assoc_1.contains_key)("a", L0), false);
        assert.strictEqual((0, assoc_1.contains_key)("b", L0), true);
        const L1 = (0, list_1.cons)(["a", 1], (0, list_1.cons)(["b", 2], (0, list_1.cons)(["c", 3], list_1.nil)));
        const L2 = (0, list_1.cons)(["a", 4], (0, list_1.cons)(["b", 5], (0, list_1.cons)(["c", 6], (0, list_1.cons)(["d", 9], list_1.nil))));
        assert.strictEqual((0, assoc_1.contains_key)("c", L1), true);
        assert.strictEqual((0, assoc_1.contains_key)("d", L1), false);
        assert.strictEqual((0, assoc_1.contains_key)("d", L2), true);
    });
    it('get_keys', function () {
        assert.deepStrictEqual((0, assoc_1.get_keys)(list_1.nil), list_1.nil);
        assert.deepStrictEqual((0, assoc_1.get_keys)(list_1.nil), list_1.nil);
        assert.deepStrictEqual((0, assoc_1.get_keys)((0, list_1.cons)(["a", 1], list_1.nil)), (0, list_1.cons)("a", list_1.nil));
        assert.deepStrictEqual((0, assoc_1.get_keys)((0, list_1.cons)(["b", 2], list_1.nil)), (0, list_1.cons)("b", list_1.nil));
        const L1 = (0, list_1.cons)(["a", 1], (0, list_1.cons)(["b", 2], (0, list_1.cons)(["c", 3], list_1.nil)));
        const L2 = (0, list_1.cons)(["a", 4], (0, list_1.cons)(["b", 5], (0, list_1.cons)(["c", 6], (0, list_1.cons)(["d", 9], list_1.nil))));
        assert.deepStrictEqual((0, assoc_1.get_keys)(L1), (0, list_1.cons)("a", (0, list_1.cons)("b", (0, list_1.cons)("c", list_1.nil))));
        assert.deepStrictEqual((0, assoc_1.get_keys)(L2), (0, list_1.cons)("a", (0, list_1.cons)("b", (0, list_1.cons)("c", (0, list_1.cons)("d", list_1.nil)))));
    });
    it('get_value', function () {
        const L1 = (0, list_1.cons)(["a", 1], (0, list_1.cons)(["b", 2], (0, list_1.cons)(["c", 3], list_1.nil)));
        const L2 = (0, list_1.cons)(["a", 4], (0, list_1.cons)(["b", 5], (0, list_1.cons)(["c", 6], (0, list_1.cons)(["d", 9], list_1.nil))));
        assert.strictEqual((0, assoc_1.get_value)("a", L1), 1);
        assert.strictEqual((0, assoc_1.get_value)("a", L2), 4);
        assert.strictEqual((0, assoc_1.get_value)("b", L1), 2);
        assert.strictEqual((0, assoc_1.get_value)("b", L2), 5);
        assert.strictEqual((0, assoc_1.get_value)("c", L1), 3);
        assert.strictEqual((0, assoc_1.get_value)("d", L2), 9);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzb2NfdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hc3NvY190ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBaUM7QUFDakMsaUNBQW1DO0FBQ25DLG1DQUFrRjtBQUVsRiw4RUFBOEU7QUFDOUUsb0JBQW9CO0FBRXBCLFFBQVEsQ0FBQyxPQUFPLEVBQUU7SUFFaEIsRUFBRSxDQUFDLFdBQVcsRUFBRTtRQUNkLG9EQUFvRDtRQUNwRCxNQUFNLEVBQUUsR0FDTixJQUFBLGlCQUFTLEVBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUNsQixJQUFBLGlCQUFTLEVBQUMsR0FBRyxFQUFFLENBQUMsRUFDaEIsSUFBQSxpQkFBUyxFQUFDLEdBQUcsRUFBRSxDQUFDLEVBQ2hCLElBQUEsaUJBQVMsRUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLFVBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBQSxpQkFBUyxFQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBQSxpQkFBUyxFQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUEsaUJBQVMsRUFBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFBLGlCQUFTLEVBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTFDLHlFQUF5RTtRQUN6RSxNQUFNLEVBQUUsR0FBc0IsSUFBQSxXQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsVUFBRyxDQUFDLENBQUM7UUFDbEQs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QyxlQUFlLENBQUMsSUFBQSxnQkFBUSxFQUFDLElBQUEsV0FBSSxFQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLFVBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBQSxXQUFJLEVBQUMsR0FBRyxFQUFFLFVBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFBLGdCQUFRLEVBQUMsSUFBQSxXQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsVUFBRyxDQUFDLENBQUMsRUFBRSxJQUFBLFdBQUksRUFBQyxHQUFHLEVBQUUsVUFBRyxDQUFDLENBQUMsQ0FBQztRQUV0RSxNQUFNLEVBQUUsR0FBc0IsSUFBQSxXQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBQSxXQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBQSxXQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsVUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLE1BQU0sRUFBRSxHQUFzQixJQUFBLFdBQUksRUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFBLFdBQUksRUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFBLFdBQUksRUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFBLFdBQUksRUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxVQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUEsZ0JBQVEsRUFBQyxFQUFFLENBQUMsRUFBRSxJQUFBLFdBQUksRUFBQyxHQUFHLEVBQUUsSUFBQSxXQUFJLEVBQUMsR0FBRyxFQUFFLElBQUEsV0FBSSxFQUFDLEdBQUcsRUFBRSxVQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRSxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUEsZ0JBQVEsRUFBQyxFQUFFLENBQUMsRUFBRSxJQUFBLFdBQUksRUFBQyxHQUFHLEVBQUUsSUFBQSxXQUFJLEVBQUMsR0FBRyxFQUFFLElBQUEsV0FBSSxFQUFDLEdBQUcsRUFBRSxJQUFBLFdBQUksRUFBQyxHQUFHLEVBQUUsVUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxXQUFXLEVBQUU7UUFDZCxNQUFNLEVBQUUsR0FBc0IsSUFBQSxXQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBQSxXQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBQSxXQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsVUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLE1BQU0sRUFBRSxHQUFzQixJQUFBLFdBQUksRUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFBLFdBQUksRUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFBLFdBQUksRUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFBLFdBQUksRUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxVQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsRyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUEsaUJBQVMsRUFBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFBLGlCQUFTLEVBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBQSxpQkFBUyxFQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUEsaUJBQVMsRUFBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFMUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFBLGlCQUFTLEVBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBQSxpQkFBUyxFQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFDIn0=