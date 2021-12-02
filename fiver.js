const db = {
  "gig": [
    {
      "_id": "i101",
      "title": "I will design 3 modern minimalist logo designs",
      "price": 12,
      "owner": {
        "_id": "u101",
        "fullname": "Dudu Da",
        "imgUrl": "url"
      },
      "daysToMake": 3,
      "description": "If you are looking for a Modern and Professional Business logo design,then you are at the right place. We focus on creating simple yet effective designs that elevate your business outlook and leave an everlasting impression.",
      "imgUrl": "",
      "category": "Logo Design",
      "tags": [
        "artisitic",
        "proffesional",
        "accessible"
      ]
    }
  ],
  "order": [
    {
      "_id": "o1225",
      "createdAt": 9898989,
      "buyer": {
        "_id": "u105",
        "fullname": "Meir cohen",
        "imgUrl": "url"
      },
      "seller": {
        "_id": "u101",
        "fullname": "Dudu Da",
        "imgUrl": "url"
      },
      "gig": {
        "_id": "i101",
        "category": "Logo Design",
        "price": 20
      },
      "status": "pending"
    }
  ],
  "user": [
    {
      "_id": "u101",
      "fullname": "User 1",
      "imgUrl": "/img/img1.jpg",
      "isSeller": false,
      "username": "user1",
      "password": "secret",
      "details":"",

    },
  ]
}

const gigs = [{}, {}]
// HomePage
//  list of gigs with link to gig-details
//  CSS Infra, Master CSS

// Gig Details
// <pre>JSON, slowly improve

// UserDetails 
//  basic info
//  orderedGigs => orderService.query({userId: 'u101'})
//  ownedGigs => gigService.query({ownerId: 'u103'})

// GigEdit - make it super easy to add Gig for development

// GigList, GigPorder
// Order, confirm Order
// Lastly: GigExplore, Filtering


function loadApp() {
  socketService.on(SOCKET_EVENT_ORDER_ADDED, (order) => {
    showSuccessMsg(`Order was added, check it out ${order._id}`)
  })
}