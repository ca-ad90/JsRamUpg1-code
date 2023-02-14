<!-- eslint-disable vue/return-in-computed-property -->
<script>
import { RouterView } from "vue-router";
import { useMovieStore } from "./stores/movies.js";
import { axiosInstance } from "./axios.js";
import header from "./components/HeaderComponent.vue";
export default {
    setup() {
        const movies = useMovieStore();
        return { movies };
    },

    components: {
        "router-view": RouterView,
        "header-comp": header,
    },
    watch: {
        "movies.list"(oldVal, newVal) {
            console.log(oldVal, newVal);
        },
    },
    data() {
        return {
            hover: false,
            axios: axiosInstance,
            bg: "none",
        };
    },

    computed: {
        val() {
            return this.movies.list;
        },
        stateClass() {
            if (!this.$route.params.title && !this.$route.params.id) {
                return "start";
            }
            if (this.movies.list.length) {
                return "results";
            }
            if (this.movies.isSearching) {
                return "searching";
            }
        },
    },

    methods: {
        setBG(payload) {
            if (!payload) {
                this.bg = "none";
            }

            this.bg = `url(${payload})`;
        },
    },
};
</script>

<template>
    <div id="page-wrapper" :class="stateClass">
        <div class="pagebg" :style="'background-image:' + bg"></div>
        <header>
            <header-comp></header-comp>
        </header>
        <main>
            <router-view @poster="setBG" />
        </main>
    </div>
</template>

<style>
.pagebg {
    position: absolute;
    width: 120%;
    height: 100%;
    filter: blur(10px);
    opacity: 0.5;
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
}
</style>
