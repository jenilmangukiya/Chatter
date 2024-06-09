export function getCookie(name: string) {
  const cookieString = document.cookie;
  const cookies = cookieString.split("; ");

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");

    if (cookieName === name) {
      return decodeURIComponent(cookieValue as string);
    }
  }

  return null;
}

interface cookieOptions {
  expires?: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
}
export function setCookie(name: string, value: string, options: cookieOptions) {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.expires) {
    const expires = new Date(options.expires).toUTCString();
    cookieString += `; expires=${expires}`;
  }

  if (options.path) {
    cookieString += `; path=${options.path}`;
  }

  if (options.domain) {
    cookieString += `; domain=${options.domain}`;
  }

  if (options.secure) {
    cookieString += "; secure";
  }

  document.cookie = cookieString;
}

export function removeCookie(name: string, options: cookieOptions = {}) {
  // Set the cookie with the same name and options but with an expiration date in the past
  setCookie(name, "", { ...options, expires: new Date(0) });
}
