module.exports = function(sequelize, Datatypes) {
    const Course = sequelize.define('Course', {
        courseId: {
            autoIncrement: true,
            primaryKey: true,
            type: Datatypes.INTEGER,
            allowNull: false
        },

        title: {
            type: Datatypes.STRING,
            notEmpty: true,
            unique: true,
            allowNull: false
        },

        ageGroup: {
            type: Datatypes.STRING,
            notEmpty: true,
            allowNull: false
        },

        description: {
            type: Datatypes.STRING,
            notEmpty: true,
            allowNull: false
        }
    });
    
    // a Course has one owner 
    Course.associate = models => {
        Course.belongsTo(models.User, {
            foreignKey: 'userId'
        });
    }

    return Course;
};