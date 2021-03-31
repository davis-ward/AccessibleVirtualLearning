module.exports = function(sequelize, Datatypes) {
    const User = sequelize.define('User', {
        userId: {
            autoIncrement: true,
            primaryKey: true,
            type: Datatypes.INTEGER
        },
 
        firstname: {
            type: Datatypes.STRING,
            notEmpty: true
        },
 
        lastname: {
            type: Datatypes.STRING,
            notEmpty: true
        },
 
        email: {
            type: Datatypes.STRING,
            validate: {
                isEmail: true
            }
        },

        usertype: {
            type: Datatypes.STRING
        },
 
        password: {
            type: Datatypes.STRING,
            allowNull: false
        }
    });
    return User;
};