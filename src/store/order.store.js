import { orderService } from "../services/order.service.js";
import { socketService } from "../services/socket.service.js";
// import { showMsg } from "../js/services/event-bus.service.js";
// import { userService } from "../js/services/user.service.js";
export const orderStore = {
    state: {
        isLoading: false,
        orders: [],
        filterBy: {},
        sortBy: null,
        pageIdx: 0,
        pageSize: 12,
    },
    getters: {
        orders({ orders }) {
            return orders
        },

        isLoading1({ isLoading }) {
            return isLoading
        },
        ordersToShow(state) {
            var orders = JSON.parse(JSON.stringify(state.orders))
            return orders
            // // Paging
            // if (typeof state.pageIdx === 'number' && state.pageIdx !== -1) {
            //     const startIdx = state.pageIdx * state.pageSize
            //     gigs = gigs.slice(startIdx, startIdx + state.pageSize)
            // }
        },
        showPercent({ orders }) {
            let ordersPending = orders.reduce((acc, order) => {
                if (acc[order.status]) acc[order.status]++;
                else acc[order.status] = 1;
                return acc;
            }, {});
            if (!ordersPending.Complete) return 0
            var precent = Math.floor((ordersPending.Complete / orders.length)*100)
                console.log('ordersPending :>> ', ordersPending);
                console.log('precent :>> ', precent);
            return precent
        }
    },
    mutations: {
        setLoading(state, { isLoading }) {
            state.isLoading = isLoading
        },
        addOrder(state, payload) {
            state.orders.push(payload.order)
        },
        updateOrder(state, { savedOrder }) {
            const idx = state.orders.findIndex((order) => order._id === savedOrder._id)
            state.orders.splice(idx, 1, savedOrder)
        },
        removeOrder(state, payload) {
            const idx = state.orders.findIndex((order) => order._id === payload.orderId)
            state.orders.splice(idx, 1)
        },
        setOrders(state, { orders }) {
            state.orders = orders
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy
        },
        setSort(state, { copySort }) {
            state.sortBy = copySort
        },
        setPageIdx(state, { pageIdx }) {
            state.pageIdx = pageIdx
            let maxPage = Math.ceil(state.orders.length / state.pageSize)

            if (state.pageIdx >= maxPage) state.pageIdx = 0
            else if (state.pageIdx < 0) state.pageIdx = maxPage - 1
        },
        saveOrder(state, { order }) {
            state.orders.push(order)
        },
    },
    actions: {
        async loadOrders({ commit, state }) {
            const filterBy = state.filterBy ? state.filterBy : ''
            commit({ type: 'setLoading', isLoading: true })
            try {
                const orders = await orderService.query(filterBy);
                commit({ type: 'setOrders', orders });
            } catch (err) {
                console.log('Error in Query Orders (Store):', err);
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
        async addOrder({ commit }, { order }) {
            try {
                socketService.emit('add-order', 'im ordering')
                socketService.on('add-order-client', (msg) => {
                    console.log('msg :>> ', msg);
                })
                const savedOrder = await orderService.save(order);
                commit({ type: 'addOrder', savedOrder })
                return savedOrder;
            } catch (err) {
                console.log("Adding Error (Store):", err);
                throw err;
            }
        },
        async updateOrder({ commit }, { order }) {
            try {
                const savedOrder = await orderService.save(order);
                console.log('Saved oeder', savedOrder)
                commit({ type: 'updateOrder', savedOrder })
                return savedOrder;
            } catch (err) {
                console.log('Editing Error (Store):', err);
                throw err;
            }
        },
        async removeOrder({ commit }, { orderId }) {
            try {
                await orderService.remove(orderId);
                commit({ type: 'removeOrder', orderId });
                return orderId;
            } catch (err) {
                console.log('Removing Error (Store):', err);
                throw err;
            }
        },
        async getUserOrders({ commit }) {
            let orders = await orderService.query()
            console.log(orders)
            commit({ type: 'setOrders', orders })
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
        setFilter({ commit, dispatch }, { filterBy }) {
            commit({ type: 'setFilter', filterBy })
            dispatch({ type: 'loadOrders' })
        },
    },
}
