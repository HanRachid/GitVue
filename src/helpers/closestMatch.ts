const distance = function (a: any, b: any) {
  var _a;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  if (a.length > b.length) (_a = [b, a]), (a = _a[0]), (b = _a[1]);
  var row = [];
  for (var i = 0; i <= a.length; i++) row[i] = i;
  for (var i = 1; i <= b.length; i++) {
    var prev = i;
    for (var j = 1; j <= a.length; j++) {
      var val: any = void 0;
      if (b.charAt(i - 1) === a.charAt(j - 1)) val = row[j - 1];
      else val = Math.min(row[j - 1] + 1, prev + 1, row[j] + 1);
      row[j - 1] = prev;
      prev = val;
    }
    row[a.length] = prev;
  }
  return row[a.length];
};

/**
 * Finds results from repos using levenchtein distance.
 * This function first tries to find results that include the str, then uses Levenchtein
 * @param str str to find in array
 * @param array array to find results from
 * @returns results of search
 */
export default function matchRepos(str: any, array: any) {
  const closeMatches: any = [];

  array.forEach((element: any) => {
    if (element.toLowerCase().includes(str.toLowerCase())) {
      closeMatches.push(element);
    }
  });
  array.forEach((element: any) => {
    const splitmatch = distance(str, element.substring(0, str.length));

    if (
      splitmatch <= 3 &&
      closeMatches.length < 8 &&
      !element.toLowerCase().includes(str.toLowerCase())
    ) {
      closeMatches.push(element);
    }
  });

  return closeMatches;
}
