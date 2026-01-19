//Сделайте компонент ProfileNotes:
//Форма “Профиль”
//• поля: Name, Email
//• label связан с input
//• сабмит через action
//• валидация:
//• Name минимум 2 символа
//• Email содержит @
//• ошибки показывать под полями
//• при успехе вывести: Saved: {name} ({email})
//
//Форма “Заметки”
//• textarea “Note”
//• сабмит через action
//• валидация: минимум 5 символов
//• при успехе:
//• добавляем заметку в список (новые сверху)
//• очищаем textarea (через state)

import { useId, useState } from "react";

export  function ProfileNotes() {
  
  const nameId = useId();
  const emailId = useId();
  const noteId = useId();

  
  const [profile, setProfile] = useState<{ name: string; email: string } | null>(null);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  

  
  const [noteInput, setNoteInput] = useState("");
  const [notes, setNotes] = useState<string[]>([]);
  const [noteError, setNoteError] = useState("");

 
 const handleProfileSubmit = (formData: FormData) => {
  const name = (formData.get("name") as string) || "";
  const email = (formData.get("email") as string) || "";

  let hasError = false;

  
  setNameError("");
  setEmailError("");
  setProfile(null);

  if (name.trim().length < 2) {
    setNameError("Name must be at least 2 characters");
    hasError = true;
  }

  if (!email.includes("@")) {
    setEmailError("Email must contain @");
    hasError = true;
  }

  if (!hasError) {
    setProfile({ name, email });
  }
};
  
 const handleNoteSubmit = () => {
  if (noteInput.trim().length < 5) {
    setNoteError("Note must be at least 5 characters");
    return;
  }

  setNotes((prev) => [noteInput, ...prev]);
  setNoteInput("");      
  setNoteError("");
};

  return (
    <div>
      
      <section>
        <h3>Profile</h3>

        <form action={handleProfileSubmit}>
          <div>
            <label htmlFor={nameId}>Name</label>
            <input id={nameId} name="name" type="text" />
            <p>{nameError}</p>
            
          </div>

          <div>
            <label htmlFor={emailId}>Email</label>
            <input id={emailId} name="email" type="email" />
            <p>{emailError}</p>
            
          </div>

          <button type="submit">Save profile</button>
        </form>

        {profile && (
          <p>
            Saved: {profile.name} ({profile.email})
          </p>
        )}
      </section>

      <hr />

   
      <section>
        <h3>Notes</h3>

        <form action={handleNoteSubmit}>
          <label htmlFor={noteId}>Note</label>
          <textarea
            id={noteId}
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
          />
          {noteError && <p>{noteError}</p>}

          <button type="submit">Add note</button>
        </form>

        <ul>
          {notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
