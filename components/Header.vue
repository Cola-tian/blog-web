<script setup >
import { ref } from 'vue'
    const tab = ref('cread')
</script>

<template>
  <div class="q-pa-md">
    <q-toolbar class="bg-purple text-white shadow-2 rounded-borders">
      <q-btn flat label="Homepage" />
      <q-space />

      <!--
          notice shrink property since we are placing it
          as child of QToolbar
        -->
      <q-tabs v-model="tab"  outside-arrows shrink>
        <q-route-tab to="/"  name="index" label="主页" />
        <q-route-tab name="tab2" label="Tab 2" />
        <q-route-tab to="/create" name="cread" label="新建" />
      </q-tabs>
      <q-avatar>
        <img src="https://cdn.quasar.dev/img/avatar.png">
      </q-avatar>
    </q-toolbar>
  </div>
</template>