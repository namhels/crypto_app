import { Layout, Card } from 'antd';
const { Sider } = Layout;

const siderStyle = {
  padding: '1rem',
};

const AppSider = () => {
	return (
		<Sider width="25%" style={siderStyle}>
			<Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
		</Sider>
	)
}

export default AppSider