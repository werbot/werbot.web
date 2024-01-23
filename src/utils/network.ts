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
      return "IPv4";
    } else if (kind === "ipv6") {
      return "IPv6";
    } else {
      throw new Error("Invalid address kind");
    }
  } catch (err) {
    return "Hostname";
  }
}
