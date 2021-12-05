import { storageService } from '../services/async-storage.service.js'

// import { httpService } from './http.service.js'

import { utilService } from '../services/util.service.js'

const KEY = 'ordersDB'

export const orderService = {
  query,
  getById,
  remove,
  save,
  getEmptyOrder,
}



async function query(filterBy) {
  let filteredOrders = await storageService.query(KEY)
  if (!filteredOrders || !filteredOrders.length) return 
  if (filterBy.seller._id) {
    filteredOrders = filteredOrders.filter(order => order.seller._id === filterBy.seller._id)
  }
  if (filterBy.buyer._id) {
    filteredOrders = filteredOrders.filter(order => order.buyer._id <= filterBy.buyer._id)
  }
  if (filterBy.sort === 'price') {
    filteredOrders = filteredOrders.sort(function (a, b) {
      return a.price - b.price;
    })
  }
  return filteredOrders
  // console.log('filterBy :>> ', filterBy);
  //   return await httpService.get('order', filterBy)
}

async function getById(id) {
  return await storageService.get(KEY, id)
  //   return await httpService.get(`order/${id}`)
}

async function remove(id) {
  return await storageService.remove(KEY, id)
  // return await httpService.delete(`order/${id}`)
}

async function save(order) {
  let savedOrder 
  if (order._id){
    order.createdAt = Date.now()
    savedOrder = await storageService.put(KEY, order)
  } else {
    savedOrder = await storageService.post(KEY, order)
  }
  return savedOrder


  // const savedOrder = JSON.parse(JSON.stringify(order))
  // if (savedOrder._id) {
  //     return await httpService.put(`order/${savedOrder._id}`, savedOrder);
  // } else {
  //     return await httpService.post('order', savedOrder);
  // }
}

function getEmptyOrder() {
  return Promise.resolve({
    _id: '',
    createdAt: '',
    description: '',
    price: null,
    timeToDeliver: '',
    imgUrl: '',
    seller: {
      _id: '',
      fullname: '',
      imgUrl: '',
    },
    buyer: {
      _id: '',
      fullname: '',
      imgUrl: '',
    },
    gig: {
      _id: '',
      category: '',
      price: null,
      package: {
        description: '',
        timeToDeliver: '',
        revisions: null,
      }
    },
    status: 'pending'
  })
}
