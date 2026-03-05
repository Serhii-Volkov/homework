//📌 ТЗ: Posts с серверной пагинацией
//
//Сделать компонент PostsServerPagination с использованием:
//• useQuery
//• react-paginate
//• select (5 или 10 элементов на страницу)
//
//⸻
//
//Что нужно сделать
//1. Получать посты с API
//https://jsonplaceholder.typicode.com/posts
//2. Использовать серверную пагинацию:
//передавать _page и _limit в запросе.
//3. На экране должно быть:
//• заголовок “Posts”
//• select (5 или 10)
//• текст Page X
//• список постов (id + title)
//• блок пагинации (ReactPaginate)
//• Loading и Error состояния
//
//⸻
//
//Как должно работать
//• По умолчанию показывать первую страницу и 5 элементов.
//• При клике на страницу в пагинации:
//• отправляется новый запрос с другим _page
//• список обновляется.
//• При смене значения в select:
//• меняется _limit
//• страница сбрасывается на первую
//• отправляется новый запрос.
//• Пагинация должна быть контролируемой через forcePage.
import ReactPaginate from "react-paginate"
import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { useState } from "react"
import axios from "axios"

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

const fetchPosts = async (page: number, limit: number, search: string) => {
  const res = await axios.get<Post[]>(
    "https://jsonplaceholder.typicode.com/posts",
    {
      params: {
        _page: page + 1,
        _limit: limit,
        q: search
      }
    }
  )

  return {
    posts: res.data,
    totalCount: Number(res.headers["x-total-count"])
  }
}

export function PostsServerPagination() {
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(5)
  const [search, setSearch] = useState("")
  

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", page, limit, search],
    queryFn: () => fetchPosts(page, limit, search),
    placeholderData: keepPreviousData
  })
  
  const totalPages = data ? Math.ceil(data.totalCount / limit) : 0

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error: {(error as Error).message}</p>

  return (
    <>
      <h3>Posts</h3>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          setPage(0)
        }}
      />

      <select
        value={limit}
        onChange={(e) => {
          setLimit(Number(e.target.value))
          setPage(0)
        }}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
      </select>

      <p>Page {page + 1}</p>

      <ul>
        {data?.posts.map((post) => (
          <li key={post.id}>
            {post.id} - {post.title}
          </li>
        ))}
      </ul>

      <ReactPaginate
        pageCount={totalPages}
        onPageChange={(selected) => setPage(selected.selected)}
        forcePage={page}
        previousLabel={"←"}
        nextLabel={"→"}
      />
    </>
  )
}