import { http } from "@/api";
import {
  ListKeys_Request,
  Key_Request,
  AddKey_Request,
  UpdateKey_Request,
  DeleteKey_Request,
} from "@proto/key";

enum URL {
  keys = "/v1/keys",
}

const getKeys = async (data?: ListKeys_Request, user_id?: string) =>
  http("GET", URL.keys, {
    params: {
      limit: data?.limit,
      offset: data?.offset,
      user_id: user_id,
    },
  });

const getKey = async (data: Key_Request) => http("GET", URL.keys, { params: data });

const postKey = async (data: AddKey_Request) => http("POST", URL.keys, { data: data });

const updateKey = async (data: UpdateKey_Request) => http("PATCH", URL.keys, { data: data });

const deleteKey = async (data: DeleteKey_Request) => http("DELETE", URL.keys, { params: data });

const newKey = async () => http("GET", URL.keys + "/generate");

export { getKeys, getKey, postKey, updateKey, deleteKey, newKey };
