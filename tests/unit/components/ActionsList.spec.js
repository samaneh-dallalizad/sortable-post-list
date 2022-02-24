import {shallowMount} from '@vue/test-utils'
import ActionsList from "@/components/ActionsList";

describe('ActionsList.vue', () => {

    it('display 5 posts', () => {
        const wrapper = shallowMount(ActionsList, {
            props: {actions: [{from: 0, to: 1, postId: 1}, {from: 1, to: 2, postId: 1}, {from: 1, to: 0, postId: 3}]}
        })
        expect(wrapper.element).toMatchSnapshot()
    })
})