const Models = require("../../../model/index")
const validator = require("validator")
module.exports = {
    Query: {
        users: async () => {
            try {
                const allUsers = await Models.User.find();
                if(allUsers){
                    return {type: "success", message: "Users fetched successfully", data: allUsers}
                }else{
                    console.log("No users found")
                    return {type: "error", message: "No users found", data: null}
                }
            } catch (err) {
                console.log(err)
                return {type: "error", message: "Got into error while fetching all users", data: null}
            }
        }
    },
    Mutation: {
        createUser: async (_, { userInput }) => {
            const { name, age, email } = userInput;
            try {
                if (!validator.isEmail(email)) {
                    return {type: "error", message: "Invalid email address", data: null}
                };
                if(!Number(age)){
                    return {type: "error", message: "Invalid age", data: null}
                }
                if(!/^[a-zA-Z\s]+$/.test(name)){
                    return {type: "error", message: "Invalid Name, It can contain only letters", data: null}
                }
                const user = new Models.User({
                    name,
                    age,
                    email
                });
                const userExist = await Models.User.findOne({email});
                if(userExist){
                    return {type: "error", message: "User with same email address already exist", data: null}
                }
                const savedUser =  await user.save();
                if(savedUser){
                    return {type: "success", message: "User created successfully", data: savedUser}
                }else{
                    return {type: "error", message: "Failed to create user", data: null}
                }
            } catch (err) {
                console.log(err)
                return {type: "error", message: "Got into error while creating user", data: null}
            }
        },
        deleteUser: async (_, { userId }) => {
            try {
                if(!validator.isMongoId(userId)){
                    return {type: "error", message: "Invalid user Id", data: null}
                }
                const user = await Models.User.findByIdAndDelete(userId);
                if(user){
                    return {type: "success", message: "User deleted successfully", data: user}
                }else{
                    return {type: "error", message: "No user found with this id", data: null}
                }
            } catch (err) {
                console.log(err)
                return {type: "error", message: "Got into error while deleting user", data: null}
            }
        }
    }
}