/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    const orders = {
        asc: 0,
        desc: 1
    }

    const order = orders[param];

    if (order === 0) {
        return arr.concat().sort((a, b) => a.localeCompare(b, ['ru', 'en'], {sensitivity: 'variant', caseFirst: 'upper'}));
    } else if (order === 1) {
        return arr.concat().sort((a, b) => b.localeCompare(a, ['ru', 'en'], {sensitivity: 'variant', caseFirst: 'upper'}));
    } else {
        console.log('param is incorrect');
        return arr.concat();
    }
}
