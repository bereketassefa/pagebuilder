      
<script>
// import gql from 'graphql-tag'
// import { useQuery } from '@vue/apollo-composable'
// import Card from './components/VueCard.vue';
import MainHeader from './components/MainHeader.vue'



// const CHARACTERS_QUERY = gql`
//   query  {
//     allPages{
//       id
//       lang
//       title
//       published
//     }
//   }
      `
// const CHARACTERS_QUERY = gql`
        // query Characters {
        //   characters {
        //     results {
        //       id
        //       name
        //       image
        //     }
        //   }
        // }
//       `

export default {
    name: "App",
    // setup() {
    //     const { result, loading, error } = useQuery(CHARACTERS_QUERY);
    //     console.log(result);
    //     return {
    //         result,
    //         loading,
    //         error
    //     };
    // },
    components: { 
      // Card  , 
    MainHeader
    }
}

</script>
<template>

  <MainHeader/>


  <!-- <p v-if="error">Something went wrong...</p>
  <p v-if="loading">Loading...</p> -->
  <!-- <p v-else v-for="character in result.characters.results" :key="character.id">
    {{ character.name }}
  </p> -->
  <div class="flex w-full justify-center">
    <div class="  my-6" style="width:87% ;height:20px;">
      <router-view />
    </div>
  </div>
  
  
  

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style> 