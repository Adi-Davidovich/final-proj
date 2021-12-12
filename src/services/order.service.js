import { httpService } from './http.service.js'

export const orderService = {
  query,
  getById,
  remove,
  save,
  getEmptyOrder,
}


async function query() {
  return await httpService.get('order')
}

async function getById(id) {
  return await httpService.get(`order/${id}`)
}

async function remove(id) {
  return await httpService.delete(`order/${id}`)
}

async function save(order) {
  if (order._id) {
    return await httpService.put(`order/${order._id}`, order);
  } else {
    return await httpService.post('order', order);
  }
}

function getEmptyOrder() {
  return Promise.resolve({
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
    status: 'Pending'
  })
}
