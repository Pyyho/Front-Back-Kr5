<!-- src/views/HomePage.vue -->
<template>
    <div class="home-page">
        <h1>Главная страница</h1>
        <p>Добро пожаловать в наше приложение Vue Router!</p>

        <div class="quick-actions">
            <button @click="goToProfile" class="btn">👤 Перейти в профиль</button>
            <button @click="goToSettings" class="btn">⚙️ Настройки</button>
            <router-link to="/profile/1" class="btn user-btn">
                👤 Анна Иванова
            </router-link>
        </div>

        <div class="features">
            <h3>Возможности Vue Router:</h3>
            <ul>
                <li>✅ Декларативная маршрутизация</li>
                <li>✅ Вложенные маршруты</li>
                <li>✅ Динамические параметры маршрута</li>
                <li>✅ Навигационные хуки</li>
                <li>✅ Ленивая загрузка компонентов</li>
            </ul>
        </div>

        <div class="user-list">
            <h3>Список пользователей:</h3>
            <div class="users-grid">
                <div
                    v-for="user in users"
                    :key="user.id"
                    @click="viewUser(user.id)"
                    class="user-item"
                >
                    <div class="user-avatar">{{ user.name.charAt(0) }}</div>
                    <div class="user-info">
                        <h4>{{ user.name }}</h4>
                        <p>ID: {{ user.id }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="router-info">
            <h3>Информация о маршруте:</h3>
            <pre>{{ routeInfo }}</pre>
        </div>
    </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
    name: 'HomePage',
    
    setup() {
        const router = useRouter()
        const route = useRoute()

        const users = [
            { id: 1, name: 'Анна Иванова' },
            { id: 2, name: 'Петр Сидоров' },
            { id: 3, name: 'Мария Петрова' },
            { id: 4, name: 'Иван Кузнецов' },
            { id: 5, name: 'Елена Смирнова' }
        ]

        const routeInfo = computed(() => {
            return {
                path: route.path,
                fullPath: route.fullPath,
                name: route.name,
                params: route.params,
                query: route.query,
                hash: route.hash
            }
        })

        const goToProfile = () => {
            router.push('/profile')
        }

        const goToSettings = () => {
            router.push('/settings')
        }

        const viewUser = (userId) => {
            router.push(`/profile/${userId}`)
        }

        return {
            users,
            routeInfo,
            goToProfile,
            goToSettings,
            viewUser
        }
    }
}
</script>

<style scoped>
.home-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.quick-actions {
    margin: 30px 0;
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
}

.btn {
    padding: 12px 24px;
    background-color: #667eea;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    text-decoration: none;
    display: inline-block;
    transition: transform 0.2s ease, background-color 0.3s ease;
}

.btn:hover {
    background-color: #5a67d8;
    transform: translateY(-2px);
}

.user-btn {
    background-color: #48bb78;
}

.user-btn:hover {
    background-color: #38a169;
}

.features {
    margin: 40px 0;
    padding: 25px;
    background-color: #f8f9fa;
    border-radius: 10px;
    border-left: 5px solid #667eea;
}

.features ul {
    list-style-type: none;
    padding: 0;
    margin-top: 15px;
}

.features li {
    padding: 8px 0;
    font-size: 16px;
}

.users-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.user-item {
    padding: 20px;
    background-color: white;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 15px;
    transition: all 0.3s ease;
}

.user-item:hover {
    border-color: #667eea;
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.user-avatar {
    width: 50px;
    height: 50px;
    background-color: #667eea;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
}

.user-info h4 {
    margin: 0;
    color: #2d3748;
}

.user-info p {
    margin: 5px 0 0 0;
    color: #718096;
    font-size: 14px;
}

.router-info {
    margin-top: 40px;
    padding: 20px;
    background-color: #2d3748;
    color: #e2e8f0;
    border-radius: 8px;
    font-family: 'Courier New', monospace;
}

.router-info pre {
    margin: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-size: 14px;
}
</style>