const knex = require('knex');

const db = knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'datagdb'
  }
});

const getAllPosts = async () => {
    try {
        const posts = await db('posts').select('*');
    
        for (const post of posts) {
          const comments = await db('comments')
            .select('comments.*', 'users.name', 'users.handle', 'users.avatar', 'users.status', 'users.created_at')
            .join('users', 'comments.user_id', 'users.id')
            .where('post_id', post.id);
    
          for (const comment of comments) {
            const replies = await db('replies')
              .select('replies.*', 'users.name', 'users.handle', 'users.avatar', 'users.status', 'users.created_at')
              .join('users', 'replies.user_id', 'users.id')
              .where('comment_id', comment.id);
    
            comment.replies = replies;
          }
    
          post.comments = comments;
        }
    
        return posts;
      } catch (err) {
        console.log(err);
        return [];
      }
  };

const addPost = async (post) => {
    try {
      const result = await db('posts').insert(post);
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const getAllComments = async () => {
    try {
      const [rows] = await db.raw('SELECT * FROM comments');
      return rows;
    } catch (err) {
      console.log(err);
      return [];
    }
  };
  
  const addComment = async (comment) => {
    try {
      const result = await db('comments').insert(comment);
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const getAllReplies = async () => {
    try {
      const [rows] = await db.raw('SELECT * FROM replies');
      return rows;
    } catch (err) {
      console.log(err);
      return [];
    }
  };
  
  const addReplies = async (replies) => {
    try {
      const result = await db('replies').insert(replies);
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
  
  const addFollower = async (follower) => {
    try {
    const result = await db('followers').insert(follower);
    return result;
    } catch (err) {
    console.log(err);
    return null;
    }
    };
    
    const getFollowers = async (userId) => {
    try {
    const folloersId = await db('followers').select('follower_id').where('user_id', userId).pluck('follower_id');;
    return await getDetail(folloersId);
    } catch (err) {
    console.log(err);
    return [];
    }
    };

    const getDetail = async (userIds) => {
        return await db('users')
            .select('name', 'handle', 'avatar', 'status', 'created_at')
            .whereIn('id', userIds);
    };
    

    const getFollowing = async (userId) => {
        try {
            const followingIds = await db('followers')
              .select('user_id')
              .where('follower_id', userId)
              .pluck('user_id');
            return await getDetail(followingIds);
          } catch (err) {
            console.log(err);
            return [];
          }
    };
    
    module.exports = {
    getAllPosts,
    addPost,
    getAllComments,
    addComment,
    getAllReplies,
    addReplies,
    addFollower,
    getFollowers,
    getFollowing,
    };