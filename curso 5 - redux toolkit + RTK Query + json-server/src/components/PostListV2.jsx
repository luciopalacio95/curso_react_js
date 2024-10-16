/* eslint-disable jsx-a11y/anchor-is-valid */
import { useSelector } from "react-redux";
import {postApi, useGetPostsQuery, useLazyGetPostsQuery} from "../api/postsApiV2"

export default function PostList({ setPostId }) {
  //--forma nueva con RTKquery y redux--
  const {
    data:posts,
    isLoading,
    error,
    isFetching, //boolean cuando hace una revalidacion en segundo plano
    isUninitialized //    
  } = useGetPostsQuery(undefined,{
    refetchOnMountOrArgChange: false, // re valida la info haciendo una peticion en backgoround puede ser boolean o number (segundos)
    refetchOnFocus: false, // re valida la info haciendo focus en la pestaña, solo boolean
    refetchOnReconnect: false, // revalida los datos cuando se cae el internet y vuelve a conectarse, solo boolean
    //pollingInterval: 1000, // revalidar cada determinado tiempo los datos, se defnine en milisegundos
    skip: false, // ideal para consultas dependientes, las cuales necesitan primero de un valor, para luego se ejecutadas
  })

  //llamado usando el lazy (mediante un evento/accion)
  // const [
  //   //trigger //nombre del disparador -> getPosts
  //   getPosts,
  //    {
  //   data:posts,
  //   isLoading,
  //   error,
  //   isError,
  //   isSuccess,
  //   isFetching, //boolean cuando hace una revalidacion en segundo plano
  //   isUninitialized //
  // }] =  useLazyGetPostsQuery({})
  
  // if(isUninitialized){
  //     return <button onClick={() => getPosts()}>fetch Post</button>
  // }

  if (isLoading) {
    return (
      <div>
        <span className="spinner-border"></span> Loading Posts...
      </div>
    );
  }

  if (error) {
    return (
      <section className="alert alert-danger">
        Error fetching posts: {error.message}
      </section>
    );
  }

  return (
    <section>
      <h2>Posts:{isFetching && <span className="spinner-border"></span>}</h2>
      <ul>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} setPostId={setPostId} />
        ))}
      </ul>
    </section>
  );
}

function PostItem({ post, setPostId }) {
  // podemos usar useSelector para recuperar un valor de la cache o saber si existe
  const {isSuccess} = useSelector(postApi.endpoints.getPostById.select(post.id));
  return (
    <li>
      <a 
        className={isSuccess ? "link-success" : ""}
        onClick={() => setPostId(post.id)}
        href="#"
      >
        {post.title}
      </a>
    </li>
  );
}