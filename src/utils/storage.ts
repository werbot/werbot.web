// https://github.com/someGenki/vue-lite-admin/blob/main/src/utils/storage.js

const invalids = [undefined, null, "undefined", "null"];

/**
 * Retrieve a value from the browser's localStorage based on the provided key.
 * @param key - The key for the value to retrieve.
 * @returns The retrieved value, assumed to be of type string.
 */
export function getStorage(key: string) {
  // Retrieve the stored value from localStorage based on the provided key and assume it to be of type string using the `as` keyword.
  return localStorage.getItem(key) as string;
}

/**
 * Set a value in the browser's localStorage.
 * @param key - The key to use when storing the value.
 * @param val - The value to store.
 */
export function setStorage(key: string, val: string) {
  // Use the "setItem" method of the "localStorage" object to store the given value under the given key.
  localStorage.setItem(key, val);
}

/**
 * Remove a value from the browser's localStorage.
 * @param key - The key for the value to remove.
 */
export function removeStorage(key: string) {
  // Use the "removeItem" method of the "localStorage" object to remove the value associated with the given key.
  localStorage.removeItem(key);
}

/**
 * Saves a value to local storage with a given key.
 * If the value is invalid, it logs a warning message and returns without saving.
 *
 * @param key - The key under which to save the value.
 * @param val - The value to save.
 */
export function saveSetting(key: string, val: string) {
  if (invalids.includes(val)) {
    // Check if the value is invalid.
    console.warn("Don't use an invalid value!"); // Log a warning message if the value is invalid.
    return; // Return without saving if the value is invalid.
  }

  localStorage.setItem(key, JSON.stringify(val)); // Save the value to local storage.
}

export function batchSaveSetting(keys: any, obj: any) {
  keys.forEach((key: string) => saveSetting(key, obj[key]));
}

/**
 * Retrieve a setting from local storage by key.
 * @param key The key to retrieve the setting for.
 * @param defVal The default value to return if no saved value is found. Defaults to an empty string.
 * @returns The saved value as a string, or the default value if none is found.
 */
export function getSetting(key: string, defVal: string = ""): string {
  // Get the saved value from local storage by key.
  const item = localStorage.getItem(key);

  // If the saved value is not null or undefined, parse and return it.
  if (item !== null && item !== undefined) {
    return JSON.parse(item);
  }

  // If no saved value was found, return the default value.
  return defVal;
}
