import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const API = "http://localhost:3005";

export const postApi = createApi({
    reducerPath: "postApi",
    // retry se usa para cuando da error y se hace un re intento al llamado api
    baseQuery: retry(fetchBaseQuery({baseUrl: API}), {
        maxRetries: 2, // cantidad de re intentos

    }),
    //config globales
    refetchOnMountOrArgChange: false, // re valida la info haciendo una peticion en backgoround puede ser boolean o number (segundos)
    refetchOnFocus: false, // re valida la info haciendo focus en la pestaña, solo boolean
    refetchOnReconnect: false, // revalida los datos cuando se cae el internet y vuelve a conectarse, solo boolean
    
    endpoints: (builder) =>({
        getPosts: builder.query({
            query: () => "/posts", 
            // definimos el tiempo que perdura en cache (segundos)
            keepUnusedDataFor: 5,
            // definimo las cantidad de re intentos en la consulta especifica
            extraOptions: {maxRetries: 3}
        }),
        getPostById: builder.query({
            query: (postId) => "/posts/" + postId
        }),
    })
});

//lazy es para ejecutar en base a un evento/accion (ej: click en un boton)
export const {
    useGetPostsQuery,
    useLazyGetPostsQuery,
    useGetPostByIdQuery, 
} = postApi;