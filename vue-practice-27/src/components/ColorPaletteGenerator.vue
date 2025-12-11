<!-- src/components/ColorPaletteGenerator.vue -->
<template>
    <div class="color-generator">
        <h2>Генератор цветовых палитр</h2>
        
        <div class="controls">
            <button @click="generateRandomPalette" class="generate-btn">
                🎲 Случайная палитра
            </button>
            
            <div class="settings">
                <label>
                    Количество цветов:
                    <select v-model="colorCount" @change="updatePalette">
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="7">7</option>
                    </select>
                </label>
                
                <label>
                    Формат:
                    <select v-model="colorFormat">
                        <option value="hex">HEX</option>
                        <option value="rgb">RGB</option>
                    </select>
                </label>
                
                <label class="switch">
                    <input type="checkbox" v-model="darkMode">
                    <span class="slider"></span>
                    Темный фон
                </label>
            </div>
        </div>

        <div class="palette-preview" :class="{ 'dark-bg': darkMode }">
            <div
                v-for="(color, index) in colors"
                :key="index"
                class="color-card"
                :style="{ backgroundColor: color.hex }"
                @click="copyToClipboard(color)"
            >
                <div class="color-info" :class="{ 'light-text': isColorLight(color.hex) }">
                    <span class="color-value">
                        {{ colorFormat === 'hex' ? color.hex : color.rgb }}
                    </span>
                    <span v-if="color.copied" class="copied-indicator">✓ Скопировано!</span>
                </div>
                <div class="color-actions">
                    <button 
                        @click.stop="toggleLock(index)"
                        class="lock-btn"
                        :class="{ locked: color.locked }"
                        :title="color.locked ? 'Разблокировать' : 'Заблокировать'"
                    >
                        {{ color.locked ? '🔒' : '🔓' }}
                    </button>
                </div>
            </div>
        </div>

        <div class="mockup-preview" :class="{ 'dark-bg': darkMode }">
            <h3>Превью палитры</h3>
            <div class="mockup-content">
                <div class="mockup-header" :style="{ backgroundColor: colors[0]?.hex || '#f0f0f0' }">
                    <h4>Заголовок</h4>
                </div>
                <div class="mockup-card" :style="{ backgroundColor: colors[1]?.hex || '#ffffff' }">
                    <p>Карточка с контентом</p>
                    <button 
                        class="mockup-button"
                        :style="{ 
                            backgroundColor: colors[2]?.hex || '#007bff',
                            color: getContrastColor(colors[2]?.hex || '#007bff')
                        }"
                    >
                        Кнопка
                    </button>
                </div>
            </div>
        </div>

        <div class="storage-controls">
            <button @click="saveToLocalStorage" class="save-btn">
                💾 Сохранить палитру
            </button>
            <button @click="loadFromLocalStorage" class="load-btn">
                📂 Загрузить последнюю
            </button>
            <button @click="clearLocalStorage" class="clear-btn">
                🗑️ Очистить
            </button>
        </div>

        <div class="current-palette-info">
            <h3>Текущая палитра:</h3>
            <div class="palette-codes">
                <div v-for="(color, index) in colors" :key="index" class="color-code">
                    <span class="color-swatch" :style="{ backgroundColor: color.hex }"></span>
                    <code>{{ colorFormat === 'hex' ? color.hex : color.rgb }}</code>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
    name: 'ColorPaletteGenerator',
    setup() {
        const colorCount = ref(5)
        const colorFormat = ref('hex')
        const darkMode = ref(false)
        
        const colors = ref([])

        // Генерация случайного цвета в HEX формате
        const generateRandomColor = () => {
            return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
        }

        // Конвертация HEX в RGB
        const hexToRgb = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
            return result ? 
                `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` 
                : null
        }

        // Генерация гармоничной палитры
        const generateHarmoniousPalette = (baseColor = null) => {
            const newColors = []
            const base = baseColor || generateRandomColor()
            
            // Создаем гармоничные цвета на основе базового
            for (let i = 0; i < colorCount.value; i++) {
                if (colors.value[i]?.locked) {
                    // Если цвет заблокирован, оставляем его
                    newColors.push(colors.value[i])
                } else {
                    // Генерация гармоничного цвета
                    const hex = generateHarmoniousColor(base, i)
                    newColors.push({
                        hex,
                        rgb: hexToRgb(hex),
                        locked: false,
                        copied: false
                    })
                }
            }
            
            colors.value = newColors
            saveToLocalStorage()
        }

        // Генерация гармоничного цвета на основе базового
        const generateHarmoniousColor = (baseColor, index) => {
            // Преобразуем HEX в HSL для работы с цветовым кругом
            const hex = baseColor.replace('#', '')
            const r = parseInt(hex.substr(0, 2), 16) / 255
            const g = parseInt(hex.substr(2, 2), 16) / 255
            const b = parseInt(hex.substr(4, 2), 16) / 255
            
            const max = Math.max(r, g, b)
            const min = Math.min(r, g, b)
            let h, s, l = (max + min) / 2
            
            if (max === min) {
                h = s = 0
            } else {
                const d = max - min
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
                
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break
                    case g: h = (b - r) / d + 2; break
                    case b: h = (r - g) / d + 4; break
                }
                h /= 6
            }
            
            // Изменяем оттенок для создания гармоничных цветов
            h = (h + (index * 0.2)) % 1
            s = Math.max(0.4, Math.min(0.8, s))
            l = Math.max(0.3, Math.min(0.7, l))
            
            // Конвертируем HSL обратно в HEX
            return hslToHex(h, s, l)
        }

        // Конвертация HSL в HEX
        const hslToHex = (h, s, l) => {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1
                if (t > 1) t -= 1
                if (t < 1/6) return p + (q - p) * 6 * t
                if (t < 1/2) return q
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
                return p
            }
            
            let r, g, b
            
            if (s === 0) {
                r = g = b = l
            } else {
                const q = l < 0.5 ? l * (1 + s) : l + s - l * s
                const p = 2 * l - q
                r = hue2rgb(p, q, h + 1/3)
                g = hue2rgb(p, q, h)
                b = hue2rgb(p, q, h - 1/3)
            }
            
            const toHex = (x) => {
                const hex = Math.round(x * 255).toString(16)
                return hex.length === 1 ? '0' + hex : hex
            }
            
            return `#${toHex(r)}${toHex(g)}${toHex(b)}`
        }

        // Копирование в буфер обмена
        const copyToClipboard = async (color) => {
            const textToCopy = colorFormat.value === 'hex' ? color.hex : color.rgb
            
            try {
                await navigator.clipboard.writeText(textToCopy)
                color.copied = true
                
                // Сбрасываем индикатор через 2 секунды
                setTimeout(() => {
                    color.copied = false
                }, 2000)
            } catch (err) {
                console.error('Ошибка копирования: ', err)
                // Fallback для старых браузеров
                const textArea = document.createElement('textarea')
                textArea.value = textToCopy
                document.body.appendChild(textArea)
                textArea.select()
                document.execCommand('copy')
                document.body.removeChild(textArea)
                
                color.copied = true
                setTimeout(() => {
                    color.copied = false
                }, 2000)
            }
        }

        // Блокировка/разблокировка цвета
        const toggleLock = (index) => {
            colors.value[index].locked = !colors.value[index].locked
        }

        // Определение, светлый ли цвет (для выбора цвета текста)
        const isColorLight = (hex) => {
            const color = hex.replace('#', '')
            const r = parseInt(color.substr(0, 2), 16)
            const g = parseInt(color.substr(2, 2), 16)
            const b = parseInt(color.substr(4, 2), 16)
            
            // Формула яркости
            const brightness = (r * 299 + g * 587 + b * 114) / 1000
            return brightness > 128
        }

        // Получение контрастного цвета
        const getContrastColor = (hex) => {
            return isColorLight(hex) ? '#000000' : '#ffffff'
        }

        // Сохранение в localStorage
        const saveToLocalStorage = () => {
            const paletteData = {
                colors: colors.value,
                colorCount: colorCount.value,
                colorFormat: colorFormat.value,
                darkMode: darkMode.value,
                timestamp: new Date().toISOString()
            }
            localStorage.setItem('colorPalette', JSON.stringify(paletteData))
        }

        // Загрузка из localStorage
        const loadFromLocalStorage = () => {
            const saved = localStorage.getItem('colorPalette')
            if (saved) {
                try {
                    const data = JSON.parse(saved)
                    colors.value = data.colors
                    colorCount.value = data.colorCount
                    colorFormat.value = data.colorFormat
                    darkMode.value = data.darkMode
                } catch (e) {
                    console.error('Ошибка загрузки из localStorage:', e)
                }
            }
        }

        // Очистка localStorage
        const clearLocalStorage = () => {
            localStorage.removeItem('colorPalette')
            generateRandomPalette()
        }

        // Обновление палитры при изменении количества цветов
        const updatePalette = () => {
            generateHarmoniousPalette(colors.value[0]?.hex)
        }

        // Генерация случайной палитры
        const generateRandomPalette = () => {
            generateHarmoniousPalette()
        }

        // Инициализация при монтировании
        onMounted(() => {
            loadFromLocalStorage()
            if (colors.value.length === 0) {
                generateRandomPalette()
            }
        })

        return {
            colorCount,
            colorFormat,
            darkMode,
            colors,
            generateRandomPalette,
            copyToClipboard,
            toggleLock,
            isColorLight,
            getContrastColor,
            saveToLocalStorage,
            loadFromLocalStorage,
            clearLocalStorage,
            updatePalette
        }
    }
}
</script>

