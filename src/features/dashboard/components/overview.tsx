import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const data = [
  {
    name: 'Jan',
    total: 3648,
  },
  {
    name: 'Feb',
    total: 1567,
  },
  {
    name: 'Mar',
    total: 4486,
  },
  {
    name: 'Apr',
    total: 2405,
  },
  {
    name: 'May',
    total: 5324,
  },
  {
    name: 'Jun',
    total: 3243,
  },
  {
    name: 'Jul',
    total: 1162,
  },
  {
    name: 'Aug',
    total: 4081,
  },
  {
    name: 'Sep',
    total: 2000,
  },
  {
    name: 'Oct',
    total: 4919,
  },
  {
    name: 'Nov',
    total: 2838,
  },
  {
    name: 'Dec',
    total: 5757,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          direction='ltr'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey='total'
          fill='currentColor'
          radius={[4, 4, 0, 0]}
          className='fill-primary'
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
