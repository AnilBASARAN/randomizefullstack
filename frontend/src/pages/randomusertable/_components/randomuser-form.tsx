
import { useNavigate } from 'react-router-dom';
import { Button, Form,Input, message, Upload } from 'antd'

import  { useState } from 'react'

interface User {
  name: {
      first: string;
      last: string;
      title: string;
  };
  phone: string;
  email: string;
  gender: string;
  dob: {
      date: string;
      age: number;
  };
  picture: {
      large: string;
      medium: string;
      thumbnail: string;
  };
}
interface RandomUserFormProps{
  type?: "add" | "edit";
  initialValues?: Partial<User>;
}

function DoctorForm({type = "add",initialValues={}}:RandomUserFormProps) {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);

  const [profilePicture,setProfilePicture] = useState<any>(initialValues.profilePicture || null);

  const onSubmit = async (values: any) =>{
    try{
      setLoading(true);
      if(profilePicture){
        values.profilePicture = await uploadFileToFirebaseAndReturnURL(profilePicture);
      }else{
        values.profilePicture = profilePicture;
      }
      let response : any = null;
      if(type == "add"){
        response = await addRandomUser(values);
      }else{
        response = await updateRandomUser({id:initialValues?._id!,data: values});
      }

      if(response.success){
        message.success(response.message);
        navigate("/randomusertable");
      }else{
        message.error(response.message)
      }

    }catch(error: any){
      message.error(error.message)
    }finally{
      setLoading(false);
    }
  }

  let selectedFilesList:any[] = [];

  if(profilePicture && typeof profilePicture === "string"){
    selectedFilesList = [
      {
         url: profilePicture,
         thumbUrl: profilePicture,
         uid:profilePicture
        },
    ];
  }
 
  if(profilePicture && typeof profilePicture === "object"){
    selectedFilesList = [
      {
        url: URL.createObjectURL(profilePicture), 
        thumbUrl: URL.createObjectURL(profilePicture), 
        uid:"-1",
      }
    ];
  }

  if(!profilePicture){
    selectedFilesList = [];
  }

  return (
    <div className='mt-5 ' >
      <Form
      onFinish={onSubmit}
      className='grid grid-cols-4 gap-5'
      layout='vertical'
      initialValues={initialValues}
      >
          <Form.Item
          name="name"
          label="Name"
          rules={[{required: true, message: "Please input the name!"}]}
          >
            <Input />


          </Form.Item>

          <Form.Item
          name="email"
          label="Email"
          rules={[{required: true, message: "Please input the email!"}]}
          >
            <Input />
          </Form.Item>

          <Form.Item
          name="phone"
          label="Phone"
          rules={[{required: true, message: "Please input the phone!"}]}
          >
            <Input type='number' />
          </Form.Item>



 


         

         

         

          <Form.Item
          className='col-span-4'
          name="bio"
          label="Bio"
          rules={[{required: true, message: "Please input the Work Hours!"}]}>
            <Input.TextArea/>
          </Form.Item>

          <Form.Item
              label=" Profile Picture"
          >
            <Upload
            fileList={selectedFilesList}
            beforeUpload={(file)=>{setProfilePicture(file)}}
            listType='picture-card' >
              <div className='span text-xs'>
                {profilePicture ? "Change" : "Upload"} Profile Picture
              </div>
            </Upload>
          </Form.Item>

          <div className='col-span-4 flex justify-end gap-5' >
            <Button
            
             disabled={loading} >Cancel</Button>
            <Button type='primary' htmlType='submit' loading={loading} >
             Save
            </Button>
          </div>
          
      </Form>
    </div>
  )
}

export default DoctorForm