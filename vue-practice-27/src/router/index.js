// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'  // ← Исправлено!
import HomePage from '../views/HomePage.vue'
import UserProfile from '../views/UserProfile.vue'
import UserSettings from '../views/UserSettings.vue'
import NotFound from '../views/NotFound.vue'
import ProfileInfo from '../views/ProfileInfo.vue'
import ProfilePosts from '../views/ProfilePosts.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
        meta: {
            title: 'Главная страница'
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: UserProfile,
        meta: {
            title: 'Профиль пользователя'
        },
        children: [
            {
                path: 'info',
                name: 'ProfileInfo',
                component: ProfileInfo,
                meta: {
                    title: 'Информация о профиле'
                }
            },
            {
                path: 'posts',
                name: 'ProfilePosts',
                component: ProfilePosts,
                meta: {
                    title: 'Посты пользователя'
                }
            },
            {
                path: 'friends',
                name: 'ProfileFriends',
                component: () => import('../views/ProfileFriends.vue'),
                meta: {
                    title: 'Друзья'
                }
            },
            {
                path: 'settings',
                name: 'ProfileSettings',
                component: () => import('../views/ProfileSettings.vue'),
                meta: {
                    title: 'Настройки профиля'
                }
            }
        ]
    },
    {
        path: '/profile/:id',
        name: 'UserDetail',
        component: UserProfile,
        props: true,
        meta: {
            title: 'Профиль пользователя'
        },
        children: [
            {
                path: 'info',
                name: 'UserDetailInfo',
                component: ProfileInfo,
                props: true,
                meta: {
                    title: 'Информация о пользователе'
                }
            },
            {
                path: 'posts',
                name: 'UserDetailPosts',
                component: ProfilePosts,
                props: true,
                meta: {
                    title: 'Посты пользователя'
                }
            }
        ]
    },
    {
        path: '/settings',
        name: 'Settings',
        component: UserSettings,
        meta: {
            title: 'Настройки'
        },
        redirect: '/settings/general',
        children: [
            {
                path: 'general',
                name: 'SettingsGeneral',
                component: () => import('../views/SettingsGeneral.vue'),
                meta: {
                    title: 'Основные настройки'
                }
            },
            {
                path: 'security',
                name: 'SettingsSecurity',
                component: () => import('../views/SettingsSecurity.vue'),
                meta: {
                    title: 'Настройки безопасности'
                }
            },
            {
                path: 'notifications',
                name: 'SettingsNotifications',
                component: () => import('../views/SettingsNotifications.vue'),
                meta: {
                    title: 'Настройки уведомлений'
                }
            },
            {
                path: 'privacy',
                name: 'SettingsPrivacy',
                component: () => import('../views/SettingsPrivacy.vue'),
                meta: {
                    title: 'Настройки конфиденциальности'
                }
            }
        ]
    },
    {
        path: '/settings/:tab',
        name: 'SettingsTab',
        component: UserSettings,
        props: true,
        meta: {
            title: 'Настройки'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: {
            title: 'Страница не найдена'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Глобальный хук для изменения заголовка страницы
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Vue 3 Практика'
    console.log(`Навигация: ${from.path} → ${to.path}`)
    next()
})

export default router