<!-- src/components/UserCards.vue -->
<template>
    <div class="user-cards-demo">
        <h2>Пример 4: Компоненты и пропсы</h2>
        <p>Демонстрация передачи данных через пропсы, слотов и событий</p>

        <div class="cards-container">
            <!-- Передаем данные через пропсы -->
            <UserCard
                :user="adminUser"
                :is-active="true"
                @user-clicked="handleUserClick"
            >
                <!-- Именованный слот -->
                <template #actions>
                    <button @click="editUser(adminUser)" class="edit-btn">
                        ✏️ Редактировать
                    </button>
                </template>

                <!-- Слот по умолчанию -->
                <p>Администратор системы с полными правами доступа</p>
            </UserCard>

            <UserCard
                v-for="user in users"
                :key="user.id"
                :user="user"
                @user-clicked="handleUserClick"
            />
        </div>

        <div class="event-log">
            <h3>Лог событий:</h3>
            <ul>
                <li v-for="(event, index) in eventLog" :key="index">
                    {{ event }}
                </li>
            </ul>
            <button @click="clearLog" class="clear-btn">Очистить лог</button>
        </div>
    </div>
</template>

<script>
import UserCard from './UserCard.vue'

export default {
    name: 'UserCards',
    components: {
        UserCard
    },
    
    data() {
        return {
            adminUser: {
                id: 1,
                name: 'Анна Иванова',
                email: 'anna@example.com',
                role: 'admin'
            },
            users: [
                {
                    id: 2,
                    name: 'Петр Сидоров',
                    email: 'petr@example.com',
                    role: 'user'
                },
                {
                    id: 3,
                    name: 'Мария Петрова',
                    email: 'maria@example.com',
                    role: 'user'
                },
                {
                    id: 4,
                    name: 'Иван Кузнецов',
                    email: 'ivan@example.com',
                    role: 'user'
                },
                {
                    id: 5,
                    name: 'Елена Смирнова',
                    email: 'elena@example.com',
                    role: 'user'
                }
            ],
            eventLog: []
        }
    },
    
    methods: {
        handleUserClick(user) {
            const message = `Клик по пользователю: ${user.name} (${user.email})`
            console.log(message)
            this.eventLog.unshift(`[${new Date().toLocaleTimeString()}] ${message}`)
            
            if (this.eventLog.length > 5) {
                this.eventLog.pop()
            }
        },
        
        editUser(user) {
            const message = `Редактирование пользователя: ${user.name}`
            console.log(message)
            this.eventLog.unshift(`[${new Date().toLocaleTimeString()}] ${message}`)
            alert(`Редактирование: ${user.name}`)
            
            if (this.eventLog.length > 5) {
                this.eventLog.pop()
            }
        },
        
        clearLog() {
            this.eventLog = []
        }
    }
}
</script>

<style scoped>
.user-cards-demo {
    max-width: 800px;
    margin: 0 auto;
}

.cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin: 30px 0;
}

.edit-btn {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #48bb78;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.edit-btn:hover {
    background-color: #38a169;
}

.event-log {
    margin-top: 40px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e9ecef;
}

.event-log h3 {
    margin-bottom: 15px;
    color: #333;
}

.event-log ul {
    list-style-type: none;
    padding: 0;
    margin-bottom: 20px;
}

.event-log li {
    padding: 8px 12px;
    margin-bottom: 8px;
    background-color: white;
    border-left: 4px solid #667eea;
    border-radius: 4px;
    font-family: monospace;
    font-size: 14px;
}

.clear-btn {
    padding: 8px 16px;
    background-color: #e53e3e;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.clear-btn:hover {
    background-color: #c53030;
}
</style>