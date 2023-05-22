const blogModel = require('../models/blogModel')

exports.getAllBlogsController =async (req,res) => {
    try {
        const blogs = await blogModel.find({})
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message:"No blog found"
            })
        }
        return res.status(200).send({
            BlogCount: blogs.length,
            blogs,
            success: true,
            message:'All blog lists'
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error while getting Blog",
            error
            
        })
    }
}
exports.createBlogController = async (req, res) => {
    try {
        const { title, description, image } = req.body;
        if (!title || !description || !image) {
            return res.status(400).send({
                success: false,
                message:"Please  provide all Fields"
            })
        }
        const newBlog = new blogModel({ title, description, image })
        await newBlog.save()
        return res.status(201).send({
            success: true,
            message: "Blog created succesfully",
            newBlog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error while creating blog',
            error
        })
    }
    
}
exports.updateBlogController= async(req,res) => {
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;
        const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true });
        return res.status(200).send({
            success: true,
            message: 'Blog updated!',
            blog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message:'Error while updating blog'
        })
    }
}
exports.getBlogByIdController= async(req,res) => {
    try {
        const {id}=req.body.params
        const blog = await blogModel.findById({ id })
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: 'Blog not found with this id',
                error
            })
        }

        return res.status(200).send({
            success: true,
            message: 'fetch a single blog',
            blog
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message:'Error while geting blog'
        })
    }
}
exports.deleteBlogController= async(req,res) => {
    try {
        await blogModel.findOneAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message:'Blog Deleted'
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message:'Error while Deleting blog'
        })
    }
}