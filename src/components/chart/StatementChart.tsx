import { FC, useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  Tooltip
} from 'chart.js'

// Define the type for DailyAmount
type DailyAmount = {
  day: string
  amount: number
}

// Register the required Chart.js components
Chart.register(BarElement, LinearScale, CategoryScale, Tooltip)

type Props = {
  statement: DailyAmount[]
}

const StatementChart: FC<Props> = ({ statement }) => {
  // Returns the total spend for the week
  const spendingTotal = statement.reduce(
    (total, item) => total + item.amount,
    0
  )

  // Returns an array of the chart labels (day)
  const labels = useMemo(() => statement.map((e) => e.day), [statement])
  // Returns an array of the chart spending amounts (amount)
  const data = useMemo(() => statement.map((e) => e.amount), [statement])
  // Variables to handle bar colours
  const barColor = 'hsl(160, 100%, 33%)'
  const barHovered = 'hsl(160, 100%, 20%)'
  const activeBarHovered = 'hsla(186, 34%, 60%, .8)'
  const activeBarColor = 'hsl(186, 34%, 60%)'

  return (
    <section
      aria-label="Statement Chart"
      className="w-full bg-white text-black flex flex-col h-full flex-grow justify-center rounded-xl "
    >
      <div className="w-full h-auto">
        <Bar
          data={{
            labels,
            datasets: [
              {
                label: 'Daily Amount',
                data,
                backgroundColor: labels.map((label, index) => {
                  const today = new Date()
                    .toLocaleString('en-US', { weekday: 'short' })
                    .toLowerCase()
                  return label.toLowerCase() === today
                    ? activeBarColor
                    : barColor
                }),
                borderSkipped: false,
                borderRadius: 5,
                hoverBackgroundColor: labels.map((label, index) => {
                  const today = new Date()
                    .toLocaleString('en-US', { weekday: 'short' })
                    .toLowerCase()
                  return label.toLowerCase() === today
                    ? activeBarHovered
                    : barHovered
                })
              }
            ]
          }}
          options={{
            plugins: {
              tooltip: {
                enabled: true,
                backgroundColor: 'black',
                padding: 10,
                caretSize: 0,
                usePointStyle: true,
                displayColors: false,
                yAlign: 'bottom',
                xAlign: 'center',
                position: 'nearest',
                footerMarginTop: 42,
                callbacks: {
                  label: function (context) {
                    const value = context.parsed.y
                    return `$${String(value.toFixed(2))}`
                  },
                  title: function () {
                    return ''
                  }
                }
              }
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                display: true,
                ticks: {
                  color: 'slategrey'
                },
                grid: {
                  display: false
                }
              },
              y: { display: false }
            }
          }}
        />
      </div>
      
    </section>
  )
}

export default StatementChart