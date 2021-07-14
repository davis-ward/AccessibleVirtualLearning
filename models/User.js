module.exports = function (sequelize, Datatypes) {
    const User = sequelize.define('User', {
        userId: {
            autoIncrement: true,
            primaryKey: true,
            type: Datatypes.INTEGER,
            allowNull: false,
        },

        firstname: {
            type: Datatypes.STRING,
            notEmpty: true,
            allowNull: false,
        },

        lastname: {
            type: Datatypes.STRING,
            notEmpty: true,
            allowNull: false,
        },

        email: {
            type: Datatypes.STRING,
            validate: {
                isEmail: true,
            },
            notEmpty: true,
            allowNull: false,
        },

        usertype: {
            type: Datatypes.STRING,
            notEmpty: true,
            allowNull: false,
        },

        password: {
            type: Datatypes.STRING,
            notEmpty: true,
            allowNull: false,
        },
    });

    return User;
};
