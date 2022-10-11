'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Set_Time extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Band, Event, Stage }) {
      //bands
      Set_Time.belongsTo(Band, {
        foreignKey: "band_id",
        as: "band"
      })

      //events
      Set_Time.belongsTo(Event, {
        foreignKey: "event_id",
        as: "event"
      })

      //stages
      Set_Time.belongsTo(Stage, {
        foreignKey: "stage_id",
        as: "stage"
      })
    }
  }
  Set_Time.init({
    set_time_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    event_id: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    stage_id: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    band_id: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Set_Time',
    tableName: "set_time",
    timestamps: false
  });
  return Set_Time;
};