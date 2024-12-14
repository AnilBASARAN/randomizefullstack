import { Button, Table, Popconfirm } from 'antd';
import axios from 'axios';
import { Eye, Pencil, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PageLoading from '../../components/pageLoading/PageLoading';
import { ViewRandomUserModal } from './_components/view-randomuser-modal.tsx';
import { Link } from 'react-router-dom';
import FilterRandomUsers from './_components/filter-randomusers.tsx';

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
    location: {
        street: {
            number: number;
            name: string;
        };
        coordinates: {
            latitude: string;
            longitude: string;
        };
        city: string;
        state: string;
        country: string;
        postcode: number;
    };
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    _id: string;
    cell: string;
}

export const RandomUsersTable = () => {
    const [users, setUsers] = useState<User[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showViewAppointmentModal, setShowViewAppointmentModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<User | null>(null);
    const [filters, setFilters] = useState<any>({ name: '', email: '', phone: '', city: '' });

    // Fetch users with filters
    const fetchUsers = async (filters: any) => {
        setIsLoading(true);
        try {
            const { name, email, phone, city } = filters;
            const query = new URLSearchParams();
            if (name) query.append('name', name);
            if (email) query.append('email', email);
            if (phone) query.append('phone', phone);
            if (city) query.append('city', city); // Added city to query params

            const response = await axios.get(`http://localhost:5001/api/people?${query.toString()}`);
            setUsers(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            toast.error('Failed to fetch users');
        }
    };

    useEffect(() => {
        fetchUsers(filters); // Call fetchUsers when filters change
    }, [filters]); // Dependency array ensures it re-fetches when filters are updated

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
            title: "City", // Correctly map city from location
            render: (_: unknown, row: User) => row.location.city, // Mapping location.city correctly
            key: "city",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: unknown, row: User) => (
                <div className="flex gap-5">
                    <Button
                        onClick={() => {
                            setSelectedAppointment(row);
                            setShowViewAppointmentModal(true);
                        }}
                        icon={<Eye size={12} />}
                        size="small"
                    >
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
                <div className="flex justify-end items-end w-full">
                    <Button type="primary">
                        <Link to="/newrandomuser">Add Random User</Link>
                    </Button>
                </div>
            </div>

            {/* Filter Component */}
            <FilterRandomUsers setFilters={setFilters} />

            {/* Table Component */}
            <Table
                dataSource={users}
                columns={columns}
                rowKey="_id"
                pagination={false}
                loading={isLoading}
            />

            {/* View User Modal */}
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
