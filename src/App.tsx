import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "@/views/layout";
import Home from "@/views/home";
import Query from "@/views/query";

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=':id' element={<Query />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
