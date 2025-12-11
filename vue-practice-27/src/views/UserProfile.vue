<!-- src/views/UserProfile.vue -->
<template>
    <div class="user-profile">
        <div class="profile-header">
            <h1>👤 Профиль пользователя</h1>
            
            <!-- Показываем ID пользователя из параметров маршрута -->
            <div v-if="$route.params.id" class="user-info">
                <h2>Профиль пользователя #{{ $route.params.id }}</h2>
                <p>Это страница конкретного пользователя</p>
                <div class="user-details">
                    <p><strong>Имя:</strong> {{ getUserName($route.params.id) }}</p>
                    <p><strong>Роль:</strong> {{ getUserRole($route.params.id) }}</p>
                    <p><strong>Email:</strong> {{ getUserEmail($route.params.id) }}</p>
                </div>
            </div>

            <div v-else class="current-user">
                <h2>Ваш профиль</h2>
                <div class="user-details">
                    <p><strong>Имя:</strong> {{ currentUser.name }}</p>
                    <p><strong>Email:</strong> {{ currentUser.email }}</p>
                    <p><strong>Дата регистрации:</strong> {{ currentUser.registrationDate }}</p>
                    <p><strong>Статус:</strong> <span class="status-active">Активен</span></p>
                </div>
            </div>
        </div>

        <!-- Навигация между разделами профиля -->
        <nav class="profile-tabs">
            <router-link to="/profile/info" class="tab">📋 Информация</router-link>
            <router-link to="/profile/posts" class="tab">📝 Посты</router-link>
            <router-link to="/profile/friends" class="tab">👥 Друзья</router-link>
            <router-link to="/profile/settings" class="tab">⚙️ Настройки</router-link>
        </nav>

        <!-- Отображаем вложенные маршруты -->
        <div class="tab-content">
            <router-view :user-id="$route.params.id"></router-view>
        </div>

        <!-- Кнопки навигации -->
        <div class="navigation-buttons">
            <button @click="goBack" class="btn back-btn">← Назад</button>
            <button @click="goHome" class="btn home-btn">🏠 На главную</button>
            <button @click="goToSettings" class="btn settings-btn">⚙️ Настройки</button>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
    name: 'UserProfile',
    
    setup() {
        const router = useRouter()

        const currentUser = {
            name: 'Текущий пользователь',
            email: 'user@example.com',
            registrationDate: '2024-01-01'
        }

        const users = [
            { id: 1, name: 'Анна Иванова', email: 'anna@example.com', role: 'admin' },
            { id: 2, name: 'Петр Сидоров', email: 'petr@example.com', role: 'user' },
            { id: 3, name: 'Мария Петрова', email: 'maria@example.com', role: 'user' },
            { id: 4, name: 'Иван Кузнецов', email: 'ivan@example.com', role: 'user' },
            { id: 5, name: 'Елена Смирнова', email: 'elena@example.com', role: 'admin' }
        ]

        const getUserName = (id) => {
            const user = users.find(u => u.id == id)
            return user ? user.name : 'Пользователь не найден'
        }

        const getUserEmail = (id) => {
            const user = users.find(u => u.id == id)
            return user ? user.email : 'Неизвестно'
        }

        const getUserRole = (id) => {
            const user = users.find(u => u.id == id)
            return user ? user.role : 'Неизвестно'
        }

        const goBack = () => {
            router.back()
        }

        const goHome = () => {
            router.push('/')
        }

        const goToSettings = () => {
            router.push('/settings')
        }

        return {
            currentUser,
            users,
            getUserName,
            getUserEmail,
            getUserRole,
            goBack,
            goHome,
            goToSettings
        }
    },
    
    beforeRouteEnter(to, from, next) {
        console.log('Заходим в профиль пользователя:', to.params.id)
        next()
    },
    
    beforeRouteUpdate(to, from, next) {
        console.log('Обновляем параметры маршрута профиля:', to.params.id)
        next()
    }
}
</script>

<style scoped>
.user-profile {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.profile-header {
    margin-bottom: 30px;
    padding: 25px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 15px;
}

.user-details {
    margin-top: 20px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    backdrop-filter: blur(10px);
}

.user-details p {
    margin: 10px 0;
    font-size: 16px;
}

.status-active {
    display: inline-block;
    padding: 3px 10px;
    background-color: #48bb78;
    color: white;
    border-radius: 12px;
    font-size: 14px;
    font-weight: bold;
}

.profile-tabs {
    display: flex;
    gap: 10px;
    margin: 30px 0;
    padding-bottom: 10px;
    border-bottom: 2px solid #e2e8f0;
    overflow-x: auto;
}

.tab {
    padding: 12px 24px;
    text-decoration: none;
    color: #4a5568;
    border-radius: 8px;
    white-space: nowrap;
    transition: all 0.3s ease;
    border: 2px solid transparent;
}

.tab:hover {
    background-color: #edf2f7;
    border-color: #cbd5e0;
}

.tab.router-link-active {
    background-color: #667eea;
    color: white;
    border-color: #667eea;
}

.tab-content {
    padding: 30px;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    background-color: white;
    min-height: 300px;
}

.navigation-buttons {
    margin-top: 30px;
    display: flex;
    gap: 15px;
    justify-content: center;
}

.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: transform 0.2s ease;
}

.btn:hover {
    transform: translateY(-2px);
}

.back-btn {
    background-color: #e2e8f0;
    color: #4a5568;
}

.home-btn {
    background-color: #48bb78;
    color: white;
}

.settings-btn {
    background-color: #ed8936;
    color: white;
}
</style>