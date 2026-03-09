// routing 파일
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import RootLayout from "./RootLayout";

// view 컴포넌트
import { SignInView, SignOutView, DeleteAccountView } from "@/pages/auth";
import { LandingView, HomeView } from "@/pages/home";
import { MyPageView } from "@/pages/mypage";
import { DetailView, ParticipatedView } from "@/pages/post";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "auth",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <SignInView />,
          },
          {
            path: "signin",
            element: <SignInView />,
          },
          {
            path: "signout",
            element: <SignOutView />,
          },
          {
            path: "delete",
            element: <DeleteAccountView />,
          },
        ],
      },
      {
        path: "home",
        children: [
          {
            index: true,
            element: <HomeView />,
          },
          {
            path: "landing",
            element: <LandingView />,
          },
        ],
      },
      {
        path: "mypage",
        element: <MyPageView />,
      },
      {
        path: "post",
        children: [
          {
            path: ":postId",
            element: <DetailView />,
          },
          {
            path: ":postId/participate",
            element: <ParticipatedView />,
          },
        ],
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
