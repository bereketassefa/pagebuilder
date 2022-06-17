<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-md w-full">
    <ul role="list" class="divide-y divide-gray-200">
      <li v-for="page in result.allPages" :key="page.id">
        <!-- <router-link :to="{ name: 'preview', params: { id: page.id } }"> -->
          <div class="px-4 py-4 flex items-center sm:px-6">
            <div
              class="min-w-0 flex-1 sm:flex sm:items  -center sm:justify-between"
            >
              <div class="truncate">
                <div class="flex text-sm">
                  <p class="font-medium text-indigo-600 truncate">
                    {{ page.title }}
                  </p>
                  <!-- <p class="ml-1 flex-shrink-0 font-normal text-gray-500">in {{ page.ln }}</p> -->
                </div>
                <div class="mt-2 flex">
                  <div class="flex items-center text-sm text-gray-500">
                    <!-- <CalendarIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" /> -->
                    <p>
                      {{ page.published }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-4 flex flex-shrink-0 flex-row sm:mt-0 sm:ml-5">
                <div class="flex overflow-hidden">
                  <router-link
                    :to="{ name: 'preview', params: { id: page.id } }"
                    class="editors b"
                    style="background-color: #ece9fc;"
                    >View</router-link
                  >
                </div>
                <div class="flex overflow-hidden">
                  <router-link
                    :to="{ name: 'EditPage', params: { id: page.id } }"
                    class="editors b"
                    >Edit</router-link
                  >
                </div>
                <div class="flex overflow-hidden">
                  <button class="editors " @click="sendMessage({ id: page.id });this.$router.go();">Delete</button>
                  <!-- <router-link to="/edit" class="editors b">Delete</router-link> -->
                </div>
              </div>
            </div>
            <div class="ml-5 flex-shrink-0">
              <!-- <ChevronRightIcon class="h-5 w-5 text-gray-400" aria-hidden="true" /> -->
            </div>
          </div>
        <!-- </router-link> -->
      </li>
    </ul>
  </div>
  
  <!-- </div>
</div> -->
</template>

<script>
// import { CalendarIcon, ChevronRightIcon } from '@heroicons/vue/solid'

import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useMutation } from "@vue/apollo-composable";
export default {

  setup() {
    const { result } = useQuery(gql`
      query {
        allPages {
          id
          lang
          title
          published
        }
    }
    `);
   const { mutate: sendMessage } = useMutation(gql`
      mutation sendMessage ($id: ID! = 2) {

          removePage(id: $id) {
            id
            title
          }
        
      }
    `);

    return {
      result , sendMessage,
    };
    // return {
    //   result,
    // };
  },
};
</script>

<style>
.editors {
  background-color: #fef5f6;
  color: #fd8e9a;
  padding: 5px 20px;
  margin-left: 10px;
  border-radius: 40px;
  height:38px;
}
.b {
  background-color: #e9fbfc;
  color: #5f8eda;
}
</style>
