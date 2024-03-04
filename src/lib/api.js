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

    return Promise.all([
      res.status,
      res.status != 204 ? res.json() : {},
      res.ok,
    ]);
  },

  /**
   * Process the response after the query has been executed
   * @param res
   * @returns
   */
  processResponse: (res) => {
    if (!res[2] && res[0] !== 204) {
      console.error({ error: res });
      const error = new Error(
        res[1]?.message || `Err while processing request`
      );
      error.status = res[0];
      throw error;
    } else if (res[0] === 204) {
      return { status: res[0] };
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


  //  Dashboard APIs

  createForm: async (data) => {
    let res = await API.execute(`/admin/forms`, "POST", data);
    return API.processResponse(res);
  },

  getForms: async () => {
    let res = await API.execute(`/admin/forms`, "GET");
    return API.processResponse(res);
  },

  adminGetFormInfo: async (id) => {
    let res = await API.execute(`/admin/forms/${id}`, "GET");
    return API.processResponse(res);
  },

  updateForm: async (id, data) => {
    let res = await API.execute(`/admin/forms/${id}`, "PUT", data);
    return API.processResponse(res);
  },

  deleteForm: async (id) => {
    let res = await API.execute(`/admin/forms/${id}`, "DELETE");
    return API.processResponse(res);
  },

  createTemplate: async (data) => {
    let res = await API.execute(`/template`, "POST", data);
    return API.processResponse(res);
  },

  getTemplates: async () => {
    let res = await API.execute(`/templates`, "GET");
    return API.processResponse(res);
  },

  updateTemplate: async (id, data) => {
    let res = await API.execute(`/template/${id}`, "PUT", data);
    return API.processResponse(res);
  },

  deleteTemplate: async (id) => {
    let res = await API.execute(`/template/${id}`, "DELETE");
    return API.processResponse(res);
  },

};
