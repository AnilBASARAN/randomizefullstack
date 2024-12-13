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

interface IAppointmentReceiptProps {
  user: User;
}

export const AppointmentReceipt = ({ user }: IAppointmentReceiptProps) => {
  const renderProperty = (label: string, value: any) => {
      return (
          <div className="flex justify-between text-sm">
              <p className="font-bold">{label}</p>
              <p>{value}</p>
          </div>
      );
  };

  console.log("user:", user);

  return (
      <div className="w-full">
          <div className="p-5 border-2 border-primary rounded-sm flex flex-col items-center">
              {/* Header */}
              <div className="flex justify-between items-center w-full">
                  <h1 className="font-semibold text-2xl text-primary">
                      Random User API
                  </h1>
                  <div className="text-sm flex flex-col items-end">
                      <p>These are personal information</p>
                      <p>DO NOT SHARE THIS WITH ANYONE</p>
                  </div>
              </div>
              <hr />
              <h1 className="bg-gray-100 font-bold uppercase m-5 border rounded-md p-1 w-[100%]">
                  Random User Details
              </h1>

              {/* Profile Picture */}
              <div className="flex justify-center mb-4">
                  <img
                      src={user.picture.large}
                      alt={`${user.name.first} ${user.name.last}`}
                      className="w-32 h-32 rounded-full object-cover"
                  />
              </div>

              {/* User Details */}
              <div className="flex flex-col gap-2 w-full">
                  {renderProperty(
                      "Full Name",
                      `${user.name.title} ${user.name.first} ${user.name.last}`
                  )}
                  {renderProperty("Gender", user.gender)}
                  {renderProperty("Phone", user.phone)}
                  {renderProperty("Email", user.email)}
                  {renderProperty(
                      "Date of Birth",
                      new Date(user.dob.date).toLocaleDateString()
                  )}
                  {renderProperty("Age", user.dob.age)}
              </div>
          </div>
      </div>
  );
};
