import Loadable from 'react-loadable'
import { Loading } from '../components'
// import Dashboard from './Dashboard'
// import Login from './Login'
// import NotFound from './NotFound'
// import Settings from './Setting'
// import ArticleList from './Articles'
// import ArticleEdit from './Articles/Edit'
//懒加载

const Dashboard = Loadable({
    loader: () => import('./Dashboard'),
    loading: Loading
})
const Login = Loadable({
    loader: () => import('./Login'),
    loading: Loading
})
const NotFound = Loadable({
    loader: () => import('./NotFound'),
    loading: Loading
})
const Settings = Loadable({
    loader: () => import('./Setting'),
    loading: Loading
})
const ArticleList = Loadable({
    loader: () => import('./Articles'),
    loading: Loading
})
const ArticleEdit = Loadable({
    loader: () => import('./Articles/Edit'),
    loading: Loading
})


export {
    Dashboard,
    Login,
    NotFound,
    Settings,
    ArticleList,
    ArticleEdit
}
