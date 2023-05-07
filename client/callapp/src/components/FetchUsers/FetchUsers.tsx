import axios from "axios";
import { useEffect } from "react";
import useStore from "../../store";

export interface UserData {
  id: number;
  name: string;
  phone: string;
  email: string;
  adress: {
    city: string;
    street: string;
  };
}


const API_BASE = 'https://callapp-levan-kantaria.herokuapp.com/'
const FetchUsers = () => {
  const users = useStore((state) => state.Users);

  const fetchUsers = useStore((state) => state.fetchUsers);

  useEffect(() => {
    axios.get(`${API_BASE}userData`).then((res) => {
      fetchUsers(res.data);
    });
  }, []);

  return (
    <div>
    </div>
  );
};

export default FetchUsers;
