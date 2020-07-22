import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  const initialState = {
    token: null,
    userId: null,
    errorMessage: null,
    loading: false,
    authRedirectPath: "/",
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should return the token on login", () => {
    expect(
      reducer(initialState, {
        type: actionTypes.AUTH_SUCCESS,
        token: "123abc",
        userId: "user123",
      })
    ).toEqual({ ...initialState, token: "123abc", userId: "user123" });
  });
});
