import { FETCH_MY_TESTS, SAVE_TEST_ID } from "./actionTypes";

const initialState = {
  data: [
    {
      test_name: "dummy_name",
      test_start: "11",
      test_end: "22",
      key: 1,
      disabled: false,
      no: 1,
    },
  ],
  test_id: "5fa267fe4a323b2a5c3b2qqq",
};

const reducer_my_tests = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MY_TESTS:
      return {
        data: action.data,
      };
    case SAVE_TEST_ID:
      return {
        ...state,
        test_id: action._id,
      };
    default:
      return state;
  }
};
export default reducer_my_tests;
