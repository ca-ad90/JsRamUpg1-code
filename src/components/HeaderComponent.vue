<script lang="js">
import { useMovieStore } from "../stores/movies.js"
import searchbar from "./SearchBar.vue"

export default {
    setup() {
        const movies = useMovieStore()
        return { movies }
    },

    components: {
        "search-bar": searchbar
    },
    data() {
        return ({
        })
    },
    computed: {
        stateClass() {
            if (!this.$route.params.title && !this.$route.params.id) {
                return "start"
            }
            if (this.movies.isSearching) {
                return "searching"
            }
            return false
        }
    },
}
</script>
<template>
    <div :class="'header-wrapper ' + stateClass">
        <div class="headerText">
            <h1>SÖK EN FILM</h1>
        </div>
        <search-bar></search-bar>
    </div>
    <div class="filter-container"></div>
</template>

<style lang="scss">
h1 {
    font-family: "josefin slab";
    font-weight: 900;
}

.header-wrapper {
    top: 0;
    width: 100vw;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;

    &:not(.start) {
        & label {
            height: 100%;
        }
    }
}
</style>
