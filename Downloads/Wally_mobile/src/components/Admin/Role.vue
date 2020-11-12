<template>
  <div class="role padding-30">
    <div class="title-flex mb-20">
      <div class="title">{{ $t('roles') }}</div>
      <router-link to="/admin/create-role" class="button-blue"><img :src="require('@/assets/img/icon/plus.svg')" alt="">{{ $t('create') }}
      </router-link>
    </div>
    <div class="table-responsive">
      <table class="table table-main table-admin">
        <tr>
          <th class="width-1">{{ $t('login') }}</th>
          <th class="width-2"></th>
          <th class="width-3"></th>
        </tr>
        <tr>
          <td class="width-1">Jesus Bañuelos</td>
          <td class="width-2">
            <button class="button-blue-purple"><img :src="require('@/assets/img/icon/pencil.svg')" alt="">
            </button>
          </td>
          <td class="width-3">
            <button class="button-pink-line"><img :src="require('@/assets/img/icon/delete.svg')" alt=""></button>
          </td>
        </tr>
        <tr>
          <td class="width-1">Rahul Malviya</td>
          <td class="width-2">
            <button class="button-blue-purple"><img :src="require('@/assets/img/icon/pencil.svg')" alt=""></button>
          </td>
          <td class="width-3">
            <button class="button-pink-line"><img :src="require('@/assets/img/icon/delete.svg')" alt=""></button>
          </td>
        </tr>
        <tr>
          <td class="width-1">Isak Johannesson</td>
          <td class="width-2">
            <button class="button-blue-purple"><img :src="require('@/assets/img/icon/pencil.svg')" alt=""></button>
          </td>
          <td class="width-3">
            <button class="button-pink-line"><img :src="require('@/assets/img/icon/delete.svg')" alt=""></button>
          </td>
        </tr>
        <tr>
          <td class="width-1">Ilya Vasin</td>
          <td class="width-2">
            <button class="button-blue-purple"><img :src="require('@/assets/img/icon/pencil.svg')" alt=""></button>
          </td>
          <td class="width-3">
            <button class="button-pink-line"><img :src="require('@/assets/img/icon/delete.svg')" alt=""></button>
          </td>
        </tr>
        <tr>
          <td class="width-1">María Paula Morterero</td>
          <td class="width-2">
            <button class="button-blue-purple"><img :src="require('@/assets/img/icon/pencil.svg')" alt=""></button>
          </td>
          <td class="width-3">
            <button class="button-pink-line"><img :src="require('@/assets/img/icon/delete.svg')" alt=""></button>
          </td>
        </tr>
        <tr>
          <td class="width-1">Jesus Bañuelos</td>
          <td class="width-2">
            <button class="button-blue-purple"><img :src="require('@/assets/img/icon/pencil.svg')" alt=""></button>
          </td>
          <td class="width-3">
            <button class="button-pink-line"><img :src="require('@/assets/img/icon/delete.svg')" alt=""></button>
          </td>
        </tr>
        <tr>
          <td class="width-1">Rahul Malviya</td>
          <td class="width-2">
            <button class="button-blue-purple"><img :src="require('@/assets/img/icon/pencil.svg')" alt=""></button>
          </td>
          <td class="width-3">
            <button class="button-pink-line"><img :src="require('@/assets/img/icon/delete.svg')" alt=""></button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Role'
}
</script>
