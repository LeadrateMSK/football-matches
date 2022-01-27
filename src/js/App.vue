<template>
    <div class="container">
        
        <div class="search">
            <div class="search__form-wrap">

                <div class="search__form form">
                    <span class="iconify form__icon" data-icon="uil:search"></span>
                    <input v-model="query_opponents" class="form__input" type="text" placeholder="Поиск по оппонентам...">
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

            <div v-if="filteredMatches.length" class="search__count count">
                <p class="count__number">Всего матчей: {{ countFilteredMatches }}</p>
            </div>
            <!-- /.search__count -->
                

            <div class="search__matches matches">
                <div v-if="matches.length === 0" class="notification">
                    <Loading/>
                </div>

                <div v-else-if="filteredMatches.length === 0" class="notification">
                    <NotFound/>
                </div>

                <ul class="matches__list" v-else>            
                    <Match v-for="match in filteredMatches" :key="match.constSportEventId" :match="match"/>
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
                query_opponents: "",
                matches: [],
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

            countFilteredMatches(){
                return this.filteredMatches.length
            }
        },

        methods: {
            fillMatches() {
                this.matches = []
                getMatches().then(matches => this.matches = matches)
            }
            
        },

        created(){
            getMatches().then(matches => this.matches = matches)
        }

    }
</script>