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
