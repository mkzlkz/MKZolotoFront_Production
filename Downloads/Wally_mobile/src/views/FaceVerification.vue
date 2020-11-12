<template>
    <div class="container face">
        <img src="../assets/img/icon/rectangle@2x.png" class="face-photo">
        <div class="face-content">
            <button class="btn btn-cancel">Отмена</button>
            <p>Важно!</p>
            <ol>
                <li>Убедитесь что камера работает</li>
                <li>Посмотрите ровно на камеру</li>
                <li>Ждите пока вас распознает</li>
            </ol>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FaceVerification'
}
</script>