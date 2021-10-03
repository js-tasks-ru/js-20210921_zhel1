/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
	if (size === 0)
		return '';

	if (size === undefined)
		return string;

	let currentCount = 0;
	let previousChar;

	for (let i = 0; i < string.length + 1; i++) {
		let char = string[i];
		if (char === previousChar || previousChar === undefined) {
			currentCount++;
		} else {
			if (currentCount > size) {
				string = string.replace(previousChar.repeat(currentCount), previousChar.repeat(size));
				i = i - (currentCount - size);
			}
			currentCount = 1;
		}
		previousChar = char;
	}

	return string;
}