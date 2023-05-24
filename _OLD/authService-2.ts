import WPAPI from "wpapi";

export interface User {
  token?: string;
  email?: string;
  nicename?: string;
  displayName?: string;
}

const RESTROOT = "http://wp-jwt-win.local/wp-json";
const wp = new WPAPI({ endpoint: RESTROOT });
wp.login = wp.registerRoute("jwt-auth/v1", "/token");

export const loginToWP = async (
  username: string,
  password: string
): Promise<User> => {
  console.log("authService: username", username);
  console.log("authService: password", password);

  let user: User = { token: "", email: "", nicename: "", displayName: "" };

  try {
    user = await wp
      .login()
      .create(`username=${username}&password=${password}`, (res: User) => {});
    console.log("TOKEN: ", user.token);
    // sessionStorage.setItem("wpJWTToken", JSON.stringify(res.token));
  } catch (error) {
    console.log(error);
  }

  console.log("User:", user);
  return user;
};
