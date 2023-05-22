import WPAPI from "wpapi";
import { API_URL_LOCAL_WIN_WP } from "../constants";

// THIS THE TEST WORDPRESS INSTALL IN LOCAL
const RESTROOT = API_URL_LOCAL_WIN_WP;
export const wp = new WPAPI({
  endpoint: RESTROOT,
});
