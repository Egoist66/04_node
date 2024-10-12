import fs from 'fs/promises'
/**
 * Searches the given array for an element with a property equal to the given value.
 * @param {any[]} arr - The array to search.
 * @param {string|number} key - The property to search for.
 * @param {string|number} byKeyVal - The value to search for.
 * @returns {T|null} The element found, or null if no element was found.
 */
export function findOrNone<T = null>(arr: any, key: any, byKeyVal: any): T | null {
    return arr.find((item: any) => item[key] === byKeyVal) || null
}


/**
 * Searches the given object for a property with the given key, and returns the value of that property as an array.
 * @param {any} data - The object to search.
 * @param {string|number} key - The key to search for.
 * @returns {T[]|null} The array of values found, or null if no property was found.
 */
export function findByQueryOrNone<T = null>(data: any, byKeyVal: any): T[] | null {
    if(Object.keys(data).includes(byKeyVal)) {
        return data[byKeyVal]
    }
    return null
   
}

export async function queryData<T>(path: string, format: '.ts' | '.js' | '.json'): Promise<T | null> {
    if(!fs.glob(path + format)) {
        return null
    }
    else {
        return await import(`../data/${path}.json`)
    }

}