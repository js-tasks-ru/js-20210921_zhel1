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

	const chain = String(path).split('.');

	return function f(obj) {
		if (obj === undefined)
			return;
		if (chain.length !== 0) {
			return f(obj[chain.shift()]);
		} else {
			return obj;
		}
	}
}
