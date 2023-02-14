<script>
import { useMovieStore } from "../stores/movies.js";
import { RouterLink } from "vue-router";
import viSearch from "./icons/searchIcon.vue";

export default {
    setup() {
        const movies = useMovieStore();
        return { movies };
    },
    components: {
        "router-link": RouterLink,
        "vi-search": viSearch,
    },
    mounted() {},
    data() {
        return {
            title: "",
        };
    },
    computed: {
        searchTitle() {
            return "/" + this.title;
        },
    },
    methods: {
        stateClass() {
            if (!this.$route.params.title) {
                return "start";
            }
            if (this.movies.isSearching) {
                return "searching";
            }
            return false;
        },
        search() {
            this.movies.resetSearch();
        },
        keySearch() {
            this.search();
            this.$router.push(`/search/${this.title}/page/1`);
        },
    },
};
</script>
<style></style>

<template>
    <label class="lblTxt title-search">
        <vi-search></vi-search>
        <input type="text" @keypress.enter="keySearch()" v-model="title" />
    </label>
    <router-link :to="`/search/${title}/page/1`"
        ><button @click="search()">SÖK!!</button></router-link
    >
</template>
