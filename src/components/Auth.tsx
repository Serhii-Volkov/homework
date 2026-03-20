//ТЗ 2. Auth Store
//Нужно реализовать простую авторизацию на Zustand.
//Что должно быть в store
//user
//isLoggedIn
//login
//logout

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

import { useAuthStore } from "../store/AuthStore";
import { useShallow } from 'zustand/shallow';
import {useState} from "react"
import { cn } from "../lib/utils";

export function Auth() {

    const [name, setName] = useState('')

    const {user,isLoggedIn ,login, logout} = useAuthStore(
        useShallow(state => ({
            login: state.login,
            user: state.user,
            isLoggedIn: state.isLoggedIn,
            logout: state.logout

        }))
    )
   
    

    
    function handleSubmit() {
        login(name);
            setName('');
    }

    return(
        <>
        
        {user ? 
        <div>
            <h3>User name: {user}</h3>
            <button className="border-2 border-amber-500 rounded-sm" onClick={logout}>logout</button>
        </div>
         : 
        
        <div>
            <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)}/>
            <div className=" flex gap-4">
                <button className="border-2 border-amber-500 rounded-sm" type="submit" onClick={handleSubmit}>click</button>
                
            </div>
            
        </div>
        }
         
        
        </>
    )

   
}