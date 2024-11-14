const express = require("express")
const adminRoute = express.Router()
const { adminLogin,logoutAdmin,forgotPassword,resetPassword,students,tutors,listUser,unlistUser,unlisTtutor,lisTtutor,getCategories,updateCategory,deleteCategory,addCategory} = require("../../controller/adminController")
const verifyUser = require('../../middleware/authMiddleware')


adminRoute.post('/login',adminLogin)
adminRoute.post('/forgot', forgotPassword);
adminRoute.post('/reset/:token', resetPassword);
adminRoute.get('/students',students)
adminRoute.put("/listuser/:id",listUser)
adminRoute.put("/unlistuser/:id",unlistUser)
adminRoute.put("/listtutor/:id",lisTtutor)
adminRoute.put("/unlisttutor/:id",unlisTtutor)
adminRoute.get('/tutors',tutors)
adminRoute.post("/logout",logoutAdmin)
adminRoute.post('/addcategory', addCategory)
adminRoute.get('/categories', getCategories)
adminRoute.put('/category/:id', updateCategory)
adminRoute.delete('/category/:id', deleteCategory)

module.exports = adminRoute
