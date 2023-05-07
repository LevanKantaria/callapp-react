import create from "zustand";
import axios from "axios";


const API_BASE = 'https://callapp-levan-kantaria.herokuapp.com/'


interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  gender: string;
  address: {
    city: string;
    street: string;
  };
}
type UsersList = User[];

interface UserState {
  Users: UsersList;
  ModalState: boolean;
  index: number;
  ToggleModal: (index: number) => void;
  ModalMethod: string;
  setModalMethod: (arg0: string) => void; // method is used to decide wheter submit button calls 'add' or 'update' function
  ModalFilledForm: User;
  fetchUsers: ([]: UsersList) => void;
  addNewUser: ({}: User) => void;
  updateUser: (index: number, userData: User) => void;
  removeUser: (arg0: number) => void;
}

const initialUser: User = {
  id: -1,
  name: "",
  email: "",
  gender: "",
  address: {
    street: "",
    city: "",
  },
  phone: "",
};

const useStore = create<UserState>((set, get) => ({
  Users: [initialUser],
  ModalState: false,
  ModalFilledForm: initialUser,
  ModalMethod: "add",
  index: 0,

  // if toggle is called with index more than 0 => form is pre-filled and index is saved,
  // othewise if toggle is called with inndex -1 => form is cleared.
  // modal state changes in any case. from visible to hidden
  ToggleModal: (index: number) => {
    if (index >= 0) {
      set((state) => ({ ModalFilledForm: state.Users[index] }));
      set((state) => ({ index: index }));
    } else if (index === -1) {
      set((state) => ({ ModalFilledForm: initialUser }));
      set((state) => ({ index: index }));
    }
    set((state) => ({ ModalState: !state.ModalState }));
  },

  // modal method is set to determine whether submit button should update or add new user.
  setModalMethod: (method: string) => {
    set((state) => ({ ModalMethod: method }));
  },

  fetchUsers: (UsersFromDB) => {
    set((state) => ({ Users: UsersFromDB }));
  },

  // removeUser ---
  removeUser: (id: number) => {
    axios.delete(`${API_BASE}removeUser` + "/" + id).then((res) => {
      if (res.status === 200) {
        set((state) => ({
          Users: state.Users.filter((item) => item.id !== id),
        }));
      }
    });
  },
  // ---

  //addUser is an async function that sends post request to backend ---
  addNewUser: (newUser) => {
    addUser(newUser);
    set((state) => ({
      Users: [...state.Users, newUser],
    }));
    // ---

    // Updating User ---
  },

  // update user takes index and filled form. changes indexed object with new value;
  updateUser: (index: number, UserData: User) => {
  

    let newData = get().Users;
    newData[index] = UserData;
    axios
      .post(`${API_BASE}updateUser/${index}`, UserData)
      .then((res) => {
        set((state) => ({
          Users: [...newData]
        }));
      });
  },
  // ---
}));

export default useStore;

// Adding New User, sends post request to backend with user Form Payload
async function addUser(newUser: User) {
  axios.post(`${API_BASE}addUser`, newUser).then((res) => {});
}
