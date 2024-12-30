import { BrowserRouter, Link } from "react-router-dom";
import { Suspense } from 'react';
import WrappedRoutes from "./router";
import "./App.css";
import { ConfigProvider } from 'antd';

function App() {
	return (
		// 路由的容器组件
		<ConfigProvider>
			<BrowserRouter> 
				<div className="App">
					{/* 路由的匹配组件 Routes 和 Route 用于定义路由规则 */}
					<Suspense fallback={<div>Loading...</div>}>
						<WrappedRoutes />
					</Suspense>
				</div>
			</BrowserRouter>
		</ConfigProvider>
	);
}

export default App;
