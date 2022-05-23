const bcrypt = require("bcryptjs")

exports.seed = async function (knex) {
    await knex("customers").insert([
        {
            email: "JD92@yahoo.com",
            password: await bcrypt.hash("password", 12),
            firstName: "Jon",
            lastName: "Doe",
            dateOfBirth: "1-1-1992",
            address: "1234 Wallaby Way, Sydney, AU, 78901" 
        },
        {   
            email: "theLady@hotmail.com",
            password: await bcrypt.hash("password123", 12),
            firstName: "Francis",
            lastName: "Bandini",
            dateOfBirth: "9-14-1967",
            address: "671 Gertrud Loop, Minneapolis, MN, USA" 
        },
    ]);
};