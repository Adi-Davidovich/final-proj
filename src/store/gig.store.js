import { gigService } from "../services/gig.service.js";

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
        },
    },
    mutations: {
        setLoading(state, { isLoading }) {
            state.isLoading = isLoading
        },
        addGig(state, payload) {
            state.gigs.push(payload.gig)
        },
        updateGig(state, { savedGig }) {
            const idx = state.gigs.findIndex((gig) => gig._id === savedGig._id)
            state.gigs.splice(idx, 1, savedGig.gig)
        },
        removeGig(state, payload) {
            const idx = state.gigs.findIndex((gig) => gig._id === payload.gigId)
            state.gigs.splice(idx, 1)
        },
        setGigs(state, { gigs }) {
            state.gigs = gigs
        },
        setFilter(state, { filterBy }) {
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
        setFilter({ commit, dispatch }, { filterBy }) {
            commit({ type: 'setFilter', filterBy })
            dispatch({ type: 'loadGigs' })
        },
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
        async setCurrGig({ commit }, { gigId }) {
            const gig = await gigService.getById(gigId)
            commit({ type: 'setCurrGig', gig })
            return gig

        },
        async getUserGigs({ commit, getters }) {
            let userId = getters.loggedinUser._id
            let filterBy = { userId }
            let gigs = await gigService.query(filterBy)
            commit({ type: 'setGigs', gigs })
        },
    },
}
