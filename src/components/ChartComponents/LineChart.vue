<template>
  <div id="line-chart"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      myChart: null,
      initData: {
        xAxisName: 'category',
        yAxisName: 'value'
      },
      updateData: {
        dataset: {
          dimensions: ['time', 'TEMPERATURE', 'INDOOR_TEMPERATURE', 'EVAPORATOR_TUBE_TEMPERATURE', 'COMPRESSOR_FREQUENCY', 'ODU_FAN_SPEED_1', 'ODU_FAN_SPEED_2', 'OPENING_OF_EXV', 'DC_BUS_VOLTAGE', 'OUTDOOR_TEMPERATURE', 'CONDENSER_TUBE_TEMPERATURE', 'ODU_DISCHARGE_TEMPERATURE'],
          source: [{
            'TEMPERATURE': '29',
            'INDOOR_TEMPERATURE': 1,
            'EVAPORATOR_TUBE_TEMPERATURE': 3,
            'COMPRESSOR_FREQUENCY': 6,
            'ODU_FAN_SPEED_1': 8,
            'ODU_FAN_SPEED_2': 11,
            'OPENING_OF_EXV': 22,
            'DC_BUS_VOLTAGE': 44,
            'OUTDOOR_TEMPERATURE': 55,
            'CONDENSER_TUBE_TEMPERATURE': 3,
            'ODU_DISCHARGE_TEMPERATURE': 2,
            'time': '2020/10/10 01:54:18'
          }, {
            'TEMPERATURE': '27',
            'INDOOR_TEMPERATURE': 5,
            'EVAPORATOR_TUBE_TEMPERATURE': 33,
            'COMPRESSOR_FREQUENCY': 2,
            'ODU_FAN_SPEED_1': 4,
            'ODU_FAN_SPEED_2': 6,
            'OPENING_OF_EXV': 7,
            'DC_BUS_VOLTAGE': 1,
            'OUTDOOR_TEMPERATURE': 55,
            'CONDENSER_TUBE_TEMPERATURE': 22,
            'ODU_DISCHARGE_TEMPERATURE': 22,
            'time': '2020/10/10 01:55:18'
          }, {
            'TEMPERATURE': '17',
            'INDOOR_TEMPERATURE': 4,
            'EVAPORATOR_TUBE_TEMPERATURE': 6,
            'COMPRESSOR_FREQUENCY': 3,
            'ODU_FAN_SPEED_1': 3,
            'ODU_FAN_SPEED_2': 66,
            'OPENING_OF_EXV': 33,
            'DC_BUS_VOLTAGE': 44,
            'OUTDOOR_TEMPERATURE': 2,
            'CONDENSER_TUBE_TEMPERATURE': 12,
            'ODU_DISCHARGE_TEMPERATURE': 54,
            'time': '2020/10/10 01:56:18'
          }, {
            'TEMPERATURE': '17',
            'INDOOR_TEMPERATURE': 4,
            'EVAPORATOR_TUBE_TEMPERATURE': 6,
            'COMPRESSOR_FREQUENCY': 3,
            'ODU_FAN_SPEED_1': 3,
            'ODU_FAN_SPEED_2': 66,
            'OPENING_OF_EXV': 33,
            'DC_BUS_VOLTAGE': 44,
            'OUTDOOR_TEMPERATURE': 2,
            'CONDENSER_TUBE_TEMPERATURE': 12,
            'ODU_DISCHARGE_TEMPERATURE': 54,
            'time': '2020/10/10 01:57:18'
          }, {
            'TEMPERATURE': 10,
            'INDOOR_TEMPERATURE': 20,
            'EVAPORATOR_TUBE_TEMPERATURE': 30,
            'COMPRESSOR_FREQUENCY': 40,
            'ODU_FAN_SPEED_1': 3,
            'ODU_FAN_SPEED_2': null,
            'OPENING_OF_EXV': 33,
            'DC_BUS_VOLTAGE': 44,
            'OUTDOOR_TEMPERATURE': 100,
            'CONDENSER_TUBE_TEMPERATURE': 12,
            'ODU_DISCHARGE_TEMPERATURE': null,
            'time': '2020/10/10 01:58:18'
          }, {
            'TEMPERATURE': '11',
            'INDOOR_TEMPERATURE': 4,
            'EVAPORATOR_TUBE_TEMPERATURE': 6,
            'COMPRESSOR_FREQUENCY': 3,
            'ODU_FAN_SPEED_1': 3,
            'ODU_FAN_SPEED_2': 66,
            'OPENING_OF_EXV': 33,
            'DC_BUS_VOLTAGE': 44,
            'OUTDOOR_TEMPERATURE': 2,
            'CONDENSER_TUBE_TEMPERATURE': 12,
            'ODU_DISCHARGE_TEMPERATURE': 5,
            'time': '2020/10/10 01:59:18'
          }]
        },
        errorTime: '2020/10/10 01:58:18'
      },
      selected: {}
    }
  },
  mounted () {
    this.myChart = echarts.init(document.getElementById('line-chart'))
    this.initChart()
    this.updateChart()
    this.hookLegendSelectChanged()
    this.hookLegendBtnClick()
  },
  watch: {
    updateData (val) {
      this.updateChart()
    }
  },
  deactivated () {
    this.myChart.off('legendinverseselect')
    this.myChart.off('legendselectchanged')
  },
  activated () {
    this.hookLegendSelectChanged()
    this.hookLegendBtnClick()
  },
  destroyed () {
    this.myChart.off('legendinverseselect')
    this.myChart.off('legendselectchanged')
  },
  methods: {
    hookLegendSelectChanged () {
      let self = this
      // 切换图例选中状态事件，更新selected变量
      this.myChart.on('legendselectchanged', function (params) {
        console.log('changed', params)
        self.selected = params.selected
      })
    },
    hookLegendBtnClick () {
      let self = this
      // 挂载事件
      this.myChart.on('legendinverseselect', function (params) {
        console.log('legendinverseselect', params)
        const legend = self.myChart.getOption().legend[0]
        if (legend.selector[0].title === 'more...') {
          self.myChart.setOption({
            legend: {
              data: self.updateData.dataset.dimensions.slice(1),
              selected: self.selected,
              selector: [{
                type: 'inverse',
                title: 'less...'
              }]
            }
          })
        } else {
          self.myChart.setOption({
            legend: {
              data: self.updateData.dataset.dimensions.slice(1, 6),
              selected: self.selected,
              selector: [{
                type: 'inverse',
                title: 'more...'
              }]
            }
          })
        }
      })
    },
    updateChart () {
      // 找到故障那一刻的数据，为突出显示故障当时数据做准备
      const dataAtErrorTimeArray = this.updateData.dataset.source.filter(item => {
        return item.time === this.updateData.errorTime
      })
      const dataAtErrorTime = dataAtErrorTimeArray.length > 0 ? dataAtErrorTimeArray[0] : {}

      // 设置默认选中的值
      const dimensions = this.updateData.dataset.dimensions
      dimensions.forEach((item, index) => {
        if (index > 0 && index < 6) {
          this.selected[item] = true
        } else {
          this.selected[item] = false
        }
      })

      this.myChart.setOption({
        dataset: this.updateData.dataset,
        legend: {
          data: dimensions.slice(1, 6),
          selected: this.selected,
          selector: [{
            type: 'inverse',
            title: 'more...'
          }],
          selectorLabel: {
            borderRadius: [2, 2, 2, 2]
          }
        },
        series: dimensions.map(item => {
          return {
            type: 'line',
            symbol: 'emptyCircle',
            symbolSize: 6,
            smooth: true,
            connectNulls: true,
            lineStyle: {
              width: 1
            },
            markPoint: {
              data: [{
                coord: [this.updateData.errorTime, dataAtErrorTime[item]],
                symbol: dataAtErrorTime[item] ? 'emptyCircle' : 'none',
                symbolSize: 10
              }]
            }
          }
        }).slice(1)
      })
    },
    initChart () {
      this.myChart.setOption({
        title: {
          show: false
        },
        legend: {
          width: '86%',
          left: 'center',
          top: '0'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '60',
          right: '70',
          bottom: '30',
          top: '100',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          name: this.initData.xAxisName,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          name: this.initData.yAxisName,
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              type: 'dotted',
              color: '#cfcfcf'
            }
          }
        },
        series: []
      })
    }
  }
}
</script>
<style>
#line-chart {
  width: 1000px;
  height:800px;
}
</style>
