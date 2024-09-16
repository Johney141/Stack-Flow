import { NavLink } from 'react-router-dom';
import './TagBubble.css';


const TagBubble = (tag, idx) => {
    return(
        <span key={idx} className="tag-bubble">
            <NavLink to={`/tags/${tag.tag.id}`}>#{tag.tag.question} {tag.tag.tag_name} {tag.tag.tagName}</NavLink>
        </span>
    )
}

export default TagBubble;
