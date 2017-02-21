function ness(value) {
  if(this instanceof ness) {
    this.value = value;
  } else {
    return new ness(value);
  }
}

ness.prototype.test = function() {
  return !this.false();
};

ness.prototype.false = function() {
  return !!~[null, undefined, false].indexOf(this.value);
};

ness.prototype.and = function(other) {
  return this.test() && ness(other).test();
};

ness.prototype.or = function(other) {
  return this.test() || ness(other).test();
};

ness.prototype.not = function() {
  return !this.test();
};

exports = module.exports = ness;
