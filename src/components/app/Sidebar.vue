<template>
  <ul class="sidenav app-sidenav" :class="{ open: isOpen }">

    <router-link
      v-for="link in links"
      :key="link.url"
      active-class="active"
      :to="link.url"
      custom
      v-slot="{ href, navigate, isExactActive }"
    >

      <li :class="[isExactActive && 'active']">
        <a :href="href" @click="navigate" class="waves-effect waves-orange pointer">{{
            link.title

          }}</a>
      </li>
    </router-link>
  </ul>
</template>
<script>
export default {
  props: {
    isOpen: {
      type: Boolean
    }
  },
  data: () => ({
    links: [
      { title: 'Счет', url: '/', exact: true },
      { title: 'История', url: '/history' },
      { title: 'Планирование', url: '/planning' },
      { title: 'Новая запись', url: '/record' },
      { title: 'Категории', url: '/categories' }
    ]
  })
}
</script>
