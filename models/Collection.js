module.exports = function(sequelize, Datatypes) {
    const Collection = sequelize.define('Collection', {
        collectionId: {
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

        description: {
            type: Datatypes.TEXT,
            notEmpty: true,
            allowNull: false
        },

        url: {
            type: Datatypes.STRING,
            notEmpty: true,
            allowNull: false
        }
    });
    
    // a Course has one owner 
    Collection.associate = models => {
        Collection.belongsTo(models.User, {
            foreignKey: 'userId'
        });
    }

    return Collection;
};