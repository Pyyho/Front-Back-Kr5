<!-- src/views/ProfileFriends.vue -->
<template>
    <div class="profile-friends">
        <h3>👥 Друзья пользователя</h3>
        <div v-if="userId" class="user-friends">
            <p>Друзья пользователя #{{ userId }}:</p>
            <div class="friends-list">
                <div v-for="friend in friends" :key="friend.id" class="friend-card">
                    <div class="friend-avatar">{{ friend.name.charAt(0) }}</div>
                    <div class="friend-info">
                        <h4>{{ friend.name }}</h4>
                        <p>Дружит с: {{ friend.since }}</p>
                    </div>
                    <button @click="viewFriend(friend.id)" class="view-btn">👁️ Просмотр</button>
                </div>
            </div>
        </div>
        <div v-else class="current-friends">
            <div class="friends-stats">
                <p><strong>Всего друзей:</strong> {{ friends.length }}</p>
                <p><strong>В сети:</strong> {{ onlineFriends }} человек</p>
            </div>
            <div class="add-friend">
                <input v-model="newFriend" placeholder="Имя друга" @keyup.enter="addFriend">
                <button @click="addFriend" class="add-btn">+ Добавить друга</button>
            </div>
            <div class="friends-list">
                <div v-for="friend in friends" :key="friend.id" class="friend-card">
                    <div class="friend-avatar" :class="{ online: friend.online }">
                        {{ friend.name.charAt(0) }}
                    </div>
                    <div class="friend-info">
                        <h4>{{ friend.name }}</h4>
                        <p :class="{ 'online-status': friend.online, 'offline-status': !friend.online }">
                            {{ friend.online ? 'В сети' : 'Не в сети' }}
                        </p>
                    </div>
                    <div class="friend-actions">
                        <button @click="messageFriend(friend.id)" class="msg-btn">💬</button>
                        <button @click="removeFriend(friend.id)" class="remove-btn">✕</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
    name: 'ProfileFriends',
    props: {
        userId: {
            type: String,
            default: ''
        }
    },
    setup() {
        const newFriend = ref('')
        
        const friends = ref([
            { id: 1, name: 'Анна Иванова', online: true, since: '2023' },
            { id: 2, name: 'Петр Сидоров', online: false, since: '2022' },
            { id: 3, name: 'Мария Петрова', online: true, since: '2023' },
            { id: 4, name: 'Иван Кузнецов', online: true, since: '2024' },
            { id: 5, name: 'Елена Смирнова', online: false, since: '2022' }
        ])

        const onlineFriends = computed(() => {
            return friends.value.filter(friend => friend.online).length
        })

        const addFriend = () => {
            if (!newFriend.value.trim()) return
            
            const friend = {
                id: friends.value.length + 1,
                name: newFriend.value,
                online: false,
                since: new Date().getFullYear().toString()
            }
            
            friends.value.push(friend)
            newFriend.value = ''
            alert(`Друг ${friend.name} добавлен!`)
        }

        const removeFriend = (friendId) => {
            const friend = friends.value.find(f => f.id === friendId)
            if (friend && confirm(`Удалить друга ${friend.name}?`)) {
                friends.value = friends.value.filter(f => f.id !== friendId)
            }
        }

        const messageFriend = (friendId) => {
            const friend = friends.value.find(f => f.id === friendId)
            if (friend) {
                alert(`Отправка сообщения другу ${friend.name}...`)
            }
        }

        const viewFriend = (friendId) => {
            alert(`Просмотр профиля друга #${friendId}`)
        }

        return {
            newFriend,
            friends,
            onlineFriends,
            addFriend,
            removeFriend,
            messageFriend,
            viewFriend
        }
    }
}
</script>

<style scoped>
.profile-friends {
    padding: 20px;
}

.friends-stats {
    display: flex;
    gap: 30px;
    margin-bottom: 20px;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 8px;
}

.add-friend {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.add-friend input {
    flex: 1;
    padding: 10px;
    border: 2px solid #e2e8f0;
    border-radius: 6px;
    font-size: 16px;
}

.add-btn {
    padding: 10px 20px;
    background-color: #48bb78;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    white-space: nowrap;
}

.friends-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.friend-card {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    transition: all 0.3s ease;
}

.friend-card:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.friend-avatar {
    width: 50px;
    height: 50px;
    background-color: #667eea;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    position: relative;
}

.friend-avatar.online::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 12px;
    height: 12px;
    background-color: #48bb78;
    border-radius: 50%;
    border: 2px solid white;
}

.friend-info {
    flex: 1;
}

.friend-info h4 {
    margin: 0 0 5px 0;
    color: #2d3748;
}

.friend-info p {
    margin: 0;
    font-size: 14px;
    color: #718096;
}

.online-status {
    color: #48bb78;
    font-weight: bold;
}

.offline-status {
    color: #a0aec0;
}

.friend-actions {
    display: flex;
    gap: 5px;
}

.msg-btn, .remove-btn, .view-btn {
    padding: 8px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
}

.msg-btn {
    background-color: #4299e1;
    color: white;
}

.remove-btn {
    background-color: #fc8181;
    color: white;
}

.view-btn {
    background-color: #667eea;
    color: white;
    white-space: nowrap;
}

.msg-btn:hover, .remove-btn:hover, .view-btn:hover {
    opacity: 0.9;
    transform: scale(1.05);
}
</style>