import ReactPaginate from 'react-paginate';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';
import { ModalPokemon } from './ModalPokemon/ModalPokemon';

//2. При клике на покемона открывайте модалку
//3. В модалке показывайте детальную информацию о выбранном покемоне:
//• имя
//• id
//• спрайт (фото покемона)
//• рост и вес

type PokemonItem = {
  name: string;
  url: string;
};

type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonItem[];
};

const per_page = 10;

const fetchPokemon = async (page: number, limit: number) => {
  const offset = page * limit;
  const response = await axios.get<PokemonListResponse>('https://pokeapi.co/api/v2/pokemon', {
    params: {
      limit,
      offset,
    },
  });
  return response.data;
};

export  function PokemonPlagination() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [openIsModal, setOpenIsModal] = useState<boolean>(false)
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonItem | null>(null)

   const openModal = (pokemon: PokemonItem) => {
    setOpenIsModal(true)
    setSelectedPokemon(pokemon)
  }

   const closeModal = () => setOpenIsModal(false)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['allPokemons', currentPage, per_page],
    queryFn: () => fetchPokemon(currentPage, per_page),
    placeholderData: keepPreviousData,
  });

  
   const totalPages = data ? Math.ceil(data.count / per_page) : 0;

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <h2>Pokemon List with Pagination</h2>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {(error as Error).message}</p>}

      {!isLoading && !isError && (
        <>
          {data?.results.length ? (
            <ul>
              {data.results.map(pokemon => (
                <li key={pokemon.name} onClick={() => openModal(pokemon)}>{pokemon.name}</li>
              ))}
            </ul>
          ) : (
            <p>No Pokemon found.</p>
          )}

          {openIsModal && selectedPokemon && <ModalPokemon closeModal={closeModal} pokemon={selectedPokemon}/>}
          


          {totalPages > 1 && (
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              forcePage={currentPage}
              nextLabel=">"
              previousLabel="<"
              containerClassName='container'
              pageClassName='container-item'
              activeClassName='active'
            />
          )}
        </>
      )}
    </>
  );
}
