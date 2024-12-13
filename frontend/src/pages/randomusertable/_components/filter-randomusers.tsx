"use client";


import { Button, Input, Select } from "antd";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


function FilterDoctors() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
// TO DO USE DYNAMIC ID TO GO TO WHICHEVER USER IS CLICKED
  const onFilter = () => {
    const staticId = "675aeb6704c2d10ad6592d36"
    navigate(`/:${staticId}`);
  };

  const onClearFilters = () => {
    setName("");
    setEmail("");
    setPhone("");
    navigate("/admin/doctors");
  };

  return (
    <div className="grid lg:grid-cols-4 gap-5 items-end">
      <div className="flex flex-col">
        <label htmlFor="Name" className="text-sm">
          Name
        </label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="flex flex-col">
        <label htmlFor="Email" className="text-sm">
          Email
        </label>
        <Select
          options={email}
          value={email}
          onChange={(value) => setEmail(value)}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="Phone" className="text-sm">
          Phone
        </label>
        <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>

      <div className="flex justify-end gap-5">
        <Button onClick={onClearFilters}>Clear Filters</Button>
        <Button type="primary" onClick={onFilter}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}

export default FilterDoctors;