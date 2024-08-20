import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import { Sidebar } from "./components/sidebar/Sidebar";
import Analytics from "./pages/analytics/Analytics";
import { useSelector } from "react-redux";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import QuestionWiseAnalysis from "./pages/questionWiseAnalysis/QuestionWiseAnalysis";
import PlayQuiz from "./pages/playQuiz/PlayQuiz";

function App() {
  const { currentUser } = useSelector((state) => state.user);

  const HomeLayout = () => {
    return (
      <div className="App">
        <Outlet />
      </div>
    );
  };

  const DashboardLayout = () => {
    return (
      <div style={{ display: "flex" }}>
        <div
          style={{
            flex: 1,
            position: "fixed",
            top: 0,
            backgroundColor: "white",
          }}
        >
          <Sidebar />
        </div>
        <div style={{ flex: 5, marginLeft: "13rem" }}>
          <Outlet />
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: !currentUser ? (
            <Home />
          ) : (
            <>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    flex: 1,
                    position: "fixed",
                    top: 0,
                    backgroundColor: "white",
                  }}
                >
                  <Sidebar />
                </div>
                <div style={{ flex: 5, marginLeft: "13rem" }}>
                  <Dashboard />
                </div>
              </div>
            </>
          ),
        },
        {
          path: "/playquiz/:quizId",
          element: <PlayQuiz />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: currentUser ? <DashboardLayout /> : <HomeLayout />,
      children: [
        {
          path: "/dashboard/",
          element: currentUser ? <Dashboard /> : <Home />,
        },
        {
          path: "/dashboard/analytics",
          element: currentUser ? <Analytics /> : <Home />,
        },
        {
          path: "/dashboard/analytics/questionwise/:quizId",
          element: currentUser ? <QuestionWiseAnalysis /> : <Home />,
        },
      ],
    },
    {
      path: "/*",
      element: <PageNotFound />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
