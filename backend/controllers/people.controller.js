import People from "../models/people.model.js";

// Updated getAllPeople to handle filtering, including city
export const getAllPeople = async (req, res) => {
    try {
        // Build filter object based on query parameters
        const { name, email, phone, city } = req.query; // Include 'city' in query parameters
        const filter = {};

        if (name) {
            filter.$or = [
                { "name.first": { $regex: name, $options: 'i' } },
                { "name.last": { $regex: name, $options: 'i' } },
            ];
        }

        if (email) {
            filter.email = { $regex: email, $options: 'i' }; // Case-insensitive match
        }

        if (phone) {
            filter.phone = { $regex: phone, $options: 'i' }; // Case-insensitive match
        }

        if (city) {
            filter["location.city"] = { $regex: city, $options: 'i' }; // Case-insensitive match for city
        }

        // Fetch people based on filters
        const people = await People.find(filter).sort({ createdAt: -1 });
        res.status(200).send(people);
    } catch (error) {
        console.error("Error fetching people", error);
        res.status(500).send({ message: "Failed to fetch people" });
    }
};

export const getPersonById = async (req, res) => {
    const { personId } = req.params;
    try {
        // Query by 'id', not '_id', since your custom unique field is 'id'
        const person = await People.findOne({ id: personId });
        if (!person) {
            return res.status(404).send({ message: "Person not found" });
        }
        res.status(200).send(person);
    } catch (error) {
        console.error("Error fetching person", error);
        res.status(500).send({ message: "Failed to fetch person" });
    }
};
