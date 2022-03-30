<template>
  <v-chart class="chart" :option="option" />
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import { ref, defineComponent, reactive } from "vue";

use([
  CanvasRenderer,
  GridComponent,
  BarChart,
  TooltipComponent,
  LegendComponent
]);

export default defineComponent({
  name: "HelloWorld",
  components: {
    VChart
  },
  setup: () => {
    let curQuestionOptionIndex = reactive([]);
		let curStudentOptionDistribution = reactive([]);
		const option = ref({
			tooltip: {
				show: true
			},
			legend: {
				data: ['人数']
			},
			xAxis: [
				{
					type: 'category',
					data: curQuestionOptionIndex
				}
			],
			yAxis: [
				{
					type: 'value',
					show: false
				}
			],
			series: [
				{
					name: '人数',
					type: 'bar',
					data: curStudentOptionDistribution,
					label: {
						show: true, //开启显示
						position: 'top', //在上方显示
						//数值样式
						color: 'black',
						fontSize: 16
					}
				}
			]
		});

    return { option };
  }
});
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>