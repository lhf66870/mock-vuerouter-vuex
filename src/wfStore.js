import Vue from 'vue'
class wfStore {
    constructor(options) {
        this.state = options.state
        this.mutations = options.mutations
        this.actions = options.actions
        let vm = new Vue({
            data: {
                state: this.state
            }
        })
    }
    
    commit(type, payload){
        const mutation = this.mutations[type];
        mutation(this.state, payload)
    }

    dispatch(type, payload){
        const action = this.actions[type]
        const ctx = {
            commit: this.commit.bind(this),
            state: this.this.state,
            dispatch: this.actions.dispatch.bind(this)

            // ...
        }
        return action(ctx, payload)
    }
}


export default new wfStore ({
    state: {
        count:1
    },
    mutations: {
        add(state){
            state.count++
        }
    }
})