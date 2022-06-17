<script>
    export default{
        data(){
          return{
            values:this.$route.path,
            show: (this.values === '/')
          }
        },
          created() {
            // console.log(this.$router.currentRoute.path);
            // console.log(this.values) // path is /post
          },
          computed:{
            showme(){
              let a =  (this.values === '/')
              // console.log(this.values , a)
              return a
            }
          },
            watch: {
            '$route': function() {
              this.values = this.$route.path
            }
          }
    }
</script>
<template>
<nav  class="bg-white border-gray-200 px-2 py-2 sm:px-4 py-2.5 rounded dark:bg-gray-800 " style="height:65px">
    <div class="container flex  flex-wrap justify-between items-center mx-auto   " style="height:100%; width:89%">
      <router-link to="/">
        
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">PageBuilder</span>
      </router-link>
      
      <div v-show="showme" class="  md:w-auto h-full  flex justify-center align-center py-2" id="mobile-menu" >
            <router-link to="/newpage" class="block  pr-4 pl-3 rounded-md bg-blue-500 text-white py-1">New Page </router-link>
      </div>
    </div>
  </nav>
</template>
