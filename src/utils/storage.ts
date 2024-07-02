// https://github.com/someGenki/vue-lite-admin/blob/main/src/utils/storage.js

const invalids = [undefined, null, "undefined", "null"];

export function getStorage(key: string) {
  return localStorage.getItem(key) as string;
}

export function setStorage(key: string, val: string) {
  localStorage.setItem(key, val);
}

export function removeStorage(key: string) {
  localStorage.removeItem(key);
}

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

export function getSetting(key: string, defVal: string = ""): string {
  const item = localStorage.getItem(key);
  if (item !== null && item !== undefined) {
    return JSON.parse(item);
  }
  return defVal;
}
