import { storageService } from '../services/async-storage.service.js'

// import { httpService } from './http.service.js'

import { utilService } from '../services/util.service.js'

const KEY = 'gigsDB'

export const gigService = {
  query,
  getById,
  remove,
  save,
  getEmptyGig,
}

var gGigs = _createGigs()
console.log('gGigs :>> ', gGigs);

async function query(filterBy) {
  return await storageService.query(KEY)
  // console.log('filterBy :>> ', filterBy);
  //   return await httpService.get('gig', filterBy)
}

async function getById(id) {
  return await storageService.get(KEY, id)
  //   return await httpService.get(`gig/${id}`)
}

async function remove(id) {
  return await storageService.remove(KEY, id)
  // return await httpService.delete(`gig/${id}`)
}

async function save(gig) {
  const savedGig = gig._id
    ? await storageService.put(KEY, gig)
    : await storageService.post(KEY, gig)
  return savedGig


  // const savedGig = JSON.parse(JSON.stringify(gig))
  // if (savedGig._id) {
  //     return await httpService.put(`gig/${savedGig._id}`, savedGig);
  // } else {
  //     return await httpService.post('gig', savedGig);
  // }
}

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
      imgUrl: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/21760012/original/d4c0c142f91f012c9a8a9c9aeef3bac28036f15b/create-your-cartoon-style-flat-avatar-or-icon.jpg",
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
    imgUrl: ["https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/gigs/22527722/original/f5994d4dd5384869d546512f2e160ba0b03f934b.jpg",
      "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/3171448/original/a41a38f3733bb97279a49d1449f7337dece50693.jpg",
       "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/attachments/delivery/asset/f57378f6a9ff6da2ee7e306bad7d8d64-1637824234/30143_JEXCITY%20Co_LOGO_FS_GR-Mockup.jpg"],
    owner: {
      _id: "u101",
      username: "logoflow",
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


