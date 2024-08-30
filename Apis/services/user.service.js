import { urls } from "../urls";
import { httpClient } from "../client";

export async function getUserInfo() {
  const response = await httpClient().get(urls.user);
  return response.data;
}
