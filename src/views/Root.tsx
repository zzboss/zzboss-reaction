import { useRoutes, Navigate } from "react-router";
import { KeepAlive } from "react-activation";
import App from "../App";
import ImageTools from "@/views/imgTools";
import History from "@/views/history";
import Zodiac from "./zodiac";


export default function Root() {
  return useRoutes([
    {
      path: '/',
      element: (<App />),
      children: [
        {
          index: true,
          element: (<Navigate to={'pictools'} replace/>)
        },
        {
          path: 'pictools',
          element: (
            <KeepAlive name={'pictools'} cacheKey="imageTools">
              <ImageTools/>
            </KeepAlive>
          )
        },
        {
          path: 'history',
          element: (
            <KeepAlive name='history' cacheKey="history">
              <History/>
            </KeepAlive>
          )
        },
        {
          path: 'stars',
          element: (
            <KeepAlive name='stars' cacheKey="stars">
              <Zodiac/>
            </KeepAlive>
          )
        },
        {
          path: '*',
          element: (<main style={{padding: '1rem'}}> <h1>404!!</h1></main>)
        }
      ]
    }
  ])
}