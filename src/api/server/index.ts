import { http } from "@/api";
import {
  ListServers_Request,
  Server_Request,
  AddServer_Request,
  UpdateServer_Request,
  DeleteServer_Request,
  ServerNameByID_Request,
  ServerAccess_Request,
  UpdateServerAccess_Request,
  ServerActivity_Request,
  UpdateServerActivity_Request,
} from "@proto/server";
import {
  ServerFirewall_Request,
  AddServerFirewall_Request,
  UpdateServerFirewall_Request,
  DeleteServerFirewall_Request,
} from "@proto/firewall";

enum URL {
  servers = "/v1/servers",
}

const servers = async (user_id: string, project_id: string, data?: ListServers_Request) =>
  http("GET", URL.servers, {
    params: {
      limit: data?.limit,
      offset: data?.offset,
      user_id: user_id,
      project_id: project_id,
    },
  });

const server = async (data: Server_Request) => http("GET", URL.servers, { params: data });

const addServer = async (data: AddServer_Request) => http("POST", URL.servers, { data: data });

const updateServer = async (data: UpdateServer_Request) =>
  http("PATCH", URL.servers, { data: data });

const deleteServer = async (data: DeleteServer_Request) =>
  http("DELETE", URL.servers, { data: data });

const serverNameByID = async (data: ServerNameByID_Request) =>
  http("GET", URL.servers + "/name", { params: data });

// access section
const access = async (data: ServerAccess_Request) =>
  http("GET", URL.servers + "/access", { params: data });

const updateAccess = async (data: UpdateServerAccess_Request) =>
  http("PATCH", URL.servers + "/access", { data: data });
// ----

// activity section
const activity = async (data: ServerActivity_Request) =>
  http("GET", URL.servers + "/activity", { params: data });

const updateActivity = async (data: UpdateServerActivity_Request) =>
  http("PATCH", URL.servers + "/activity", { data: data });
// ----

// firewall section
const firewall = async (data: ServerFirewall_Request) =>
  http("GET", URL.servers + "/firewall", { params: data });

const addFirewall = async (data: AddServerFirewall_Request) =>
  http("POST", URL.servers + "/firewall", { data: data });

const updateFirewall = async (data: UpdateServerFirewall_Request) =>
  http("PATCH", URL.servers + "/firewall", { data: data });

const deleteFirewall = async (data: DeleteServerFirewall_Request) =>
  http("DELETE", URL.servers + "/firewall", { data: data });
// ----

export {
  servers,
  server,
  addServer,
  updateServer,
  deleteServer,
  serverNameByID,
  access,
  updateAccess,
  activity,
  updateActivity,
  firewall,
  addFirewall,
  updateFirewall,
  deleteFirewall,
};
