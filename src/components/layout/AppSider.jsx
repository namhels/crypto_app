import { Layout } from 'antd';
const { Sider } = Layout;

const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
};

const AppSider = () => {
	return (
		<Sider width="25%" style={siderStyle}>
			Sider
		</Sider>
	)
}

export default AppSider