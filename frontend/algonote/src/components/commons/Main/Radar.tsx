import React, { useEffect, useRef } from 'react'
import Chart, { ChartConfiguration } from 'chart.js/auto'

interface BarChartProps {
  data: number[]
  labels: string[]
}

const Radar = ({ data, labels }: BarChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart>()

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400)
        gradient.addColorStop(0.3, 'rgba(57, 195, 231, 0.4)')
        gradient.addColorStop(0.5, 'rgba(101, 122, 233, 0.4)')
        const config: ChartConfiguration<'radar', number[], string> = {
          type: 'radar',
          data: {
            labels,
            datasets: [
              {
                data,
                fill: true,
                backgroundColor: gradient,
                borderColor: '#3c87fe',
                borderWidth: 2,
                // pointBorderColor: '#fff',
                pointRadius: 3,
                pointBorderWidth: 2,
                pointBackgroundColor: '#3c87fe',
                pointHoverRadius: 4,
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
                suggestedMax: Math.max(...data),
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
