import * as assert from 'assert';
import { solid, split, toJson, fromJson, replaceSquare, findSquare } from './square';
import { nil, cons } from './list';


describe('square', function() {

  it('findSquare', function() {
    // TODO: write tests for findSquare() here
    // Statement coverage: (nil, solid("white")) executes first return
    // (cons("NW", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green"))) executes second return
    // (cons("NE", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green"))) executes third return
    // (cons("SW", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green"))) executes fourth return
    // (cons("SE", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green"))) executes fifth return
    assert.deepStrictEqual(findSquare(nil, solid("white")), solid("white"));
    assert.deepStrictEqual(findSquare(cons("NW", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green"))), solid("white"));
    assert.deepStrictEqual(findSquare(cons("NE", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green"))), solid("yellow"));
    assert.deepStrictEqual(findSquare(cons("SW", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green"))), solid("orange"));
    assert.deepStrictEqual(findSquare(cons("SE", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green"))), solid("green"));

    // Branch coverage, covered above, (nil, solid("white")) executes first branch
    // (cons("NW", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green"))) executes second branch
    // (cons("NE", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green"))) executes third branch
    // (cons("SW", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green"))) executes fourth branch
    // (cons("SE", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green"))) executes fifth branch
    
    // Loop/recursion coverage, 0 case: covered above by (nil, solid("white"))
    // Loop/recursion coverage, 1 case: covered above by:
    // (cons("NW", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green")))
    // (cons("NE", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green")))
    // (cons("SW", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green")))
    // (cons("SE", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green")))
    
    // Loop/recursion coverage, many case: covered by:
    // (cons("NW", cons("NW", nil)), split(split(solid("white"), solid("blue"), solid("blue"), solid("blue")), 
      // split(solid("yellow"), solid("white"), solid("yellow"), solid("yellow")), 
      // split(solid("orange"), solid("orange"), solid("white"), solid("orange")), 
      // split(solid("green"), solid("green"), solid("green"), solid("white"))))
    // (cons("NE", cons("NE", nil)), split(split(solid("white"), solid("blue"), solid("blue"), solid("blue")), 
      // split(solid("yellow"), solid("white"), solid("yellow"), solid("yellow")), 
      // split(solid("orange"), solid("orange"), solid("white"), solid("orange")), 
      // split(solid("green"), solid("green"), solid("green"), solid("white"))))
    // (cons("SW", cons("SW", nil)), split(split(solid("white"), solid("blue"), solid("blue"), solid("blue")), 
      // split(solid("yellow"), solid("white"), solid("yellow"), solid("yellow")), 
      // split(solid("orange"), solid("orange"), solid("white"), solid("orange")), 
      // split(solid("green"), solid("green"), solid("green"), solid("white"))))
    // (cons("SE", cons("SE", nil)), split(split(solid("white"), solid("blue"), solid("blue"), solid("blue")), 
      // split(solid("yellow"), solid("white"), solid("yellow"), solid("yellow")), 
      // split(solid("orange"), solid("orange"), solid("white"), solid("orange")), 
      // split(solid("green"), solid("green"), solid("green"), solid("white"))))
    
    assert.deepStrictEqual(findSquare(cons("NW", cons("NW", nil)), 
      split(split(solid("white"), solid("blue"), solid("blue"), solid("blue")), 
      split(solid("yellow"), solid("white"), solid("yellow"), solid("yellow")), 
      split(solid("orange"), solid("orange"), solid("white"), solid("orange")), 
      split(solid("green"), solid("green"), solid("green"), solid("white")))), 
      solid("white"));

    assert.deepStrictEqual(findSquare(cons("NE", cons("NE", nil)), 
      split(split(solid("white"), solid("blue"), solid("blue"), solid("blue")), 
      split(solid("yellow"), solid("white"), solid("yellow"), solid("yellow")), 
      split(solid("orange"), solid("orange"), solid("white"), solid("orange")), 
      split(solid("green"), solid("green"), solid("green"), solid("white")))), 
      solid("white"));

    assert.deepStrictEqual(findSquare(cons("SW", cons("SW", nil)), 
      split(split(solid("white"), solid("blue"), solid("blue"), solid("blue")), 
      split(solid("yellow"), solid("white"), solid("yellow"), solid("yellow")), 
      split(solid("orange"), solid("orange"), solid("white"), solid("orange")), 
      split(solid("green"), solid("green"), solid("green"), solid("white")))), 
      solid("white"));

    assert.deepStrictEqual(findSquare(cons("SE", cons("SE", nil)), 
      split(split(solid("white"), solid("blue"), solid("blue"), solid("blue")), 
      split(solid("yellow"), solid("white"), solid("yellow"), solid("yellow")), 
      split(solid("orange"), solid("orange"), solid("white"), solid("orange")), 
      split(solid("green"), solid("green"), solid("green"), solid("white")))), 
      solid("white"));

    // Below is a provided test with an example of the notation for tests
    // that verify that an Error is thrown. assert.throws() takes a _function_
    // that, when executed, should result in an Error
    //
    // Uncomment this and the test for ReplaceSquare and make sure they pass
    // Branch coverage: this test covers the error case
    // Statement coverage: this test covers the error case
    assert.throws(() => findSquare(cons("NW", nil), solid("blue")));
  });

  it('replaceSquare', function() {
    // TODO: write tests for replaceSquare() here
    // Statement coverage: (nil, solid("white"), solid("pink")) executes first return
    // (cons("NW", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green"))) executes second return
    // (cons("NE", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green"))) executes third return
    // (cons("SW", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green"))) executes fourth return
    // (cons("SE", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green"))) executes fifth return
    assert.deepStrictEqual(replaceSquare(nil, solid("white"), solid("pink")), solid("white"));
    assert.deepStrictEqual(replaceSquare(cons("NW", nil), solid("white"), 
      split(solid("blue"), solid("yellow"), solid("orange"), solid("green"))), 
      split(solid("white"), solid("yellow"), solid("orange"), solid("green")));
    assert.deepStrictEqual(replaceSquare(cons("NE", nil), solid("white"), 
      split(solid("blue"), solid("yellow"), solid("orange"), solid("green"))), 
      split(solid("blue"), solid("white"), solid("orange"), solid("green")));
    assert.deepStrictEqual(replaceSquare(cons("SW", nil), solid("white"), 
      split(solid("blue"), solid("yellow"), solid("orange"), solid("green"))), 
      split(solid("blue"), solid("yellow"), solid("white"), solid("green")));
    assert.deepStrictEqual(replaceSquare(cons("SE", nil), solid("white"), 
      split(solid("blue"), solid("yellow"), solid("orange"), solid("green"))), 
      split(solid("blue"), solid("yellow"), solid("orange"), solid("white")));

    // Branch coverage, covered above, (nil, solid("white"), solid("pink")) executes first branch
    // (cons("NW", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green"))) executes second branch
    // (cons("NE", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green"))) executes third branch
    // (cons("SW", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green"))) executes fourth branch
    // (cons("SE", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green"))) executes fifth branch
    
    // Loop/recursion coverage, 0 case: covered above by (nil, solid("white"), solid("pink"))
    // Loop/recursion coverage, 1 case: covered above by:
    // (cons("NW", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green")))
    // (cons("NE", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green")))
    // (cons("SW", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green")))
    // (cons("SE", nil), split(solid("white"), solid("yellow"), solid("orange"), solid("green")))
    
    // Loop/recursion coverage, many case: covered by:
    // (cons("NW", cons("NW", nil)), solid("pink"), split(split(solid("white"), solid("blue"), solid("blue"), solid("blue")), 
      // split(solid("yellow"), solid("white"), solid("yellow"), solid("yellow")), 
      // split(solid("orange"), solid("orange"), solid("white"), solid("orange")), 
      // split(solid("green"), solid("green"), solid("green"), solid("white"))))
    // (cons("NE", cons("NE", nil)), solid("pink"), split(split(solid("white"), solid("blue"), solid("blue"), solid("blue")), 
      // split(solid("yellow"), solid("white"), solid("yellow"), solid("yellow")), 
      // split(solid("orange"), solid("orange"), solid("white"), solid("orange")), 
      // split(solid("green"), solid("green"), solid("green"), solid("white"))))
    // (cons("SW", cons("SW", nil)), solid("pink"), split(split(solid("white"), solid("blue"), solid("blue"), solid("blue")), 
      // split(solid("yellow"), solid("white"), solid("yellow"), solid("yellow")), 
      // split(solid("orange"), solid("orange"), solid("white"), solid("orange")), 
      // split(solid("green"), solid("green"), solid("green"), solid("white"))))
    // (cons("SE", cons("SE", nil)), solid("pink"), split(split(solid("white"), solid("blue"), solid("blue"), solid("blue")), 
      // split(solid("yellow"), solid("white"), solid("yellow"), solid("yellow")), 
      // split(solid("orange"), solid("orange"), solid("white"), solid("orange")), 
      // split(solid("green"), solid("green"), solid("green"), solid("white"))))
    
    assert.deepStrictEqual(replaceSquare(cons("NW", cons("NW", nil)), solid("pink"),
      split(split(solid("white"), solid("blue"), solid("blue"), solid("blue")), 
        split(solid("yellow"), solid("white"), solid("yellow"), solid("yellow")), 
        split(solid("orange"), solid("orange"), solid("white"), solid("orange")), 
        split(solid("green"), solid("green"), solid("green"), solid("white")))), 
      split(split(solid("pink"), solid("blue"), solid("blue"), solid("blue")), 
        split(solid("yellow"), solid("white"), solid("yellow"), solid("yellow")), 
        split(solid("orange"), solid("orange"), solid("white"), solid("orange")), 
        split(solid("green"), solid("green"), solid("green"), solid("white"))));

    assert.deepStrictEqual(replaceSquare(cons("NE", cons("NE", nil)), solid("pink"), 
      split(split(solid("white"), solid("blue"), solid("blue"), solid("blue")), 
        split(solid("yellow"), solid("white"), solid("yellow"), solid("yellow")), 
        split(solid("orange"), solid("orange"), solid("white"), solid("orange")), 
        split(solid("green"), solid("green"), solid("green"), solid("white")))), 
      split(split(solid("white"), solid("blue"), solid("blue"), solid("blue")), 
        split(solid("yellow"), solid("pink"), solid("yellow"), solid("yellow")), 
        split(solid("orange"), solid("orange"), solid("white"), solid("orange")), 
        split(solid("green"), solid("green"), solid("green"), solid("white"))));

    assert.deepStrictEqual(replaceSquare(cons("SW", cons("SW", nil)), solid("pink"), 
      split(split(solid("white"), solid("blue"), solid("blue"), solid("blue")), 
        split(solid("yellow"), solid("white"), solid("yellow"), solid("yellow")), 
        split(solid("orange"), solid("orange"), solid("white"), solid("orange")), 
        split(solid("green"), solid("green"), solid("green"), solid("white")))), 
      split(split(solid("white"), solid("blue"), solid("blue"), solid("blue")), 
        split(solid("yellow"), solid("white"), solid("yellow"), solid("yellow")), 
        split(solid("orange"), solid("orange"), solid("pink"), solid("orange")), 
        split(solid("green"), solid("green"), solid("green"), solid("white"))));

    assert.deepStrictEqual(replaceSquare(cons("SE", cons("SE", nil)), solid("pink"), 
      split(split(solid("white"), solid("blue"), solid("blue"), solid("blue")), 
        split(solid("yellow"), solid("white"), solid("yellow"), solid("yellow")), 
        split(solid("orange"), solid("orange"), solid("white"), solid("orange")), 
        split(solid("green"), solid("green"), solid("green"), solid("white")))), 
      split(split(solid("white"), solid("blue"), solid("blue"), solid("blue")), 
        split(solid("yellow"), solid("white"), solid("yellow"), solid("yellow")), 
        split(solid("orange"), solid("orange"), solid("white"), solid("orange")), 
        split(solid("green"), solid("green"), solid("green"), solid("pink"))));

    // Additional recursive many case test    
    assert.deepStrictEqual(
      replaceSquare(cons("NW", cons("NW", cons("NW", nil))), 
      split(solid("white"), solid("yellow"), solid("pink"), solid("orange")), 
      split(
        split(
          split(solid("white"), solid("white"), solid("white"), solid("white")), 
          solid("white"), solid("white"), solid("white")), 
        solid("white"), solid("white"), solid("white"))), 
    split(split(
        split(
          split(solid("white"), solid("yellow"), solid("pink"), solid("orange")), 
          solid("white"), solid("white"), solid("white")), 
        solid("white"), solid("white"), solid("white")), 
      solid("white"), solid("white"), solid("white")));

    
    assert.throws(() => replaceSquare(cons("SE", nil), solid("orange"), solid("green")));
  });

  it('toJson', function() {
    assert.deepStrictEqual(toJson(solid("white")), "white");
    assert.deepStrictEqual(toJson(solid("green")), "green");

    const s1 = split(solid("blue"), solid("orange"), solid("purple"), solid("white"));
    assert.deepStrictEqual(toJson(s1),
      ["blue", "orange", "purple", "white"]);

    const s2 = split(s1, solid("green"), s1, solid("pink"));
    assert.deepStrictEqual(toJson(s2),
      [["blue", "orange", "purple", "white"], "green",
       ["blue", "orange", "purple", "white"], "pink"]);

    const s3 = split(solid("green"), s1, solid("yellow"), s1);
    assert.deepStrictEqual(toJson(s3),
      ["green", ["blue", "orange", "purple", "white"],
       "yellow", ["blue", "orange", "purple", "white"]]);
  });

  it('fromJson', function() {
    assert.deepStrictEqual(fromJson("white"), solid("white"));
    assert.deepStrictEqual(fromJson("green"), solid("green"));

    const s1 = split(solid("blue"), solid("orange"), solid("purple"), solid("white"));
    assert.deepStrictEqual(fromJson(["blue", "orange", "purple", "white"]), s1);

    assert.deepStrictEqual(
        fromJson([["blue", "orange", "purple", "white"], "green",
                 ["blue", "orange", "purple", "white"], "pink"]),
        split(s1, solid("green"), s1, solid("pink")));

    assert.deepStrictEqual(
        fromJson(["green", ["blue", "orange", "purple", "white"],
                  "yellow", ["blue", "orange", "purple", "white"]]),
        split(solid("green"), s1, solid("yellow"), s1));
  });

});
