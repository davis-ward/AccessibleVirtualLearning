module.exports = function(sequelize, Datatypes) {
    const Unit = sequelize.define('Unit', {
        unitId: {
            autoIncrement: true,
            primaryKey: true,
            type: Datatypes.INTEGER,
            allowNull: false
        },

        title: {
            type: Datatypes.STRING,
            notEmpty: true,
            allowNull: false,
            unique: true
        },

        description: {
            type: Datatypes.STRING,
            notEmpty: true,
            allowNull: false
        }
    });

    Unit.associate = models => {
        Unit.belongsTo(models.Course, {
            foreignKey: 'courseId'
        });
    }

    return Unit;
};