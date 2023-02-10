<script>
import { axiosMovieInstance } from "../axios.js";
export default {
    created() {
        this.setDetails();
    },
    data() {
        return {
            details: {},
            hasDetails: false,
        };
    },
    methods: {
        async getDetails() {
            console.log("getDetail");
            return new Promise((res) => {
                axiosMovieInstance
                    .get("/" + this.$route.params.id)
                    .then((response) => {
                        console.log("response", response);
                        res(response);
                    });
            });
        },
        async setDetails() {
            this.details = await this.getDetails(this.$route.params.id);
            this.$emit(
                "poster",
                "https://image.tmdb.org/t/p/w500" +
                    this.details.data.poster_path,
            );
            this.hasDetails = true;
        },
    },
};
</script>

<template>
    <div class="primary">Detta är ny Primary färg i bootstrap</div>

    <div v-if="hasDetails" class="about container-lg">
        <section>
            <div class="span-all">
                <h1>{{ details.data.title }}</h1>
            </div>
            <div class="span-3">
                <img
                    :src="
                        'https://image.tmdb.org/t/p/w500' +
                        this.details.data.poster_path
                    "
                    alt=""
                    style="width: 100%" />
            </div>
        </section>

        <p>{{ details.data.title }}</p>
        <p>{{ details.data.tagline }}</p>
        <div class="grid">
            <template v-for="(val, key) in details.data" :key="key + val">
                <p class="key">{{ key }}</p>
                <p>{{ val }}</p>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
//@import "../node_modules/bootstrap/scss/bootstrap";
$primary: red;

.primary {
    background-color: $primary;
}

.about {
    min-height: 100vh;
    max-width: 80%;
    padding-left: 50px;
    display: flex;
    flex-flow: column;
    background-color: hsla(0deg, 0%, 100%, 0.5);
}

.grid {
    display: grid;
    grid-template-columns: auto auto;
}

.key {
    font-weight: bold;
    font-size: 120%;
}
</style>
