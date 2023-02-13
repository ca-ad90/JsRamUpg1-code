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
                console.log(query);
                axiosInstance
                    .get("", {
                        params: query,
                    })
                    .then((response) => {
                        console.log("\nSearchAction:");
                        let data = response.data;
                        if (data.results) {
                            console.log("res");
                            console.log(data, "\n\n");
                            res(data);
                        } else {
                            console.log("rej");
                            console.log(data, "\n");
                            rej(data);
                        }
                    });
            });
        },
        async resetSearch(title) {
            console.log("\n-----RESET-----\n");
            this.searchTitle = title ? title : null;
            this.currentPage = 1;
            this.isSearching = false;
            this.isError = false;
            this.totalResults = Infinity;
            this.list = [];
        },
        async startSearch(title) {
            console.log("\nStart Search:");
            if (this.list.length >= this.currentPage * this.itemsPerPage) {
                console.log("return currentList\n", this.currentList, "\n\n");
                return this.currentList;
            }
            this.searchTitle =
                title == this.searchTitle ? this.searchTitle : title;
            this.isSearching = true;
            let newCount = Math.min(
                this.currentPage * this.itemsPerPage,
                this.totalResults,
            );
            console.log(newCount);
            let apiPage = Math.ceil(newCount / 20);
            apiPage = apiPage < 1 ? 1 : apiPage;
            let searchLoop = async (arr = [], n = apiPage) => {
                console.log("\n---------------\nStart searchLoop:");
                let max = newCount;
                console.log("\narr:", JSON.parse(JSON.stringify(arr)), "\n");
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
                    console.log("n:", n);
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
                console.log("newData", newData);
                for (let m of newData) {
                    this.list.push(m);
                }
            }

            this.isSearching = false;
            console.log("list2", this.list.length, this.list);
            console.log(this.currentList);
            return this.currentList;
        },
    },
});
