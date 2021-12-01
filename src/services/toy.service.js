// import { storageService } from '../services/async-storage.service.js'

import { httpService } from './http.service.js'

// import { storageService } from './storage-service.js'
const axios = require('axios')
// import { utilService } from '../services/util.service.js'

// const KEY = 'toysDB'
const TOY_URL = 'http://localhost:3030/api/toy/'

export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy,
}

// var gToys = _createToys()
// console.log('gToys :>> ', gToys);

function query(filterBy) {
  // return storageService.query(KEY)
  // console.log('filterBy :>> ', filterBy);
  // return axios.get(TOY_URL, { params: filterBy }).then(res => res.data)
  return httpService.get('toy', filterBy)
}

function getById(id) {
  // return storageService.get(KEY, id)
  return axios.get(TOY_URL + id).then(res => res.data)
}

function remove(id) {
  // return storageService.remove(KEY, id)
  return axios.delete(TOY_URL + id).then(res => res.data)
}

function save(toy) {
  // const savedToy = toy._id
  //   ? storageService.put(KEY, toy)
  //   : storageService.post(KEY, toy)
  // return savedToy
  if (toy._id) {
    return axios.put(TOY_URL + `${toy._id}`, toy).then(res => res.data)
  } else {
    return axios.post(TOY_URL, toy).then(res => res.data)
  }
}



// function _add(toy) {
//   return storageService.post(KEY, toy)
// }

// function _update(toy) {
//   return storageService.put(KEY, toy)
// }

function getEmptyToy() {
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

// function _createToys() {
//   var toys = JSON.parse(localStorage.getItem(KEY))
//   if (!toys || !toys.length) {
//     toys = [
//       _createToy(
//         'Talking Doll',
//         123,
//         ['Doll', 'Battery Powered', 'Baby'],
//         ['Great!']
//       ),
//       _createToy('Ball', 50, ['Outdoor', 'Baby'], ['Amazing!']),
//       _createToy('Cards', 250, ['Box game'], ['wow!']),
//     ]
//     localStorage.setItem(KEY, JSON.stringify(toys))
//   }
//   return toys
// }

// function _createToy(name, price, labels, reviews) {
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
