'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Banner extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here (если нужно в будущем)
        }
    }

    Banner.init(
        {
            bannerFileName: {
                type: DataTypes.STRING(64),
                allowNull: false,
            },
            bannerLink: {
                type: DataTypes.STRING(128),
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: 'Banner',
            tableName: 'Banners',
            timestamps: false,
        }
    );

    return Banner;
};
