<template>
    <div class="container">
        
        <div class="search">
            <div class="search__form-wrap">

                <div class="search__form form">
                    <span class="iconify form__icon" data-icon="uil:search"></span>
                    <input v-model="query_opponents" class="form__input" type="text" placeholder="Поиск по оппонентам...">

                    <div class="form__live">
                        <div class="form__live-wrap">
                            <input class="form__live-check" type="checkbox" name="live-toggle" id="live-toggle" tabindex="0" @click="toggleCheck" v-model="live">
                            <label class="form__live-button" for="live-toggle" tabindex="0"></label>                            
                        </div>

                    </div>
                    <!-- /.form__live -->

                </div>
                <!-- /.search__form -->

                <div class="search__reload reload">
                    <button type="button" class="reload__button" @click="fillMatches" >    
                    <span class="iconify reload__icon" data-icon="ci:refresh-02"></span>
                    </button>    
                </div>
                <!-- /.search__reload -->

            </div>
            <!-- /.search__wrap -->

            <div class="search__matches matches">
                <div v-if="matches.length === 0" class="notification">
                    <Loading/>
                </div>

                <div v-else-if="filteredMatches.length === 0" class="notification">
                    <NotFound/>
                </div>

                <ul v-else class="matches__list">  

                    <li class="matches__item matches__item--title">
                        <span v-if="this.live" class="matches__timing">Время</span>
                        <span v-else class="matches__timing disable">Начало</span>

                        <div class="matches__options">

                            <span v-if="live" class="matches__stream">Трансляция</span>

                            <div class="matches__coeff">
                                <span class="matches__coeff-value">П1</span>
                                <span class="matches__coeff-value--x">Х</span>
                                <span class="matches__coeff-value">П2</span>
                            </div>
                        </div>
                    </li>

                    <Match v-for="match in filteredMatches" :key="match.constSportEventId" :match="match" :live="live"/>
                </ul>   

            </div>
            <!-- /.search__matches -->
        </div>

    </div>
    <!-- /.container -->
</template>

<script>
    import Match from "./components/Match";
    import Loading from "./components/Loading";
    import NotFound from "./components/NotFound";

    import { getMatches } from "./libs/betting-request";

    export default {
        name: 'App',
        data(){
            return {
                matches: [],
                query_opponents: '',
                live: '',
            }
        },
        components: { Match, Loading, NotFound },
        computed: {
            filteredMatches() {
                if(this.query_opponents.length) {
                    let filtered_matches = this.matches

                    return filtered_matches.filter(elem => {
                        const firstTeam = elem.opponent1NameLocalization.toLowerCase().includes(this.query_opponents.toLowerCase())
                        const secondTeam = elem.opponent2NameLocalization.toLowerCase().includes(this.query_opponents.toLowerCase())

                        return firstTeam || secondTeam
                    })
                }

                return this.matches
            },
        },
        methods: {
            fillMatches() {
                this.matches = []
                getMatches(this.live).then((matches) => {this.matches = matches})
            },
        
            toggleCheck() {            
                this.live ? (this.live = '') : (this.live = 'live');
                this.fillMatches();
            }            
        },

        created(){
            getMatches(this.live).then(matches => this.matches = matches)
        }

    }
</script>