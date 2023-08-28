export const hasMyLike = (card, userInfo) => card.likes.some((like) => like === userInfo._id);
