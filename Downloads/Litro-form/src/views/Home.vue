<template>
    <main class="content">
        <div class="desktop">
            <section id="banner">
                <a href="https://play.google.com/store/apps/details?id=kz.litro" class="btn btn-banner" target="_blank"></a>
                <a href="https://apps.apple.com/kz/app/litro/id1501106893" class="btn btn-banner btn-2" target="_blank"></a>
                <img src="@/assets/img/Главная.png">

            </section>
            <section id="adv">
                <img src="@/assets/img/Приемущества 2.png">
            </section>
            <section id="serviceList">
                <img src="@/assets/img/services2.png">
            </section>
            <section id="card">
                <img src="@/assets/img/card.png">
                <div class="row">
                <a href="https://play.google.com/store/apps/details?id=kz.litro" class="btn text-center px-auto card" target="_blank"></a>
                <a href="https://apps.apple.com/kz/app/litro/id1501106893" class="btn card btn-2 ml-4" target="_blank"></a>
                </div>
            </section>
            <section id="win">
                <img src="@/assets/img/win.png">
                <a href="#" v-scroll-to="'#foot'" class="btn text-center conditions"></a>
            </section>
            <section id="service">
                <img src="@/assets/img/services.png">
            </section>
            <section id="cost">
                <img src="@/assets/img/cost.png">
            </section>
        </div>
        <div class="mobile">
            <section id="banner-mobile">
                <a href="https://apps.apple.com/kz/app/litro/id1501106893" class="btn btn-banner" target="_blank"></a>
                <a href="https://play.google.com/store/apps/details?id=kz.litro" class="btn btn-banner btn-2" target="_blank"></a>
                <img src="@/assets/img/mobile/Главная.png">

            </section>
            <section id="adv-mobile">
                <img src="@/assets/img/mobile/Приемущества моб.png">
            </section>
            <section id="serviceList-mobile">
                <img src="@/assets/img/mobile/services_mob2.png">
            </section>
            <section id="card-mobile">
                <a href="https://apps.apple.com/kz/app/litro/id1501106893" class="btn card card-1" target="_blank"></a>
                <a href="https://play.google.com/store/apps/details?id=kz.litro" class="btn card btn-2 ml-4 card-1" target="_blank"></a>

                <a href="https://apps.apple.com/kz/app/litro/id1501106893" class="btn card card-2" target="_blank"></a>
                <a href="https://play.google.com/store/apps/details?id=kz.litro" class="btn card btn-2 ml-4 card-2" target="_blank"></a>

                <a href="https://apps.apple.com/kz/app/litro/id1501106893" class="btn card card-3" target="_blank"></a>
                <a href="https://play.google.com/store/apps/details?id=kz.litro" class="btn card btn-2 ml-4 card-3" target="_blank"></a>

                <a href="https://apps.apple.com/kz/app/litro/id1501106893" class="btn card card-4" target="_blank"></a>
                <a href="https://play.google.com/store/apps/details?id=kz.litro" class="btn card btn-2 ml-4 card-4" target="_blank"></a>
                <img src="@/assets/img/mobile/card.png">

            </section>
            <section id="win-mobile">
                <img src="@/assets/img/mobile/win.png">
                <a href="#" v-scroll-to="'#foot'" class="btn text-center conditions"></a>
            </section>
            <section id="service-mobile">
                <img src="@/assets/img/mobile/services.png">
                <a class="btn text-center services" href="/serviceList"></a>
            </section>
        </div>
    </main>
</template>

<script>
    import VSelect from '@alfsnd/vue-bootstrap-select'
    import Slick from 'vue-slick';
    export default {
        name: 'Home',
        components: {
            Slick,
            VSelect
        }

}
</script>
<style scoped>

</style>
