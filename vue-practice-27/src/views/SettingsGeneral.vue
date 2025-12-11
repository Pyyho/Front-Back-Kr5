<!-- src/views/SettingsGeneral.vue -->
<template>
    <div class="settings-general">
        <h3>🌐 Основные настройки</h3>
        <div class="settings-form">
            <div class="form-group">
                <label>Язык интерфейса:</label>
                <select v-model="language">
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                </select>
            </div>
            <div class="form-group">
                <label>Тема оформления:</label>
                <select v-model="theme">
                    <option value="light">Светлая</option>
                    <option value="dark">Темная</option>
                    <option value="auto">Автоматически</option>
                </select>
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" v-model="showNotifications">
                    Показывать уведомления
                </label>
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" v-model="autoSave">
                    Автоматическое сохранение
                </label>
            </div>
            <button @click="saveSettings" class="save-btn">💾 Сохранить настройки</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'SettingsGeneral',
    props: {
        currentTab: {
            type: String,
            default: 'general'
        }
    },
    setup() {
        const language = ref('ru')
        const theme = ref('light')
        const showNotifications = ref(true)
        const autoSave = ref(true)

        const saveSettings = () => {
            alert('Настройки сохранены!')
            console.log({
                language: language.value,
                theme: theme.value,
                showNotifications: showNotifications.value,
                autoSave: autoSave.value
            })
        }

        return {
            language,
            theme,
            showNotifications,
            autoSave,
            saveSettings
        }
    }
}
</script>

<style scoped>
.settings-form {
    margin-top: 20px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #2d3748;
}

.form-group select {
    width: 100%;
    padding: 10px;
    border: 2px solid #e2e8f0;
    border-radius: 6px;
    font-size: 16px;
}

.form-group select:focus {
    outline: none;
    border-color: #667eea;
}

.form-group input[type="checkbox"] {
    margin-right: 10px;
}

.save-btn {
    margin-top: 20px;
    padding: 12px 24px;
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
</style>