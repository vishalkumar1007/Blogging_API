const UserBlog = require("../models/bloggingModel");

/*
creating the user new post 
API is : http://localhost:3000/blog/CreatePost
Method : POST
*/
const CreatePost = async (req, res) => {
    const { title, content } = req.body;
    const post = new UserBlog({ title, content });
    await post.save();
    res.status(201).json({ message: "Create Post Successfully", success: true });
}

/*
read the user post
API is : http://localhost:3000/blog/ReadPost
Method : GET
*/
const ReadPost = async (req, res) => {
    const posts = await UserBlog.find();
    res.json(posts);
}

/*
updating the post by id
API is : http://localhost:3000/blog/UpdatePost
Method : PUT
*/
const UpdatePost = async (req, res) => {
    const { title, content } = req.body;
    const postId = req.headers.id;
    console.log("post_id : ",postId);
    try {
        if (!title || !content) return res.status(400).json({ message: "Title and content are required fields.", success: false });
        
        const updatedPost = await UserBlog.findByIdAndUpdate(postId, { title, content });
        
        if (!updatedPost) return res.status(404).json({ message: "Post not found", success: false });
        
        res.status(200).json({ message: "Post updated successfully", success: true, updatedPost });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error in Update", success: false });
    }
}

/*
deleting the post by id 
API is : http://localhost:3000/blog/DeletePost 
Method : DELETE
*/
const DeletePost = async (req, res) => {
    const postId = req.headers.id;

    try {
        
        if(!postId)return res.status(400).json({ message: "post id is required", success: true });

        const deletePost = await UserBlog.findByIdAndDelete(postId);

        if(!deletePost)return res.status(404).json({ message: "Post not found", success: false });
        
        res.status(200).json({ message: "Delete Post Successfully", success: true ,deletePost});

    } catch (err) {
        res.status(404).json({ message: "Internal server error in delete", success: false });
    }
}

module.exports = {
    CreatePost,
    ReadPost,
    UpdatePost,
    DeletePost
};