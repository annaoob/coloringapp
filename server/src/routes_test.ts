import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import { dummy, resetSavesForTesting, save, loadFile, close } from './routes';
//import { get_value } from "./assoc";


describe('routes', function() {

  // const mockSaved = {
  //   "file1": {kind: "solid", color: "white"},
  //   "file2": {kind: "solid", color: "pink"}
  // };

  // beforeEach(() => {
  //   // Reset or mock `saved` data before each test to ensure isolation
  //   Object.assign(saved, mockSaved);
  // });

  // After you know what to do, feel free to delete this Dummy test
  it('dummy', function() {
    // You can copy this test structure to start your own tests, these comments
    // are included as a reminder of how testing routes works:

    // httpMocks lets us create mock Request and Response params to pass into our route functions
    const req1 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'GET', url: '/api/dummy', query: {name: 'Kevin'}}); 
    const res1 = httpMocks.createResponse();
    // call our function to execute the request and fill in the response
    dummy(req1, res1);
    // check that the request was successful
    assert.deepStrictEqual(res1._getStatusCode(), 200);
    // and the response data is as expected
    assert.deepStrictEqual(res1._getData(), {greeting: 'Hi, Kevin'});
  });


  // TODO: add tests for your routes
  it('save', function() {
    const req1 = httpMocks.createRequest(
      {method: 'POST', url: '/api/save', query: {name: 'file1'}, body: {kind: "solid", color: "white"}}); 
    const res1 = httpMocks.createResponse();
    save(req1, res1);
    assert.deepStrictEqual(res1._getStatusCode(), 200);
    assert.deepStrictEqual(res1._getData(), {name: 'File saved successfully'});
    resetSavesForTesting();
  });

  it('close', function() {
    const req2 = httpMocks.createRequest(
      {method: 'POST', url: '/api/save', query: {name: 'file1'}, body: {design: {kind: "solid", color: "white"}}}); 
    const res2 = httpMocks.createResponse();
    save(req2, res2);
    assert.deepStrictEqual(res2._getStatusCode(), 200);
    assert.deepStrictEqual(res2._getData(), {name: 'File saved successfully'});
    const req1 = httpMocks.createRequest(
      {method: 'GET', url: '/api/close', query: {name: 'file1'}}); 
    const res1 = httpMocks.createResponse();
    close(req1, res1);
    assert.deepStrictEqual(res1._getStatusCode(), 200);
    assert.deepStrictEqual(res1._getData(), {ans: ["file1"]});
    resetSavesForTesting();
  });

  it('loadFile', function() {
    const req2 = httpMocks.createRequest(
      {method: 'POST', url: '/api/save', query: {name: 'file1'}, body: {design: {kind: "solid", color: "white"}}}); 
    const res2 = httpMocks.createResponse();
    save(req2, res2);
    assert.deepStrictEqual(res2._getStatusCode(), 200);
    assert.deepStrictEqual(res2._getData(), {name: 'File saved successfully'});
    const req1 = httpMocks.createRequest(
      {method: 'GET', url: '/api/loadFile', query: {name: 'file1'}}); 
    const res1 = httpMocks.createResponse();
    loadFile(req1, res1);
    assert.deepStrictEqual(res1._getStatusCode(), 200);
    assert.deepStrictEqual(res1._getData(), {fileName: 'file1', design: {kind: "solid", color: "white"}});
    resetSavesForTesting();

    // const req4 = httpMocks.createRequest(
    //   {method: 'GET', url: '/api/loadFile', query: {name: undefined}}); 
    // const res4 = httpMocks.createResponse();
    // loadFile(req4, res4);
    // assert.deepStrictEqual(res1._getStatusCode(), 400);
    // resetSavesForTesting();

  });

});
