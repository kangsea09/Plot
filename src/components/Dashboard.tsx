import { Box, Grid, GridItem, Text, Flex } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface StatCardProps {
  label: string;
  value: string;
  percent: string;
  positive?: boolean;
}

const barData = [
  { name: "전체", value: 8500 },
  { name: "식비", value: 200 },
  { name: "뷰티/미용", value: 7800 },
  { name: "교통/차량", value: 4200 },
  { name: "문화", value: 2100 },
  { name: "쇼핑/여가", value: 6300 },
];

const donutData = [
  { name: "절약", value: 70 },
  { name: "지출", value: 30 },
];

const BAR_COLORS = [
  "#F4C0D1",
  "#C0DD97",
  "#FAC775",
  "#9FE1CB",
  "#AFA9EC",
  "#F5C4B3",
];
const DONUT_COLORS = ["#1D9E75", "#7F77DD"];

const StatCard = ({ label, value, percent, positive }: StatCardProps) => (
  <Box
    style={{
      background: "white",
      borderRadius: 12,
      border: "1px solid #f0f0f0",
      padding: 16,
    }}
  >
    <Text fontSize="sm" style={{ color: "#6b7280" }} mb={2}>
      {label}
    </Text>
    <Text fontSize="2xl" fontWeight="600">
      {value}
    </Text>
    <Text
      fontSize="sm"
      fontWeight="500"
      style={{ color: positive ? "#1D9E75" : "#7F77DD" }}
    >
      {percent}
    </Text>
  </Box>
);

const Dashboard = () => (
  <Box>
    <Grid templateColumns="repeat(4, 1fr)" gap={3} mb={4}>
      <StatCard label="수입" value="3,420,000원" percent="91% 여유" positive />
      <StatCard label="지출" value="294,300원" percent="9% 사용" />
      <StatCard
        label="3개월 전 수입"
        value="2,900,000원"
        percent="+3%"
        positive
      />
      <StatCard label="3개월 전 지출" value="630,000원" percent="-52%" />
    </Grid>

    <Grid templateColumns="3fr 2fr" gap={3}>
      <GridItem
        style={{
          background: "white",
          borderRadius: 12,
          border: "1px solid #f0f0f0",
          padding: 20,
        }}
      >
        <Text fontWeight="600" mb={1}>
          용도별 지출
        </Text>
        <Text fontSize="sm" style={{ color: "#9ca3af" }} mb={4}>
          카테고리별 지출 비중
        </Text>
        <BarChart width={500} height={240} data={barData} barSize={40}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Bar dataKey="value">
            {barData.map((_, i) => (
              <Cell key={i} fill={BAR_COLORS[i]} />
            ))}
          </Bar>
        </BarChart>
      </GridItem>

      <GridItem
        style={{
          background: "white",
          borderRadius: 12,
          border: "1px solid #f0f0f0",
          padding: 20,
        }}
      >
        <Text fontWeight="600" mb={4}>
          한달 전보다 얼마나 적을까?
        </Text>
        <Flex justify="center">
          <PieChart width={180} height={180}>
            <Pie
              data={donutData}
              cx={90}
              cy={90}
              innerRadius={55}
              outerRadius={80}
              dataKey="value"
            >
              {donutData.map((_, i) => (
                <Cell key={i} fill={DONUT_COLORS[i]} />
              ))}
            </Pie>
          </PieChart>
        </Flex>
        <Text
          fontSize="sm"
          textAlign="center"
          mt={3}
          style={{ color: "#4b5563" }}
        >
          지난달보다{" "}
          <Text as="span" style={{ color: "#1D9E75", fontWeight: 600 }}>
            335,700원 덜 소비
          </Text>
          했어요.
        </Text>
      </GridItem>
    </Grid>
  </Box>
);

export default Dashboard;
