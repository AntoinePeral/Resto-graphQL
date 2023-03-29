import {NavLink} from 'react-router-dom';
import classes from './AppLink.module.css';

const AppLink = ({text, route}) => (
    <NavLink to={route} className={({isActive}) => classes.appLink + ' ' + (isActive ? classes.active : undefined)}>{text}</NavLink>
);

export default AppLink;
