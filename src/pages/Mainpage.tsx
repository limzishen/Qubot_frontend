import { SideBar } from "../components/SideBar";
import { GlobalStyle } from "../styles/global";
import RectangleRegion from "@/components/Boxes/RectangleRegion";
import StockList from "../components/StockChart/StockList";
import StockCard from "../components/StockChart/StockCard"; 
import PieChartWithCenterLabel from '../components/StockChart/PieChart'
import Box from '@mui/material/Box'; 
import LabelsAboveBars from '../components/StockChart/BarChart';
import BasicDateCalendar from '../components/Dashboard/Calendar'; 
import Todolist from '../components/Dashboard/Todolist'; 

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

                <div style={{ width: "70px", flexShrink: 0 }}>
                    <SideBar />
                </div>

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
                    <RectangleRegion
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        overflow: 'hidden',
                        p: 2,
                        boxSizing: 'border-box',
                        gap: 2,
                    }}
                    >
                    <Box
                        sx={{
                        flex: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        p: 2,
                        boxShadow: 1,
                        }}
                    >
                        <BasicDateCalendar />
                    </Box>

                    <Box
                        sx={{
                        flex: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        height: '100%',
                        overflowY: 'auto',
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        p: 2,
                        boxShadow: 1,
                        }}
                    >
                        <Todolist />
                    </Box>
                    </RectangleRegion>

                    <RectangleRegion sx ={{ 
                        display: 'flex',
                        }}>
                        <StockList />
                    </RectangleRegion>
                    <RectangleRegion>
                    </RectangleRegion>
                </div>
            </div>
        </>
    );
}

export default Mainpage;
