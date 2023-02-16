import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import {MainPage, ComicsPage, Page404, SinglePage} from "../pages";
import SingleComicLayout from "../pages/singleComicLayout/SingleComicLayout";
import SingleCharLayout from "../pages/singleCharLayout/SingleCharLayout";

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/marvel-project" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route path="/comics/:id" element={<SinglePage Component={SingleComicLayout} dataType='comic'/>}/>
                        <Route path="/characters/:id" element={<SinglePage Component={SingleCharLayout} dataType='character'/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
