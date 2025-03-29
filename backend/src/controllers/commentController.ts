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
      data: data
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
  }
}

export default {
  createComment,
  likeComment,
  dislikeComment,
  removeReaction
};