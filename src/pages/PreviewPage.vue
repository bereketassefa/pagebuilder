<script>
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
export default {
  data() {
    return {
      a: 1,
    };
  },
  watch: {
    $route: function () {
      this.$router.go();
    },
  },
  setup() {
    const { result } = useQuery(gql`
      query {
        allPages {
          id
          slug
          lang
          title
          published
          content
        }
        
        allTextBlocks {
          id
          text
        }
        allImageBlocks {
          id
          url
          caption
        }
      }
    `);

    return {
      result,
    };
  },
};
</script>
<template>
  <div class="inner">
    <p class="text-2xl dark:text-white text-left mb-5">
      <span>Title:</span>{{ result.allPages[this.$route.params.id - 1].title }}
      <span
        class="bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-1 mb-1 rounded dark:bg-purple-200 dark:text-purple-900"
        >{{ result.allPages[this.$route.params.id - 1].lang }}</span
      >
    </p>
    <div
      class="text-left p-3"
      style="height: auto; width: 100%; background: white"
    >
      <div
        v-for="(a, index) in Object.values(
          result.allPages[this.$route.params.id - 1].content
        )"
        :key="index"
      >
        <div v-show="a.text_block_id">
          <div v-for="(each, index) in result.allTextBlocks" :key="index">
            <!-- {{each.id == a.text_block_id}} -->
            <p v-show="each.id == a.text_block_id">{{ each.text }}</p>
          </div>
        </div>
        <div v-show="a.image_block_id">
          <div v-for="(each, index) in result.allImageBlocks" :key="index">
            <img :src="each.url" v-show="each.id == a.image_block_id" />
            <h2 v-show="each.id == a.image_block_id" class="mb-4">
              caption:{{ each.caption }}
            </h2>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
