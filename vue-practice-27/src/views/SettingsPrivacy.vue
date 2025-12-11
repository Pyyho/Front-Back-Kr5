<!-- src/views/SettingsPrivacy.vue -->
<template>
    <div class="settings-privacy">
        <h3>👁️ Настройки конфиденциальности</h3>
        <div class="privacy-form">
            <div class="privacy-group">
                <h4>Кто может видеть:</h4>
                <div class="privacy-item">
                    <label>Профиль:</label>
                    <select v-model="profileVisibility">
                        <option value="public">Все</option>
                        <option value="friends">Только друзья</option>
                        <option value="private">Только я</option>
                    </select>
                </div>
                <div class="privacy-item">
                    <label>Почту:</label>
                    <select v-model="emailVisibility">
                        <option value="friends">Только друзья</option>
                        <option value="private">Только я</option>
                    </select>
                </div>
                <div class="privacy-item">
                    <label>Дату рождения:</label>
                    <select v-model="birthdayVisibility">
                        <option value="friends">Только друзья</option>
                        <option value="private">Только я</option>
                    </select>
                </div>
            </div>
            <div class="privacy-group">
                <h4>Контроль контента:</h4>
                <div class="privacy-item checkbox">
                    <label>
                        <input type="checkbox" v-model="tagReview">
                        Просмотр тегов перед публикацией
                    </label>
                </div>
                <div class="privacy-item checkbox">
                    <label>
                        <input type="checkbox" v-model="locationTracking">
                        Отслеживание местоположения
                    </label>
                </div>
                <div class="privacy-item checkbox">
                    <label>
                        <input type="checkbox" v-model="dataCollection">
                        Сбор аналитических данных
                    </label>
                </div>
            </div>
            <div class="privacy-group">
                <h4>Блокировка:</h4>
                <div class="blocked-users">
                    <p>Заблокированные пользователи: {{ blockedUsers.length }}</p>
                    <div v-if="blockedUsers.length" class="blocked-list">
                        <div v-for="user in blockedUsers" :key="user.id" class="blocked-user">
                            <span>{{ user.name }}</span>
                            <button @click="unblockUser(user.id)" class="unblock-btn">Разблокировать</button>
                        </div>
                    </div>
                    <p v-else>Нет заблокированных пользователей</p>
                </div>
            </div>
            <button @click="savePrivacySettings" class="save-btn">💾 Сохранить настройки</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'SettingsPrivacy',
    setup() {
        const profileVisibility = ref('friends')
        const emailVisibility = ref('friends')
        const birthdayVisibility = ref('private')
        const tagReview = ref(true)
        const locationTracking = ref(false)
        const dataCollection = ref(true)
        
        const blockedUsers = ref([
            { id: 1, name: 'Спам-аккаунт' },
            { id: 2, name: 'Нежелательный пользователь' }
        ])

        const savePrivacySettings = () => {
            alert('Настройки конфиденциальности сохранены!')
            console.log({
                profileVisibility: profileVisibility.value,
                emailVisibility: emailVisibility.value,
                birthdayVisibility: birthdayVisibility.value,
                tagReview: tagReview.value,
                locationTracking: locationTracking.value,
                dataCollection: dataCollection.value,
                blockedUsers: blockedUsers.value
            })
        }

        const unblockUser = (userId) => {
            const user = blockedUsers.value.find(u => u.id === userId)
            if (user && confirm(`Разблокировать пользователя ${user.name}?`)) {
                blockedUsers.value = blockedUsers.value.filter(u => u.id !== userId)
                alert(`Пользователь ${user.name} разблокирован`)
            }
        }

        return {
            profileVisibility,
            emailVisibility,
            birthdayVisibility,
            tagReview,
            locationTracking,
            dataCollection,
            blockedUsers,
            savePrivacySettings,
            unblockUser
        }
    }
}
</script>

<style scoped>
.settings-privacy {
    padding: 20px;
}

.privacy-form {
    max-width: 600px;
}

.privacy-group {
    margin-bottom: 30px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
}

.privacy-group h4 {
    margin-top: 0;
    margin-bottom: 20px;
    color: #2d3748;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 10px;
}

.privacy-item {
    margin-bottom: 15px;
}

.privacy-item label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #4a5568;
}

.privacy-item select {
    width: 100%;
    padding: 8px;
    border: 2px solid #e2e8f0;
    border-radius: 6px;
    font-size: 14px;
}

.privacy-item.checkbox label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: normal;
    cursor: pointer;
}

.privacy-item.checkbox input[type="checkbox"] {
    width: auto;
}

.blocked-users {
    margin-top: 20px;
}

.blocked-list {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.blocked-user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background-color: white;
    border: 1px solid #fed7d7;
    border-radius: 6px;
}

.unblock-btn {
    padding: 5px 10px;
    background-color: #48bb78;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
}

.unblock-btn:hover {
    background-color: #38a169;
}
</style>