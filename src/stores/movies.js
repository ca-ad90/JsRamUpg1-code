import { axiosInstance } from "../axios.js";
import { defineStore } from "pinia";

export const useMovieStore = defineStore("movies", {
    strict: true,
    state: () => ({
        path: [],
        isSearching: false,
        isError: false,
        searchTitle: "bajs",
        itemsPerPage: 12,
        currentPage: 1,
        totalResults: Infinity,
        list: ["org values"],
    }),

    getters: {
        page(state) {
            return state.currentPage - 1;
        },
        count(state) {
            return state.list.length;
        },
        currentList(state) {
            let mList = state.list
                .map((e) => ({ ...e }))
                .slice(
                    (state.currentPage - 1) * state.itemsPerPage,
                    state.currentPage * state.itemsPerPage,
                );
            return state.list.length > 0 ? mList : [];
        },

        totalPages(state) {
            return Math.ceil(state.totalResults / state.itemsPerPage);
        },
        nextPage(state) {
            return state.currentPage + 1 > state.totalPages
                ? state.currentPage
                : state.currentPage + 1;
        },
        prevPage(state) {
            return state.currentPage - 1 < 1 ? 1 : state.currentPage - 1;
        },
    },
    actions: {
        search(query) {
            return new Promise((res, rej) => {
                axiosInstance
                    .get("", {
                        params: query,
                    })
                    .then((response) => {
                        let data = response.data;
                        if (data.results) {
                            res(data);
                        } else {
                            rej(data);
                        }
                    });
            });
        },
        async resetSearch(title) {
            this.searchTitle = title ? title : null;
            this.currentPage = 1;
            this.isSearching = false;
            this.isError = false;
            this.totalResults = Infinity;
            this.list = [];
        },
        async startSearch(title) {
            if (this.list.length >= this.currentPage * this.itemsPerPage) {
                return this.currentList;
            }
            this.searchTitle =
                title == this.searchTitle ? this.searchTitle : title;
            this.isSearching = true;
            let newCount = Math.min(
                this.currentPage * this.itemsPerPage,
                this.totalResults,
            );

            let apiPage = Math.ceil(newCount / 20);
            apiPage = apiPage < 1 ? 1 : apiPage;
            let searchLoop = async (arr = [], n = apiPage) => {
                let max = newCount;

                console.log(
                    "list",
                    JSON.parse(JSON.stringify(this.list)),
                    "\n",
                );
                if (arr.length + this.list.length >= max) {
                    console.log(
                        "\nReturn arr",
                        JSON.parse(JSON.stringify(arr.map((e) => e.id))),
                    );
                    return arr;
                } else {
                    let data = await this.search({
                        query: this.searchTitle,
                        page: n,
                    });
                    if (
                        !Object.prototype.hasOwnProperty.call(data, "results")
                    ) {
                        console.log(
                            "\n-----------------\n-----------------\n-----------------\n-----------------BAJS",
                            arr,
                        );
                        throw new Error();
                    }
                    this.totalResults = data.total_results;
                    newCount = Math.min(
                        this.currentPage * this.itemsPerPage,
                        this.totalResults,
                    );
                    let narr = data.results;
                    narr = [].concat.apply([], [arr, narr]);
                    n++;
                    return searchLoop(narr, n);
                }
            };
            if (this.list.length < newCount) {
                let newData = await searchLoop();

                for (let m of newData) {
                    this.list.push(m);
                }
            }

            this.isSearching = false;

            return this.currentList;
        },
    },
});
