import { http } from "@/api";
import { Countries_Request } from "@proto/utility";

const countries = async (data: Countries_Request) => http("GET", "/country", { params: data });

export { countries };
