<template>
  <div>
    <b-card
      class="h-75"
    >
      <Loader v-if="loading" />
      <div v-else>
        <div class="d-flex align-items-center">
          <b-card-title class="mr-3 mb-0">
            Trading
          </b-card-title>
          <b-dropdown
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            menu-class="pairings-dropdown"
            :text="currentPair || 'Select Pair'"
            variant="outline-primary"
          >
            <b-dropdown-item
              v-for="pair in pairings"
              :key="pair"
            >
              {{ pair }}
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <trading-vue
          title-txt="AUD_USD"
          :color-back="colors.colorBack"
          :color-grid="colors.colorGrid"
          :color-text="colors.colorText"
          :data="chart"
          :height="height"
          :width="width"
        />
      </div>
    </b-card>
  </div>
</template>

<script>
import TradingVue from 'trading-vue-js'
import {
  BCard, BDropdown, BDropdownItem, BCardTitle,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
// import axios from '@/libs/axios'
import useAppConfig from '@core/app-config/useAppConfig'
import Loader from '@core/components/loader/Loader.vue'
import trading from '@/@fake-db/data/trading/trading.json'
import {
  reactive, ref, computed, onMounted, watch,
} from '@vue/composition-api'

export default {
  name: 'Trading',
  components: {
    BCard,
    TradingVue,
    Loader,
    BDropdownItem,
    BDropdown,
    BCardTitle,
  },
  directives: { Ripple },
  setup() {
    const { skin } = useAppConfig()
    const isDark = computed(() => skin.value === 'dark')
    const currentPair = ref('')
    const pairings = ref([
      'AUD_USD', 'EUR_GBP', 'EUR_JPY', 'EUR_USD', 'GBP_USD', 'USD_CAD', 'USD_CHF', 'USD_CNH', 'USD_JPY',
    ])
    const chart = trading

    /*
    const chart = reactive({
      ohlcv: [],
      onchart: [
        {
          name: 'EMA, 25',
          type: 'EMA',
          data: [],
          settings: {},
        },
        {
          name: 'EMA, 43',
          type: 'EMA',
          data: [],
          settings: {},
        },
        {
          name: 'Trades',
          type: 'Trades',
          data: [],
          settings: {
            'z-index': 5,
            legend: false,
          },
        },
      ],
      offchart: [
        {
          name: 'RSI, 20',
          type: 'RSI',
          data: [],
          settings: {
            upper: 70,
            lower: 30,
            backColor: '#9b9ba316',
            bandColor: '#666',
          },
        },
      ],
      tools: [
        {
          type: 'Cursor',
          icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZAgMAAAC5h23wAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAxQTFRFAAAATU1NTU1NTU1NwlMHHwAAAAR0Uk5TAOvhxbpPrUkAAAAkSURBVHicY2BgYHBggAByabxg1WoGBq2pRCk9AKUbcND43AEAufYHlSuusE4AAAAASUVORK5CYII=',
        },
        {
          type: 'LineToolSegment',
          icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZAgMAAAC5h23wAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAlQTFRFAAAATU1NJCQkCxcHIQAAAAN0Uk5TAP8SmutI5AAAACxJREFUeJxjYMACGAMgNAsLdpoVKi8AVe8A1QblQlWRKt0AoULw2w1zGxoAABdiAviQhF/mAAAAAElFTkSuQmCC',
        },
        {
          type: 'LineToolExtended',
          icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZAQMAAAD+JxcgAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAZQTFRFAAAATU1NkJ+rOQAAAAJ0Uk5TAP9bkSK1AAAANElEQVR4nGNggABGEMEEIlhABAeI+AASF0AlHmAqA4kzKAAx8wGQuAMKwd6AoYzBAWonAwAcLwTgNfJ3RQAAAABJRU5ErkJggg==',
        },
      ],
      tool: 'Cursor',
    })
    */

    const width = ref(window.innerWidth)
    const height = ref(window.innerHeight)
    const loading = ref(false)

    const colors = reactive({})

    function setTheme() {
      loading.value = true
      if (isDark.value) {
        colors.colorBack = '#283046'
        colors.colorGrid = '#434343'
        colors.colorText = '#fff'
      } else {
        colors.colorBack = '#fff'
        colors.colorGrid = '#eee'
        colors.colorText = '#333'
      }
      loading.value = false
    }

    setTheme()

    function onResize() {
      width.value = document.querySelector('.header-navbar .navbar-container').clientWidth - 50 || window.innerWidth
      height.value = window.innerHeight - 300
    }

    // FETCHING DATA
    /*
 function fetchPairData(pair) {
      loading.value = true
      axios.get(`/rates/${pair}/H1`).then(res => {
        chart.ohlcv.data = []
        currentPair.value = pair
        const { results } = res.data
        console.log(res)
        results.forEach(item => {
          chart.ohlcv.push([
            item.time,
            item.openBid,
            item.highBid,
            item.lowBid,
            item.closeBid,
            item.volume,
          ])
        })
        loading.value = false
      }).catch(err => {
        console.log(err)
      })
    }
    fetchPairData('AUD_USD')
  * */
    onMounted(() => {
      window.addEventListener('resize', onResize)
      onResize()
    })

    watch(isDark, () => {
      setTheme()
    })
    return {
      chart,
      width,
      height,
      loading,
      colors,
      pairings,
      currentPair,
      //   fetchPairData,
    }
  },

}
</script>

<style lang="scss" scoped>

</style>
