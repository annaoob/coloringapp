"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = exports.loadFile = exports.save = exports.dummy = exports.resetSavesForTesting = void 0;
const assoc_1 = require("./assoc");
const list_1 = require("./list");
/** Contains the saved contents (of unknown type) for each file name */
let saved = list_1.nil;
/** Empty the map of saves, for testing purposes */
const resetSavesForTesting = () => {
    saved = list_1.nil;
};
exports.resetSavesForTesting = resetSavesForTesting;
/**
 * Returns a greeting message if "name" is provided in query params
 * @param req request to respond to
 * @param res object to send response with
 */
const dummy = (req, res) => {
    const name = first(req.query.name);
    if (name === undefined) {
        res.status(400).send('missing "name" parameter');
        return;
    }
    res.send({ greeting: `Hi, ${name}` });
};
exports.dummy = dummy;
// TODO: add additional route handler functions here 
// (remove the "dummy" route, route handler, and tests when you no longer need 
// that reference)
/**
* Returns a "File saved successfully" message and saves file if name and design is provided in query parameters
* @param req request to respond to
* @param res object to send response with
* @returns Error string in case of error, Record with string in case of success
*/
const save = (req, res) => {
    const name = req.query.name;
    const design = req.body.design;
    if (typeof name !== "string") {
        res.status(400);
        res.send("fileName needs to be a string");
        return;
    }
    // req.body.content
    //const [name, _square]: [string, unknown] = first(req.query);
    //saved = concat(saved, [name, _square]);
    saved = (0, assoc_1.set_value)(name, design, saved);
    res.status(200);
    res.send({ name: "File saved successfully" });
};
exports.save = save;
/**
* Returns a fileName and root node of file if a string name of file was passed in
* @param req request to respond to
* @param res object to send response with
* @returns Error string in case of error, Record with string fileName and (hopefully) Square design in case of success
*/
const loadFile = (req, res) => {
    const name = req.query.name;
    if (typeof name !== "string") {
        res.status(400);
        res.send("fileName needs to be a string");
        return;
    }
    if ((0, assoc_1.contains_key)(name, saved)) {
        res.send({ fileName: name, design: (0, assoc_1.get_value)(name, saved) });
        return;
    }
    res.send("Error");
};
exports.loadFile = loadFile;
/**
* Returns array of saved files
* @param req request to respond to
* @param res object to send response with
* @returns Record with array of saved files
*/
const close = (req, res) => {
    console.log(req.baseUrl);
    res.status(200);
    res.send({ ans: (0, list_1.compact_list)((0, assoc_1.get_keys)(saved)) });
};
exports.close = close;
// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
const first = (param) => {
    if (Array.isArray(param)) {
        return first(param[0]);
    }
    else if (typeof param === 'string') {
        return param;
    }
    else {
        return undefined;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxtQ0FBa0Y7QUFDbEYsaUNBQTJDO0FBTzNDLHVFQUF1RTtBQUN2RSxJQUFJLEtBQUssR0FBdUIsVUFBRyxDQUFDO0FBRXBDLG1EQUFtRDtBQUM1QyxNQUFNLG9CQUFvQixHQUFHLEdBQVMsRUFBRTtJQUM3QyxLQUFLLEdBQUcsVUFBRyxDQUFDO0FBQ2QsQ0FBQyxDQUFDO0FBRlcsUUFBQSxvQkFBb0Isd0JBRS9CO0FBR0Y7Ozs7R0FJRztBQUNJLE1BQU0sS0FBSyxHQUFHLENBQUMsR0FBZ0IsRUFBRSxHQUFpQixFQUFRLEVBQUU7SUFDakUsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1FBQ3RCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDakQsT0FBTztLQUNSO0lBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLFFBQVEsRUFBRSxPQUFPLElBQUksRUFBRSxFQUFDLENBQUMsQ0FBQztBQUN0QyxDQUFDLENBQUM7QUFSVyxRQUFBLEtBQUssU0FRaEI7QUFHRixxREFBcUQ7QUFDckQsK0VBQStFO0FBQy9FLGtCQUFrQjtBQUVsQjs7Ozs7RUFLRTtBQUNLLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBZ0IsRUFBRSxHQUFpQixFQUFRLEVBQUU7SUFDaEUsTUFBTSxJQUFJLEdBQVksR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDckMsTUFBTSxNQUFNLEdBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDeEMsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDNUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDMUMsT0FBTztLQUNSO0lBRUQsbUJBQW1CO0lBQ25CLDhEQUE4RDtJQUM5RCx5Q0FBeUM7SUFDekMsS0FBSyxHQUFHLElBQUEsaUJBQVMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSx5QkFBeUIsRUFBRSxDQUFDLENBQUM7QUFDaEQsQ0FBQyxDQUFDO0FBZlcsUUFBQSxJQUFJLFFBZWY7QUFFRjs7Ozs7RUFLRTtBQUNLLE1BQU0sUUFBUSxHQUFHLENBQUMsR0FBZ0IsRUFBRSxHQUFpQixFQUFRLEVBQUU7SUFDcEUsTUFBTSxJQUFJLEdBQVksR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDckMsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDNUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDMUMsT0FBTztLQUNSO0lBQ0QsSUFBSSxJQUFBLG9CQUFZLEVBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFO1FBQzdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFBLGlCQUFTLEVBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFDLENBQUMsQ0FBQTtRQUMxRCxPQUFPO0tBQ1I7SUFDRCxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3BCLENBQUMsQ0FBQTtBQVpZLFFBQUEsUUFBUSxZQVlwQjtBQUVEOzs7OztFQUtFO0FBQ0ssTUFBTSxLQUFLLEdBQUcsQ0FBQyxHQUFnQixFQUFFLEdBQWlCLEVBQVEsRUFBRTtJQUNqRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWhCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLEVBQUUsSUFBQSxtQkFBWSxFQUFDLElBQUEsZ0JBQVEsRUFBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztBQUNqRCxDQUFDLENBQUE7QUFMWSxRQUFBLEtBQUssU0FLakI7QUFHRCx3RUFBd0U7QUFDeEUsNEVBQTRFO0FBQzVFLG1EQUFtRDtBQUNuRCxNQUFNLEtBQUssR0FBRyxDQUFDLEtBQWMsRUFBb0IsRUFBRTtJQUNqRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDeEIsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDeEI7U0FBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUNwQyxPQUFPLEtBQUssQ0FBQztLQUNkO1NBQU07UUFDTCxPQUFPLFNBQVMsQ0FBQztLQUNsQjtBQUNILENBQUMsQ0FBQyJ9