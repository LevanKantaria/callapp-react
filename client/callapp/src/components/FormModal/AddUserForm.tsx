import { userInfo } from 'os';
import { useEffect, useState } from 'react';
import  useStore  from '../../store';
import {  Col, Form, FormGroup, Label, Input } from 'reactstrap';


interface OnChangeParams {
  onChange: (param: any) => void 
}

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

const initialState={  
  "id": 0,
  "name": "",
  "email": "",
  "gender": "",
  "address": {
    "street": "",
    "city": ""
  },
  "phone": ""
}

let address = {city:'',street:''}
// let formData:User = initialState
const AddUserForm = (props:OnChangeParams) => {
  const filledForm = useStore((state) => state.ModalFilledForm)
  const [formData,setFormData] = useState<User>(initialState)



  //Pre-fill the form from Zustand Store
  useEffect(()=>{
    setFormData(filledForm)
    console.log(formData)
  },[filledForm])

  useEffect(()=>{
    
    props.onChange(formData)
  },[formData])
   
  const changeHandler = (e:React.FormEvent<HTMLInputElement>): void =>{
    //get name of latest updated input so that we can use it for targeting and updating form object
    let formName=e.currentTarget.name
    

    //as Address is a nested object with city and street, 
    //we create address object and assign it to form later.
    if(formName === 'city' ){
      
      address = {...address,
        city:e.currentTarget.value,
      }
      setFormData( {...formData,address: address})

    }else if(formName === 'street' ){
      address = {...address,
        street:e.currentTarget.value
      }
      setFormData( {...formData,address: address})

    }else{

      setFormData( {...formData, [formName]: e.currentTarget.value})
    }
  }

 
    return (
      <Form>
      
        <FormGroup>
          <Label for="name">Full Name</Label>
          <Input required placeholder="Full Name" onChange={changeHandler} value={formData.name} name='name' />        
        </FormGroup>

        <FormGroup>
          <Label for="email">Email</Label>
          <Input required placeholder="Example@gmail.com" onChange={changeHandler} value={formData.email} name='email'  />        
        </FormGroup>

        <FormGroup>
          <Label for="exampleEmail">Phone</Label>
          <Input  required type='text' placeholder="+123456789"  onChange={changeHandler} value={formData.phone} name='phone' />        
        </FormGroup>

        <FormGroup>
          <Label for="city">City</Label>
          <Input required placeholder="New York"  onChange={changeHandler}  value={formData.address.city} name='city' />        
        </FormGroup>

        <FormGroup>
          <Label for="street">Street</Label>
          <Input required placeholder="Bath Avenue" onChange={changeHandler} value={formData.address.street}   name='street' />        
        </FormGroup>

        <FormGroup>
          <Label for="exampleSelect">Select</Label>
          <Input required type="select" name="gender" id="exampleSelect" onChange={changeHandler} value={formData.gender} >
            <option>male</option>
            <option>female</option>
            
          </Input>
        </FormGroup>
       
      </Form>
    );
  }

  export  default  AddUserForm