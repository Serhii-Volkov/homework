 import css from './ModalPokemon.module.css';
 import { createPortal } from 'react-dom';
 import { useQuery, keepPreviousData } from '@tanstack/react-query';
 import axios from 'axios';

 interface Props {
    closeModal: () => void
    pokemon: { name: string }
 }




export function ModalPokemon({closeModal, pokemon}: Props) {

    const fechPokemonByName = async(name: string) =>{
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        return res.data
    }

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['pokemon', pokemon.name],
        queryFn: () => fechPokemonByName(pokemon.name),
        placeholderData: keepPreviousData,
    })

    return createPortal(
    <>
      {isLoading && <p>Loading...</p>}

      {isError && <p>Error: {(error as Error).message}</p>}

      {!isLoading && !isError && data && (
        <div className={css.backdrop} onClick={closeModal}>
          <div
            className={css.modal}
          >
            <button onClick={closeModal}>X</button>

            <h2>Name: {data.name}</h2>
            <p>ID: {data.id}</p>

            <img src={data.sprites.front_default} />

            <p>Height: {data.height}</p>
            <p>Weight: {data.weight}</p>
          </div>
        </div>
      )}
    </>,
    document.body
  )
}



//2. При клике на покемона открывайте модалку
//3. В модалке показывайте детальную информацию о выбранном покемоне:
//• имя
//• id
//• спрайт (фото покемона)
//• рост и вес