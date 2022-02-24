<template>
  <section class="main_area">
    <div class="container mx-auto">
      <div v-if="error === undefined && posts.length > 0" class="lg:flex">
        <!--PostLists-->
        <aside class="lg:w-1/2 px-10 pt-20">
          <h2 class="text-white text-2xl pb-4 ">Sortable Post List </h2>
          <div id="post_list">
            <ul class="flex flex-col space-y-4">
              <PostsList
                  :posts="posts"
                  @changeOrder="changeOrder"
              />
            </ul>
          </div>
        </aside>
        <!--ActionLists-->
        <aside class="lg:w-1/2 pt-10 px-20">
          <div class="action_list">
            <div class="bg-white p-5 rounded-t-md"><h3 class="text-[#626262]">List of actions commited</h3></div>
            <div class="rounded-md shadow-lg p-4">
              <ul>
                <ActionsList
                    :actions="actionHistory"
                    @timeTravel="timeTravel"
                />
              </ul>
            </div>
          </div>
        </aside>
      </div>
      <div v-else class="flex justify-center">
        <div class="error-msg">
          <div role="alert">
            <p class="font-bold">Informational message</p>
            <p class="text-sm">{{ this.error }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import PostsList from './components/PostsList.vue'
import ActionsList from './components/ActionsList.vue'

export default {
  name: 'App',
  components: {
    PostsList,
    ActionsList
  },
  data() {
    return {
      dataUrl: "https://jsonplaceholder.typicode.com/posts",
      posts: [],
      actionHistory: [],
      error: undefined
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData: async function () {
      let response = await fetch(this.dataUrl)
      if (response.ok === false) {
        this.error = "Cannot fetch posts"
      } else {
        let data = await response.json()
        this.posts = data.slice(0, 5)
      }
    },
    changeOrder(direction, index) {
      let tmp = this.posts[index]
      switch (direction) {
        case 'down':
          this.posts[index] = this.posts[index + 1]
          this.posts[index + 1] = tmp
          this.actionHistory.unshift({from: index, to: index + 1, postId: tmp.id})
          break
        case 'up':
          this.posts[index] = this.posts[index - 1]
          this.posts[index - 1] = tmp
          this.actionHistory.unshift({from: index, to: index - 1, postId: tmp.id})
          break
      }

    },
    timeTravel(index) {
      for (let i = 0; i <= index; i++) {
        let tmp = this.posts[this.actionHistory[i].from]
        this.posts[this.actionHistory[i].from] = this.posts[this.actionHistory[i].to]
        this.posts[this.actionHistory[i].to] = tmp
      }
      this.actionHistory = this.actionHistory.slice(index + 1);
    },

  }
}
</script>
<style scoped>
.main_area {
  position: relative;
}

.main_area:before {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  width: 0;
  height: 0;
  border-top: 230px solid #6357b1;
  border-right: 100vw solid transparent;
  z-index: -1;
}

.action_list {
  @apply rounded-md shadow-lg bg-[#f4f4f4];
}

.action_list ul {
  @apply grid grid-cols-1 divide-y text-sm text-center mx-auto shadow-lg;
}

.error-msg {
  @apply bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3 my-8 md:w-6/12 sm:w-full;
}
</style>


