<template>
  <div>
    <b-card
      class="h-75"
    >
      <Loader v-if="false" />
      <AgGridVue
        style="height: 300px"
        class="ag-theme-alpine"
        :class="{'dark': isDark}"
        :column-defs="columnDefs"
        :row-data="rowData"
      />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import useAppConfig from '@core/app-config/useAppConfig'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { AgGridVue } from 'ag-grid-vue'
import Loader from '@core/components/loader/Loader.vue'
import { ref, onBeforeMount, computed } from '@vue/composition-api'

export default {
  name: 'Analysis',
  components: {
    BCard,
    Loader,
    AgGridVue,
  },
  setup() {
    const { skin } = useAppConfig()
    const isDark = computed(() => skin.value === 'dark')
    const columnDefs = ref([])
    const rowData = ref([])
    onBeforeMount(() => {
      rowData.value = [
        {
          pairing: 'USD/JPY', avgIncome: 'Celica', accuracy: 35000, activation: '123/123', avgActivation: 123, avgReturn: 123, totalReturn: 213, riskReward: 23, TP: 324, SL: 23, entryPrice: '1234', pattern: 'BULLISH',
        },
        {
          pairing: 'USD/BTC', avgIncome: 'Celica', accuracy: 35000, activation: '123/123', avgActivation: 123, avgReturn: 123, totalReturn: 213, riskReward: 23, TP: 324, SL: 23, entryPrice: '1234', pattern: 'BULLISH',
        },
        {
          pairing: 'USD/BNB', avgIncome: 'Celica', accuracy: 100, activation: '123/123', avgActivation: 123, avgReturn: 123, totalReturn: 213, riskReward: 23, TP: 324, SL: 23, entryPrice: '1234', pattern: 'BULLISH',
        },
        {
          pairing: 'USD/ADA', avgIncome: 'Celica', accuracy: 35000, activation: '123/123', avgActivation: 123, avgReturn: 123, totalReturn: 213, riskReward: 23, TP: 324, SL: 23, entryPrice: '1234', pattern: 'BULLISH',
        },

      ]
      columnDefs.value = [
        {
          field: 'pairing', sortable: true, width: 100, suppressSizeToFit: true,
        },
        {
          field: 'avgIncome', sortable: true, width: 100, suppressSizeToFit: true,
        },
        {
          field: 'accuracy', sortable: true, width: 100, suppressSizeToFit: true,
        },
        {
          field: 'activation', sortable: true, width: 150, suppressSizeToFit: true,
        },
        {
          field: 'avgActivation', sortable: true, width: 150, suppressSizeToFit: true,
        },
        {
          field: 'avgReturn', sortable: true, width: 150, suppressSizeToFit: true,
        },
        {
          field: 'totalReturn', sortable: true, width: 150, suppressSizeToFit: true,
        },
        {
          field: 'riskReward', sortable: true, width: 150, suppressSizeToFit: true,
        },
        {
          field: 'TP', sortable: true, width: 80, suppressSizeToFit: true,
        },
        {
          field: 'SL', sortable: true, width: 80, suppressSizeToFit: true,
        },
        {
          field: 'entryPrice', sortable: true, width: 100, suppressSizeToFit: true,
        },
        {
          field: 'pattern', sortable: true, width: 100, suppressSizeToFit: true,
        },
        {
          field: 'action', sortable: true, width: 100, suppressSizeToFit: true,
        },
      ]
    })
    return { columnDefs, rowData, isDark }
  },
}
</script>

<style scoped>

</style>
