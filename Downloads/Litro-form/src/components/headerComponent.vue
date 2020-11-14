<template>
  <div class="header">
    <div class="header-desktop">
      
    <img src="@/assets/img/Headerheader.png">

    <a href="tel:5070" class="header-link"></a>
    <a href="#" v-scroll-to="'#foot'" class="header-call"></a>
    <img src="@/assets/img/Header.png" class="headerLinks">
    <!-- <a href="#" class="btn logo-link">asd</a> -->
    <div class="cont">
        <nav class="navbar navbar-expand-lg ">
  <!-- <img src="@/assets/img/litro.png"> -->
  <a href="/" class="btn logo-link"></a>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link about" href="https://prices.litro.kz/home?sector=autoClub"></a>
      </li>
      <li class="nav-item">
        <a class="nav-link ml-2 px-3 card" href="https://prices.litro.kz/card-registration"></a>
      </li>
      <li class="nav-item">
        <a class="nav-link ml-2 card" href="https://prices.litro.kz/reports"></a>
      </li>
      <li class="nav-item">
        <a class="nav-link ml-2 px-3" href="https://prices.litro.kz/use-terms"></a>
      </li>
      <li class="nav-item">
        <a class="nav-link ml-3" href="https://prices.litro.kz/call-center"></a>
      </li>
    </ul>
  </div>
        </nav>
      </div>
    </div>
    <div class="header-mobile">
      <section id="header-1">
      <a href="tel:5070" class="header-link"></a>
      <img src="@/assets/img/mobile/headerheader.png">
      </section>
      <section id="header-2">
       <a class="btn btn-logo" href="/"></a>
       <a class="btn modal-menu" data-toggle="modal" data-target="#exampleModal"></a>
      <img src="@/assets/img/mobile/Header.png">
      </section>
      
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="false">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <img src="@/assets/img/mobile/Menu.png">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
      <a href="/" class="btn btn-header-mobile ml-5"></a>
      <a href="https://prices.litro.kz/card-registration" class="btn btn-header-mobile mt-4 ml-5"></a>
      <a href="https://prices.litro.kz/reports" class="btn btn-header-mobile mt-4 ml-5"></a>
      <a href="https://prices.litro.kz/use-terms" class="btn btn-header-mobile mt-4 ml-5"></a>
      <a href="https://prices.litro.kz/call-center" class="btn btn-header-mobile mt-4 ml-5"></a>
    </div>
  </div>
  
</div>
    </div> 
  </div>
  </template>

  <script>

    export default {
      name: 'headerComponent'
    }
</script>