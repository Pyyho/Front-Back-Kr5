<!-- src/views/ProfileSettings.vue -->
<template>
    <div class="profile-settings">
        <h3>⚙️ Настройки профиля</h3>
        <div class="settings-form">
            <div class="form-group">
                <label>Отображаемое имя:</label>
                <input v-model="displayName" type="text" placeholder="Введите имя">
            </div>
            <div class="form-group">
                <label>О себе:</label>
                <textarea v-model="bio" placeholder="Расскажите о себе..." rows="3"></textarea>
            </div>
            <div class="form-group">
                <label>Ссылка на аватар:</label>
                <input v-model="avatarUrl" type="text" placeholder="URL аватара">
                <div v-if="avatarUrl" class="avatar-preview">
                    <p>Превью:</p>
                    <img :src="avatarUrl" alt="Аватар" @error="avatarError = true" class="preview-img">
                    <p v-if="avatarError" class="error">Не удалось загрузить изображение</p>
                </div>
            </div>
            <div class="form-group">
                <label>Приватность профиля:</label>
                <select v-model="privacy">
                    <option value="public">Публичный</option>
                    <option value="private">Приватный</option>
                    <option value="friends">Только друзья</option>
                </select>
            </div>
            <div class="form-actions">
                <button @click="saveSettings" class="save-btn">💾 Сохранить изменения</button>
                <button @click="resetSettings" class="reset-btn">🔄 Сбросить</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'ProfileSettings',
    setup() {
        const displayName = ref('Текущий пользователь')
        const bio = ref('Люблю программирование и новые технологии!')
        const avatarUrl = ref('https://via.placeholder.com/150')
        const privacy = ref('public')
        const avatarError = ref(false)

        const saveSettings = () => {
            alert('Настройки профиля сохранены!')
            console.log({
                displayName: displayName.value,
                bio: bio.value,
                avatarUrl: avatarUrl.value,
                privacy: privacy.value
            })
        }

        const resetSettings = () => {
            displayName.value = 'Текущий пользователь'
            bio.value = 'Люблю программирование и новые технологии!'
            avatarUrl.value = 'https://via.placeholder.com/150'
            privacy.value = 'public'
            avatarError.value = false
            alert('Настройки сброшены к значениям по умолчанию')
        }

        return {
            displayName,
            bio,
            avatarUrl,
            privacy,
            avatarError,
            saveSettings,
            resetSettings
        }
    }
}
</script>

<style scoped>
.profile-settings {
    padding: 20px;
}

.settings-form {
    max-width: 500px;
}

.form-group {
    margin-bottom: 25px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #2d3748;
}

.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 10px;
    border: 2px solid #e2e8f0;
    border-radius: 6px;
    font-size: 16px;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
    outline: none;
    border-color: #667eea;
}

.avatar-preview {
    margin-top: 15px;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 8px;
}

.preview-img {
    max-width: 100px;
    height: auto;
    border-radius: 8px;
    margin-top: 10px;
}

.error {
    color: #e53e3e;
    font-size: 14px;
    margin-top: 5px;
}

.form-actions {
    display: flex;
    gap: 15px;
    margin-top: 30px;
}

.save-btn {
    flex: 1;
    padding: 12px;
    background-color: #48bb78;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

.save-btn:hover {
    background-color: #38a169;
}

.reset-btn {
    flex: 1;
    padding: 12px;
    background-color: #e2e8f0;
    color: #4a5568;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

.reset-btn:hover {
    background-color: #cbd5e0;
}
</style>