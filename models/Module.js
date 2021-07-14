module.exports = function (sequelize, Datatypes) {
    const Module = sequelize.define('Module', {
        moduleId: {
            autoIncrement: true,
            primaryKey: true,
            type: Datatypes.INTEGER,
            allowNull: false,
        },

        title: {
            type: Datatypes.STRING,
            notEmpty: true,
            unique: true,
            allowNull: false,
        },

        description: {
            type: Datatypes.TEXT,
            notEmpty: true,
            allowNull: false,
        },

        url: {
            type: Datatypes.STRING,
            notEmpty: true,
            allowNull: false,
        },

        type: {
            type: Datatypes.STRING,
            notEmpty: true,
            allowNull: false,
        },
    });

    // a Course has one owner
    Module.associate = (models) => {
        Module.belongsTo(models.User, {
            foreignKey: 'userId',
        });
    };

    return Module;
};
