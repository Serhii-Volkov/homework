//Задача 1: Галерея фотографий с фильтрацией
//✅Описание:
//Создайте приложение для просмотра фотографий с возможностью фильтрации по альбомам.
//
//🟡При загрузке страницы получите первые 20 фотографий из /photos
//🟡Отобразите их списком (просто одна под другой)
//🟡Добавьте select для выбора номера альбома (albumId от 1 до 5)
//🟡При выборе альбома должны загружаться и отображаться только фотографии из этого альбома
//🟡Пока идет загрузка, показывайте текст "Загрузка..."
//🟡При клике на фотографию, показывайте её URL в полном размере (url вместо thumbnailUrl)
//🟡Добавь кнопку "Закрыть" чтобы вернуться к списку
//
//Технические детали:
//▫️Используйте useState для хранения: списка фотографий, выбранного альбома, статуса загрузки, выбранной фотографии
//▫️Используйте useEffect для загрузки данных при изменении выбранного альбома
//▫️API endpoint: https://jsonplaceholder.typicode.com/photos?albumId={id} или https://jsonplaceholder.typicode.com/photos?_limit=20

import { useEffect, useState } from "react";

interface IPhotos {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string

}

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<IPhotos []>([]);

  const URL = `https://jsonplaceholder.typicode.com/photos?_limit=20`;

  useEffect(() => {

 
    fetch(URL)
      .then(res => res.json())
      .then(data => setPhotos(data))
      
        
  }, []);

  console.log(photos)


    return (
    <div>

      Galery

      <ul>
        {photos.map((photo) => (
            <li key={photo.id}>
            <h3>{photo.title}</h3>
            <img src={photo.url} alt="" /> 
            </li>
        ))}
      </ul>

      

    </div>

  );
}
