// https://github.com/someGenki/vue-lite-admin/blob/main/src/utils/storage.js

const invalids = [undefined, null, "undefined", "null"];

/**
 * Retrieve a value from the browser's localStorage based on the provided key.
 * @param key - The key for the value to retrieve.
 * @returns The retrieved value, assumed to be of type string.
 */
export function getStorage(key: string) {
  return localStorage.getItem(key) as string;
}

/**
 * Set a value in the browser's localStorage.
 * @param key - The key to use when storing the value.
 * @param val - The value to store.
 */
export function setStorage(key: string, val: string) {
  localStorage.setItem(key, val);
}

/**
 * Remove a value from the browser's localStorage.
 * @param key - The key for the value to remove.
 */
export function removeStorage(key: string) {
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
    console.warn("Don't use an invalid value!");
    return;
  }
  localStorage.setItem(key, JSON.stringify(val));
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
  const item = localStorage.getItem(key);
  if (item !== null && item !== undefined) {
    return JSON.parse(item);
  }
  return defVal;
}
