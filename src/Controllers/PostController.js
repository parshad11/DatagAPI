const postRepository = require('../Repositories/PostRepository');

module.exports = {
    getAllPosts: async (req, res) => {
      const posts = await postRepository.getAllPosts();
      res.send(posts);
    },
  
    addPost: async (req, res) => {
      const post = {
        text: req.body.text,
        image: req.body.image,
        status: req.body.status,
        likes: 0,
        user_id: req.body.user_id
      };
  
      const result = await postRepository.addPost(post);
  
      if (result) {
        res.status(201).json({ message: 'Post added successfully' });
      } else {
        res.status(500).json({ message: 'Failed to add post' });
      }
    },

    getAllComments : async (req, res) => {
        const comments = await postRepository.getAllComments();
        res.send(comments);
      },
    
      addComment : async (req, res) => {
        const comment = {
          text: req.body.text,
          likes: 0,
          post_id: req.body.post_id,
          user_id: req.body.user_id
        };
    
        const result = await postRepository.addComment(comment);
    
        if (result) {
          res.status(201).json({ message: 'Comment added successfully' });
        } else {
          res.status(500).json({ message: 'Failed to add comment' });
        }
      },

      getAllReplies : async (req, res) => {
        const comments = await postRepository.getAllReplies();
        res.send(comments);
      },
    
      addReplies : async (req, res) => {
        const comment = {
          text: req.body.text,
          likes: 0,
          comment_id: req.body.comment_id,
          user_id: req.body.user_id
        };
    
        const result = await postRepository.addReplies(comment);
    
        if (result) {
          res.status(201).json({ message: 'Comment added successfully' });
        } else {
          res.status(500).json({ message: 'Failed to add comment' });
        }
      },

      getFollowers: async (req, res) => {
        const followers = await postRepository.getFollowers(req.params.id);
        res.send(followers);
      },
    
      getFollowing: async (req, res) => {
        const following = await postRepository.getFollowing(req.params.id);
        res.send(following);
      },
    
      addFollower: async (req, res) => {
        const follower = {
          follower_id: req.body.follower_id,
          user_id: req.body.user_id,
        };
    
        const result = await postRepository.addFollower(follower);
    
        if (result) {
          res.status(201).json({ message: 'Follower added successfully' });
        } else {
          res.status(500).json({ message: 'Failed to addfollower' });
        }
        },
        
        getFollowers: async (req, res) => {
        const userId = req.params.id;
        const followers = await postRepository.getFollowers(userId);
        res.send(followers);
        },
        
        getFollowing: async (req, res) => {
        const userId = req.params.id;
        const following = await postRepository.getFollowing(userId);
        res.send(following);
        }
        
  };