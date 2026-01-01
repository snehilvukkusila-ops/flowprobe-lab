import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const data = [
  {
    name: 'Mon',
    clicks: 248,
    uniques: 247,
  },
  {
    name: 'Tue',
    clicks: 786,
    uniques: 685,
  },
  {
    name: 'Wed',
    clicks: 424,
    uniques: 423,
  },
  {
    name: 'Thu',
    clicks: 962,
    uniques: 161,
  },
  {
    name: 'Fri',
    clicks: 600,
    uniques: 599,
  },
  {
    name: 'Sat',
    clicks: 238,
    uniques: 337,
  },
  {
    name: 'Sun',
    clicks: 776,
    uniques: 775,
  },
]

export function AnalyticsChart() {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={data}>
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Area
          type='monotone'
          dataKey='clicks'
          stroke='currentColor'
          className='text-primary'
          fill='currentColor'
          fillOpacity={0.15}
        />
        <Area
          type='monotone'
          dataKey='uniques'
          stroke='currentColor'
          className='text-muted-foreground'
          fill='currentColor'
          fillOpacity={0.1}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
