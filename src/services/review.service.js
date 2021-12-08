import { httpService } from './http.service'
import { storageService } from './async-storage.service'
// import {userService} from './user.service'
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
    console.log('filterBy :>> ', filterBy);
    if (!filterBy) filterBy = '';
    return httpService.get(`review`, filterBy)
    // return storageService.query('review')
}

function remove(reviewId) {
    return httpService.delete(`review/${reviewId}`)
    // return storageService.delete('review', reviewId)

}
async function add(review) {
    console.log('service :>> ', review);
    const addedReview = await httpService.post(`review`, review)

    // review.byUser = userService.getLoggedinUser()
    // review.aboutUser = await userService.getById(review.aboutUserId)
    // const addedReview = storageService.post('review', review)

    return addedReview
}

// This IIFE functions for Dev purposes 
// It allows testing of real time updates (such as sockets) by listening to storage events
(async () => {
    var reviews = await storageService.query('review')

    // Dev Helper: Listens to when localStorage changes in OTHER browser
    window.addEventListener('storage', async () => {
        console.log('Storage updated');
        const freshReviews = await storageService.query('review')
        if (freshReviews.length === reviews.length + 1) {
            console.log('Review Added - localStorage updated from another browser')
            socketService.emit(SOCKET_EVENT_REVIEW_ADDED, freshReviews[freshReviews.length - 1])
        }
        reviews = freshReviews
    });
})()

