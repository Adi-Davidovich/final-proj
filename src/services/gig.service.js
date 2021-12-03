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
  let filterGigs
  console.log(filterBy)
  if (!filterBy.category) {
    filterGigs = await storageService.query(KEY)

  }

  else {
    if (filterBy.category) {
      let gigs = await storageService.query(KEY)
      console.log(gigs)
      filterGigs = gigs.filter(gig => gig.category === filterBy.category)
      console.log('adsa', filterGigs)
    }
  }
  if (filterBy.sort === 'price') {
    filterGigs = filterGigs.sort(function (a, b) {
      return a.price - b.price;
    })
  }
  return filterGigs
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
      _createGig('I will do modern line art text or badge logo design', 50, ['cartoon-comic.png'], 'logoDesign'),
      _createGig('I will design 3 modern minimalist logo design in 24 hrs', 70, ['logo-design3.jpg', 'logo-design1.png'], 'logoDesign'),
      _createGig('I will do modern line art text or badge logo design', 80, ['cartoon-comic3.jpg', 'cartoon-comic.png'], 'logoDesign'),
      _createGig('I will draw custom mascot cartoon avatar for nft', 20, ['cartoon-comic2.png'], 'cartoonAndComic'),
      _createGig('I will draw flowers for your commercial packaging', 30, ['cartoon-comic.png'], 'logoDesign'),
      _createGig('I will turn your idea into a beautiful illustration', 75, ['cartoon-comic.png'], 'cartoonAndComic'),
      _createGig('I will draw coloring book pages for children', 50, ['cartoon-comic.png'], 'logoDesign'),
      _createGig('I will draw amazing cartoon characters and cartoon objects', 34, ['cartoon-comic2.png'], 'logoDesign'),
      _createGig('I will turn your idea into a beautiful illustration', 150, ['cartoon-comic.png'], 'Illustration'),
      _createGig('I will do 5 minimalist logo design for your business', 150, ['cartoon-comic.png'], 'logoDesign'),
      _createGig('I will draw custom mascot cartoon avatar for nft', 360, ['cartoon-comic.png'], 'cartoonAndComic'),
      _createGig('I will do 5 minimalist logo design for your business', 70, ['cartoon-comic.png'], 'logoDesign'),
      _createGig('I will draw custom mascot cartoon avatar for nft', 18, ['cartoon-comic.png'], 'cartoonAndComic'),
    ]
    localStorage.setItem(KEY, JSON.stringify(gigs))
  }
  return gigs
}
function _createGig(title, price, imgUrl = ['logo-design.png', 'logo-design3.jpg'], category) {
  return {
    _id: utilService.makeId(),
    title,
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi molest iasblanditiis aspernatur quidem quisquam omnis tenetur maxime necessitatibus aut numquam corrupti culpa dicta quibusdam, sapiente labore ratione sed ipsum totam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi molestias blanditiis aspernatur quidem quisquam omnis tenetur maxime necessitatibus aut numquam corrupti culpa dicta quibusdam, sapiente labore ratione sed ipsum totam.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi molestias blanditiis aspernatur quidem quisquam omnis tenetur maxime necessitatibus aut numquam corrupti culpa dicta quibusdam, sapiente labore ratione sed ipsum totam.',
    price,
    imgUrl,
    category,
    owner: {
      _id: "1hu2i",
      username: "logoflow",
      imgUrl: 'https://i.dlpng.com/static/png/7019966_preview.png',
      rate: 4
    },
    tags: [
      "artisitic",
      "proffesional",
      "accessible"
    ],
    package: {
      title: "Basic Package",
      description: "2 Modern Logo Concept with High Resolution JPEG and Transparent PNG",
      timeToDeliver: "3 Days",
      revisions: 5,

    }
  }
}


// categories: [
//   {
//     categoryName: "Cartoons & Comics",
//     value: "cartoonAndComic",
//     iconUrl: "comic-book.png",
//   },
//   {
//     categoryName: "Logo Design",
//     value: "logoDesign",
//     iconUrl: "logo-design.png",
//   },
//   {
//     categoryName: "Illustration",
//     value: "Illustration",
//     iconUrl: "illustration.png",
//   },
//   {
//     categoryName: "Social Media Marketing",
//     value: "socialMediaMarketing",
//     iconUrl: "SocialMediaMarketing.png",
//   },
//   {
//     categoryName: "Visual Effects",
//     value: "visualEffct",
//     iconUrl: "visual-effects.png",
//   },
// ],
