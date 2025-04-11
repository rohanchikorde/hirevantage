
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { InterviewTrend } from '@/data/mockData';

interface InterviewTrendChartProps {
  data: InterviewTrend[];
}

const InterviewTrendChart: React.FC<InterviewTrendChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Interview Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer 
            config={{
              interviews: {
                label: "Interviews",
                theme: {
                  light: "#8B5CF6",
                  dark: "#A78BFA"
                }
              }
            }}
          >
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="week" 
                style={{ fontSize: '12px' }} 
              />
              <YAxis style={{ fontSize: '12px' }} />
              <Tooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="count" 
                name="interviews"
                stroke="var(--color-interviews)"
                activeDot={{ r: 8 }} 
                strokeWidth={3}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewTrendChart;
