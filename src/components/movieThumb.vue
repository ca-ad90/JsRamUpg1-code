<script>
import { RouterLink } from "vue-router";
export default {
    components: {
        "router-link": RouterLink,
    },
    props: {
        info: {
            type: Object,
            required: true,
        },
    },
    mounted() {},
    data() {
        return {
            hasDetails: false,
            poster: this.info.Poster,
            details: null,
        };
    },
    computed: {
        HasDetails() {
            this.setDetails();

            return this.details;
        },
    },
    emits: ["poster"],
    methods: {
        posterEmit(str) {
            this.$emit("poster", str);
        },
    },
};
</script>

<template>
    <router-link
        :to="`/info/${info.id}`"
        :class="{ 'movie-thumb': true, 'no-poster': !info.poster_path }"
        :style="''">
        <div
            v-if="info"
            :class="{ 'movie-thumb-old': true, 'no-poster': !info.poster_path }"
            :style="
                'background-image:url(https://image.tmdb.org/t/p/w500' +
                info.poster_path +
                ');background-color:hsla(0,0%,100%,0.8);'
            "
            @mouseover="
                posterEmit('https://image.tmdb.org/t/p/w500' + info.poster_path)
            "
            @mouseleave="posterEmit(null)">
            <p>{{ info.title }}</p>
        </div>
        <div
            v-else
            class="movie-thumb loading"
            :style="'border:1px solid black; padding:25px;'"></div>
    </router-link>
</template>

<style lang="scss">
.movie-thumb {
    border: 1px solid hsla(0deg, 0%, 100%, 0.2);
    border-radius: 10px;
    width: 23%;
    height: 25vmax;
    background-position: 50% 10%;
    background-size: cover;
    overflow: hidden;
    box-shadow: 4px 4px 6px 0px hsl(0deg 0% 0% / 50%);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: 0.2s;
    margin: 1vmin 1vmin;
    top: 0px;

    & div {
        position: relative;
        width: 100%;
        height: 100%;
        background-position: 50% 10%;
        background-size: cover;
        overflow: hidden;
    }
    &.no-poster {
        background-color: hsla(0deg, 0%, 100%, 0.5);
    }
    &:hover {
        width: 26%;
        height: 28vmax;
        top: 1.5vmin;
        margin: -2vmin 0px;
    }

    &:hover p,
    & p:hover,
    &.no-poster p {
        opacity: 0.8;
    }

    & p {
        opacity: 0;
        transition: 0.2s;
        width: 100%;
        background-color: hsla(0deg, 0%, 100%, 0.8);
        color: black;
        align-items: center;
        padding: 10px 30px;
        margin-top: 42%;
        font-family: "josefin slab";
        font-weight: 800;
        font-size: 25px;
        justify-content: center;
        text-align: center;
    }
}

.loading {
    animation-name: loading;
    animation-duration: 0.5s;
    animation-fill-mode: both;
    animation-direction: alternate;
    animation-iteration-count: infinite;
}

@keyframes loading {
    from {
        background-color: black;
    }

    to {
        background-color: white;
    }
}
</style>
