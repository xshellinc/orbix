var assert = require('assert');
var ness = require('..');

describe('test', function() {
  it('evaluates zero to true', function() {
    assert.strictEqual(ness(0).test(), true);
  });

  it('evaluates empty string to true', function() {
    assert.strictEqual(ness('').test(), true);
  });

  it('evaluates NaN to true', function() {
    assert.strictEqual(ness(NaN).test(), true);
  });

  it('evaluates false to false', function() {
    assert.strictEqual(ness(false).test(), false);
  });

  it('evaluates null to false', function() {
    assert.strictEqual(ness(null).test(), false);
  });

  it('evaluates undefined to false', function() {
    assert.strictEqual(ness(undefined).test(), false);
  });

  it('evaluates everything else to true', function() {
    assert.strictEqual(ness('trueness').test(), true);
  });
});

describe('logical `and` with true subject', function() {
  var value;

  beforeEach(function() {
    value = ness(0);
  });

  it('is true when param is true', function() {
    assert.strictEqual(value.and(0), true);
    assert.strictEqual(value.and(''), true);
    assert.strictEqual(value.and(NaN), true);
    assert.strictEqual(value.and('trueness'), true);
  });

  it('is false when param is false', function() {
    assert.strictEqual(value.and(false), false);
    assert.strictEqual(value.and(null), false);
    assert.strictEqual(value.and(undefined), false);
  });
});

describe('logical `and` with false subject', function() {
  var value;

  beforeEach(function() {
    value = ness(false);
  });

  it('always evaluates to false', function() {
    assert.strictEqual(value.and(0), false);
    assert.strictEqual(value.and(''), false);
    assert.strictEqual(value.and(NaN), false);
    assert.strictEqual(value.and('trueness'), false);
    assert.strictEqual(value.and(false), false);
    assert.strictEqual(value.and(null), false);
    assert.strictEqual(value.and(undefined), false);
  });
});

describe('logical `or` with true subject', function() {
  var value;

  beforeEach(function() {
    value = ness(0);
  });

  it('always evaluates to true', function() {
    assert.strictEqual(value.or(0), true);
    assert.strictEqual(value.or(''), true);
    assert.strictEqual(value.or(NaN), true);
    assert.strictEqual(value.or('trueness'), true);
    assert.strictEqual(value.or(false), true);
    assert.strictEqual(value.or(null), true);
    assert.strictEqual(value.or(undefined), true);
  });
});

describe('logical `or` with false subject', function() {
  var value;

  beforeEach(function() {
    value = ness(false);
  });

  it('is true when param is true', function() {
    assert.strictEqual(value.or(0), true);
    assert.strictEqual(value.or(''), true);
    assert.strictEqual(value.or(NaN), true);
    assert.strictEqual(value.or('trueness'), true);
  });

  it('is false when param is false', function() {
    assert.strictEqual(value.or(false), false);
    assert.strictEqual(value.or(null), false);
    assert.strictEqual(value.or(undefined), false);
  });
});

describe('logical `not`', function() {
  it('evaluates true value to false', function() {
    assert.strictEqual(ness(true).not(), false);
  });

  it('evaluates false value to true', function() {
    assert.strictEqual(ness(false).not(), true);
  });
});
