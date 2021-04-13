module.exports = function(sequelize, Datatypes) {
    const Course = sequelize.define('Course', {
        courseId: {
            autoIncrement: true,
            primaryKey: true,
            type: Datatypes.INTEGER
        },

        title: {
            type: Datatypes.STRING,
            notEmpty: true,
            unique: true
        },

        ageGroup: {
            type: Datatypes.STRING,
            notEmpty: true
        },

        userId: {
            type: Datatypes.INTEGER
        },

        description: {
            type: Datatypes.STRING,
            notEmpty: true
        }
    });
    return Course;
};