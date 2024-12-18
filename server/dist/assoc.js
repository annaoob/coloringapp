"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_value = exports.get_keys = exports.contains_key = exports.set_value = void 0;
const list_1 = require("./list");
/**
 * Creates a new AssocList containing the pairs from the given list
 * plus the new pair: (key, value).
 * Replaces any existing pair with given key.
 *
 * @param key to update the value of
 * @param value to set for the given key
 * @param L list to add updated (key, value) pair to to create output list
 * @returns set-value(key, value, L), where
 *  set-value: (S*, V, AssocList<V>) -> AssocList<V>
 *      set-value(k, v, nil)          := (k, v) :: nil
 *      set-value(k, v, (x, y) :: R)  := ((k, v) :: nil) ++ R          if k = x
 *      set-value(k, v, (x, y) :: R)  := (x, y) :: set-value(k, v, R)  if k /= x
 */
const set_value = (key, value, L) => {
    if (L.kind === "nil") {
        return (0, list_1.cons)([key, value], list_1.nil);
    }
    else {
        const [x, _y] = L.hd;
        if (key === x) {
            return (0, list_1.concat)((0, list_1.cons)([key, value], list_1.nil), L.tl);
        }
        else {
            return (0, list_1.cons)(L.hd, (0, exports.set_value)(key, value, L.tl));
        }
    }
    // Note: Notice that this implementation differs from the version we went
    // over in lecture where existing pairs with the given key to set the 
    // value of were NOT removed
    //
    // It is important in this implementation that set_value is ALWAYS used to
    // add new pairs to the list, otherwise the rule that all keys in the list
    // must be unique could break. Avoid hard debugging!
};
exports.set_value = set_value;
/**
 * Determines if the given key is within a pair in the given list
 * @param x key to determine if list contains
 * @param L list to determine if key is contained in
 * @returns contains-key(x, L), where
 *  contains-key: (S*, AssocList<V>) -> B
 *      contains-key(x, nil)          := false
 *      contains-key(x, (y, v) :: R)  := true                if x = y
 *      contains-key(x, (y, v) :: R)  := contains-key(x, R)  if x /= y
 */
const contains_key = (x, L) => {
    if (L.kind === "nil") {
        return false;
    }
    else {
        const [y, _v] = L.hd;
        if (x === y) {
            return true;
        }
        else {
            return (0, exports.contains_key)(x, L.tl);
        }
    }
};
exports.contains_key = contains_key;
/**
 * Gets set of keys in the given list
 * @param L list in question
 * @returns get-keys(L), where
 *  get-keys: AssocList<V> -> List<S*>
 *      get-keys(nil)          := nil
 *      get-keys((y, v) :: R)  := y :: get-keys(R)
 */
const get_keys = (L) => {
    if (L.kind === "nil") {
        return list_1.nil;
    }
    else {
        const [y, _v] = L.hd;
        return (0, list_1.cons)(y, (0, exports.get_keys)(L.tl));
    }
};
exports.get_keys = get_keys;
/**
 * Gets the value paired with the first instance of the given key
 * in the given list
 * @param x key to find the corresponding value for
 * @param L list to find x's value pair in
 * @returns get-value(x, L), where
 *  get-value: (S*, AssocList<V>) -> V
 *      get-value(x, (y, v) :: R)  := v                if x = y
 *      get-value(x, (y, v) :: R)  := get-value(x, R)  if x /= y
 *  (get-value is only defined on AssocLists, L, where contains-key(x, L))
 * @throws Error when contains-key(x, L) = false
 */
const get_value = (x, L) => {
    if (L.kind === "nil") {
        throw new Error("key is not contained in Map");
    }
    else {
        const [y, v] = L.hd;
        if (x === y) {
            return v;
        }
        else {
            return (0, exports.get_value)(x, L.tl);
        }
    }
};
exports.get_value = get_value;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzb2MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXNzb2MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQWlEO0FBVWpEOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSSxNQUFNLFNBQVMsR0FBRyxDQUFLLEdBQVcsRUFBRSxLQUFRLEVBQUUsQ0FBZSxFQUFnQixFQUFFO0lBQ3BGLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7UUFDcEIsT0FBTyxJQUFBLFdBQUksRUFBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxVQUFHLENBQUMsQ0FBQztLQUNoQztTQUFNO1FBQ0wsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBZ0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNsQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUU7WUFDYixPQUFPLElBQUEsYUFBTSxFQUFDLElBQUEsV0FBSSxFQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLFVBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM5QzthQUFNO1lBQ0wsT0FBTyxJQUFBLFdBQUksRUFBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUEsaUJBQVMsRUFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2hEO0tBQ0Y7SUFDRCx5RUFBeUU7SUFDekUsc0VBQXNFO0lBQ3RFLDRCQUE0QjtJQUM1QixFQUFFO0lBQ0YsMEVBQTBFO0lBQzFFLDBFQUEwRTtJQUMxRSxvREFBb0Q7QUFDdEQsQ0FBQyxDQUFDO0FBbEJXLFFBQUEsU0FBUyxhQWtCcEI7QUFHRjs7Ozs7Ozs7O0dBU0c7QUFDSSxNQUFNLFlBQVksR0FBRyxDQUFLLENBQVMsRUFBRSxDQUFlLEVBQVcsRUFBRTtJQUN0RSxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFO1FBQ3BCLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7U0FBTTtRQUNMLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQWdCLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ1gsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNO1lBQ0wsT0FBTyxJQUFBLG9CQUFZLEVBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM5QjtLQUNGO0FBQ0gsQ0FBQyxDQUFDO0FBWFcsUUFBQSxZQUFZLGdCQVd2QjtBQUdGOzs7Ozs7O0dBT0c7QUFDSSxNQUFNLFFBQVEsR0FBRyxDQUFLLENBQWUsRUFBZ0IsRUFBRTtJQUM1RCxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFO1FBQ3BCLE9BQU8sVUFBRyxDQUFDO0tBQ1o7U0FBTztRQUNOLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQWdCLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDbEMsT0FBTyxJQUFBLFdBQUksRUFBQyxDQUFDLEVBQUUsSUFBQSxnQkFBUSxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ2hDO0FBQ0gsQ0FBQyxDQUFDO0FBUFcsUUFBQSxRQUFRLFlBT25CO0FBR0Y7Ozs7Ozs7Ozs7O0dBV0c7QUFDSSxNQUFNLFNBQVMsR0FBRyxDQUFLLENBQVMsRUFBRSxDQUFlLEVBQUssRUFBRTtJQUM3RCxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFO1FBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztLQUNoRDtTQUFPO1FBQ04sTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBZ0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDWCxPQUFPLENBQUMsQ0FBQztTQUNWO2FBQU07WUFDTCxPQUFPLElBQUEsaUJBQVMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzNCO0tBQ0Y7QUFDSCxDQUFDLENBQUM7QUFYVyxRQUFBLFNBQVMsYUFXcEIifQ==