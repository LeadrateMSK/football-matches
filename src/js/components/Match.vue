<template>

    <li class="matches__item">

        <span v-if="match.timeSec" class="matches__time">{{ match.timeSec | moment("mm : ss") }}</span>
        <span v-else-if="match.startDate" class="matches__time disable">{{ match.startDate | moment("D MMM hh : mm") }}</span>
        <span v-else class="matches__time disable">{{ "00 : 00" }}</span>

        <div class="matches__teams">

            <div class="matches__team matches__team--left">
                <span class="matches__name">{{ match.opponent1NameLocalization }}</span>
                <img class="matches__img" :src="getLogo(match.imageOpponent1)" alt="">
            </div>

            <span v-if="match.fullScore" class="matches__score">{{ match.fullScore.sc1}}&nbsp;:&nbsp;{{ match.fullScore.sc2}}</span>
            <span v-else class="matches__score">{{ "– : –" }}</span>

            <div class="matches__team matches__team--right">
                <img class="matches__img" :src="getLogo(match.imageOpponent2)" alt="">
                <span class="matches__name">{{ match.opponent2NameLocalization }}</span>
            </div>

        </div>
        <!-- /.matches__teams -->

        <div class="matches__options">

            <div v-if="live" class="matches__stream">

                <a target="_blank" :href="match.link" class="matches__in-stream" v-if="match.hasVideo">
                    <span class="iconify" data-icon="ant-design:play-circle-filled" style="font-size: 16px;"></span>
                    Трансляция
                </a>

                <span class="matches__not-stream disable" v-else>
                    без трансляции
                </span>

            </div>
            <!-- /.stream -->

            <div class="matches__coeff matches__coeff--result">
                <span class="matches__coeff-value" :class="{'matches__coeff--disable': this.firstCoeff.isBlocked}">{{ this.firstCoeff.oddsMarket ? this.firstCoeff.oddsMarket : " - "}}</span>
                <span class="matches__coeff-value matches__coeff-value--x" :class="{'matches__coeff--disable': this.drawCoeff.isBlocked}">{{ this.drawCoeff.oddsMarket }}</span>
                <span class="matches__coeff-value" :class="{'matches__coeff--disable': this.lastCoeff.isBlocked}">{{ this.lastCoeff.oddsMarket }}</span>
            </div>

        </div>
        <!-- /.matches__options -->

    </li>

</template>

<script>

    export default {
        name: 'Match',
        props: ['match', 'live'],
        data() {
            return {
                firstCoeff: this.match.oddsLocalization[0],
                drawCoeff: this.match.oddsLocalization[1],
                lastCoeff: this.match.oddsLocalization[2],
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
            },
        },
    }

</script>

