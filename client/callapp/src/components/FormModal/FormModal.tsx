import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useState } from "react";
import AddUserForm from "./AddUserForm";
import styled from "styled-components";
import useStore from "../../store";

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

const initialState = {
  id: -1,
  name: "",
  email: "",
  gender: "male",
  address: {
    street: "",
    city: "",
  },
  phone: "",
};

interface FormProps {
  id?: number;
}

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: flex-start;
  position: relative;
  
  top: 45px;
  z-index: 1;
`
const FormModal = (props: FormProps) => {
  let buttonSubmitLabel = "Add";
  let formNnameLabel = 'New User'

  const addNewUser = useStore((state) => state.addNewUser);
  const userList = useStore((state) => state.Users);
  const toggleStore = useStore((state) => state.ToggleModal);
  const modalState = useStore((state) => state.ModalState);
  const method = useStore((state) => state.ModalMethod);
  const updateUser = useStore((state) => state.updateUser);
  const index = useStore((state) => state.index);
  const setModalMethod = useStore((state) => state.setModalMethod);

  const [formData, setFormData] = useState<User>(initialState);

  //when toggle is called, it calls action in Store. Store toggle function takes additional parameter
  // like 'index', to decide where it was called from. It could be from 'Add New User' button, or
  // edit button. If it is Edit button, index serves as indicator to the row.
  const toggle = () => {
    setModalMethod("add");

   
    //index is used when editing to pre-fill form, (-1 clears the form )
    toggleStore(-1);
  };

  //this is the index that is passed to store when 'toggled'. index more that 0 means it is called from Edit button,
  if (index >= 0) {
    buttonSubmitLabel = "Edit";
    formNnameLabel = 'Edit User'
    
  } else {
    buttonSubmitLabel = "Add";
    formNnameLabel = 'New User'
  }

  //on change is called from Form Component, 'e' contains current state of form.
  const onChange = (e: User) => {
    //find current biggest id ( in this case last id)
    let maxId = userList[userList.length - 1].id;
    // set form Data from payload, set ID to max current id + 1.
    //Depending on where it was called from , id is different
    //( calls from 'Edit' button have their own Id, while from 'Add New user' has: 'id = -1' )
    if (e.id === -1) {
      setFormData({ ...e, id: maxId + 1 });
    } else {
      setFormData({ ...e });
    }
  };

  const addHandler = () => {
    
    // if gender was not changed manually, it might not be updated in form,
    // this deals with that problem and sets initial gender parameter
    if (!formData.gender) {
      formData.gender = "male";
    }  
   
    if (method === "edit") {
      updateUser(index, formData); //call to store
    } else {
      addNewUser(formData);  //call to store
    }

    //toggleStore ( -1 ) clears modal form.
    toggleStore(-1);

  };

  return (
    <div>
      {" "}
      <ButtonWrapper >

      <Button color="primary" onClick={toggle}>
        Add New User
      </Button>
      </ButtonWrapper>
      <Modal isOpen={modalState} toggle={toggle}>
        <ModalHeader toggle={toggle}>{formNnameLabel}</ModalHeader>
        <ModalBody>
          {/*   Form  */}
          <AddUserForm onChange={onChange} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={addHandler}>
            {buttonSubmitLabel}
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default FormModal;
