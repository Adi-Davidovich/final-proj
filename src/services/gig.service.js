import { storageService } from '../services/async-storage.service.js'

// import { httpService } from './http.service.js'

// import { storageService } from './storage-service.js'
const axios = require('axios')
import { utilService } from '../services/util.service.js'

const KEY = 'gigsDB'
// const TOY_URL = 'http://localhost:3030/api/toy/'

export const gigService = {
    query,
    getById,
    remove,
    save,
    getEmptyGig,
}

var gGigs = _createGigs()
// console.log('gToys :>> ', gToys);

async function query(filterBy) {
    return await storageService.query(KEY)
    // console.log('filterBy :>> ', filterBy);
    // return axios.get(TOY_URL, { params: filterBy }).then(res => res.data)
    //   return await httpService.get('gig', filterBy)
}

async function getById(id) {
    return await storageService.get(KEY, id)
    //   return axios.get(TOY_URL + id).then(res => res.data)
    //   return await httpService.get(`gig/${id}`)
}

async function remove(id) {
    return await storageService.remove(KEY, id)
    // return axios.delete(TOY_URL + id).then(res => res.data)
    // return await httpService.delete(`gig/${id}`)
}

async function save(gig) {
    const savedGig = gig._id
      ? await storageService.put(KEY, gig)
      : await storageService.post(KEY, gig)
    return savedGig

    // if (toy._id) {
    //     return axios.put(TOY_URL + `${toy._id}`, toy).then(res => res.data)
    // } else {
    //     return axios.post(TOY_URL, toy).then(res => res.data)
    // }


    // const savedGig = JSON.parse(JSON.stringify(gig))
    // if (savedGig._id) {
    //     return await httpService.put(`gig/${savedGig._id}`, savedGig);
    // } else {
    //     return await httpService.post('gig', savedGig);
    // }
}



// function _add(toy) {
//   return storageService.post(KEY, toy)
// }

// function _update(toy) {
//   return storageService.put(KEY, toy)
// }

function getEmptyGig() {
    return Promise.resolve({
        _id: '',
        title: '',
        description: '',
        price: null,
        timeToDeliver: '',
        imgUrl: '',
        owner: {
            _id: "u101",
            fullname: "Dudu Da",
            imgUrl: "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png",
            rate: 4        
          },
          tags: [
            "artisitic",
            "proffesional",
            "accessible"
          ]
    })
}

function _createGigs() {
  var gigs = JSON.parse(localStorage.getItem(KEY))
  if (!gigs || !gigs.length) {
    gigs = [
      _createGig('I will do modern line art text or badge logo design', 50,),
      _createGig('I will design 3 modern minimalist logo design in 24 hrs', 70,),
      _createGig('I will do modern line art text or badge logo design', 80,),
      _createGig('I will do creative logo design for your business', 20,),
      _createGig('I will do 5 minimalist logo design for your business', 150,),
    ]
    localStorage.setItem(KEY, JSON.stringify(gigs))
  }
  return gigs
}

function _createGig(title, price) {
  return {
    _id: utilService.makeId(),
    title,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi molest iasblanditiis aspernatur quidem quisquam omnis tenetur maxime necessitatibus aut numquam corrupti culpa dicta quibusdam, sapiente labore ratione sed ipsum totam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi molestias blanditiis aspernatur quidem quisquam omnis tenetur maxime necessitatibus aut numquam corrupti culpa dicta quibusdam, sapiente labore ratione sed ipsum totam.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi molestias blanditiis aspernatur quidem quisquam omnis tenetur maxime necessitatibus aut numquam corrupti culpa dicta quibusdam, sapiente labore ratione sed ipsum totam.",
    price,
    timeToDeliver: '3 Days',
    imgUrl:"https://webfeb.in/wp-content/uploads/2016/11/logo-design-for-children-health.jpg",
    owner: {
        _id: "u101",
        fullname: "Dudu Da",
        imgUrl: "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png",
        rate: 4        
      },
      tags: [
        "artisitic",
        "proffesional",
        "accessible"
      ]
  }
}


