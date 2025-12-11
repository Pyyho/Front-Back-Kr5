<!-- src/views/NotFound.vue -->
<template>
    <div class="not-found">
        <div class="error-container">
            <h1>404</h1>
            <h2>Страница не найдена</h2>
            <p>Запрошенная страница не существует или была перемещена.</p>
            
            <div class="actions">
                <button @click="goHome" class="btn home-btn">🏠 Вернуться на главную</button>
                <button @click="goBack" class="btn back-btn">← Вернуться назад</button>
                <router-link to="/" class="btn explore-btn">🔍 Исследовать приложение</router-link>
            </div>

            <div class="debug-info">
                <h3>Отладочная информация:</h3>
                <p><strong>Путь:</strong> {{ $route.path }}</p>
                <p><strong>Параметры:</strong> {{ $route.params }}</p>
                <p><strong>Query параметры:</strong> {{ $route.query }}</p>
                <p><strong>Хэш:</strong> {{ $route.hash }}</p>
                <p><strong>Предыдущий путь:</strong> {{ previousRoute }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

export default {
    name: 'NotFound',
    
    setup() {
        const router = useRouter()
        const previousRoute = ref('')

        onMounted(() => {
            // Сохраняем предыдущий маршрут
            const routes = router.options.history.state.back
            previousRoute.value = routes || 'Нет данных'
        })

        const goHome = () => {
            router.push('/')
        }

        const goBack = () => {
            router.back()
        }

        return {
            previousRoute,
            goHome,
            goBack
        }
    }
}
</script>

<style scoped>
.not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
    padding: 20px;
}

.error-container {
    text-align: center;
    max-width: 600px;
    padding: 40px;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.error-container h1 {
    font-size: 120px;
    margin: 0;
    color: #667eea;
    line-height: 1;
}

.error-container h2 {
    font-size: 32px;
    margin: 20px 0 10px;
    color: #2d3748;
}

.error-container p {
    font-size: 18px;
    color: #718096;
    margin-bottom: 30px;
}

.actions {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
    margin: 30px 0;
}

.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    text-decoration: none;
    display: inline-block;
    transition: transform 0.2s ease;
}

.btn:hover {
    transform: translateY(-2px);
}

.home-btn {
    background-color: #667eea;
    color: white;
}

.back-btn {
    background-color: #e2e8f0;
    color: #4a5568;
}

.explore-btn {
    background-color: #48bb78;
    color: white;
}

.debug-info {
    margin-top: 40px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    text-align: left;
    border-left: 4px solid #e53e3e;
}

.debug-info h3 {
    margin-top: 0;
    color: #2d3748;
}

.debug-info p {
    margin: 10px 0;
    font-size: 14px;
    color: #4a5568;
}

.debug-info strong {
    color: #2d3748;
}
</style>