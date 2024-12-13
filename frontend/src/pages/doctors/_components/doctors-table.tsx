"use client";
import { getDateTimeFormat } from '@/helpers/date-time-formats';

import { Button, message, Table, Popconfirm } from 'antd';
import { Pencil, Trash } from 'lucide-react';

import  { useState } from 'react';

interface User {
    name: {
      first: string
      last: string
      title: string
    }
    phone: string
    email: string
    gender: string
    dob: {
      date: string
      age: number
    }
    picture: {
      large: string
      medium: string
      thumbnail: string
    }
  }

function DoctorsTable({ users }: { users: User[] }) {
   
  
    const columns = [
        {
            title: "Profile Picture",
            dataIndex: "profilePicture",
            key: "profilePicture",
            render: (profilePicture: string) => (
                <img 
                src={profilePicture || 'https://via.placeholder.com/100'} 
                alt="Doctor" 
                style={{ 
                    width: '100px', 
                    height: '100px', 
                    borderRadius: '50%', 
                    objectFit: 'cover' // This will ensure the image covers the area
                }} 
            />
            ),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone"
        },
        {
            title: "Workdays",
            dataIndex: "workDays",
            key: "workDays",
            render: (workDays: string[]) => workDays.join(" , "),
        },
        {
            title: "Speciality",
            dataIndex: "specializations",
            key: "specializations",
            render: (specializations: string[]) => specializations.join(" , "),
        },
        {
            title: "Fee",
            dataIndex: "fee",
            key: "fee",
        },
        {
            title: "Added On",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date: string) => getDateTimeFormat(date),
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_: unknown, row: User) => (
                <div className="flex gap-5">
                    <Popconfirm
                        title="Are you sure you want to delete this doctor?"
                        
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button 
                            loading={loading}
                            size="small" 
                            disabled={loading}
                            aria-label={`Delete ${row.name}`}
                        >
                            <Trash size={14} />
                        </Button>
                    </Popconfirm>

                    <Button 
                         
                        size="small" 
                        aria-label={`Edit ${row.name}`}
                    >
                        <Pencil size={14} />
                    </Button>
                </div>
            )
        },
    ];

    return (
        <div>
            <Table
                dataSource={users}
                columns={columns}
                rowKey="_id"
                pagination={false}
                loading={loading}
            />
        </div>
    );
}

export default DoctorsTable;
