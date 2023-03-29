import {Link} from 'react-router-dom';
import classes from './InnerLink.module.css';

const InnerLink = ({text, route, children}) => (
    <Link className={classes.innerLink} to={route}>{text ?? children}</Link>
);

export default InnerLink;
