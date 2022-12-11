import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCalculator,
  cilGroup,
  cilList,
  cilPencil,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons';
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react';

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Posts',
  },
  {
    component: CNavItem,
    name: 'Create Post',
    to: '/post/create',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'All Posts',
    to: '/post/',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Attributes',
  },

  {
    component: CNavItem,
    name: 'Categories',
    to: '/category',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Tags',
    to: '/tag',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      }
    ],
  }
]

export default _nav


// {
//   component: CNavTitle,
//   name: 'Attributes',
// },

// {
//   component: CNavItem,
//   name: 'Tags',
//   to: '/tag',
//   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
//   badge: {
//     color: 'info',
//     text: 'NEW',
//   },
// },
 
// {
//   component: CNavGroup,
//   name: 'Pages',
//   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
//   items: [
//     {
//       component: CNavItem,
//       name: 'Login',
//       to: '/login',
//     }
//   ],
// }