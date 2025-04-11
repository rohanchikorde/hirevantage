
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { InterviewerPerformance } from '@/data/mockData';

interface InterviewerPerformanceChartProps {
  data: InterviewerPerformance[];
}

const InterviewerPerformanceChart: React.FC<InterviewerPerformanceChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Interviewer Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer 
            config={{
              performance: {
                label: "Interviews Conducted",
                theme: {
                  light: "#8B5CF6",
                  dark: "#A78BFA"
                }
              }
            }}
          >
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                style={{ fontSize: '12px' }} 
              />
              <YAxis style={{ fontSize: '12px' }} />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="interviews" 
                name="performance"
                fill="var(--color-performance)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewerPerformanceChart;
