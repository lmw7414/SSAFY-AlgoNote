import React, { useEffect, useRef } from 'react'
import Chart, { ChartConfiguration } from 'chart.js/auto'

interface BarChartProps {
  data: number[]
  labels: string[]
}

const Radar: React.FC<BarChartProps> = ({ data, labels }) => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart>()

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        const config: ChartConfiguration<'radar', number[], string> = {
          type: 'radar',
          data: {
            labels: ['수학', '그래프', '자료구조', '알고리즘', '구현', '기타'],
            datasets: [
              {
                data: [28, 48, 80, 29, 96, 67],
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: '#3c87fe',
                borderWidth: 2.5,
                // pointBorderColor: '#fff',
                pointRadius: 3.5,
                pointBorderWidth: 0,
                pointBackgroundColor: '#3c87fe',
                pointHoverRadius: 5,
                pointHoverBorderWidth: 1,
                pointHoverBorderColor: '#3c87fe',
                pointHoverBackgroundColor: '#fff',
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              r: {
                pointLabels: {
                  font: {
                    size: 14,
                  },
                },
                angleLines: {
                  display: true,
                },
                suggestedMin: 0,
                suggestedMax: 100,
              },
            },
          },
        }
        chartInstance.current = new Chart(ctx, config)
      }
    }

    // Clean up chart instance on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, labels])

  return <canvas ref={chartRef} />
}

export default Radar
