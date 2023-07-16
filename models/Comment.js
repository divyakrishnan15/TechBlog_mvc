const {Model, DataTypes}=require('sequelize')
const sequelize=require('../config/connection')

class Comment extends Model{}

Comment.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'user',
            key:'id'
        }
    },
    post_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'post',
            key:'id'
        }
    },
    comment_desc:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    sequelize,
    freezeTableName:true,
    underscored:true,
    modelName:'comment'
})

module.export=Comment