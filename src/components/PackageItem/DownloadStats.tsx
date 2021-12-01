import React, { useMemo } from 'react'
import 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { useEnvironment } from '../../hooks'
import { DateTime } from 'luxon'

export interface DownloadStatsProps {
  downloadStats: Array<number>
}

function DownloadStats({ downloadStats }: DownloadStatsProps) {
  const { numberOfDownloadStatsDays } = useEnvironment()
  const labels = useMemo(
    () => Array(numberOfDownloadStatsDays)
      .fill(null)
      .map((_, index) => DateTime.now().minus({ day: numberOfDownloadStatsDays - index + 1 }).toFormat('ccc')),
    [numberOfDownloadStatsDays]
  )
  const totalCount = useMemo(() => downloadStats.reduce((a, b) => a + b, 0), [downloadStats])

  return (
    <div>
      <h3>{downloadStats.length === 0 ? '--' : totalCount} downloads in the last week</h3>
      <Chart
        type="line"
        data={{
          labels,
          datasets: [
            {
              label: '',
              data: downloadStats,
              borderColor: '#3f51b5',
            }
          ]
        }}
      />
    </div>
  )
}

export default DownloadStats
