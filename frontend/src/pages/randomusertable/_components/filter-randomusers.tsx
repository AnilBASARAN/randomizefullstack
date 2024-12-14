import { Button, Input } from "antd";
import { useState } from "react";

interface FilterProps {
  setFilters: (filters: any) => void;
}

const FilterRandomUsers: React.FC<FilterProps> = ({ setFilters }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState(""); // Added state for "city"

  const onFilter = () => {
    // Update filters in the parent component (RandomUsersTable)
    setFilters({ name, email, phone, city });
  };

  const onClearFilters = () => {
    setName("");
    setEmail("");
    setPhone("");
    setCity(""); // Clear "city"
    setFilters({ name: "", email: "", phone: "", city: "" }); // Clear all filters
  };

  return (
    <div className="grid lg:grid-cols-5 gap-5 items-end">
      <div className="flex flex-col">
        <label htmlFor="Name" className="text-sm">Name</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="flex flex-col">
        <label htmlFor="Email" className="text-sm">Email</label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="flex flex-col">
        <label htmlFor="Phone" className="text-sm">Phone</label>
        <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>

      <div className="flex flex-col">
        <label htmlFor="City" className="text-sm">City</label>
        <Input value={city} onChange={(e) => setCity(e.target.value)} /> {/* Added city filter */}
      </div>

      <div className="flex justify-end gap-5">
        <Button onClick={onClearFilters}>Clear Filters</Button>
        <Button type="primary" onClick={onFilter}>Apply Filters</Button>
      </div>
    </div>
  );
};

export default FilterRandomUsers;
