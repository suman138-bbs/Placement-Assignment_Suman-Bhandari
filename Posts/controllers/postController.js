import postModel from "../models/postModel.js";
export const createPostController = async (req, res)=>{
    const { title, description, size } = req.body;
    try {
        if (!title || !description || !size < 20) {
            return res.status(200).send({
                success: false,
                message:"PLease, Provide all fields"
            })
        }

        const newPost = new postModel({ title, description, size });
        newPost.save()
        return res.status(201).send({
            success: true,
            message: "Blog Created Successfully",
            newPost
            
        })
    } catch (error) {
          return res.status(500).send({
            success: false,
            message: "Error while getting Post",
            error
            
        })
    }
} 

