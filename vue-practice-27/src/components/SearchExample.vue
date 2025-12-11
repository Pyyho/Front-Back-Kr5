<!-- src/components/SearchExample.vue -->
<template>
    <div class="search-example">
        <h2>Пример 5: Поиск и кастомные элементы</h2>
        <p>Демонстрация кастомного v-model и работы с событиями</p>

        <!-- Используем кастомный v-model -->
        <SearchInput
            v-model="searchQuery"
            label="Поиск по имени пользователя:"
            placeholder="Введите имя для поиска..."
            @search="performSearch"
            @reset="resetSearch"
        />

        <div class="search-info">
            <p>Текущий запрос поиска: <strong>"{{ searchQuery }}"</strong></p>
            <p>Найдено пользователей: <strong>{{ searchResults.length }}</strong></p>
        </div>

        <div v-if="searchResults.length" class="results-container">
            <h3>Результаты поиска:</h3>
            <div class="results-grid">
                <div v-for="user in searchResults" :key="user.id" class="user-result">
                    <div class="user-avatar">
                        {{ user.name.charAt(0) }}
                    </div>
                    <div class="user-details">
                        <h4>{{ user.name }}</h4>
                        <p>{{ user.email }}</p>
                        <p class="user-role">{{ user.role }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div v-else-if="searchQuery" class="no-results">
            <p>😕 Пользователи по запросу "{{ searchQuery }}" не найдены</p>
        </div>

        <div v-else class="all-users">
            <h3>Все пользователи:</h3>
            <div class="results-grid">
                <div v-for="user in users" :key="user.id" class="user-result">
                    <div class="user-avatar">
                        {{ user.name.charAt(0) }}
                    </div>
                    <div class="user-details">
                        <h4>{{ user.name }}</h4>
                        <p>{{ user.email }}</p>
                        <p class="user-role">{{ user.role }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="search-history">
            <h3>История поиска:</h3>
            <ul v-if="searchHistory.length">
                <li v-for="(item, index) in searchHistory" :key="index">
                    "{{ item.query }}" - найдено {{ item.results }} пользователей
                    <span class="timestamp">{{ formatTime(item.timestamp) }}</span>
                </li>
            </ul>
            <p v-else>История поиска пуста</p>
            <button @click="clearHistory" class="clear-history-btn">
                Очистить историю
            </button>
        </div>
    </div>
</template>

<script>
import SearchInput from './SearchInput.vue'
import { ref, computed } from 'vue'

export default {
    name: 'SearchExample',
    components: {
        SearchInput
    },
    
    setup() {
        const searchQuery = ref('')
        const searchHistory = ref([])
        
        const users = ref([
            { id: 1, name: 'Анна Иванова', email: 'anna@test.com', role: 'admin' },
            { id: 2, name: 'Борис Петров', email: 'boris@test.com', role: 'user' },
            { id: 3, name: 'Виктор Сидоров', email: 'victor@test.com', role: 'user' },
            { id: 4, name: 'Галина Кузнецова', email: 'galina@test.com', role: 'user' },
            { id: 5, name: 'Дмитрий Смирнов', email: 'dmitry@test.com', role: 'user' },
            { id: 6, name: 'Елена Васильева', email: 'elena@test.com', role: 'admin' },
            { id: 7, name: 'Жанна Попова', email: 'zhanna@test.com', role: 'user' },
            { id: 8, name: 'Зоя Николаева', email: 'zoya@test.com', role: 'user' }
        ])

        const searchResults = computed(() => {
            if (!searchQuery.value.trim()) return []
            
            const query = searchQuery.value.toLowerCase()
            return users.value.filter(user =>
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query)
            )
        })

        const performSearch = () => {
            if (!searchQuery.value.trim()) return
            
            const searchItem = {
                query: searchQuery.value,
                results: searchResults.value.length,
                timestamp: new Date()
            }
            
            searchHistory.value.unshift(searchItem)
            
            if (searchHistory.value.length > 5) {
                searchHistory.value.pop()
            }
            
            console.log('Выполняем поиск:', searchQuery.value)
        }

        const resetSearch = () => {
            searchQuery.value = ''
            console.log('Поиск сброшен')
        }

        const clearHistory = () => {
            searchHistory.value = []
        }

        const formatTime = (date) => {
            return date.toLocaleTimeString('ru-RU', { 
                hour: '2-digit', 
                minute: '2-digit' 
            })
        }

        return {
            searchQuery,
            users,
            searchResults,
            searchHistory,
            performSearch,
            resetSearch,
            clearHistory,
            formatTime
        }
    }
}
</script>

<style scoped>
.search-example {
    max-width: 800px;
    margin: 0 auto;
}

.search-info {
    margin: 20px 0;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #667eea;
}

.results-container,
.all-users,
.no-results {
    margin-top: 30px;
}

.results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
    margin-top: 15px;
}

.user-result {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.user-result:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
    font-size: 20px;
    font-weight: bold;
}

.user-details h4 {
    margin: 0 0 5px 0;
    color: #2d3748;
}

.user-details p {
    margin: 0;
    color: #718096;
    font-size: 14px;
}

.user-role {
    display: inline-block;
    padding: 2px 8px;
    background-color: #e2e8f0;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
}

.no-results {
    text-align: center;
    padding: 40px;
    background-color: #fff5f5;
    border: 1px solid #fed7d7;
    border-radius: 8px;
    color: #c53030;
}

.search-history {
    margin-top: 40px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e9ecef;
}

.search-history ul {
    list-style-type: none;
    padding: 0;
    margin-bottom: 15px;
}

.search-history li {
    padding: 10px 15px;
    margin-bottom: 8px;
    background-color: white;
    border-radius: 6px;
    border-left: 3px solid #48bb78;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.timestamp {
    font-size: 12px;
    color: #a0aec0;
}

.clear-history-btn {
    padding: 8px 16px;
    background-color: #e2e8f0;
    color: #4a5568;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.clear-history-btn:hover {
    background-color: #cbd5e0;
}
</style>