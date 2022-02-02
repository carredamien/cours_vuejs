module.exports = (sequelize, Datatypes) => {
  return sequelize.define('Comment', {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    message: {
      type: Datatypes.STRING,
      allowNull: false
    },
    author: {
      type: Datatypes.STRING,
      allowNull: false
    },
    avatar: {
      type: Datatypes.STRING,
      allowNull: true
    },
  },{
    timestamps: true,
    createdAt: 'created',
    updatedAt: false,

  })
}