import {
  Chart,
  ChartTitle,
  ChartLegend,
  ChartTooltip,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
} from "@progress/kendo-react-charts";
import { Divider, Typography } from "@mui/material";
import {memo} from 'react'

const COLORS = {
  rejected: "#B91C1C",
  applied: "#D97706",
  interviewing: "#2563EB",
};

export type PieProps = {
  balancedata:any;
}

const PieChart: React.FC<PieProps> = props => {

  const getPercentage = (num: number, total: number) =>
  Math.round((num / total) * 100).toFixed(2);

const numApplied = props.balancedata[0]? props.balancedata[0].actFor: 50;
const numRejected = props.balancedata[1]?props.balancedata[1].actFor:50;
const totalApplicants = Math.abs(numApplied) + Math.abs(numRejected);

const applicants = [
  {
    status: "Fedwire",
    value: getPercentage(numApplied, totalApplicants),
    color: COLORS.applied,
  },
  {
    status: "Chips",
    value: getPercentage(numRejected, totalApplicants),
    color: COLORS.interviewing,
  },
  // {
  //   status: "Rejected",
  //   value: getPercentage(numRejected, totalApplicants),
  //   color: COLORS.rejected,
  // },
];

const renderTooltip = (context: any) => {
  const { category, value } = context.point || context;
  return (
    <div>
      {category}: {value}%
    </div>
  );
};

  return (
    <>
    <Typography sx={{ fontSize: 16, color: 'black',fontWeight: 'bold',padding:'10px', margin: '0px',backgroundColor:'#fff7e1' }} color="text.secondary" gutterBottom>
          Transaction View
        </Typography>
        <Divider style={{ backgroundColor: 'yellow'}} />
    <div>
      <Chart style={{ minHeight: "10rem", maxHeight: '50rem' }}>
        <ChartLegend visible={false} />
        <ChartTooltip render={renderTooltip} />
        <ChartSeries>
          <ChartSeriesItem
            type="donut"
            data={applicants}
            categoryField="status"
            field="value"
          >
            <ChartSeriesLabels
              color="#fff"
              background="none"
              content={e => e.category}
            />
          </ChartSeriesItem>
        </ChartSeries>
      </Chart>
    </div>
    </>
  );
};

export default memo(PieChart);
