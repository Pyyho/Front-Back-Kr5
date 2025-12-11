<!-- src/views/ProfilePosts.vue -->
<template>
    <div class="profile-posts">
        <h3>📝 Посты пользователя</h3>
        <div v-if="userId">
            <p>Посты пользователя #{{ userId }}:</p>
            <div class="posts-list">
                <div v-for="post in posts" :key="post.id" class="post-card">
                    <h4>{{ post.title }}</h4>
                    <p>{{ post.content }}</p>
                    <div class="post-meta">
                        <span class="date">{{ post.date }}</span>
                        <span class="likes">❤️ {{ post.likes }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="new-post">
                <textarea v-model="newPost" placeholder="Что у вас нового?" rows="3"></textarea>
                <button @click="addPost" class="post-btn">📤 Опубликовать</button>
            </div>
            <div class="posts-list">
                <div v-for="post in userPosts" :key="post.id" class="post-card">
                    <h4>{{ post.title }}</h4>
                    <p>{{ post.content }}</p>
                    <div class="post-meta">
                        <span class="date">{{ post.date }}</span>
                        <button @click="likePost(post.id)" class="like-btn">
                            ❤️ {{ post.likes }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'ProfilePosts',
    props: {
        userId: {
            type: String,
            default: ''
        }
    },
    setup() {
        const newPost = ref('')
        const userPosts = ref([
            {
                id: 1,
                title: 'Мой первый пост',
                content: 'Привет всем! Это мой первый пост в этом приложении.',
                date: '2024-01-15',
                likes: 12
            },
            {
                id: 2,
                title: 'Изучаю Vue 3',
                content: 'Сегодня начал изучать Vue 3 и Vue Router. Очень интересно!',
                date: '2024-01-18',
                likes: 24
            },
            {
                id: 3,
                title: 'Новый проект',
                content: 'Работаю над новым проектом с использованием Vue.js.',
                date: '2024-01-20',
                likes: 8
            }
        ])

        const posts = [
            {
                id: 1,
                title: 'Общий пост #1',
                content: 'Это пример поста другого пользователя.',
                date: '2024-01-10',
                likes: 5
            },
            {
                id: 2,
                title: 'Общий пост #2',
                content: 'Еще один пример поста для демонстрации.',
                date: '2024-01-12',
                likes: 3
            }
        ]

        const addPost = () => {
            if (!newPost.value.trim()) return
            
            const post = {
                id: userPosts.value.length + 1,
                title: 'Новый пост',
                content: newPost.value,
                date: new Date().toLocaleDateString('ru-RU'),
                likes: 0
            }
            
            userPosts.value.unshift(post)
            newPost.value = ''
        }

        const likePost = (postId) => {
            const post = userPosts.value.find(p => p.id === postId)
            if (post) {
                post.likes++
            }
        }

        return {
            newPost,
            userPosts,
            posts,
            addPost,
            likePost
        }
    }
}
</script>

<style scoped>
.profile-posts {
    padding: 20px;
}

.new-post {
    margin-bottom: 30px;
}

.new-post textarea {
    width: 100%;
    padding: 15px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 16px;
    margin-bottom: 10px;
    resize: vertical;
}

.new-post textarea:focus {
    outline: none;
    border-color: #667eea;
}

.post-btn {
    padding: 12px 24px;
    background-color: #667eea;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

.post-btn:hover {
    background-color: #5a67d8;
}

.posts-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.post-card {
    padding: 20px;
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.post-card h4 {
    margin-top: 0;
    color: #2d3748;
}

.post-card p {
    color: #4a5568;
    line-height: 1.6;
}

.post-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    padding-top: 10px;
    border-top: 1px solid #e2e8f0;
}

.date {
    color: #a0aec0;
    font-size: 14px;
}

.like-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: #e53e3e;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 5px;
}
</style>