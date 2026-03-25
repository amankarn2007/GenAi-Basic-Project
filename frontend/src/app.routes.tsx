import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./features/interview/pages/Home";
import InterviewPage from "./features/interview/pages/Interview";
import Protected from "./features/auth/components/Protected";
import LandingPage from "./features/interview/pages/LandingPage";


export const router = createBrowserRouter([
    {
        path: "/dashboard",
        element: (
            <Protected>
                <Home />
            </Protected>
        )
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/interview/:interviewId",
        element: (
            <Protected>
                <InterviewPage />
            </Protected>
        )
    },
    {
        path: "/",
        element: <LandingPage />
    }
])