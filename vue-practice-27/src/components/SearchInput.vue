<!-- src/components/SearchInput.vue -->
<template>
    <div class="search-container">
        <label v-if="label" class="search-label">{{ label }}</label>
        <div class="input-wrapper">
            <input
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                :placeholder="placeholder"
                class="search-input"
                type="text"
            />
            <button
                v-if="modelValue"
                @click="$emit('update:modelValue', '')"
                class="clear-btn"
                title="Очистить"
            >
                ✕
            </button>
        </div>

        <!-- Дополнительные события -->
        <div class="search-actions">
            <button @click="$emit('search')" class="search-btn">
                🔍 Найти
            </button>
            <button @click="$emit('reset')" class="reset-btn">
                🗑️ Сбросить
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchInput',

    props: {
        modelValue: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: 'Поиск...'
        }
    },
    
    emits: ['update:modelValue', 'search', 'reset']
}
</script>

<style scoped>
.search-container {
    margin: 20px 0;
}

.search-label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #333;
}

.input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.search-input {
    width: 100%;
    padding: 12px 45px 12px 15px;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s ease;
}

.search-input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.clear-btn {
    position: absolute;
    right: 10px;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: #999;
    padding: 4px 8px;
    border-radius: 50%;
    transition: all 0.2s ease;
}

.clear-btn:hover {
    color: #e53e3e;
    background-color: #f8f9fa;
}

.search-actions {
    margin-top: 15px;
    display: flex;
    gap: 10px;
}

.search-btn {
    padding: 10px 20px;
    background-color: #667eea;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
    flex: 1;
}

.search-btn:hover {
    background-color: #5a67d8;
}

.reset-btn {
    padding: 10px 20px;
    background-color: #e2e8f0;
    color: #4a5568;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;
    flex: 1;
}

.reset-btn:hover {
    background-color: #cbd5e0;
    color: #2d3748;
}
</style>