import PageTitle from "@/components/page-title";
import { getDoctors } from "@/server-actions/doctors";
import { Button, Alert } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DoctorsTable from "./_components/doctors-table";
import FilterDoctors from "./_components/filter-doctors";
import axios from "axios";
import { toast } from "react-toastify";
import PageLoading from "../../components/pageLoading/PageLoading";



export const DoctorsPage=()=> {
  const [users, setUsers] = useState<User[] | null>(null)
  const [pageLoading, setPageLoading] = useState(true)

  // This function will fetch 10 random users from the API
  const fetchUsers = async () => {
    setPageLoading(true)
    try {
      const response = await axios.get(
        "http://localhost:5001/api/people"
      )
      setUsers(response.data)
      setPageLoading(false)
    } catch (error) {
      console.error(error)
      setPageLoading(false)
      toast.error('Failed to fetch users')
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  if (pageLoading) {
    return <PageLoading />
  }
  return (
    <div className="p-5 flex flex-col gap-5">
      <div className="flex justify-between items-center">
        
        
      <DoctorsTable users={users} />
      </div>

     

    </div>
  );
}

export default DoctorsPage;