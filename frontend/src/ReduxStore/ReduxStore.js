//actions
const SET_USERNAME = "SET_USERNAME";
const LOGOUT = "LOGOUT";


const username = localStorage.getItem("username") || "";
const userId = localStorage.getItem("id") || "";
console.log(userId,"+++++++++",username,"++++++++++=")


const initialState = {
  username: username,//admin
  userId: userId,//1
};

//action create function
export const logout = () => ({
  type: LOGOUT,
});

export const setUsername = (newUsername) => ({
  type: SET_USERNAME,
  payload: newUsername,
});
//--->

const userStore = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME:
      console.log(username,"++++++++++++++)0===00=0=");
  

      return { ...state, username: action.payload };
    case LOGOUT:

      localStorage.clear();
      return initialState;
    default:
      return state;
  }
};

export default userStore;
