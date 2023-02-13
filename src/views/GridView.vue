<script>
import movieThumb from "../components/movieThumb.vue";
import PageNav from "../components/PageNav.vue";
import { useMovieStore } from "../stores/movies.js";

export default {
    setup() {
        const movies = useMovieStore();
        return { movies };
    },
    components: {
        "movie-thumb": movieThumb,
        "page-nav": PageNav,
    },
    created() {
        this.$watch(
            () => this.$route.params,
            () => {
                console.log(
                    this.movies.searchTitle,
                    this.$route.params.title,
                    this.movies.searchTitle == this.$route.params.title,
                );

                console.log("watch query");
                if (this.movies.searchTitle != this.$route.params.title) {
                    this.movies.resetSearch(this.$route.params.title);
                }
                this.test(
                    this.$route.params.title,
                    Number(this.$route.params.page),
                );
            },
            { immediate: true },
        );
    },
    data() {
        return {
            itemsPerPage: 12,
            list: new Array(this.itemsPerPage)
                .fill(null)
                .map((e, i) => ({ ImdbId: i })),
        };
    },
    watch: {
        "movies.isSearching"(oldVal, newVal) {
            console.log("old", oldVal);
            console.log("new", newVal);
            if (!newVal) {
                this.list = this.movies.currentList;
            }
        },
    },
    computed: {
        isLoading() {
            return this.movies.isSearching;
        },
        currentList() {
            return this.movies.currentList;
        },

        currentList2() {
            let arr = [];
            for (let i = 0; i < this.itemsPerPage; i++) {
                arr[i] = {};
            }
            return arr;
        },
        stateClass() {
            if (!this.$route.params.title) {
                return "start";
            }
            if (this.movies.isSearching) {
                return "searching";
            }
            return false;
        },
    },
    methods: {
        test(t, p) {
            console.log(t, p);
            this.movies.searchTitle = t;
            this.movies.currentPage = Number(p);
            this.movies.startSearch(t, Number(p));
        },
        getPage(n) {
            let p;
            if (typeof n === "number") {
                p = this.movies.goTo(n);
            } else {
                switch (n) {
                    case "next":
                        p = this.next;
                        break;
                    case "prev":
                        p = this.prev;
                        break;
                }
            }
            console.log("p", p);
            this.movies.currentPage = p;
            return (
                "/" + this.movies.searchTitle + "/" + this.movies.currentPage
            );
        },
        getCurrentList() {},
        gridEmit(payload) {
            this.$emit("poster", payload);
        },
    },
};
</script>

<template>
    <div class="gridwrapper">
        <page-nav></page-nav>
        <div :class="'result-wrapper ' + stateClass">
            <template v-for="movie in currentList" :key="movie.id">
                <movie-thumb @poster="gridEmit" :info="movie" />
            </template>
        </div>
        <page-nav></page-nav>
    </div>
</template>

<style scoped>
.nav {
    width: 100%;
    display: flex;
    margin: 25px 0px;
    justify-content: center;
    align-items: center;
    background-color: hsla(0deg, 0%, 100%, 0.8);
    padding: 10px 0px;
}

.rLink {
    margin: 0 20px;
}

.disabled {
    color: grey;
}
</style>
