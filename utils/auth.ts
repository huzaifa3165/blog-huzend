import Cookies from "js-cookie";
import axios from "axios";
import jwt from "jsonwebtoken";

export const getTokenWithCred = async (email: string, password: string) => {
  try {
    const res = await axios.post(
      "http://127.0.0.1:1337/api/auth/local",
      {
        identifier: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data.jwt;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};

export const getToken = () => {
  return Cookies.get("token");
};

export const removeToken = () => {
  Cookies.remove("token");

  // to support logging out from all windows
  // window.localStorage.setItem("logout", Date.now().toString());
};

export const setToken = (token: string) => {
  console.log(token);
  Cookies.set("token", token, { expires: 30 });
};
const decodeJWT = (token: string, secret: string) => {
  try {
    const decoded = jwt.verify(token, secret);
    if (typeof decoded !== "object") throw new Error("Invalid token");
    return decoded;
  } catch (err) {
    console.error("Error decoding JWT:", err);
    return null;
  }
};

export const getUserData = async (
  host: string,
  token: string,
  secret: string
) => {
  try {
    const decoded = decodeJWT(token, secret);
    if (!decoded) return null;
    const id = decoded.id;

    const res = await axios.get(`${host}/api/users/${id}?populate=*`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// user will have
// jwt token
// user id
// user name
// user email
// user image
// user subscriptions
// user saved posts
