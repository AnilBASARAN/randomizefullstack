import {AppointmentReceipt} from './appointment-receipt';

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


interface ViewAppointmentModalProps{
    user: User;
    showViewAppointmentModal: boolean;
    setShowViewAppointmentModal: ( value:boolean)=> void;
}

export const ViewAppointmentModal=({
    user,
    showViewAppointmentModal,
    setShowViewAppointmentModal,
}:ViewAppointmentModalProps)=> {

    if(!showViewAppointmentModal) return null;

  return (
   <Modal
   open={showViewAppointmentModal}
   onCancel={() => setShowViewAppointmentModal(false)}
   onClose={() => setShowViewAppointmentModal(false)}
   centered
   title="Appointment Details"
   width={600}
   footer={null}>
    <div className='mt-10' >

    <AppointmentReceipt user={user} />
    </div>
    </Modal>
  )
}
