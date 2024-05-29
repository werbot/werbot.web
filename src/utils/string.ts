export function decodeBase64(encodedString: string): string {
  try {
    return atob(encodedString);
  } catch (e) {
    console.error('Error decoding Base64 string:', e);
    return '';
  }
}
