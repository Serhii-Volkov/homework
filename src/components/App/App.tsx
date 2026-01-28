const images = [
{ id: 1, src: "https://picsum.photos/id/1015/900/600", alt: "Mountain" },
{ id: 2, src: "https://picsum.photos/id/1025/900/600", alt: "Dog" },
{ id: 3, src: "https://picsum.photos/id/1035/900/600", alt: "Waterfall" },
{ id: 4, src: "https://picsum.photos/id/1045/900/600", alt: "Fog" },
{ id: 5, src: "https://picsum.photos/id/1055/900/600", alt: "Desert" },
{ id: 6, src: "https://picsum.photos/id/1065/900/600", alt: "Road" },
];

import css from './App.module.css';

function App() {


  return (
    <>
     <h1>hello</h1>

      <ul className={css.grid}>
        {images.map((image) => (
          <li key={image.id} onClick={() => {console.log(image.id)}}>
            <img src={image.src} alt={image.alt} width="300" />
          </li>
        ))}
      </ul>
     
    </>
  )
}

export default App
