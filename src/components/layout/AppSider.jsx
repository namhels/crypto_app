import { Layout, Card, Statistic, List, Typography, Spin } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
const { Sider } = Layout;
import { fakeFetchCrypto, fetchAssets } from '../../api'
import { percentDifference } from '../../utils'

const siderStyle = {
  padding: "1rem",
};

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

const AppSider = () => {
  const [loading, setLoading] = useState(false)
  const [crypto, setCrypto] = useState([])
  const [assets, setAssets] = useState([])

  useEffect(() => {
    async function preload() {
      setLoading(true)
      const { result } = await fakeFetchCrypto()
      const assets = await fetchAssets()

      setAssets(
        assets.map((asset) => {
          const coin = result.find((c) => c.id === asset.id)
          return {
            grow: asset.price < coin.price,
            growPercent: percentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            name: coin.name,
            ...asset,
          }
        }
      ))
      setCrypto(result)
      setLoading(false)
    }
    preload()
  }, [])

  if (loading) {
    return <Spin fullscreen />
  }

  return (
    <Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: "1rem" }}>
        <Statistic
          title={asset.id}
          value={asset.totalAmount}
          precision={2}
          valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
          prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          suffix="$"
        />
        <List
          dataSource={data}
          size="small"
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>[ITEM]</Typography.Text> {item}
            </List.Item>
          )}
        />
      </Card>
      ))}
      
    </Sider>
  );
};

export default AppSider;
