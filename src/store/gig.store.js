import { gigService } from "../services/gig.service.js";
// import { showMsg } from "../js/services/event-bus.service.js";
// import { userService } from "../js/services/user.service.js";
export const gigStore = {
    state: {
        isLoading: false,
        gigs: [],
        lastRemovedToy: null,
        currToy: null,
        pageIdx: 0,
        pageSize: 12,
        filterBy: { name: '', inStock: '', lable: '' },
        sortBy: '',

    },
    getters: {
        toys({ toys }) {
            return toys
        },
        isLoading({ isLoading }) {
            return isLoading
        },
        getCurrToy(state) {
            return JSON.parse(JSON.stringify(state.currToy))
        },
        toysToShow(state) {
            var toys = JSON.parse(JSON.stringify(state.toys))
            console.log('toys :>> ', toys);
            // let filteredToys = []

            // const regex = new RegExp(state.filterBy.name, 'i')

            // // filter by name
            // filteredToys = toys.filter((toy) => regex.test(toy.name))

            // // filter by inStock
            // if (state.filterBy.inStock) {
            //     filteredToys = filteredToys.filter((toy) => JSON.parse(toy.inStock) === JSON.parse(state.filterBy.inStock))
            // }

            // // filter by lables
            // if (state.filterBy.lable) {
            //     filteredToys = filteredToys.filter((toy) => toy.labels.includes(state.filterBy.lable))
            // }

            // Sorting
            if (state.sortBy) {
                if (state.sortBy === 'time') toys = toys.sort((t1, t2) => t1.createdAt - t2.createdAt)
                else if (state.sortBy === 'price') toys = toys.sort((t1, t2) => t1.price - t2.price)
                else if (state.sortBy === 'name') toys = toys.sort((t1, t2) => t1.name.toLowerCase() > t2.name.toLowerCase() ? 1 : -1)
            }

            // Paging
            if (typeof state.pageIdx === 'number' && state.pageIdx !== -1) {
                const startIdx = state.pageIdx * state.pageSize
                toys = toys.slice(startIdx, startIdx + state.pageSize)
            }
            return toys
        },
    },
    mutations: {
        setLoading(state, { isLoading }) {
            state.isLoading = isLoading
        },
        addToy(state, payload) {
            state.toys.push(payload.toy)
        },
        updateToy(state, payload) {
            const idx = state.toys.findIndex((toy) => toy._id === payload.toy._id)
            state.toys.splice(idx, 1, payload.toy)
        },
        removeToy(state, payload) {
            const idx = state.toys.findIndex((toy) => toy._id === payload.toyId)
            state.lastRemovedToy = state.toys[idx]
            state.toys.splice(idx, 1)
        },
        undoRemoveToy(state) {
            if (state.lastRemovedToy) {
                state.toys.unshift(state.lastRemovedToy)
                state.lastRemovedToy = null
            }
        },
        setToys(state, { toys }) {
            state.toys = toys
        },
        setFilter(state, { filterBy }) {
            console.log(filterBy, 'SETFILTER MUTATION')
            state.filterBy = filterBy
        },
        setSort(state, { copySort }) {
            state.sortBy = copySort
        },
        setPageIdx(state, { pageIdx }) {
            console.log('pageIdx :>> ', pageIdx);
            state.pageIdx = pageIdx
            let maxPage = Math.ceil(state.toys.length / state.pageSize)

            if (state.pageIdx >= maxPage) state.pageIdx = 0
            else if (state.pageIdx < 0) state.pageIdx = maxPage - 1
        },
        setCurrToy(state, { toy }) {
            console.log('currToy', state.currToy)
            state.currToy = toy
            console.log('currToy', state.currToy)
        },
        setNewToy(state, { toy }) {
            state.currToy = toy
        },
        saveToy(state, { toy }) {
            state.toys.push(toy)
        },
    },
    actions: {
        loadToys({ commit, state }) {
            var filterBy = state.filterBy ? state.filterBy : ''
            console.log(state, 'FROM LOADTOYS')
            commit({ type: 'setLoading', isLoading: true })
            toyService
                .query(filterBy)
                .then((toys) => {
                    commit({ type: 'setToys', toys })
                })
                .finally(() => {
                    commit({ type: 'setLoading', isLoading: false })
                })
        },
        loadEdit({ commit }) {
            commit({ type: 'setLoading', isLoading: true })
            toyService
                .query()
                .then((toys) => {
                    commit({ type: 'setToys', toys })
                })
                .finally(() => {
                    commit({ type: 'setLoading', isLoading: false })
                })
        },
        addToy({ commit }, { toy }) {
            return toyService.save(toy).then((savedToy) => {
                commit({ type: 'addToy', toy: savedToy })
                return savedToy
            })
        },
        updateToy({ commit }, { toy }) {
            return toyService.save(toy).then((savedToy) => {
                commit({ type: 'updateToy', toy: savedToy })
                return savedToy
            })
        },
        // Optimistic
        removeToyOptimistic({ commit }, { toyId }) {
            commit({ type: 'removeToy', toyId })
            return toyService
                .remove(toyId)
                .then(() => { })
                .catch((err) => {
                    commit({ type: 'undoRemoveToy' })
                    throw err
                })
        },
        removeToy({ commit }, { toyId }) {
            return toyService.remove(toyId).then(() => {
                commit({ type: 'removeToy', toyId })
            })
        },
        setCurrToy({ commit }, { toyId }) {
            return toyService.getById(toyId).then((toy) => {
                console.log(toy)
                commit({ type: 'setCurrToy', toy })
            })
        },
        setNewToy({ commit }) {
            return toyService
                .getEmptyToy()
                .then((toy) => commit({ type: 'setNewToy', toy }))
        },
        saveToy({ commit }, { toy }) {
            console.log(toy)
            return toyService.save(toy).then((toy) => {
                commit({ type: 'saveToy', toy })
                return toy
            })
        },
        setFilter({ commit, dispatch }, { filterBy }) {
            console.log('toystore :>> ', filterBy);
            commit({ type: 'setFilter', filterBy })
            dispatch({ type: 'loadToys' })
        },
    },
}
