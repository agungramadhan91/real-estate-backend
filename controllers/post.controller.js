import prisma from "../lib/prisma.js";

export const getAllPosts = async (req, res) => {
	try {
		const allPosts = await prisma.post.findMany();

		res.status(200).json(allPosts);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to get all posts!" });
	}
};

export const getPost = async (req, res) => {
	const id = req.params.id;

	try {
		const post = await prisma.post.findUnique({
			where: { id },
			include: {
				postDetail: true,
				user: {
					select: {
						username: true, 
						avatar: true
					}
				}
			}
		});

		res.status(200).json(post);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to get a post!" });
	}
};

export const createPost = async (req, res) => {
	const body = req.body;
	const tokenUserId = req.userId;

	try {
		const post = await prisma.post.create({
			data: {
				...body.postData,
				userId: tokenUserId,
            postDetail: {
               create: body.postDetail,
            },
			},
		});

		res.status(200).json(post);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to create a post!" });
	}
};

export const updatePost = async (req, res) => {
	const id = req.params.id;

	try {
		res.status(200).json();
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to update a post!" });
	}
};

export const deletePost = async (req, res) => {
	const id = req.params.id;
	const tokenUserId = req.userId;

	try {
		const post = await prisma.post.findUnique({
			where: { id },
		});

      if(tokenUserId !== post.userId){
         return res.status(403).json({message: "Not authorized!"});
      }

      await prisma.post.delete({
			where: { id },
		});

		res.status(200).json({message: "Post deleted!"});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to delete a post!" });
	}
};
