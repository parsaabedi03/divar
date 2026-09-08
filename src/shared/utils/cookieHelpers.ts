interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export const setCookie = (tokens: Tokens): void => {
  document.cookie = `accessToken=${tokens.accessToken}; max-age=${
    1 * 24 * 60 * 60
  }; path=/`;
  document.cookie = `refreshToken=${tokens.refreshToken}; max-age=${
    30 * 24 * 60 * 60
  }; path=/`;
};

export const getCookie = (cookieName: string): string | undefined => {
  return document.cookie
    .split(";")
    .find((token) => token.trim().split("=")[0] === cookieName)
    ?.split("=")[1];
};

export const deleteCookie = (cookieName: string): void => {
  document.cookie = `${cookieName}=; max-age=0; path=/`;
};
