export function decodeBase64(base64String: string): string {
  try {
    return atob(base64String);
  } catch (e) {
    return "";
  }
}
