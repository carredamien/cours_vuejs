module.exports = (sequelize, Datatypes) => {
  return sequelize.define('Post',{
 id:{
   type: Datatypes.INTEGER,
   primaryKey: true,
   autoIncrement: true
 },
 title:{
   type: Datatypes.STRING,
   allowNull: false
  },
  content:{
    type: Datatypes.STRING,
    allowNull: false
  },
  author:{
    type: Datatypes.STRING,
    allowNull: false
 },
  imageUrl:{
    type: Datatypes.STRING,
    allowNull: true
 },
 href:{
  type: Datatypes.STRING,
  allowNull: true
 },
},{
  timestamps: true,
  createdAt : 'created',
  updatedAt: false,
 })
}