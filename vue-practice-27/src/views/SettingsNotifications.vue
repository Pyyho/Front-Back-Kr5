<!-- src/views/SettingsNotifications.vue -->
<template>
    <div class="settings-notifications">
        <h3>🔔 Настройки уведомлений</h3>
        <div class="notifications-form">
            <div class="notification-group">
                <h4>Типы уведомлений:</h4>
                <div class="notification-item">
                    <label>
                        <input type="checkbox" v-model="emailNotifications">
                        Email уведомления
                    </label>
                </div>
                <div class="notification-item">
                    <label>
                        <input type="checkbox" v-model="pushNotifications">
                        Push-уведомления
                    </label>
                </div>
                <div class="notification-item">
                    <label>
                        <input type="checkbox" v-model="smsNotifications">
                        SMS уведомления
                    </label>
                </div>
            </div>
            <div class="notification-group">
                <h4>События для уведомлений:</h4>
                <div class="notification-item">
                    <label>
                        <input type="checkbox" v-model="newMessages">
                        Новые сообщения
                    </label>
                </div>
                <div class="notification-item">
                    <label>
                        <input type="checkbox" v-model="friendRequests">
                        Запросы в друзья
                    </label>
                </div>
                <div class="notification-item">
                    <label>
                        <input type="checkbox" v-model="postLikes">
                        Лайки к постам
                    </label>
                </div>
                <div class="notification-item">
                    <label>
                        <input type="checkbox" v-model="comments">
                        Новые комментарии
                    </label>
                </div>
            </div>
            <button @click="saveNotifications" class="save-btn">💾 Сохранить настройки</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'SettingsNotifications',
    setup() {
        const emailNotifications = ref(true)
        const pushNotifications = ref(true)
        const smsNotifications = ref(false)
        const newMessages = ref(true)
        const friendRequests = ref(true)
        const postLikes = ref(true)
        const comments = ref(true)

        const saveNotifications = () => {
            alert('Настройки уведомлений сохранены!')
            console.log({
                emailNotifications: emailNotifications.value,
                pushNotifications: pushNotifications.value,
                smsNotifications: smsNotifications.value,
                newMessages: newMessages.value,
                friendRequests: friendRequests.value,
                postLikes: postLikes.value,
                comments: comments.value
            })
        }

        return {
            emailNotifications,
            pushNotifications,
            smsNotifications,
            newMessages,
            friendRequests,
            postLikes,
            comments,
            saveNotifications
        }
    }
}
</script>

<style scoped>
.notifications-form {
    margin-top: 20px;
}

.notification-group {
    margin-bottom: 30px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
}

.notification-group h4 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #2d3748;
}

.notification-item {
    margin-bottom: 10px;
    padding: 10px;
    background-color: white;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
}

.notification-item label {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
}
</style>