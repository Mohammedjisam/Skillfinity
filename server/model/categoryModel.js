const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
   {
    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
   },{
    timestamps: true,
   }
)


const Category = mongoose.model("categories",categorySchema)

module.exports= Category