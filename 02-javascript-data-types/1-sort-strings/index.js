/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    if (param === 'asc') {
        return arr.concat().sort((a, b) => a.localeCompare(b, 'ru-RUen-GB', {sensitivity: 'variant', caseFirst: 'upper'}));
    } else if (param === 'desc') {
        return arr.concat().sort((a, b) => b.localeCompare(a, 'ru-RUen-GB', {sensitivity: 'variant', caseFirst: 'upper'}));
    } else {
        console.log('param is incorrect');
        return arr.concat();
    }
}
