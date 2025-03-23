import commentService from '../services/commentService';

const createComment = async (req: any, res: any) => {
  const userId = 1; // req.user.id;
  const payload = req.body;

  const categoryId = payload.categoryId;
  const content = payload.content;

  await commentService.createComment(
    userId,
    categoryId,
    content,
  );

  return res.status(200).json({
    message: 'success'
  });
}

const likeComment = async (req: any, res: any) => {
  const userId = 1; // req.user.id;
  const { commentId } = req.params;

  await commentService.likeCommentById(commentId, userId);
  console.log(`Like comment ${commentId}`)

  return res.status(200).json({
    message: 'success',
  });
}

const dislikeComment = async (req: any, res: any) => {
  const userId = 1; // req.user.id;
  const { commentId } = req.params;

  await commentService.dislikeCommentById(commentId, userId);
  console.log(`Dislike comment ${commentId}`)

  return res.status(200).json({
    message: 'success',
  });
}

const removeReaction = async (req: any, res: any) => {
  const userId = 1; // req.user.id;
  const { commentId } = req.params;

  await commentService.removeReactionInCommentById(commentId, userId);
  console.log(`Remove reaction in comment ${commentId}`)

  return res.status(200).json({
    message: 'success',
  });
}

export default {
  createComment,
  likeComment,
  dislikeComment,
  removeReaction
};