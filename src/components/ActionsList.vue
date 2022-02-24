<template>
  <li class="p-4 bg-white xl:flex" v-for="(action,index) in actions" :key="action.id">
    <div class="xl:w-2/3 lg:w-full text-slate-400 flex items-center">
      moved post {{ action.postId }} from index {{ action.from }} to index {{ action.to }}
    </div>
    <div class="xl:w-1/3 lg:w-full">
      <button
          class="btn"
          type="button"
          @click="this.$emit('timeTravel',index)"
      >
        time travel
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: "ActionsList",
  props: {
    actions: Array
  },
  emits: [
    "timeTravel"
  ],
}
</script>

<style scoped>
.btn {
  @apply py-2 px-4 rounded bg-[#25ff90] w-full
}
</style>
