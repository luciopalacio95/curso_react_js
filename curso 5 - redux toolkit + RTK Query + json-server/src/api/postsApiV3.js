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
    
    //creamos tag
    tagTypes: ["Posts"],

    endpoints: (builder) =>({
        getPosts: builder.query({
            query: () => "/posts", 
            // definimos el tiempo que perdura en cache (segundos)
            keepUnusedDataFor: 5,
            // definimo las cantidad de re intentos en la consulta especifica
            extraOptions: {maxRetries: 3},
            //pasamos el tag
            providesTags: ["Posts"]
        }),
        getPostById: builder.query({
            query: (postId) => "/posts/" + postId
        }),
        addNewPost: builder.mutation({
            query: (newPost) => ({
                url: "/posts",
                method: "POST",
                body: newPost
            }),
            //invalidamos las tags y eso hace que busque actualizar el valor de la tag, que es la que se obtuvo en getPosts y la refresca
            invalidatesTags: ["Posts"],
            extraOptions: {maxRetries: 0},
        })
    })
});

//lazy es para ejecutar en base a un evento/accion (ej: click en un boton)
export const {
    useGetPostsQuery,
    useLazyGetPostsQuery,
    useGetPostByIdQuery, 
    useAddNewPostMutation
} = postApi;