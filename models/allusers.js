var bcrypt = require("bcrypt-nodejs");

module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        username: DataTypes.STRING,
        first_name: {
            type: DataTypes.TEXT,
            validate: {
                is: ["^[a-z]+$", 'i']
            },
        },
        last_name: {
            type: DataTypes.TEXT,
            validate: {
                is: ["^[a-z]+$", 'i']
            },
        },
        location: DataTypes.INTEGER,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        // The password cannot be null
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            },
        },
    });

    Users.associate = function (models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Users.belongsToMany(models.Users, {
            as: "friends",
            onDelete: "cascade",
            through: "favorites",
            foreignKey: "userId",
            otherKey: "favoriteId"
        });

        Users.hasMany(models.Survey, {
            onDelete: "cascade"
        });
    }
    // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    Users.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    Users.hook("beforeCreate", function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    return Users;
};


// Users.bulkInsert(
//     'Users', [{
//         username: 'JDoe',
//         first_name: 'John',
//         last_name: 'Doe',
//         location: 98001,
//         email: 'jdoe@interweb.com',
//         password: 'password',
//         photo: 'https://randomuser.me/api/portraits/men/87.jpg',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         username: 'JJones',
//         first_name: 'Jerry',
//         last_name: 'Jones',
//         location: 98111,
//         email: 'jjones@interweb.com',
//         password: 'password',
//         photo: 'https://randomuser.me/api/portraits/men/8.jpg',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         username: 'ASmith',
//         first_name: 'Alexis',
//         last_name: 'Smith',
//         location: 98101,
//         email: 'asmith@interweb.com',
//         password: 'password',
//         photo: 'https://randomuser.me/api/portraits/women/56.jpg',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         username: 'FThompson',
//         first_name: 'Frank',
//         last_name: 'Thompson',
//         location: 98114,
//         email: 'fthompson@interweb.com',
//         password: 'password',
//         photo: 'https://randomuser.me/api/portraits/men/30.jpg',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         username: 'TWilliams',
//         first_name: 'Tonya',
//         last_name: 'Williams',
//         location: 98116,
//         email: 'twilliams@interweb.com',
//         password: 'password',
//         photo: 'https://randomuser.me/api/portraits/women/69.jpg',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         username: 'LAndrews',
//         first_name: 'Lana',
//         last_name: 'Andrews',
//         location: 98116,
//         email: 'landrews@interweb.com',
//         password: 'password',
//         photo: 'https://randomuser.me/api/portraits/women/70.jpg',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       }
//     ], {});

//     Users.bulkInsert(

//     )