import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const PostCreator = React.lazy(() => import('./pages/posts/create'));
const Posts = React.lazy(() => import('./pages/posts/index'));
const Categories = React.lazy(() => import('./pages/categories'));
const Tags = React.lazy(() => import('./pages/tags'));
const Test = React.lazy(() => import('./pages/Test.jsx'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/post', name: 'posts', element: Posts },
  { path: '/post/create', name: 'create', element: PostCreator },
  { path: '/category', name: 'Category', element: Categories },
  { path: '/tags', name: 'Tag', element: Tags },
  { path: '/test', name: 'Test', element: Test },
]

export default routes
