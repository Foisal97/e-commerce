import bcrypt from "bcryptjs"
const user = [
    {
        name: "Admin User",
        email: "admin@email.com",
        password: bcrypt.hashSync("123456"),
        isAdmin: true
    },
    {
        name: "John Doe",
        email: "john@email.com",
        password: bcrypt.hashSync("123456"),
        isAdmin: false
    }, 
    {
        name: "Jane Doe",
        email: "jane@email.com",
        password: bcrypt.hashSync("123456"),
        isAdmin: true
    }
];

export default user;