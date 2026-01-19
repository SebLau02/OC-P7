String.prototype.toPlural = function (count, singular, plural) {
  return count > 1 ? plural : singular;
};
