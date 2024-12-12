import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import PageLoading from '../../components/pageLoading/PageLoading'

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

const Home = () => {
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
    <div className="flex gap-5 flex-wrap px-10 py-5">
      {users?.map((user, index: number) => (
        <div
          key={index}
          className="flex gap-3 p-4 rounded-lg bg-slate-400 w-[450px] w-min-[350px]"
        >
          {/* Image Container */}
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
            <img
              src={user.picture.large}
              alt={user.name.first}
              className=" object-cover"
            />
          </div>

          {/* User Detail */}
          <div>
            <p>
              {user.name.first} {user.name.last}
            </p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.dob.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home
