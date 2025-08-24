import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import Layout from "@/views/layout";
import Home from "@/views/home";

const Query = lazy(() => import("@/views/query"));

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path=':id' element={<Query />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
