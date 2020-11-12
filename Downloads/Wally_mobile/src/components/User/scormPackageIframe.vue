<template>
<div class="scorm-package-iframe padding-30">
    <div class="title">{{ $t('scormPackageIframe') }}</div>
    <iframe class="frame" style="width:1196px;height: 800px" src="https://genius.wally.kz/scorme/"></iframe>
</div>
</template>

<script>
export default {
  name: 'scormPackageIframe'
}
</script>

<style scoped>
.frame {
    width: 1280px;
    height: 800px;
    border: 0;

    -ms-transform: scale(0.8);
    -moz-transform: scale(0.8);
    -o-transform: scale(0.8);
    -webkit-transform: scale(0.8);
    transform: scale(0.8);

    -ms-transform-origin: 0 0;
    -moz-transform-origin: 0 0;
    -o-transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;

}
</style>
