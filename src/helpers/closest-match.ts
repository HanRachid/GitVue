
const distance = function (a: string, b: string) {
	let _a;
	if (a.length === 0) {
		return b.length;
	}

	if (b.length === 0) {
		return a.length;
	}

	if (a.length > b.length) {
		_a = [b, a];
		a = _a[0];
		b = _a[1];
	}

	const row = [];
	for (let i = 0; i <= a.length; i++) {
		row[i] = i;
	}

	for (let i = 1; i <= b.length; i++) {
		let previous = i;
		for (let j = 1; j <= a.length; j++) {
			let value = 0;
			value = b.charAt(i - 1) === a.charAt(j - 1) ? row[j - 1] : Math.min(row[j - 1] + 1, previous + 1, row[j] + 1);
			row[j - 1] = previous;
			previous = value;
		}

		row[a.length] = previous;
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
export default function matchRepos(string_: string, array: string[]) {
	const closeMatches: string[] = [];

	for (const element of array) {
		if (
			element.toLowerCase().includes(string_.toLowerCase())
      && closeMatches.length < 8
		) {
			closeMatches.push(element);
		}
	}

	for (const element of array) {
		const splitmatch = distance(string_, element.slice(0, Math.max(0, string_.length)));

		if (
			splitmatch <= 3
      && closeMatches.length < 8
      && !element.toLowerCase().includes(string_.toLowerCase())
		) {
			closeMatches.push(element);
		}
	}

	return closeMatches;
}
