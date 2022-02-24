import {shallowMount} from '@vue/test-utils'
import PostsList from "@/components/PostsList";

describe('PostsList.vue', () => {

    it('display 5 posts', () => {
        const wrapper = shallowMount(PostsList, {
            props: {posts: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]}
        })
        expect(wrapper.element).toMatchSnapshot()
    })

})