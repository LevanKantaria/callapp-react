import DataTable from "react-data-table-component";
import useStore from "../../store";
import FormModal from "../FormModal/FormModal";
import styled from "styled-components";

import { EditOutlined, DeleteRowOutlined } from "@ant-design/icons";
import { Form } from "reactstrap";

type DataRow = {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  address: {
    city: string;
    street: string;
  };
};
let index = 0;

const Wrapper = styled.div`
padding: 50px;
margin: auto;
  
`

const DT = () => {
  const toggleModal = useStore((state) => state.ToggleModal);
  const removeUser = useStore((state) => state.removeUser);
  const setModalMethod = useStore((state) => state.setModalMethod);
  let userList = useStore((state) => state.Users);

  const handleButtonClickRemove = (id: number) => {
    removeUser(id);
  };



  const handleButtonClickEdit = (id: number) => {
    index = userList.findIndex((item) => item.id === id);
    setModalMethod("edit");
    toggleModal(index);
  };




  const columns = [
    {
      name: "Id",
      selector: (row: DataRow) => row.id,
      width:'50px'
     
    },

    {
      name: "Name",
      selector: (row: DataRow) => row.name,
      
    },

    {
      name: "Email",
      selector: (row: DataRow) => row.email,
      grow:1
    },
    {
      name: "gender",
      selector: (row: DataRow) => row.gender,
      width:'80px',
      left:true
    },
    {
      name: "Phone",
      selector: (row: DataRow) => row.phone,
    },
    {
      name: "City",
      selector: (row: DataRow) => row.address.city,
    },

    {
      name: "Street",
      selector: (row: DataRow) => row.address.street,
      
    },

    // edit / delete buttons
    {
      name: "Delete",
      selector: (row: DataRow) => row.id,
      
      cell: (row: any) => (
        
      

          <DeleteRowOutlined
            style={{ fontSize: "25px", color: "rgb(248,115,118)" }}
            onClick={(e) => handleButtonClickRemove(row.id)}
          />
        
      ),
      center:true
    },
  ];

  const users = useStore((state) => state.Users);

  return (
    <Wrapper>
      <FormModal />
      <DataTable
        title="Users"
        columns={columns}
        data={users}
        pagination
        
        highlightOnHover
        pointerOnHover
        onRowDoubleClicked={(row,event) => {handleButtonClickEdit(row.id)}}
        striped
        
        
        

      />
    </Wrapper>
  );
};

export default DT;
