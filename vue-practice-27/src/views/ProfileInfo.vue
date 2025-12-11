<!-- src/views/ProfileInfo.vue -->
<template>
    <div class="profile-info">
        <h3>📋 Информация о профиле</h3>
        <div v-if="userId" class="user-specific">
            <p>Просмотр информации о пользователе с ID: {{ userId }}</p>
            <div class="info-card">
                <h4>Основная информация</h4>
                <p><strong>ID пользователя:</strong> {{ userId }}</p>
                <p><strong>Имя:</strong> Пользователь #{{ userId }}</p>
                <p><strong>Статус:</strong> Активен</p>
                <p><strong>Дата регистрации:</strong> 2024-01-0{{ userId }}</p>
            </div>
        </div>
        <div v-else class="current-user-info">
            <div class="info-card">
                <h4>Ваша информация</h4>
                <p><strong>Имя:</strong> Текущий пользователь</p>
                <p><strong>Email:</strong> user@example.com</p>
                <p><strong>Статус:</strong> Активен</p>
                <p><strong>Дата регистрации:</strong> 2024-01-01</p>
                <p><strong>Последний вход:</strong> Сегодня, 10:30</p>
            </div>
            <button @click="editProfile" class="edit-btn">✏️ Редактировать профиль</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProfileInfo',
    props: {
        userId: {
            type: String,
            default: ''
        }
    },
    methods: {
        editProfile() {
            alert('Редактирование профиля...')
        }
    }
}
</script>

<style scoped>
.profile-info {
    padding: 20px;
}

.info-card {
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    margin: 20px 0;
    border-left: 4px solid #667eea;
}

.info-card h4 {
    margin-top: 0;
    color: #2d3748;
}

.info-card p {
    margin: 10px 0;
    color: #4a5568;
}

.edit-btn {
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

.edit-btn:hover {
    background-color: #38a169;
}
</style>