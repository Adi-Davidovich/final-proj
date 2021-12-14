import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { socketService, SOCKET_EVENT_REVIEW_ADDED } from './socket.service'

export const reviewService = {
    add,
    query,
    remove
}


// More ways to send query params:
// return axios.get('api/Gig/?id=1223&balance=13')
// return axios.get('api/Gig/?', {params: {id: 1223, balanse:13}})

function query(filterBy) {
    if (!filterBy) filterBy = '';
    return httpService.get(`review`, filterBy)
}

function remove(reviewId) {
    return httpService.delete(`review/${reviewId}`)
}
async function add(review) {
    const addedReview = await httpService.post(`review`, review)
    return addedReview
}

// This IIFE functions for Dev purposes 
// It allows testing of real time updates (such as sockets) by listening to storage events
(async () => {
    var reviews = await storageService.query('review')

    // Dev Helper: Listens to when localStorage changes in OTHER browser
    window.addEventListener('storage', async () => {
        const freshReviews = await storageService.query('review')
        if (freshReviews.length === reviews.length + 1) {
            socketService.emit(SOCKET_EVENT_REVIEW_ADDED, freshReviews[freshReviews.length - 1])
        }
        reviews = freshReviews
    });
})()

