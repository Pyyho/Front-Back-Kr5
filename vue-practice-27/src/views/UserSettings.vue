<!-- src/views/UserSettings.vue -->
<template>
    <div class="user-settings">
        <h1>⚙️ Настройки пользователя</h1>

        <div class="settings-tabs">
            <router-link to="/settings/general" class="tab">🌐 Основные</router-link>
            <router-link to="/settings/security" class="tab">🔒 Безопасность</router-link>
            <router-link to="/settings/notifications" class="tab">🔔 Уведомления</router-link>
            <router-link to="/settings/privacy" class="tab">👁️ Конфиденциальность</router-link>
        </div>

        <div class="settings-content">
            <p class="current-tab">Активная вкладка: <strong>{{ currentTab }}</strong></p>
            
            <router-view :current-tab="currentTab"></router-view>
        </div>

        <div class="settings-info">
            <h3>Информация о маршруте:</h3>
            <pre>{{ routeInfo }}</pre>
        </div>
    </div>
</template>

<script>
// ИЗМЕНЕНИЕ ЗДЕСЬ: computed импортируется из vue, а не из vue-router
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
    name: 'UserSettings',
    
    setup() {
        const route = useRoute()

        const currentTab = computed(() => {
            // ИЗМЕНЕНИЕ ЗДЕСЬ: route.params.tab может не существовать
            // Лучше использовать путь или имя маршрута
            const path = route.path
            if (path.includes('/security')) return 'security'
            if (path.includes('/notifications')) return 'notifications'
            if (path.includes('/privacy')) return 'privacy'
            return 'general'
        })

        const routeInfo = computed(() => {
            return {
                path: route.path,
                name: route.name,
                params: route.params,
                query: route.query,
                hash: route.hash,
                fullPath: route.fullPath
            }
        })

        return {
            currentTab,
            routeInfo
        }
    }
}
</script>

<style scoped>
.user-settings {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.settings-tabs {
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
    border: 2px solid #e2e8f0;
}

.tab:hover {
    background-color: #f7fafc;
    border-color: #cbd5e0;
}

.tab.router-link-active {
    background-color: #48bb78;
    color: white;
    border-color: #48bb78;
}

.settings-content {
    padding: 30px;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    background-color: white;
    margin-bottom: 30px;
}

.current-tab {
    font-size: 18px;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #e2e8f0;
}

.settings-info {
    padding: 20px;
    background-color: #2d3748;
    color: #e2e8f0;
    border-radius: 8px;
    font-family: 'Courier New', monospace;
}

.settings-info pre {
    margin: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-size: 14px;
}
</style>