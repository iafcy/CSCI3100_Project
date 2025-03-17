import threadService from '../services/threadService';

const createThread = async (req: any, res: any) => {
    const user = req.user;
    const payload = req.body;

    const categoryId = payload.categoryId;
    const title = payload.title;

    threadService.createThread(
        1, // user.userId,
        categoryId,
        title,
    );

    return res.status(200).json({
        message: 'success'
    });
}

const getThread = async (req: any, res: any) => {
    const { threadId } = req.params;
    const { page = 1 } = req.query;

    const pageCount = await threadService.getThreadPageCountById(threadId);
    const comments = await threadService.getThreadPageById(threadId, page);

    return res.status(200).json({
        message: 'success',
        data: {
            page: Number(page),
            pageCount,
            comments
        },
    });
}

export default {
    createThread,
    getThread
};