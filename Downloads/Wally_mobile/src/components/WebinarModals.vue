<template>
    <div>
        <div class="modal" id="startModal" ref="startModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body text-center">
                        <h1 class="mx-auto">Время тестирования</h1>
                            <button class="btn mx-auto btn-start" type="submit">Начать тестирование</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" id="finishModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body text-center">
                        <h1 class="mx-auto">Вебинар завершился</h1>
                            <button class="btn mx-auto btn-start" type="submit">Начать тестирование</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" id="closeModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body text-center">
                        <h1 class="mx-auto">Завершить вебинар?</h1>
                        <div class="row btns">
                            <button class="btn mx-auto btn-cancel" type="submit">Отмена</button>
                            <button class="btn mx-auto btn-close-2" type="submit">Завершить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WebinarModals'
}
</script>