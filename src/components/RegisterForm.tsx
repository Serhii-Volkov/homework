//ТЗ
//Сделайте форму регистрации с полями:
//• username (text)
//• email (email)
//• role (select: user | admin | manager)
//• agree (checkbox: “I agree”)
//
//Поведение:
//1. На submit:
//
//• сделать event.preventDefault()
//• собрать данные через new FormData
//• agree должно стать true/false
//• добавить пользователя в список в state
//
//2. После успешного submit:
//• очистить форму через form.reset()
//
//3. Под формой вывести список зарегистрированных пользователей:
//
//• username — email (role) — agree:true/false
import { useId, useState } from "react";
interface User {
  name: string;
  email: string;
  role: string;
  agree: boolean;
}

export function RegisterForm() {
  const nameId = useId();
  const emailId = useId();
  const roleId = useId();

  const [users, setUsers] = useState<User[]>([]);

  const hendleSubmit = (formData: FormData) => {
    const newUser: User = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as string,
      agree: formData.has("agree") as boolean,
    };
    setUsers((prev) => [...prev, newUser as User]);

    console.log(users);
  };

  return (
    <>
      <form action={hendleSubmit}>
        <label htmlFor={nameId}>Name:</label>
        <input type="text" name="name" id={nameId} />

        <br />
        <br />

        <label htmlFor={emailId}>Email:</label>
        <input type="email" name="email" id={emailId} />

        <br />
        <br />

        <label htmlFor={roleId}>Role:</label>
        <select id={roleId} name="role">
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
        </select>

        <br />
        <br />
        <label>
          <input type="checkbox" name="agree" />I agree
        </label>

        <br />
        <br />

        <button type="submit">Register</button>
      </form>

      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name} — {user.email} ({user.role}) — agree:
            {user.agree.toString()}
          </li>
        ))}
      </ul>
    </>
  );
}
