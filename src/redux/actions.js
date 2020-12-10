import axios from "axios";
import {
  DATA_REQUEST,
  DATA_SUCCESS,
  DECREMENT_REMAIN,
  INCREMENT_REMAIN,
  UPDATE_TIME,
  ADD_USER,
  LOG_OUT,
  FETCH_MY_TESTS,
  SAVE_TEST_ID,
  ALLOW,
} from "./actionTypes";

export const decrementRemain = () => {
  return {
    type: DECREMENT_REMAIN,
  };
};
export const incrementRemain = () => {
  return {
    type: INCREMENT_REMAIN,
  };
};
export const loadData = (name) => async (dispatch) => {
  dispatch({ type: DATA_REQUEST });
  const { data } = await axios.get(`/test/dataaccess/${name}`);
  if (data.code == null) {
    dispatch({ type: DATA_SUCCESS, data });
  } else {
    dispatch({
      type: ALLOW,
    });
  }
};
export const updateTime = (update, types) => {
  return {
    type: UPDATE_TIME,
    what: types,
    how: update,
  };
};
export function setTokenHeader(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}
function deleteTokenHeader() {
  delete axios.defaults.headers.common["Authorization"];
}
const logout1 = () => {
  localStorage.removeItem("jwt");
  deleteTokenHeader();
  localStorage.removeItem("username");
  localStorage.removeItem("email");
};
const logged = (data) => {
  localStorage.setItem("jwt", data.token);
  setTokenHeader(data.token);
  localStorage.setItem("username", data.user.username);
  localStorage.setItem("email", data.user.email);
};
export const signin = (body) => async (dispatch) => {
  const { data } = await axios.post("/user/signup", body);
  logged(data);
  dispatch({
    type: ADD_USER,
    id: data.user._id,
    name: data.user.username,
  });
};
export const login = (body) => async (dispatch) => {
  const { data } = await axios.post("/user/login", body);
  logged(data);
  dispatch({
    type: ADD_USER,
    id: data.user._id,
    name: data.user.username,
  });
};
export const logout = () => async (dispatch) => {
  logout1();
  dispatch({
    type: LOG_OUT,
  });
};
export const fetch = () => async (dispatch) => {
  const { data } = await axios.get("/test/mytests");
  //console.log(data);
  var names = [];
  for (var i = 0; i < data.data.length; i++) {
    var cc = new Date();
    var year = parseInt(data.data[i].test_end.substr(0, 4));
    var mon = parseInt(data.data[i].test_end.substr(5, 2));
    var day = parseInt(data.data[i].test_end.substr(8, 2));
    var hour = parseInt(data.data[i].test_end.substr(13, 2));
    var min = parseInt(data.data[i].test_end.substr(16, 2));
    var tos = false;
    var ds = new Date(year, mon - 1, day, hour, min);
    //console.log(cc,ds);
    if (ds < cc) {
      tos = true;
    }
    names.push({
      ...data.data[i],
      no: i + 1,
      disabled: tos,
    });
  }
  dispatch({
    type: FETCH_MY_TESTS,
    data: names,
  });
};
export const save_test_id = (id) => async (dispatch) => {
  dispatch({
    type: SAVE_TEST_ID,
    _id: id,
  });
};
