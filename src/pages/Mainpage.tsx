//import '@/index.css'
import { SideBar } from "../components/SideBar";
import { GlobalStyle } from "../styles/global";
import StockList from "../components/StockChart/StockList";
function Mainpage() {
    return (
        <> 
            <StockList/>
            <SideBar/>
            <GlobalStyle/>
        </> 
    )
}

export default Mainpage; 