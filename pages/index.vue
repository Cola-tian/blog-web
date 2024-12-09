<script setup lang="ts">
import { useQuasar } from 'quasar';
import type { QBtnProps, QNotifyOptions } from 'quasar';

</script>
<template>
  <div class="q-pa-md">
    <q-list separator bordered >
      <!-- <q-item  clickable v-ripple>
        <Card/>
      </q-item> -->
      <q-item class="item-height" v-for=" item in 4" clickable v-ripple>
        <q-item-section>
          <q-item-label>Single line item</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>
        <q-item-section thumbnail>
          <img src="https://cdn.quasar.dev/img/mountains.jpg">
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<style>
.item-height{
  height: 200px;
}

</style>
