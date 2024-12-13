import { Button, Table, Popconfirm } from 'antd';
import axios from 'axios';
import { Eye, Pencil, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PageLoading from '../../components/pageLoading/PageLoading';
import {ViewRandomUserModal} from './_components/view-randomuser-modal.tsx';
import { Link } from 'react-router-dom';
import FilterDoctors from './_components/filter-randomusers.tsx';
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

export const RandomUsersTable = () => {
    const [users, setUsers] = useState<User[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showViewAppointmentModal,setShowViewAppointmentModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<User | null>(null);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("http://localhost:5001/api/people");
            setUsers(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            toast.error("Failed to fetch users");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (isLoading) {
        return <PageLoading />;
    }

    const columns = [
        {
            title: "Profile Picture",
            key: "picture",
            render: (_: unknown, row: User) => (
                <img
                    src={row.picture.thumbnail || "https://via.placeholder.com/100"}
                    alt={`${row.name.first} ${row.name.last}`}
                    style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        objectFit: "cover",
                    }}
                />
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: unknown, row: User) => (
                <div className="flex gap-5">
                    <Button
                    onClick={()=>{
                        setSelectedAppointment(row);
                        setShowViewAppointmentModal(true);
                    }}
                    icon ={<Eye size={12} />}
                    size='small' >
                        View
                    </Button>
                    <Popconfirm
                        title="Are you sure you want to delete this person?"
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            loading={isLoading}
                            size="small"
                            disabled={isLoading}
                            aria-label={`Delete ${row.name.first} ${row.name.last}`}
                        >
                            <Trash size={14} />
                        </Button>
                    </Popconfirm>

                    <Button size="small" aria-label={`Edit ${row.name.first} ${row.name.last}`}>
                        <Pencil size={14} />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-5 flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className='flex justify-end items-end w-full'>

        <Button type="primary">
          <Link href="/admin/doctors/new">Add Random User</Link>
        </Button>
        </div>
      </div>

      <FilterDoctors />

      <Table
                dataSource={users}
                columns={columns}
                rowKey="_id"
                pagination={false}
                loading={isLoading}
            />
            {selectedAppointment && (
                <ViewRandomUserModal
                    showViewAppointmentModal={showViewAppointmentModal}
                    setShowViewRandomUserModal={setShowViewAppointmentModal}
                    user={selectedAppointment}
                />

               
            )}
    </div>
       
    );
};
