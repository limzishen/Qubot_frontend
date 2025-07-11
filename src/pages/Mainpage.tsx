import { SideBar } from "../components/SideBar";
import { GlobalStyle } from "../styles/global";
import RectangleRegion from "@/components/Boxes/RectangleRegion";
import StockList from "../components/StockChart/StockList";
import StockCard from "../components/StockChart/StockCard"; 
import PieChartWithCenterLabel from '../components/StockChart/PieChart'
import Box from '@mui/material/Box'; 
import LabelsAboveBars from '../components/StockChart/BarChart'; 

function Mainpage() {
    return (
        <>
            <GlobalStyle />
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "100vh",
                    width: "100%",
                    overflow: "hidden",
                }}
            >
                {/* Sidebar */}
                <div style={{ width: "70px", flexShrink: 0 }}>
                    <SideBar />
                </div>

                {/* Right content area with 4 rectangles */}
                <div
                    style={{
                        flexGrow: 1,
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gridTemplateRows: "repeat(2, 1fr)",
                        gap: "16px",
                        padding: "16px",
                        boxSizing: "border-box",
                    }}
                >
                    <RectangleRegion sx={{ 
                        display: 'flex', 
                        flexDirection: 'row', 
                    }}>
                        <Box sx ={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            width: '100%', 
                            height: '100%', 
                        }}> 
                            <PieChartWithCenterLabel/>
                        </Box>
                        <Box sx ={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            width: '100%', 
                            height: '100%', 
                        }}> 
                            <LabelsAboveBars/>
                        </Box>
                        
                    </RectangleRegion>   
                    <RectangleRegion>
                    </RectangleRegion>
                    <RectangleRegion sx ={{ 
                        display: 'flex',
                        }}>
                        <StockList />
                    </RectangleRegion>
                    <RectangleRegion>
                        <StockCard symbol="GOOGL"/> 
                    </RectangleRegion>
                </div>
            </div>
        </>
    );
}

export default Mainpage;
