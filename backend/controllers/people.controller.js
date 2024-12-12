import People from "../models/people.model.js";


 export   const getAllPeople = async ( req,res)=>{
        try{
            
            const people = await People.find().sort({createdAt: -1})
            res.status(200).send(people)
        }catch(error){
            console.error("Error fetching plants",error);
            res.status(500).send({message:"Failed to fetch people"})
        }
    }

    export const getPersonById = async (req, res) => {
        const { plantId } = req.params; // Assuming 'plantId' is the name of the parameter in your route
        try {
            // Query by 'id', not '_id', since your custom unique field is 'id'
            const people = await People.findOne({ id: plantId });
            if (!people) {
                return res.status(404).send({ message: "Person not found" });
            }
            res.status(200).send(people);
        } catch (error) {
            console.error("Error fetching plant", error);
            res.status(500).send({ message: "Failed to fetch person" });
        }
    };
    