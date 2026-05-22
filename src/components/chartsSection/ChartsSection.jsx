import React, { useState, useEffect } from "react";
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
import {
  fetchByRegion,
  fetchByCategory,
  fetchTrends,
  fetchTopProducts,
  fetchTopReps,
  fetchRegionCategory,
} from "../../services/api";

/* ── Constants ───────────────────────────────────────────────── */
const CATEGORY_COLORS = ["#3b82f6", "#10b981"];
const formatK = (v) => `$${(v / 1000).toFixed(0)}K`;
const MARGIN = { top: 10, right: 12, left: 0, bottom: 0 };

function ChartCard({ title, loading, children }) {
  return (
    <div className={styles.card}>
      <h4 className={styles.cardTitle}>{title}</h4>
      <div className={styles.chartArea}>
        {loading ? <div className={styles.loading}>Loading…</div> : children}
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────── */
export default function ChartsSection({ fromDate, toDate }) {
  const [loading, setLoading] = useState(true);
  const [byRegion, setByRegion] = useState([]);
  const [byCategory, setByCategory] = useState([]);
  const [trends, setTrends] = useState([]);
  const [byProduct, setByProduct] = useState([]);
  const [topReps, setTopReps] = useState([]);
  const [regionCategory, setRegionCategory] = useState([]);

  useEffect(() => {
    setLoading(true);
    const p = { from: fromDate, to: toDate };

    Promise.all([
      fetchByRegion(p),
      fetchByCategory(p),
      fetchTrends(p),
      fetchTopProducts(p),
      fetchTopReps(p),
      fetchRegionCategory(p),
    ])
      .then(([reg, cat, tr, prod, reps, rc]) => {
        setByRegion(
          reg.map((d) => ({ region: d.region, sales: d.totalSales })),
        );
        setByCategory(cat);
        setTrends(tr.map((d) => ({ month: d.month, sales: d.totalSales })));
        setByProduct(
          prod.map((d) => ({ product: d.product, sales: d.totalSales })),
        );
        setTopReps(reps);
        setRegionCategory(rc);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [fromDate, toDate]);

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {/* 1 · Sales by Region — Vertical Bar */}
        <ChartCard title="Sales by Region" loading={loading}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={byRegion} margin={MARGIN}>
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
        <ChartCard title="Sales by Category" loading={loading}>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={byCategory}
                cx="50%"
                cy="42%"
                innerRadius={55}
                outerRadius={82}
                paddingAngle={3}
                dataKey="value"
              >
                {byCategory.map((_, i) => (
                  <Cell
                    key={i}
                    fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend iconType="circle" iconSize={10} />
              <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 3 · Monthly Sales Trend — Line */}
        <ChartCard title="Monthly Sales Trend" loading={loading}>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trends} margin={MARGIN}>
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
        <ChartCard title="Sales by Product" loading={loading}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={byProduct}
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
        <ChartCard title="Top Sales Reps by Revenue" loading={loading}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={topReps}
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
        <ChartCard title="Sales by Region &amp; Category" loading={loading}>
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
