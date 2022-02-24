<template>
  <li v-for="(post, index) in posts" :key="post.id" :ref="'post-' + index">
    <span>Post {{ post.id }}</span>
    <a
      v-if="index > 0"
      :class="(index === posts.length - 1 ? 'top-50%' : 'top-0')"
      @click="animateChangeOrder('up', index)"
    >
      <ChevronUpIcon class="h-5 w-5 "/>
    </a>
    <a
      v-if="index < posts.length - 1"
      :class="(index ===  0 ? 'bottom-50%' : 'bottom-0')"
      @click="animateChangeOrder( 'down', index)"
    >
      <ChevronDownIcon class="h-5 w-5"/>
    </a>
  </li>
</template>

<script>
import {ChevronDownIcon, ChevronUpIcon} from '@heroicons/vue/solid'

export default {
  name: "PostsList",
  props: {
    posts: Array,
  },
  emits: [
    "changeOrder"
  ],
  components: {
    ChevronDownIcon,
    ChevronUpIcon
  },
  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    async animateChangeOrder(direction, index) {
      let upElement = null
      let downElement = null
      switch (direction) {
        case 'down':
          downElement = this.$refs["post-" + index][0]
          upElement = this.$refs["post-" + (index + 1)][0]
          break
        default: // up
          upElement = this.$refs["post-" + index][0]
          downElement = this.$refs["post-" + (index - 1)][0]
          break
      }
      upElement.classList.add('slideup')
      downElement.classList.add('slidedown')
      await this.sleep(1000)
      upElement.classList.remove('slideup')
      downElement.classList.remove('slidedown')
      this.$emit('changeOrder', direction, index)
    }
  }

}
</script>

<style scoped>
ul li {
  @apply flex bg-white text-white py-4 px-2 text-[#bebfbf] rounded-md shadow-md relative;
}

ul li a {
  @apply text-[#8076bf] absolute right-0 p-1;
}

.slidedown {
  animation: slidedown 1s;
}

.slideup {
  animation: slideup 1s;
}

@keyframes slidedown {
  from {
    transform: translateY(0%);
  }

  to {
    transform: translateY(128%);
  }
}

@keyframes slideup {
  from {
    transform: translateY(0%);
  }

  to {
    transform: translateY(-128%);
  }
}

</style>