import loadable from '../static/scripts/loadable';
const List = [
        
        {
            url:'/',
            component: loadable(() => import('../pages/home/home.page'))
        }
            
            ];
export default List