<!-- src/views/SettingsSecurity.vue -->
<template>
    <div class="settings-security">
        <h3>🔒 Настройки безопасности</h3>
        <div class="security-form">
            <div class="form-group">
                <label>Текущий пароль:</label>
                <input type="password" v-model="currentPassword" placeholder="Введите текущий пароль">
            </div>
            <div class="form-group">
                <label>Новый пароль:</label>
                <input type="password" v-model="newPassword" placeholder="Введите новый пароль">
            </div>
            <div class="form-group">
                <label>Подтвердите пароль:</label>
                <input type="password" v-model="confirmPassword" placeholder="Подтвердите новый пароль">
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" v-model="twoFactorAuth">
                    Двухфакторная аутентификация
                </label>
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" v-model="loginNotifications">
                    Уведомления о входе в аккаунт
                </label>
            </div>
            <button @click="updateSecurity" class="update-btn">🔄 Обновить безопасность</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'SettingsSecurity',
    setup() {
        const currentPassword = ref('')
        const newPassword = ref('')
        const confirmPassword = ref('')
        const twoFactorAuth = ref(false)
        const loginNotifications = ref(true)

        const updateSecurity = () => {
            if (newPassword.value !== confirmPassword.value) {
                alert('Пароли не совпадают!')
                return
            }
            
            alert('Настройки безопасности обновлены!')
            console.log({
                twoFactorAuth: twoFactorAuth.value,
                loginNotifications: loginNotifications.value
            })
            
            currentPassword.value = ''
            newPassword.value = ''
            confirmPassword.value = ''
        }

        return {
            currentPassword,
            newPassword,
            confirmPassword,
            twoFactorAuth,
            loginNotifications,
            updateSecurity
        }
    }
}
</script>

<style scoped>
.security-form {
    margin-top: 20px;
}

.form-group input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 2px solid #e2e8f0;
    border-radius: 6px;
    font-size: 16px;
}

.update-btn {
    margin-top: 20px;
    padding: 12px 24px;
    background-color: #ed8936;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

.update-btn:hover {
    background-color: #dd6b20;
}
</style>