import {shallowMount} from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
    it('will show errors', () => {
        const wrapper = shallowMount(App, {
            data() {
                return {
                    posts: [],
                    actionHistory: [],
                    error: "Cannot fetch posts"
                }
            },
            mounted() {
            }
        })
        expect(wrapper.element).toMatchSnapshot()
    })

    it('will show skeleton', () => {
        const wrapper = shallowMount(App, {
            data() {
                return {
                    posts: [{id: 1}],
                    actionHistory: []
                }
            },
            mounted() {
            }
        })
        expect(wrapper.element).toMatchSnapshot()
    })

    it('changes order', () => {
        const wrapper = shallowMount(App, {
            data() {
                return {
                    posts: [{id: 1}, {id: 2}, {id: 3}],
                    actionHistory: []
                }
            },
            mounted() {
            }
        })
        wrapper.vm.changeOrder('down', 0)
        wrapper.vm.changeOrder('up', 2)
        expect(wrapper.vm.posts).toEqual([{id: 2}, {id: 3}, {id: 1}])
    })

    it('time travel', () => {
        const wrapper = shallowMount(App, {
            data() {
                return {
                    posts: [{id: 3}, {id: 2}, {id: 1}],
                    actionHistory: [{from: 0, to: 1, postId: 1}, {from: 1, to: 2, postId: 1}, {
                        from: 1,
                        to: 0,
                        postId: 3
                    }]
                }
            },
            mounted() {
            }
        })

        wrapper.vm.timeTravel(wrapper.vm.actionHistory.length - 1)

        expect(wrapper.vm.actionHistory).toEqual([])
        expect(wrapper.vm.posts).toEqual([{id: 1}, {id: 2}, {id: 3}])
    })

})
