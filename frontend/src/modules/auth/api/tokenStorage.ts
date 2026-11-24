
type TokenType = "admin" | "employee";

let adminAccessToken: string | null = null;
let employeeAccessToken: string | null = null;

export const storeAccessToken = (
  token: string | null,
  type: TokenType = "admin"
) => {
  if (type === "admin") {
    adminAccessToken = token;
  } else {
    employeeAccessToken = token;
  }
};

export const getStoredAccessToken = (
  type: TokenType = "admin"
): string | null => {
  return type === "admin"
    ? adminAccessToken
    : employeeAccessToken;
};

export const clearAccessToken = (
  type: TokenType = "admin"
) => {
  storeAccessToken(null, type);
};
