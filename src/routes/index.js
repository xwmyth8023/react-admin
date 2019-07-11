import {Dashboard,Login,NotFound,Settings,ArticleEdit,ArticleList} from '../views'


export const mainRouter = [
    {
        pathname: '/login',
        component: Login
    },
    {
        pathname: '/404',
        component: NotFound
    }
]

export const adminRouter = [
    {
        pathname: '/admin/dashboard',
        component: Dashboard,
        title: 'Dashboard',
        isNav: true,
        icon: 'dashboard'
    },
    {
        pathname: '/admin/article',
        component: ArticleList,
        title: 'Articles',
        isNav: true,
        exact: true,
        icon: 'unordered-list'
    },
    {
        pathname: '/admin/article/edit/:id',
        component: ArticleEdit
    },
    {
        pathname: '/admin/settings',
        component: Settings,
        title: 'Setting',
        isNav: true,
        icon: 'setting'
    }
]