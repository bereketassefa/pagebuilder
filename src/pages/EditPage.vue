<template>
  <div
    class="flex flex-row justify-between"
    style="height: calc(100vh - 120px)"
  >
    <div class="w-64 bg-slate-400 text-left">
      <label for="chat">Add Text</label>
      <div
        class="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700"
      >
        <textarea
          id="chat"
          rows="1"
          class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Add Text"
          v-model="this.text"
          style="height: 70px"
        ></textarea>
        <button
          type="submit"
          class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
        >
          <svg
            class="w-6 h-6 rotate-90"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            @click="addText(this.text)"
          >
            <path
              d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
            ></path>
          </svg>
        </button>
      </div>

      <label for="chat" class="w-full">Add Image Link</label>
      <div
        class="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700"
      >
        <textarea
          id="chat"
          rows="1"
          class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Add Image"
          v-model="this.image"
          style="height: 70px"
        ></textarea>
        <button
          type="submit"
          class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
          @click="addImage(this.image)"
        >
          <svg
            class="w-6 h-6 rotate-90"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
            ></path>
          </svg>
        </button>
      </div>
      <div
        id="modal"
        class="flex flex-col items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700"
        style="display: none"
      >
        <label for="chat">Edit Text</label>
        <textarea
          id="chat"
          rows="1"
          class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Add Text"
          v-model="this.newtext"
          style="height: 170px; margin-right: 15px"
        ></textarea>
        <button
          type="submit"
          class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
          @click="
            updateText({ id: this.newtextid, text: this.newtext });
            this.toggleModel(false);
          "
        >
          update
        </button>
      </div>
      <div></div>
    </div>
    <div class="editor" style="width: calc(100% - 256px)">
      <div class="inner">
        click text components to edit
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
              <div
                v-for="(each, index) in result.allTextBlocks"
                :key="index"
                style="position: relative; margin: 10px 0;"
              >
                <!-- {{each.id == a.text_block_id}} -->
                <p
                  v-show="each.id == a.text_block_id"
                  onmouseover="this.style.background='#efefef'; "
                  onmouseout="this.style.background='white'; this.show = true"
                  @click="this.logResult(each.id, each.text)"
                  
                >
                  {{ each.text }}
                </p>
                
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
    </div>
  </div>
</template>
<script>
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useMutation } from "@vue/apollo-composable";

export default {
  props: ["id"],
  components: {},
  data() {
    return {
      delresult: "",
      text: "",
      textid: 0,
      image: "",
      imageid: 0,
      newtext: "",
      newtextid: 0,
      show: false,
    };
  },
  methods: {
    logResult(b, c) {
      this.newtext = "";
      this.toggleModel(true);
      this.newtext = c;
      this.newtextid = b;
      console.log(b);
      // console.log(document.getElementById("modal").style.display.block)
    },
    toggleModel(val) {
      if (val) {
        document.getElementById("modal").style.display = "block";
      } else {
        document.getElementById("modal").style.display = "none";
      }
    },
    addText() {
      this.addTextBlock({ text: this.text }).then(
        (data) => (this.textid = data.data.createTextBlock.id)
      );
      this.text = "";
      this.updateTextPageContent();
    },
    addImage() {
      this.addImageBlock({ url: this.image }).then(
        (data) => (this.imageid = data.data.createImageBlock.id)
      );
      this.image = "";
      this.updateImagePageContent();
    },
    updateTextPageContent() {
      this.smartWay({ id: this.$route.params.id }).then((data) => {
        data.data.updatePage.content.push({ text_block_id: this.textid });
        // this.delresult = JSON.stringify(data.data.updatePage.content.push({text_block_id : this.textid}));
        // console.log(JSON.stringify(data.data.updatePage.content))

        this.smartWay({
          id: this.$route.params.id,
          content: data.data.updatePage.content,
        });
      });
    },
    updateImagePageContent() {
      this.smartWay({ id: this.$route.params.id }).then((data) => {
        data.data.updatePage.content.push({ image_block_id: this.imageid });
        this.smartWay({
          id: this.$route.params.id,
          content: data.data.updatePage.content,
        });
      });
    },
  },
  watch: {
    $route: function () {
      this.$router.go();
    },
  },
  setup() {
    const { mutate: smartWay } = useMutation(gql`
      mutation smartWay($id: ID!, $content: JSON) {
        updatePage(id: $id, content: $content) {
          id
          content
        }
      }
    `);
    const { mutate: updateText } = useMutation(gql`
      mutation updateText($id: ID!, $text: String) {
        updateTextBlock(id: $id, text: $text) {
          id
          text
        }
      }
    `);
    const { mutate: addTextBlock } = useMutation(gql`
      mutation addTextBlock($text: String!) {
        createTextBlock(text: $text) {
          id
          text
        }
      }
    `);
    const { mutate: addImageBlock } = useMutation(gql`
      mutation addImageBlock($url: String!) {
        createImageBlock(url: $url) {
          id
          url
        }
      }
    `);
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
      addTextBlock,
      addImageBlock,
      smartWay,
      updateText,
    };
  },
};
</script>
<style>
label {
  padding-left: 20px;
}
</style>
