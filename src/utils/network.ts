import * as ipaddr from "ipaddr.js";

type AddressType = "IPv4" | "IPv6" | "Hostname" | "Error";

/**
 * Returns the type of an address in string format.
 * @param addr - The address to parse.
 * @returns If the address is an IPv4 address, 'IPv4' is returned. If the address is an IPv6 address, 'IPv6' is returned.
 * If the address is neither IPv4 nor IPv6 and the parsing fails, 'Hostname' is returned. If an error other than parsing occurs,
 * 'Error' is returned.
 */
export function getAddressType(addr: string): AddressType {
  try {
    const parse_addr = ipaddr.parse(addr); // Parse the address using the ipaddr.js library.
    const kind = parse_addr.kind(); // Determine the kind of the parsed address.

    if (kind === "ipv4") {
      // If it's an IPv4 address,
      return "IPv4"; // Return 'IPv4'.
    } else if (kind === "ipv6") {
      // Otherwise, if it's an IPv6 address,
      return "IPv6"; // Return 'IPv6'.
    } else {
      // If it's neither IPv4 nor IPv6,
      throw new Error("Invalid address kind"); // Throw an error with a descriptive message.
    }
  } catch (err) {
    // If the parsing fails for some reason,
    return "Hostname"; // Assume that it's a hostname and return 'Hostname'.
  }
}
