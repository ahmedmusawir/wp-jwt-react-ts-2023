export const API_URL_LOCAL_WIN_WP = "http://wp-jwt-win.local/wp-json";
export const API_URL_SELFLIST_STG =
  "http://selflist.cyberizestaging.com/wp-json";
export const API_URL_WIN_VM = "http://jwtwp.local/wp-json";

// export interface User {
//   token?: string;
//   email?: string;
//   nicename?: string;
//   displayName?: string;
// }

export interface User {
  token?: string;
  user_email?: string;
  user_nicename?: string;
  user_display_name?: string;
}
