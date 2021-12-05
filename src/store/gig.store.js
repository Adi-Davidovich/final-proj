import { gigService } from "../services/gig.service.js";
// import { showMsg } from "../js/services/event-bus.service.js";
// import { userService } from "../js/services/user.service.js";
export const gigStore = {
    state: {
        isLoading: false,
        gigs: [],
        currGig: null,
        filterBy: {},
        sortBy: null,
        pageIdx: 0,
        pageSize: 12,
    },
    getters: {
        gigs({ gigs }) {
            console.log(gigs);
            return gigs
        },
        categoryName(state) {
            return state.filterBy.category
        },

        isLoading({ isLoading }) {
            return isLoading
        },
        getCurrGig(state) {
            return JSON.parse(JSON.stringify(state.currGig))
        },
        gigsToShow(state) {
            var gigs = JSON.parse(JSON.stringify(state.gigs))
            return gigs
            // let filteredGigs = []

            // const regex = new RegExp(state.filterBy.name, 'i')

            // // filter by name
            // filteredGigs = gigs.filter((gig) => regex.test(gig.name))

            // // filter by inStock
            // if (state.filterBy.inStock) {
            //     filteredGigs = filteredGigs.filter((gig) => JSON.parse(gig.inStock) === JSON.parse(state.filterBy.inStock))
            // }

            // // filter by lables
            // if (state.filterBy.lable) {
            //     filteredGigs = filteredGigs.filter((gig) => gig.labels.includes(state.filterBy.lable))
            // }

            // Sorting
            // if (state.sortBy) {
            //     if (state.sortBy === 'time') gigs = gigs.sort((t1, t2) => t1.createdAt - t2.createdAt)
            //     else if (state.sortBy === 'price') gigs = gigs.sort((t1, t2) => t1.price - t2.price)
            //     else if (state.sortBy === 'name') gigs = gigs.sort((t1, t2) => t1.name.toLowerCase() > t2.name.toLowerCase() ? 1 : -1)
            // }

            // // Paging
            // if (typeof state.pageIdx === 'number' && state.pageIdx !== -1) {
            //     const startIdx = state.pageIdx * state.pageSize
            //     gigs = gigs.slice(startIdx, startIdx + state.pageSize)
            // }

        },
    },
    mutations: {
        setLoading(state, { isLoading }) {
            state.isLoading = isLoading
        },
        addGig(state, payload) {
            state.gigs.push(payload.gig)
        },
        updateGig(state, payload) {
            const idx = state.gigs.findIndex((gig) => gig._id === payload.gig._id)
            state.gigs.splice(idx, 1, payload.gig)
        },
        removeGig(state, payload) {
            const idx = state.gigs.findIndex((gig) => gig._id === payload.gigId)
            state.gigs.splice(idx, 1)
        },
        // undoRemoveGigs(state) {
        //     if (state.lastRemovedGig) {
        //         state.gigs.unshift(state.lastRemovedGigs)
        //         state.lastRemovedGig = null
        //     }
        // },
        setGigs(state, { gigs }) {
            state.gigs = gigs
        },
        setFilter(state, { filterBy }) {
            console.log('filterBy :>> ', filterBy);
            state.filterBy = filterBy
        },
        setSort(state, { copySort }) {
            state.sortBy = copySort
        },
        setPageIdx(state, { pageIdx }) {
            state.pageIdx = pageIdx
            let maxPage = Math.ceil(state.gigs.length / state.pageSize)

            if (state.pageIdx >= maxPage) state.pageIdx = 0
            else if (state.pageIdx < 0) state.pageIdx = maxPage - 1
        },
        setCurrGig(state, { gig }) {
            state.currGig = gig
        },
        setNewGig(state, { gig }) {
            state.currGig = gig
        },
        saveGig(state, { gig }) {
            state.gigs.push(gig)
        },
    },
    actions: {
        async loadGigs({ commit, state }) {
            const filterBy = state.filterBy ? state.filterBy : ''
            commit({ type: 'setLoading', isLoading: true })
            try {
                const gigs = await gigService.query(filterBy);
                commit({ type: 'setGigs', gigs });
            } catch (err) {
                console.log('Error in Query Gigs (Store):', err);
                throw err;
            } finally {
                commit({ type: 'setLoading', isLoading: false });
            }
        },
        // loadEdit({ commit }) {
        //     commit({ type: 'setLoading', isLoading: true })
        //     gigService
        //         .query()
        //         .then((gigs) => {
        //             commit({ type: 'setGigs', gigs })
        //         })
        //         .finally(() => {
        //             commit({ type: 'setLoading', isLoading: false })
        //         })
        // },
        async addGig({ commit }, { gig }) {
            try {
                const savedGig = await gigService.save(gig);
                commit({ type: 'addGig', savedGig })
                return savedGig;
            } catch (err) {
                console.log("Adding Error (Store):", err);
                throw err;
            }
        },
        async updateGig({ commit }, { gig }) {
            try {
                const savedGig = await gigService.save(gig);
                commit({ type: 'updateGig', savedGig })
                return savedGig;
            } catch (err) {
                console.log('Editing Error (Store):', err);
                throw err;
            }
        },
        async removeGig({ commit }, { gigId }) {
            try {
                await gigService.remove(gigId);
                commit({ type: 'removeGig', gigId });
                return gigId;
            } catch (err) {
                console.log('Removing Error (Store):', err);
                throw err;
            }
        },
        // Optimistic
        // removeGigOptimistic({ commit }, { gigId: gigId }) {
        //     commit({ type: 'removeGig',  gigId })
        //     return gigService
        //         .remove(gigId)
        //         .then(() => { })
        //         .catch((err) => {
        //             commit({ type: 'undoRemoveGig' })
        //             throw err
        //         })
        // },
        async setCurrGig({ commit }, { gigId }) {
            const gig = await gigService.getById(gigId)
            console.log(gig)
            commit({ type: 'setCurrGig', gig })
            return gig

        },
        setFilter({ commit, dispatch }, { filterBy }) {
            commit({ type: 'setFilter', filterBy })
            dispatch({ type: 'loadGigs' })
        },
    },
}
