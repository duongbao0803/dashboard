const COMMON_CONSTANT = {
  HTTP_STATUS: {
    SUCCESS: {
      OK: 200,
      CREATED: 201,
    },
    CLIENT_ERROR: {
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
    },
    SERVER_ERROR: {
      INTERNAL_SERVER_ERROR: 500,
    },
  },
  ROLE_PERMISSION_ADMIN: "admin",
};

export { COMMON_CONSTANT };