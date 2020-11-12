<template>
  <div class="plan-education exam-tests padding-30">
    <div class="title">VR {{ $t('materials') }}</div>
    <div class="video">
      <video controls style="width: 75%;margin-left: auto;margin-right: auto;display: block;margin-top: 32px">
        <source :src="require('@/assets/video/vr.mp4')">
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vr'
}
</script>
