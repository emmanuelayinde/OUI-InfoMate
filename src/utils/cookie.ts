import Cookies from "js-cookie";

type ICookieName = "token" | "profile";

interface ICookie {
  name: ICookieName;
  value: string | number | boolean | object;
}

export const setCookie = ({ name, value }: ICookie) => {
  try {
    return Cookies.set(name, JSON.stringify(value), { expires: 365 });
  } catch (error) {
    console.error("Error setting cookie:", error);
    return null;
  }
};

export const getCookie = (name: ICookieName) => {
  try {
    const response = Cookies.get(name);

    if (!response) {
      return null;
    }

    return JSON.parse(response);
  } catch (error) {
    console.error("Error getting cookie:", error);
    deleteCookie(name);
    return null;
  }
};

export const deleteCookie = (name: ICookieName) => {
  try {
    return Cookies.remove(name);
  } catch (error) {
    console.error("Error deleting cookie:", error);
    return null;
  }
};
