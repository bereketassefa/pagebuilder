
import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { VueApolloComponents } from '@vue/apollo-components'
import { createApolloProvider } from '@vue/apollo-option'
import App from './App.vue'
import router from './routes/index'

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  cache,
  uri: 'http://localhost:3000/',
  // uri: 'https://rickandmortyapi.com/graphql',
})

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)

  },

  render: () => h(App),
})
const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

app.use(router)
app.use(apolloProvider)
app.use(VueApolloComponents).mount('#app');
