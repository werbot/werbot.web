import * as ipaddr from "ipaddr.js";

type AddressType = "IPv4" | "IPv6" | "Hostname" | "Error";

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
