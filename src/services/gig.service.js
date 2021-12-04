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

_createGigs()
async function query(filterBy) {
  let filterGigs = await storageService.query(KEY)
  if (filterBy.category) {
    filterGigs = filterGigs.filter(gig => gig.category === filterBy.category)
  }
  if (filterBy.price) {
    filterGigs = filterGigs.filter(gig => gig.price <= filterBy.price)
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
      _createGig('I will do modern line art text or badge logo design', 50, ['logo-design/cartoon-comic.png', 'logo-design/cartoon-comic2.png'], 'logoDesign'),
      _createGig('I will design 3 modern minimalist logo design in 24 hrs', 70, ['logo-design/cartoon-comic3.jpg', 'logo-design/cartoon-comic.png'], 'logoDesign'),
      _createGig('I will draw flowers for your commercial packaging', 30, ['logo-design/logo-design0.png', 'logo-design/logo-design1.png'], 'logoDesign'),
      _createGig('I will draw minimalist line art illustration', 40, ['illustration/illustration5.png', 'illustration/illustration3.jpg'], 'illustration'),
      _createGig('I will do amazing monster character head illustration', 50, ['illustration/illustration3.jpg', 'illustration/illustration4.png'], 'illustration'),
      _createGig('I will draw a premium illustration for your food or product catalogue', 20, ['illustration/illusration1.png', 'illustration/illustration2.jpg'], 'illustration'),
      _createGig('I will chinese voice over 2000 words in 24 hours male', 10, ['voice-over/voice-over1.png', 'voice-over/voice-over2.png'], 'voiceOver'),
      _createGig('I will record your classy pro australian voice over', 47, ['voice-over/voice-over3.png', 'voice-over/voice-over4.png'], 'voiceOver'),
      _createGig('I will provide modern style animation with customized graphics', 99, ['video-explainer/video-explainer1.png', 'video-explainer/video-explainer2.png'], 'videoExplainer'),
      _createGig('I will draw a premium illustration for your food or product catalogue', 35, ['illustration/illusration1.png', 'illustration/illustration2.jpg'], 'illustration'),
      _createGig('I will record your professional norwegian voice over', 78, ['voice-over/voice-over1.png', 'voice-over/voice-over2.png'], 'voiceOver'),
      _createGig('I will do organic twitter marketing promotion with real followers', 90, ['social-media/social-media1.jpg', 'social-media/social-media2.png'], 'socialMediaMarketing'),
      _createGig('I will do finnish and english voice overs', 120, ['voice-over/voice-over5.png', 'voice-over/voice-over6.png'], 'voiceOver'),
      _createGig('I will be your social media marketing manager and content creator', 55, ['social-media/social-media3.png', 'social-media/social-media4.jpg'], 'socialMediaMarketing'),
      _createGig('I will provide modern style animation with customized graphics', 35, ['video-explainer/video-explainer1.png', 'video-explainer/video-explainer2.png'], 'videoExplainer'),
      _createGig('I will do organic twitter marketing promotion with real followers', 40, ['social-media/social-media5.png', 'social-media/social-media2.png'], 'socialMediaMarketing'),
      _createGig('I will be your social media marketing manager and content creator', 30, ['social-media/social-media1.jpg', 'social-media/social-media2.png'], 'socialMediaMarketing'),
      _createGig('I will do modern line art text or badge logo design', 80, ['logo-design/logo-design3.jpg', 'logo-design/logo-design1.png'], 'logoDesign'),
      _createGig('I will create a custom 2d animated explainer video animation', 48, ['video-explainer/video-explainer3.png', 'video-explainer/video-explainer4.png'], 'videoExplainer'),
      _createGig('I will create an animated explainer or promo video for your business', 31, ['video-explainer/video-explainer5.png', 'video-explainer/video-explainer3.png'], 'videoExplainer'),

    ]
    localStorage.setItem(KEY, JSON.stringify(gigs))
  }
  return gigs
}
function _createGig(title, price, imgUrl, category) {
  return {
    _id: utilService.makeId(),
    title,
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. \n Nisi molest iasblanditiis aspernatur quidem quisquam omnis \ntenetur maxime necessitatibus aut numquam corrupti culpa dicta quibusdam, sapiente labore ratione sed ipsum totam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. \nNisi molestias blanditiis aspernatur quidem quisquam omnis tenetur maxime necessitatibus aut numquam corrupti culpa dicta quibusdam, \nsapiente labore ratione sed ipsum totam.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi molestias blanditiis aspernatur quidem quisquam omnis tenetur maxime necessitatibus aut numquam corrupti culpa dicta \nquibusdam, sapiente labore ratione sed ipsum totam.',
    price,
    imgUrl,
    category,
    owner: {
      _id: "1hu2i",
      username: "logoflow",
      imgUrl: 'https://i.dlpng.com/static/png/7019966_preview.png',
      rate: 4,
      country: 'United States',
      description: "Hi, I'm a professional graphic designer. I'm an expert in designing logos, banners, book covers, business card designs, etc. I am very fast, creative, and very oriented on deadlines. I look forward to helping you with your graphic design needs !!"
    },
    tags: [
      "artisitic",
      "proffesional",
      "accessible"
    ],
    package: {
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
