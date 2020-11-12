<template>
<div style="margin-top: 70px;">
    <button type="button" class="btn btn-modal" data-toggle="modal" data-target="#startModal">Start</button>
    <button type="button" class="btn btn-modal" data-toggle="modal" data-target="#finishModal">Finish</button>
    <button type="button" class="btn btn-modal" data-toggle="modal" data-target="#closeModal">Close</button>
    <WebinarModals></WebinarModals>
    
</div>
</template>

<script>
import WebinarModals from '../components/WebinarModals'
export default {
    name: 'Online',
    components: {
        WebinarModals
    }
}
</script>