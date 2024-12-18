"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.compact_list = exports.prefix = exports.at = exports.rev = exports.concat = exports.equal = exports.len = exports.cons = exports.nil = void 0;
/** The empty list. */
exports.nil = { kind: "nil" };
/** Returns a list with hd in front of tl. */
const cons = (hd, tl) => {
    return { kind: "cons", hd: hd, tl: tl };
};
exports.cons = cons;
/**
 * Returns the length of the list.
 * @param L list whose length should be returned
 * @returns 0 if L = nil else 1 + len(tail(L))
 */
const len = (L) => {
    if (L.kind === "nil") {
        return 0n;
    }
    else {
        return 1n + (0, exports.len)(L.tl);
    }
};
exports.len = len;
/**
 * Determines whether the two given lists are equal, using === to compare the
 * corresponding values in the lists.
 * @param L The first list to compare
 * @param R The second list to compare
 * @returns true iff the lists have the same length and the elements at the same
 *     indexes of the two lists have values that are ===.
 */
const equal = (L, R) => {
    if (L.kind === "nil") {
        return R.kind === "nil";
    }
    else if (R.kind === "nil") {
        return false;
    }
    else if (L.hd !== R.hd) {
        return false;
    }
    else {
        return (0, exports.equal)(L.tl, R.tl);
    }
};
exports.equal = equal;
/**
 * Returns the a list consisting of L followed by R.
 * @param L list to go at the front of the result
 * @param R list to go at the end of the result
 * @returns A single list consisting of L's elements followed by R's
 */
const concat = (L, R) => {
    if (L.kind === "nil") {
        return R;
    }
    else {
        return (0, exports.cons)(L.hd, (0, exports.concat)(L.tl, R));
    }
};
exports.concat = concat;
/**
 * Returns the reverse of the given list.
 * @param L list to reverse
 * @returns list containing the same elements but in reverse order
 */
const rev = (L) => {
    if (L.kind === "nil") {
        return exports.nil;
    }
    else {
        return (0, exports.concat)((0, exports.rev)(L.tl), (0, exports.cons)(L.hd, exports.nil));
    }
};
exports.rev = rev;
/**
 * Returns the element at index n in the list.
 * @param n an integer between 0 and len(L) - 1 inclusie
 * @returns L.hd if n is 0 else at(n - 1, L.tl)
 */
const at = (x, L) => {
    if (L.kind === "nil") {
        throw new Error('no element at that index');
    }
    else if (x === 0n) {
        return L.hd;
    }
    else {
        return (0, exports.at)(x - 1n, L.tl);
    }
};
exports.at = at;
/**
 * Returns the first n elements of the list.
 * @param n number of elements to return
 * @param L list in question
 * @requires n <= len(L)
 * @returns nil if n = 0 else cons(L.hd, prefix(n - 1, L.tl))
 */
const prefix = (n, L) => {
    if (n === 0n) {
        return exports.nil;
    }
    else if (L.kind === "nil") {
        throw new Error("not enough elements in L");
    }
    else {
        return (0, exports.cons)(L.hd, (0, exports.prefix)(n - 1n, L.tl));
    }
};
exports.prefix = prefix;
/**
 * Returns the elements of a list, packed into an array.
 * @param L the list to turn into an array
 * @returns array containing the same elements as in L in the same order
 */
const compact_list = (L) => {
    if (L.kind === "nil") {
        return [];
    }
    else {
        return [L.hd].concat((0, exports.compact_list)(L.tl)); // NOTE: O(n^2)
    }
};
exports.compact_list = compact_list;
/**
 * Returns the list with all of the given values removed
 * @param x the value to remove
 * @param L list to remove from
 * @returns list containing the same elements but except for x
 */
const remove = (x, L) => {
    if (L.kind === "nil") {
        return exports.nil;
    }
    else if (L.hd === x) {
        return (0, exports.remove)(x, L.tl);
    }
    else {
        return (0, exports.cons)(L.hd, (0, exports.remove)(x, L.tl));
    }
};
exports.remove = remove;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9saXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLHNCQUFzQjtBQUNULFFBQUEsR0FBRyxHQUFrQixFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQztBQUVoRCw2Q0FBNkM7QUFDdEMsTUFBTSxJQUFJLEdBQUcsQ0FBSyxFQUFLLEVBQUUsRUFBVyxFQUFXLEVBQUU7SUFDdEQsT0FBTyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFDLENBQUM7QUFDeEMsQ0FBQyxDQUFDO0FBRlcsUUFBQSxJQUFJLFFBRWY7QUFHRjs7OztHQUlHO0FBQ0ksTUFBTSxHQUFHLEdBQUcsQ0FBSyxDQUFVLEVBQVUsRUFBRTtJQUM1QyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFO1FBQ3BCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7U0FBTTtRQUNMLE9BQU8sRUFBRSxHQUFHLElBQUEsV0FBRyxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN2QjtBQUNILENBQUMsQ0FBQztBQU5XLFFBQUEsR0FBRyxPQU1kO0FBRUY7Ozs7Ozs7R0FPRztBQUNJLE1BQU0sS0FBSyxHQUFHLENBQUksQ0FBVSxFQUFFLENBQVUsRUFBVyxFQUFFO0lBQzFELElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7UUFDcEIsT0FBTyxDQUFDLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQztLQUN6QjtTQUFNLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7UUFDM0IsT0FBTyxLQUFLLENBQUM7S0FDZDtTQUFNLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3hCLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7U0FBTTtRQUNMLE9BQU8sSUFBQSxhQUFLLEVBQUMsQ0FB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