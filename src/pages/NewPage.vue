<script>
import gql from "graphql-tag";
import { useMutation } from "@vue/apollo-composable";
export default {
  date() {
    return {
      
      title: "",
      slug: "",
      lang: "",
      section_id:0,
      published:"",
      content:[],

    };
  },
  
  setup() {
    const { mutate: addPage } = useMutation(gql`
      mutation addPage($slug:String!="a" , $lang:String!="a" , $title:String!="a" , $section_id:ID!=1 , $published:String!="a" , $content:JSON!=[]) {
        
          createPage(
            slug: $slug
            lang: $lang
            title: $title
            section_id: $section_id
            published: $published
            content: $content
          ) {
            id
            
          }
        }
      
    `);
    console.log(addPage);
    return {
      addPage,
    };
  },
};
</script>
<template>
  <div class="mt-10 sm:mt-0" style="text-align: left; width: 100%">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Add details
          </h3>
          <p class="mt-1 text-sm text-gray-600">
            Add more detail about the page
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="first-name"
                    class="block text-sm font-medium text-gray-700"
                    >Title</label
                  >
                  <input
                    type="text"
                    name="first-name"
                    id="title"
                    autocomplete="given-name"
                    v-model="title"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="last-name"
                    class="block text-sm font-medium text-gray-700"
                    >Slug</label
                  >
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    v-model="slug"
                    autocomplete="family-name"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="country"
                    class="block text-sm font-medium text-gray-700"
                    >Language</label
                  >
                  <select
                    id="country"
                    name="country"
                    autocomplete="country-name"
                    v-model="lang"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option values="aa">Afar</option>
                    <option values="af">Afrikaans</option>
                    <option values="ak">Akan</option>
                    <option values="sq">Albanian</option>
                    <option values="am">Amharic</option>
                    <option values="ar">Arabic</option>
                    <option values="an">Aragonese</option>
                    <option values="hy">Armenian</option>
                    <option values="as">Assamese</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                @click="addPage({ slug:this.slug , lang:this.lang , title :this.title , section_id:this.section_id , published:this.published , content:this.content }); this.$router.push('/');  "
              >
                Create Page
                <!-- @click="sendMessage({id:3});this.$router.go();" -->
              </button>
            </div>
          </div>
        
      </div>
    </div>
  </div>
  <!-- {{addPage}} -->
  <div class="hidden sm:block" aria-hidden="true">
    <div class="py-5">
      <div class="border-t border-gray-200"></div>
    </div>
  </div>
</template>
