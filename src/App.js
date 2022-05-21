import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import { TransactionContextProvider } from "./hooks/useTx";
import { ConfettiProvider } from "./hooks";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "animate.css";
import { WOW } from "wowjs";

import Home from "./components/Home";
import Games from "./components/Games";
import Mint from "./components/Mint";
import MyGames from "./components/MyGames";

function App() {
	useEffect(() => {
		new WOW({ live: false }).init();
	}, []);

	return (
		<RecoilRoot>
			<BrowserRouter>
				<TransactionContextProvider>
					<ConfettiProvider>
						<div className='bg-base'>
							<Routes>
								<Route path='/' element={<Home />} />
								<Route path='/mint' element={<Mint />} />
								<Route path='/games' element={<Games />} />
								<Route path='/my-games' element={<MyGames />} />
							</Routes>
						</div>
					</ConfettiProvider>
				</TransactionContextProvider>
			</BrowserRouter>
		</RecoilRoot>
	);
}

export default App;
