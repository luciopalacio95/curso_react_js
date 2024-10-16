import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getPosts } from './posts';

const API = "http://localhost:3005";

export const postApi = createApi({
    reducerPath: "postApi",
    baseQuery: fetchBaseQuery({baseUrl: API}),
    endpoints: (builder) =>({
        getPosts: builder.query({
            query: () => "/posts"
        }),
        getPostById: builder.query({
            query: (postId) => "/posts/" + postId
        })
    })
});

export const {useGetPostsQuery, useGetPostByIdQuery} = postApi;