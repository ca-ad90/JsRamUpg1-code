import { axios } from "@bundled-es-modules/axios";
const axiosInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3/search/movie/",
    params: {
        api_key: "2306d7f124e2d415bf01a04437d847d8",
        type: "movie",
        include_adult: false,
        language: "en-US",
    },
});
const axiosMovieInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3/movie/",
    params: {
        api_key: "2306d7f124e2d415bf01a04437d847d8",
        language: "en-US",
    },
});
export { axiosInstance, axiosMovieInstance };
