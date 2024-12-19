import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { AssocList, set_value, contains_key, get_value, get_keys } from "./assoc";
import { nil, compact_list } from "./list";


// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;  // only writing, so no need to check

/** Contains the saved contents (of unknown type) for each file name */
let saved: AssocList<unknown> = nil;

/** Empty the map of saves, for testing purposes */
export const resetSavesForTesting = (): void => {
  saved = nil;
};


/** 
 * Returns a greeting message if "name" is provided in query params
 * @param req request to respond to
 * @param res object to send response with
 */
export const dummy = (req: SafeRequest, res: SafeResponse): void => {
  const name = first(req.query.name);
  if (name === undefined) {
    res.status(400).send('missing "name" parameter');
    return;
  }

  res.send({greeting: `Hi, ${name}`});
};


// TODO: add additional route handler functions here 
// (remove the "dummy" route, route handler, and tests when you no longer need 
// that reference)

/**
* Returns a "File saved successfully" message and saves file if name and design is provided in query parameters
* @param req request to respond to
* @param res object to send response with
* @returns Error string in case of error, Record with string in case of success
*/
export const save = (req: SafeRequest, res: SafeResponse): void => {
  const name: unknown = req.query.name;
  const design: unknown = req.body.design;
  if (typeof name !== "string") {
    res.status(400);
    res.send("fileName needs to be a string");
    return;
  }

  // req.body.content
  //const [name, _square]: [string, unknown] = first(req.query);
  //saved = concat(saved, [name, _square]);
  saved = set_value(name, design, saved);
  res.status(200);
  res.send({ name: "File saved successfully" });
};

/**
* Returns a fileName and root node of file if a string name of file was passed in
* @param req request to respond to
* @param res object to send response with
* @returns Error string in case of error, Record with string fileName and (hopefully) Square design in case of success
*/
export const loadFile = (req: SafeRequest, res: SafeResponse): void => {
  const name: unknown = req.query.name;
  if (typeof name !== "string") {
    res.status(400);
    res.send("fileName needs to be a string");
    return;
  }
  if (contains_key(name, saved)) {
    res.send({fileName: name, design: get_value(name, saved)})
    return;
  }
  res.send("Error");
}

/**
* Returns array of saved files
* @param req request to respond to
* @param res object to send response with
* @returns Record with array of saved files
*/
export const close = (req: SafeRequest, res: SafeResponse): void => {
  console.log(req.baseUrl);
  res.status(200);

  res.send({ans: compact_list(get_keys(saved))});
}


// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
const first = (param: unknown): string|undefined => {
  if (Array.isArray(param)) {
    return first(param[0]);
  } else if (typeof param === 'string') {
    return param;
  } else {
    return undefined;
  }
};