<style scoped>
.color-generator {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
}

.controls {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 30px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
}

.generate-btn {
    padding: 12px 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 25px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.generate-btn:hover {
    transform: translateY(-2px);
}

.settings {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    align-items: center;
}

.settings label {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-weight: bold;
}

.settings select {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: white;
}

.switch {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
}

.switch input {
    display: none;
}

.slider {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
    background-color: #ccc;
    border-radius: 24px;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    border-radius: 50%;
    transition: .4s;
}

input:checked + .slider {
    background-color: #667eea;
}

input:checked + .slider:before {
    transform: translateX(26px);
}

.palette-preview {
    display: flex;
    height: 200px;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 30px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.palette-preview.dark-bg {
    background-color: #333;
}

.color-card {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.color-card:hover {
    transform: scale(1.02);
    z-index: 1;
}

.color-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.color-value {
    font-family: monospace;
    font-weight: bold;
    font-size: 14px;
}

.light-text {
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.copied-indicator {
    font-size: 12px;
    opacity: 0.9;
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 0.9; }
}

.color-actions {
    display: flex;
    justify-content: flex-end;
}

.lock-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);
}

.lock-btn.locked {
    background: rgba(255, 255, 255, 0.4);
}

.mockup-preview {
    padding: 20px;
    border-radius: 10px;
    background-color: white;
    margin-bottom: 30px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.mockup-preview.dark-bg {
    background-color: #1a1a1a;
    color: white;
}

.mockup-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
}

.mockup-header {
    padding: 30px;
    border-radius: 8px;
    color: white;
}

.mockup-card {
    padding: 25px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.mockup-button {
    margin-top: 15px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
}

.storage-controls {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-bottom: 30px;
}

.save-btn, .load-btn, .clear-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: opacity 0.3s ease;
}

.save-btn {
    background-color: #28a745;
    color: white;
}

.load-btn {
    background-color: #007bff;
    color: white;
}

.clear-btn {
    background-color: #dc3545;
    color: white;
}

.save-btn:hover, .load-btn:hover, .clear-btn:hover {
    opacity: 0.9;
}

.current-palette-info {
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
}

.palette-codes {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 15px;
}

.color-code {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 15px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.color-swatch {
    width: 20px;
    height: 20px;
    border-radius: 3px;
    border: 1px solid #ddd;
}

code {
    font-family: monospace;
    font-size: 14px;
}
</style>