import { httpService } from './http.service.js'

export const gigService = {
  query,
  getById,
  remove,
  save,
  getEmptyGig,
}

async function query(filterBy) {
  return await httpService.get('gig', filterBy)
}

async function getById(id) {
  return await httpService.get(`gig/${id}`)
}

async function remove(id) {
  return await httpService.delete(`gig/${id}`)
}

async function save(gig) {
  const savedGig = gig
  if (savedGig._id) {
    return await httpService.put(`gig/${savedGig._id}`, savedGig);
  } else {
    return await httpService.post('gig', savedGig);
  }
}

function getEmptyGig() {
  return {
    title: '',
    category: '',
    description: '',
    price: null,
    imgUrl: ['logo-design/cartoon-comic.png'],
    package: {
      description: '',
      timeToDeliver: '',
      revisions: 5,
    }

  }
}
