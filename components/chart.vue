<template lang="html">
  <canvas id="myChart" ref="myChart" width="300" height="300"></canvas>
</template>

<script>
import Chart from 'chart.js'
export default {
  props: ['poll'],
  mounted () {
    const data = []
    const labels = []
    this.poll.answers.forEach(answer => {
      data.push(answer.votes)
      labels.push(answer.answer)
    })
    const context = this.$refs.myChart
    const myChart = new Chart(context, {
      type: 'doughnut',
      duration: 2000,
      easing: 'easeInOutQuad',
      data: {
        labels,
        datasets: [{
          label: '# of Votes',
          data,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',
            'rgb(255, 159, 64)'
          ],
          borderColor: [
            'rgba(255,99,132,0.4)',
            'rgba(54, 162, 235, 0.4)',
            'rgba(255, 206, 86, 0.4)',
            'rgba(75, 192, 192, 0.4)',
            'rgba(153, 102, 255, 0.4)',
            'rgba(255, 159, 64, 0.4)'
          ],
          hoverBorderColor: [
            'rgb(0, 0, 0)',
            'rgb(0, 0, 0)',
            'rgb(0, 0, 0)',
            'rgb(0, 0, 0)',
            'rgb(0, 0, 0)',
            'rgb(0, 0, 0)'
          ],
          borderWidth: 1
        }]
      }
    })
    // Hack to bypass linting complaining about myChart not being used
    if (myChart) {}
  }
}
</script>

<style lang="scss" scoped>
  @media (min-width: 1280px) {
    canvas {
      margin: 30px auto;
      height: 500px !important;
      width: 500px !important;
    }
  }
</style>
