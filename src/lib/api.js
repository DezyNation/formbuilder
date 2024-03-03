"use client";
import { API_BASE_URL } from "./utils/constants";
import Cookies from "js-cookie";

const getToken = () => {
  let token;
  token = Cookies.get("token");
  return token;
}; // not working

const store = { token: getToken() };

const REACT_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || API_BASE_URL;
// const X_API_KEY = process.env.REACT_APP_X_API_KEY;

/**
 * API service methods to make life easier
 */
export const API = {
  /**
   * Execute a query
   * @param url
   * @param method
   * @param body
   * @returns
   */
  execute: async (url, method = "GET", data = null) => {
    let body = null;
    let value = null;
    if (data) {
      body = new FormData();
      for (const key in data) {
        // console.log({ key: key, value: data[key], type: typeof (data[key]) });
        value = data[key];
        // if (typeof value == "") {
        //   var fileURI = value.path;
        //   let filename = fileURI?.split("/").pop();
        //   body.append(key, {
        //     uri: fileURI,
        //     name: filename,
        //     type: value.mime,
        //     mime: value.mime,
        //   });
        //   // console.log(fileURI);
        // } else {
        //   body.append(key, data[key]);
        // }
        body.append(key, data[key]);
      }
    }

    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    let res = await fetch(`${REACT_API_BASE_URL}${url}`, {
      method: method,
      credentials: "include",
      headers,
      body: data ? JSON.stringify(data) : null,
    });

    if (res.status == 401) {
      window.location.replace("/auth/login");
    }

    return Promise.all([res.status, res.json(), res.ok]);
  },

  /**
   * Process the response after the query has been executed
   * @param res
   * @returns
   */
  processResponse: (res) => {
    if (!res[2]) {
      console.error({ error: res });
      // throw new Error(res[1]?.error);
      const error = new Error(
        res[1]?.message || `Err while processing request`
      );
      error.status = res[0];
      throw error;
    }
    return res[1];
  },

  // Common APIs

  signup: async (data) => {
    let res = await API.execute(`/register`, "POST", data);
    return API.processResponse(res);
  },

  login: async (data) => {
    let res = await API.execute(`/login`, "POST", data);
    return API.processResponse(res);
  },

  logout: async (data) => {
    let res = await API.execute(`/logout`, "POST", data);
    return API.processResponse(res);
  },

  forgotPassword: async (data) => {
    let res = await API.execute(`/forgot-password`, "POST", data);
    return API.processResponse(res);
  },

  resetPassword: async (data) => {
    let res = await API.execute(`/reset-password`, "POST", data);
    return API.processResponse(res);
  },

  me: async () => {
    let res = await API.execute(`/auth-user`, "GET");
    return API.processResponse(res);
  },

  getServices: async () => {
    let res = await API.execute(`/services`, "GET");
    return API.processResponse(res);
  },

  getPortalBanks: async () => {
    let res = await API.execute(`/banks`, "GET");
    return API.processResponse(res);
  },

  // Member APIs

  overview: async (duration) => {
    let res = await API.execute(`/overview/${duration}`, "GET");
    return API.processResponse(res);
  },

  wallet: async () => {
    console.log("token", Cookies.get("token"));
    let res = await API.execute(`/user/wallet`, "GET");
    return API.processResponse(res);
  },

  updateMe: async (data) => {
    let res = await API.execute("/users/update/me", "PUT", data);
    return API.processResponse(res);
  },

  fundRequests: async () => {
    let res = await API.execute(`/user/fund-requests`, "GET");
    return API.processResponse(res);
  },

  newFundRequest: async (data) => {
    let res = await API.execute(`/user/fund-requests`, "POST", data);
    return API.processResponse(res);
  },

  // Admin APIs

  adminPendingFundRequests: async (query, url) => {
    let res = await API.execute(
      url || `/admin/fund-requests?status=${"pending"}${
        query
          ? `&` +
            Object.keys(query)
              .map(
                (key) =>
                  encodeURIComponent(key) + "=" + encodeURIComponent(query[key])
              )
              .join("&")
          : ""
      }`,
      "GET"
    );
    return API.processResponse(res);
  },

  adminApproveFundRequest: async (id) => {
    let res = await API.execute(`/admin/fund-requests/${id}`, "PUT", {
      status: "approved",
    });
    return API.processResponse(res);
  },

  adminRejectFundRequest: async (id, adminRemarks) => {
    let res = await API.execute(`/admin/fund-requests/${id}`, "PUT", {
      status: "rejected",
      admin_remarks: adminRemarks,
    });
    return API.processResponse(res);
  },

  adminUpdateService: async (id, data) => {
    let res = await API.execute(`/admin/controls/services/${id}`, "PUT", data);
    return API.processResponse(res);
  },

  adminGetPortalBanks: async () => {
    let res = await API.execute(`/admin/controls/bank`, "GET");
    return API.processResponse(res);
  },

  adminAddPortalBank: async (data) => {
    let res = await API.execute(`/admin/controls/bank`, "POST", data);
    return API.processResponse(res);
  },

  adminUpdatePortalBank: async (id, data) => {
    let res = await API.execute(`/admin/controls/bank/${id}`, "PUT", data);
    return API.processResponse(res);
  },

  adminDeletePortalBank: async (id) => {
    let res = await API.execute(`/admin/controls/bank/${id}`, "DELETE");
    return API.processResponse(res);
  },
};
