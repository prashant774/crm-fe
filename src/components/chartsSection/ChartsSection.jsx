import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import styles from "./ChartsSection.module.css";

/* ── Hardcoded data (from CSV dataset) ──────────────────────── */

const salesByRegion = [
  { region: "South", sales: 168450 },
  { region: "West", sales: 155320 },
  { region: "East", sales: 149870 },
  { region: "North", sales: 145210 },
];

const salesByCategory = [
  { name: "Electronics", value: 338240 },
  { name: "Furniture", value: 280610 },
];
const CATEGORY_COLORS = ["#3b82f6", "#10b981"];

const monthlySales = [
  { month: "Jan", sales: 47200 },
  { month: "Feb", sales: 43800 },
  { month: "Mar", sales: 51600 },
  { month: "Apr", sales: 53900 },
  { month: "May", sales: 62400 },
  { month: "Jun", sales: 58700 },
  { month: "Jul", sales: 64300 },
  { month: "Aug", sales: 59100 },
  { month: "Sep", sales: 55800 },
  { month: "Oct", sales: 61200 },
  { month: "Nov", sales: 58900 },
  { month: "Dec", sales: 57850 },
];

const salesByProduct = [
  { product: "Laptop", sales: 96240 },
  { product: "Sofa", sales: 87350 },
  { product: "Phone", sales: 72180 },
  { product: "Desk", sales: 58920 },
  { product: "Cabinet", sales: 43650 },
  { product: "Tablet", sales: 41280 },
  { product: "Monitor", sales: 38470 },
  { product: "Bookshelf", sales: 31240 },
  { product: "Chair", sales: 26880 },
  { product: "Printer", sales: 22640 },
];

const topSalesReps = [
  { name: "Patrick Valdez", revenue: 42800 },
  { name: "Rebecca Haas", revenue: 38200 },
  { name: "T. Valenzuela", revenue: 35600 },
  { name: "Brian Guzman", revenue: 33400 },
  { name: "Kevin Harvey", revenue: 31200 },
  { name: "Tara Lang", revenue: 29800 },
];

const regionCategory = [
  { region: "South", Electronics: 89300, Furniture: 79100 },
  { region: "West", Electronics: 80500, Furniture: 74800 },
  { region: "East", Electronics: 72600, Furniture: 77200 },
  { region: "North", Electronics: 78400, Furniture: 68200 },
];

/* ── Helpers ─────────────────────────────────────────────────── */

const formatK = (v) => `$${(v / 1000).toFixed(0)}K`;
const MARGIN = { top: 10, right: 12, left: 0, bottom: 0 };

function ChartCard({ title, children }) {
  return (
    <div className={styles.card}>
      <h4 className={styles.cardTitle}>{title}</h4>
      <div className={styles.chartArea}>{children}</div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────── */

export default function ChartsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {/* 1 · Sales by Region — Vertical Bar */}
        <ChartCard title="Sales by Region">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={salesByRegion} margin={MARGIN}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="region"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={formatK}
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, "Sales"]} />
              <Bar
                dataKey="sales"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                maxBarSize={48}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 2 · Sales by Category — Donut/Pie */}
        <ChartCard title="Sales by Category">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={salesByCategory}
                cx="50%"
                cy="42%"
                innerRadius={55}
                outerRadius={82}
                paddingAngle={3}
                dataKey="value"
              >
                {salesByCategory.map((_, i) => (
                  <Cell key={i} fill={CATEGORY_COLORS[i]} />
                ))}
              </Pie>
              <Legend iconType="circle" iconSize={10} />
              <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 3 · Monthly Sales Trend — Line */}
        <ChartCard title="Monthly Sales Trend">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlySales} margin={MARGIN}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={formatK}
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, "Sales"]} />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#3b82f6" }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 4 · Sales by Product — Horizontal Bar */}
        <ChartCard title="Sales by Product">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={salesByProduct}
              layout="vertical"
              margin={{ top: 4, right: 20, left: 58, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                type="number"
                tickFormatter={formatK}
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="product"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={55}
              />
              <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, "Sales"]} />
              <Bar
                dataKey="sales"
                fill="#10b981"
                radius={[0, 4, 4, 0]}
                maxBarSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 5 · Top Sales Reps — Horizontal Bar */}
        <ChartCard title="Top Sales Reps by Revenue">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={topSalesReps}
              layout="vertical"
              margin={{ top: 4, right: 20, left: 80, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                type="number"
                tickFormatter={formatK}
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={78}
              />
              <Tooltip
                formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]}
              />
              <Bar
                dataKey="revenue"
                fill="#f97316"
                radius={[0, 4, 4, 0]}
                maxBarSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 6 · Region × Category — Stacked Bar */}
        <ChartCard title="Sales by Region &amp; Category">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={regionCategory} margin={MARGIN}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="region"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={formatK}
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
              <Legend iconType="circle" iconSize={10} />
              <Bar
                dataKey="Electronics"
                stackId="a"
                fill="#3b82f6"
                maxBarSize={48}
              />
              <Bar
                dataKey="Furniture"
                stackId="a"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
                maxBarSize={48}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </section>
  );
}
