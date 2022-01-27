<template>

    <li class="matches__item">

        <span class="matches__time">{{ match.timeSec | moment("utc", "mm : ss") }}</span>

        <div class="matches__teams">

            <div class="matches__team matches__team--left">
                <span class="matches__name">{{ match.opponent1NameLocalization }}</span>
                <img class="matches__img" :src="getLogo(match.imageOpponent1)" alt="">
            </div>

            <span class="matches__score">{{ match.fullScore.sc1}}&nbsp;:&nbsp;{{ match.fullScore.sc2}}</span>

            <div class="matches__team matches__team--right">
                <img class="matches__img" :src="getLogo(match.imageOpponent2)" alt="">
                <span class="matches__name">{{ match.opponent2NameLocalization }}</span>
            </div>

        </div>
        <!-- /.matches__teams -->

        <div class="matches__stream">

            <a target="_blank" :href="match.link" class="matches__in-stream" v-if="match.hasVideo">
                <span class="iconify" data-icon="ant-design:play-circle-filled" style="font-size: 16px;"></span>
                Трансляция
            </a>

            <span class="matches__not-stream" v-else>
                без трансляции
            </span>


        </div>
        <!-- /.stream -->
    </li>

</template>


<script>

    export default {
        name: 'Match',
        props: ['match'],
        data() {
            return {
            }
        },
        computed: {
            getConvertTime() {
                return Math.floor(this.match.timeSec / 60).toString().padStart(2, "0") + ' : ' + (this.match.timeSec % 60).toString().padStart(2, "0")
            },
        },
        methods: {
            getLogo(opponent) {
                return 'https://nimblecd.com/sfiles/logo_teams/' + opponent;
            }
        },

    }

</script>

