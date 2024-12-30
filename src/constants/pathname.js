const PATH_NAME = {
  COMMON: {
    ERROR_PAGE: "*",
    FORBIDDEN_PAGE: "/403",
  },
  AUTH: {
    REGISTER: "/login",
  },
  DASHBOARD: {
    STATISTIC: "/dashboard",
    USER: "/user",
  },
  EMPLOYEE: {
    EMPLOYEE_LIST: "/employee",
    EMPLOYEE_DETAIL: "/employee/:id",
    EMPLOYEE_CREATE: "/employee/create",
    EMPLOYEE_UPDATE: "/employee/:id/update"
  }
};

export { PATH_NAME };
