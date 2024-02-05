import { http } from "@/api";
import { Events_Request } from "@proto/event";

enum URL {
  event = "/v1/event",
}

const getEvents = async (name: string, name_id: string, data?: Events_Request) =>
  http("GET", URL.event + "/" + name + "/" + name_id, {
    params: {
      limit: data?.limit,
      offset: data?.offset,
    },
  });

const getEvent = async (name: string, name_id: string, event_id: string) =>
  http("GET", URL.event + "/" + name + "/" + name_id + "/" + event_id);

export { getEvents, getEvent };
