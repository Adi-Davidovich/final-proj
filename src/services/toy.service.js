// import { storageService } from '../services/async-storage.service.js'

import { httpService } from './http.service.js'

// import { storageService } from './storage-service.js'
const axios = require('axios')
// import { utilService } from '../services/util.service.js'

// const KEY = 'gigsDB'
const gig_URL = 'http://localhost:3030/api/gig/'

export const gigService = {
  query,
  getById,
  remove,
  save,
  getEmptygig,
}

// var ggigs = _creategigs()
// console.log('ggigs :>> ', ggigs);

function query(filterBy) {
  // return storageService.query(KEY)
  // console.log('filterBy :>> ', filterBy);
  // return axios.get(gig_URL, { params: filterBy }).then(res => res.data)
  return httpService.get('gig', filterBy)
}

function getById(id) {
  // return storageService.get(KEY, id)
  return axios.get(gig_URL + id).then(res => res.data)
}

function remove(id) {
  // return storageService.remove(KEY, id)
  return axios.delete(gig_URL + id).then(res => res.data)
}

function save(gig) {
  // const savedgig = gig._id
  //   ? storageService.put(KEY, gig)
  //   : storageService.post(KEY, gig)
  // return savedgig
  if (gig._id) {
    return axios.put(gig_URL + `${gig._id}`, gig).then(res => res.data)
  } else {
    return axios.post(gig_URL, gig).then(res => res.data)
  }
}



// function _add(gig) {
//   return storageService.post(KEY, gig)
// }

// function _update(gig) {
//   return storageService.put(KEY, gig)
// }

function getEmptygig() {
  return Promise.resolve({
    _id: '',
    name: '',
    price: null,
    labels: ['Doll', 'Battery Powered', 'Baby'],
    createdAt: new Date(Date.now()).toLocaleString(),
    inStock: true,
    reviews: [],
  })
}

// function _creategigs() {
//   var gigs = JSON.parse(localStorage.getItem(KEY))
//   if (!gigs || !gigs.length) {
//     gigs = [
//       _creategig(
//         'Talking Doll',
//         123,
//         ['Doll', 'Battery Powered', 'Baby'],
//         ['Great!']
//       ),
//       _creategig('Ball', 50, ['Outdoor', 'Baby'], ['Amazing!']),
//       _creategig('Cards', 250, ['Box game'], ['wow!']),
//     ]
//     localStorage.setItem(KEY, JSON.stringify(gigs))
//   }
//   return gigs
// }

// function _creategig(name, price, labels, reviews) {
//   return {
//     _id: utilService.makeId(),
//     name,
//     price,
//     labels,
//     inStock: true,
//     createdAt: new Date(Date.now()).toLocaleString(),
//     reviews: reviews,
//   }
// }
