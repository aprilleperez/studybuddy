module.exports = function (sequelize, DataTypes) {
    var Favorites = sequelize.define("favorites", {
        studytopic: {
            type: DataTypes.TEXT,
            values: ["math", "science", "law", "coding", "english", "exsci", "eng", "business"]
        },
        subtopic: DataTypes.STRING,
        username: {
            type: DataTypes.STRING,
            references: {
                model: "userinfo",
                key: "username"
            }
        },
        favusername: DataTypes.STRING
    });
    /* Favorites.associate = models => {
        Favorites.belongsTo(models.Users)
    } */
    return Favorites;
};





