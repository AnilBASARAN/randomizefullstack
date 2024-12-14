import mongoose from "mongoose";

const peopleSchema = new mongoose.Schema({
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other'],
  },
  name: {
    title: { type: String, required: true },
    first: { type: String, required: true },
    last: { type: String, required: true },
  },
  location: {
    street: {
      number: { type: Number, required: true },
      name: { type: String, required: true },
    },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postcode: { type: Number, required: true },
    coordinates: {
      latitude: { type: String, required: true },
      longitude: { type: String, required: true },
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    date: { type: Date, required: true },
    age: { type: Number, required: true },
  },
  registered: {
    date: { type: Date, required: true },
    age: { type: Number, required: true },
  },
  phone: { type: String, required: true },
  cell: { type: String, required: true },
  Peopleid: {
    name: { type: String, default: null },
    value: { type: String, default: null },
  },
  picture: {
    large: { type: String, required: true },
    medium: { type: String, required: true },
    thumbnail: { type: String, required: true },
  },
}, 
{ timestamps: true });

const People = mongoose.model('People', peopleSchema);
export default People;
