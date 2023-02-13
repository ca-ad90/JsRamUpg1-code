<script>
import { useMovieStore } from "../stores/movies";
import { RouterLink } from "vue-router";

export default {
    components: {
        "router-link": RouterLink,
    },
    setup() {
        const movies = useMovieStore();
        return {
            movies,
        };
    },
    data() {},
    computed: {
        nextPage() {
            return Number(this.$route.params.page) + 1 > this.movies.totalPages
                ? this.movies.totalPages
                : Number(this.$route.params.page) + 1;
        },
        prevPage() {
            return Number(this.$route.params.page) - 1 < 1
                ? 1
                : Number(this.$route.params.page) - 1;
        },
        pageList() {
            let min =
                Number(this.$route.params.page) - 2 < 1
                    ? 1
                    : Number(this.$route.params.page) - 2;
            min = min ? min : 1;
            let max =
                min + 4 > Number(this.movies.totalPages)
                    ? Number(this.movies.totalPages)
                    : min + 4;
            min = max - 4;
            let arr = [];
            while (arr.length < 5) {
                arr.push(min);
                min++;
            }
            return arr;
        },
    },
};
</script>
<template>
    <div class="nav">
        <router-link
            class="rLink"
            active-class="disabled"
            :to="`/search/${$route.params.title}/page/${prevPage}`">
            {{ "<<" }}PREV PAGE</router-link
        >

        <template v-for="val in pageList" :key="val">
            <router-link
                v-if="Number(val) > 0"
                active-class="bold"
                :to="`/search/${$route.params.title}/page/` + val"
                ><span class="nav-nr">{{ val }}</span></router-link
            >
        </template>
        <router-link
            class="rLink"
            active-class="disabled"
            :to="`/search/${$route.params.title}/page/${nextPage}`"
            >NEXT PAGE>></router-link
        >
    </div>
</template>
<style scoped lang="scss">
.bold {
    $link-color: #000;
    font-size: 150%;
}
span.nav-nr {
    display: block;
    margin: 0px 10px;
}
</style>
