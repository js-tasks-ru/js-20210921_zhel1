/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
	if (typeof path !== 'string') {
		console.error("/'path/' is not a string." )
		return;
	}

	const chain = path.split('.');

	return function (obj) {
		let result = obj;
		for (const step of chain) {
			if (result === undefined)
				return;
			result = result[step];
		}
		return result;
	}
}

