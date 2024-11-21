import request from "./request";

export const test = () => {
  return request({
    url: "/test",
    method: "get",
  });
};

export const register = (data: unknown) => {
  return request({
    url: "/register",
    method: "post",
    data,
  });
};

export const login = (data: unknown) => {
  return request({
    url: "/login",
    method: "post",
    data,
  });
};

export const getReport = (data: unknown) => {
  return request({
    url: `/report`,
    method: "post",
    data
  });
};

export const getRecommendation = (data: unknown) => {
    return request({
      url: `/search`,
      method: "post",
      data
    });
  };