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

