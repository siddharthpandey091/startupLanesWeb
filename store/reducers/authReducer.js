const initialState = {
  data: {
    status: null,
    message: null,
    user_id: null,
    user_type: null,
    user_subtype: null,
  },
};

const login_initialState = {
  data: {
    status: null,
    message: null,
    token: null,
    token_expire_timestamp: null,
    user_id: null,
    f_name: null,
    l_name: null,
    email: null,
    mobile: null,
    user_type: null,
    user_sub_type: null,
    referral_code: null,
    sl_money: null,
    is_gold_member: null,
    contacts: null,
    total_reffered_members: null,
    profile: null,
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_UP":
      return {
        ...initialState,
        data: action.data.data,
      };
    case "SIGN_IN":
      return {
        ...login_initialState,
        data: action.user,
      };
    default:
      return state;
  }
};

export default authReducer;
