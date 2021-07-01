module.exports = function(sequelize, Datatypes) {
    const Task = sequelize.define('Task', {
        taskId: {
            autoIncrement: true,
            primaryKey: true,
            type: Datatypes.INTEGER,
            allowNull: false
        },

        task: {
            type: Datatypes.STRING,
            notEmpty: true,
            allowNull: false
        },

        orderBy: {
            type: Datatypes.INTEGER,
            allowNull: false
        }
    });

    Task.associate = models => {
        Task.belongsTo(models.Unit, {
            foreignKey: 'unitId'
        });
    }

    return Task;
};