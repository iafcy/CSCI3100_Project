import commentService from '../services/commentService';

const createComment = async (req: any, res: any) => {
  const userId = req.user.id;
  const payload = req.body;

  const threadId = payload.threadId;
  const content = payload.content;

  const { data, error } = await commentService.createComment(
    userId,
    threadId,
    content,
  );

  if (!error) {
    return res.status(200).json({
      message: 'success',
      data: {
        ...data,
        username: req.user.user_metadata.username,
        like: 0,
        dislike: 0,
        user_reaction: null,
      }
    });
  } else {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
}

const likeComment = async (req: any, res: any) => {
  const userId = req.user.id;
  const { commentId } = req.params;

  const { data, error } = await commentService.likeCommentById(commentId, userId);

  if (!error) {
    return res.status(200).json({
      message: 'success',
      data: data
    });
  } else {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
}

const dislikeComment = async (req: any, res: any) => {
  const userId = req.user.id;
  const { commentId } = req.params;

  const { data, error } = await commentService.dislikeCommentById(commentId, userId);

  if (!error) {
    return res.status(200).json({
      message: 'success',
      data: data
    });
  } else {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
}

const removeReaction = async (req: any, res: any) => {
  const userId = req.user.id;
  const { commentId } = req.params;

  const { data, error } = await commentService.removeReactionInCommentById(commentId, userId);

  if (!error) {
    return res.status(200).json({
      message: 'success',
      data: data
    });
  } else {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
}

export default {
  createComment,
  likeComment,
  dislikeComment,
  removeReaction
};