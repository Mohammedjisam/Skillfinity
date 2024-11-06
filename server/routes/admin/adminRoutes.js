const express = require("express")
const adminRoute = express.Router()
const { adminLogin,logoutAdmin,forgotPassword,resetPassword,students,tutors,listUser,unlistUser,unlisTtutor,lisTtutor,
    getCategories,
    updateCategory,
    deleteCategory,
    addCategory} = require("../../controller/adminController")
const {verifyAdmin}=require('../../middleware/verifyAdmin')

adminRoute.post('/login',adminLogin)
adminRoute.post('/forgot', forgotPassword);
adminRoute.post('/reset/:token', resetPassword);
adminRoute.get('/students',students)
adminRoute.put("/listuser/:id",listUser)
adminRoute.put("/unlistuser/:id",unlistUser)
adminRoute.put("/listtutor/:id",lisTtutor)
adminRoute.put("/unlisttutor/:id",unlisTtutor)
adminRoute.get('/tutors',tutors)
adminRoute.post("/logout",verifyAdmin,logoutAdmin)
adminRoute.post('/addcategory', verifyAdmin, addCategory)
adminRoute.get('/categories', verifyAdmin, getCategories)
adminRoute.put('/category/:id', verifyAdmin, updateCategory)
adminRoute.delete('/category/:id', verifyAdmin, deleteCategory)

module.exports = adminRoute
