module.exports = (sequelize, Datatypes) => {
  return sequelize.define('User', {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Datatypes.STRING,
      allowNull: false
    },
    firstname: {
      type: Datatypes.STRING,
      allowNull: false
    },
    email: {
      type: Datatypes.STRING,
      allowNull: false
    },
    password: {
      type: Datatypes.STRING,
      allowNull: false
    },
    avatar: {
      type: Datatypes.STRING,
      allowNull: true
    },
    isAdmin: {
      type: Datatypes.BOOLEAN,
      allowNull: false
    },
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false,
  });
}