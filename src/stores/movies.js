import { axiosInstance } from '../axios.js';
import { defineStore } from 'pinia'

export const useMovieStore = defineStore('movies', {
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

    page(state) { return state.currentPage - 1 },
    count(state) { return state.list.length },
    currentList(state) {
      return state.list.length > 0 ? state.list.map(e => ({ ...e })).slice(((state.currentPage - 1) * state.itemsPerPage), state.currentPage * state.itemsPerPage) : []
    },

    totalPages(state) { return Math.ceil(state.totalResults / state.itemsPerPage) },
    nextPage(state) { return state.currentPage + 1 > state.totalPages ? state.currentPage : state.currentPage + 1 },
    prevPage(state) { return state.currentPage - 1 < 1 ? 1 : state.currentPage - 1 },
  },
  actions: {
    search(query) {
      return new Promise((res, rej) => {
        console.log(query)
        axiosInstance.get("", {
          params: query
        }).then(response => {
          let data = response.data
          console.log('data.Search', data.results);
          if (data.results) {
            res(data)
          } else {
            rej(data)
          }
        })
      })
    },
    async resetSearch(title) {
      console.log("-----RESET-----")
      this.searchTitle = title ? title : null,
        this.currentPage = 1,
        this.isSearching = false,
        this.isError = false
      this.totalResults = Infinity
      this.list = []
    },
    async startSearch(title) {
      if (this.list.length >= this.currentPage * this.itemsPerPage) {
        return this.currentList
      }
      this.searchTitle = title == this.searchTitle ? this.searchTitle : title
      this.isSearching = true
      let newCount = Math.min(this.currentPage * this.itemsPerPage, this.totalResults)
      let apiPage = Math.floor(newCount / 20)
      apiPage = apiPage < 1 ? 1 : apiPage
      console.log('apiPage', apiPage);
      let searchLoop = async (arr = [], n = apiPage) => {
        let max = newCount
        console.log("max:", max)
        console.log("arrLength", arr.length)
        console.log("arr", arr)
        console.log("list", this.list.length, this.list)
        if (arr.length + this.list.length >= max) {
          return arr
        } else {
          console.log("n:", n)
          let data = await this.search({ query: this.searchTitle, page: n })
          if (!Object.prototype.hasOwnProperty.call(data, "results")) {
            console.log('BAJS', arr);
            throw (new Error)
          }
          this.totalResults = data.total_results
          newCount = Math.min(this.currentPage * this.itemsPerPage, this.totalResults)
          let narr = data.results
          narr = [].concat.apply([], [arr, narr])
          n++
          return searchLoop(narr, n)
        }
      }
      if (this.list.length < newCount) {
        let newData = await searchLoop()
        for (let m of newData) {
          this.list.push(m)
        }
      }

      this.isSearching = false
      console.log("list2", this.list.length)
      return this.currentList



    }

  },
})
