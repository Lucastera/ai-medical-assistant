import request from './request';

export const getCodeReviewHistory = (params) => {
    return request({
        url: '/review/history',
        method: 'get',
        params
    });
};

export const submitCodeReview = (data) => {
    return request({
        url: '/review/submit',
        method: 'post',
        data
    });
};

export const getReviewDetailHistory = (historyID) => {
    return request({
      url: `/review/detail?history_id=${historyID}`, // Passing reviewId as a query parameter
      method: 'get'
    });
  };

