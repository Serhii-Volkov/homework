//ТЗ 2. Auth Store
//
//Нужно реализовать простую авторизацию на Zustand.
//
//Что должно быть в store
//
//user
//isLoggedIn
//login
//logout
//
//Логика
//user хранит имя пользователя или null
//
//isLoggedIn хранит true или false
//
//login(name) записывает имя пользователя в user и ставит isLoggedIn: true
//
//logout() очищает user и ставит isLoggedIn: false
//
//Что должно быть в компоненте
//Если пользователь не вошёл в систему, показать кнопку Login
//
//При клике логинить тестового пользователя, например Olena
//
//Если пользователь вошёл, показать:
//
//текст приветствия
//имя пользователя
//кнопку Logout

import { create } from 'zustand'

interface AuthStore  {
    user: string | null;
    isLoggedIn: boolean;
    login: (name: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>(set => ({
    user: null,
    isLoggedIn: false,
    login: name => set({user: name, isLoggedIn: true}),
    logout: () => set({user: null, isLoggedIn: false}),
}))