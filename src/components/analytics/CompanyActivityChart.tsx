
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CompanyActivity } from '@/data/mockData';

interface CompanyActivityChartProps {
  data: CompanyActivity[];
}

const CompanyActivityChart: React.FC<CompanyActivityChartProps> = ({ data }) => {
  const COLORS = ['#8B5CF6', '#EC4899', '#10B981', '#F59E0B'];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Company Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center">
          <ChartContainer 
            config={{
              activity: {
                label: "Company Activity",
                theme: {
                  light: "#8B5CF6",
                  dark: "#A78BFA"
                }
              }
            }}
          >
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="percentage"
                nameKey="company"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
            </PieChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyActivityChart;
