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
const httpMocks = __importStar(require("node-mocks-http"));
const routes_1 = require("./routes");
//import { get_value } from "./assoc";
describe('routes', function () {
    // const mockSaved = {
    //   "file1": {kind: "solid", color: "white"},
    //   "file2": {kind: "solid", color: "pink"}
    // };
    // beforeEach(() => {
    //   // Reset or mock `saved` data before each test to ensure isolation
    //   Object.assign(saved, mockSaved);
    // });
    // After you know what to do, feel free to delete this Dummy test
    it('dummy', function () {
        // You can copy this test structure to start your own tests, these comments
        // are included as a reminder of how testing routes works:
        // httpMocks lets us create mock Request and Response params to pass into our route functions
        const req1 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        { method: 'GET', url: '/api/dummy', query: { name: 'Kevin' } });
        const res1 = httpMocks.createResponse();
        // call our function to execute the request and fill in the response
        (0, routes_1.dummy)(req1, res1);
        // check that the request was successful
        assert.deepStrictEqual(res1._getStatusCode(), 200);
        // and the response data is as expected
        assert.deepStrictEqual(res1._getData(), { greeting: 'Hi, Kevin' });
    });
    // TODO: add tests for your routes
    it('save', function () {
        const req1 = httpMocks.createRequest({ method: 'POST', url: '/api/save', query: { name: 'file1' }, body: { kind: "solid", color: "white" } });
        const res1 = httpMocks.createResponse();
        (0, routes_1.save)(req1, res1);
        assert.deepStrictEqual(res1._getStatusCode(), 200);
        assert.deepStrictEqual(res1._getData(), { name: 'File saved successfully' });
        (0, routes_1.resetSavesForTesting)();
    });
    it('close', function () {
        const req2 = httpMocks.createRequest({ method: 'POST', url: '/api/save', query: { name: 'file1' }, body: { design: { kind: "solid", color: "white" } } });
        const res2 = httpMocks.createResponse();
        (0, routes_1.save)(req2, res2);
        assert.deepStrictEqual(res2._getStatusCode(), 200);
        assert.deepStrictEqual(res2._getData(), { name: 'File saved successfully' });
        const req1 = httpMocks.createRequest({ method: 'GET', url: '/api/close', query: { name: 'file1' } });
        const res1 = httpMocks.createResponse();
        (0, routes_1.close)(req1, res1);
        assert.deepStrictEqual(res1._getStatusCode(), 200);
        assert.deepStrictEqual(res1._getData(), { ans: ["file1"] });
        (0, routes_1.resetSavesForTesting)();
    });
    it('loadFile', function () {
        const req2 = httpMocks.createRequest({ method: 'POST', url: '/api/save', query: { name: 'file1' }, body: { design: { kind: "solid", color: "white" } } });
        const res2 = httpMocks.createResponse();
        (0, routes_1.save)(req2, res2);
        assert.deepStrictEqual(res2._getStatusCode(), 200);
        assert.deepStrictEqual(res2._getData(), { name: 'File saved successfully' });
        const req1 = httpMocks.createRequest({ method: 'GET', url: '/api/loadFile', query: { name: 'file1' } });
        const res1 = httpMocks.createResponse();
        (0, routes_1.loadFile)(req1, res1);
        assert.deepStrictEqual(res1._getStatusCode(), 200);
        assert.deepStrictEqual(res1._getData(), { fileName: 'file1', design: { kind: "solid", color: "white" } });
        (0, routes_1.resetSavesForTesting)();
        // const req4 = httpMocks.createRequest(
        //   {method: 'GET', url: '/api/loadFile', query: {name: undefined}}); 
        // const res4 = httpMocks.createResponse();
        // loadFile(req4, res4);
        // assert.deepStrictEqual(res1._getStatusCode(), 400);
        // resetSavesForTesting();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcm91dGVzX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFpQztBQUNqQywyREFBNkM7QUFDN0MscUNBQThFO0FBQzlFLHNDQUFzQztBQUd0QyxRQUFRLENBQUMsUUFBUSxFQUFFO0lBRWpCLHNCQUFzQjtJQUN0Qiw4Q0FBOEM7SUFDOUMsNENBQTRDO0lBQzVDLEtBQUs7SUFFTCxxQkFBcUI7SUFDckIsdUVBQXVFO0lBQ3ZFLHFDQUFxQztJQUNyQyxNQUFNO0lBRU4saUVBQWlFO0lBQ2pFLEVBQUUsQ0FBQyxPQUFPLEVBQUU7UUFDViwyRUFBMkU7UUFDM0UsMERBQTBEO1FBRTFELDZGQUE2RjtRQUM3RixNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsYUFBYTtRQUNoQyxpRkFBaUY7UUFDakYsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxFQUFDLENBQUMsQ0FBQztRQUNoRSxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEMsb0VBQW9FO1FBQ3BFLElBQUEsY0FBSyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsQix3Q0FBd0M7UUFDeEMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkQsdUNBQXVDO1FBQ3ZDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUMsUUFBUSxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQyxDQUFDLENBQUM7SUFHSCxrQ0FBa0M7SUFDbEMsRUFBRSxDQUFDLE1BQU0sRUFBRTtRQUNULE1BQU0sSUFBSSxHQUFH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