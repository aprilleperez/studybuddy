module.exports = function (sequelize, DataTypes) {
    var Survey = sequelize.define("Survey", {
        studytopic: {
            type: DataTypes.TEXT,
            values: ["math", "science", "law", "coding", "english", "exsci", "eng", "business"]
        },
        subtopic: DataTypes.STRING,
        preftime: {
            type: DataTypes.TEXT,
            values: ["morning", "afternoon", "evening"]
        },
        prefday: {
            type: DataTypes.TEXT,
            values: ["sun", "mon", "tues", "wed", "thurs", "fri", "sat", "wkday", "wkend"]
        },
        meetvirtual: DataTypes.BOOLEAN,
        meetIP: DataTypes.BOOLEAN,
    });

    Survey.associate = function (models) {
        // We're saying that a Survey should belong to a User
        // A Survey can't be created without a User due to the foreign key constraint
        Survey.belongsTo(models.Users, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Survey;
};
