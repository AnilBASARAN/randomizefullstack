import {AppointmentReceipt} from './randomuser-receipt';

import { Modal } from 'antd';

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


interface ViewRandomUserModalProps{
    user: User;
    showViewAppointmentModal: boolean;
    setShowViewRandomUserModal: ( value:boolean)=> void;
}

export const ViewRandomUserModal=({
    user,
    showViewAppointmentModal,
    setShowViewRandomUserModal: setShowViewAppointmentModal,
}:ViewRandomUserModalProps)=> {

    if(!showViewAppointmentModal) return null;

  return (
   <Modal
   open={showViewAppointmentModal}
   onCancel={() => setShowViewAppointmentModal(false)}
   onClose={() => setShowViewAppointmentModal(false)}
   centered
   title="Random User Details"
   width={600}
   footer={null}>
    <div className='mt-10' >

    <AppointmentReceipt user={user} />
    </div>
    </Modal>
  )
}
