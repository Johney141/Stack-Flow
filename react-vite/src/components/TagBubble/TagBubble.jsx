import { NavLink } from 'react-router-dom';
import './TagBubble.css';


const TagBubble = (tag, idx) => {
    return(
        <span key={idx}>
            <NavLink to={`/tags/${tag.tag.id}`} className="tag-bubble">
              #{tag.tag.question} {tag.tag.tag_name} {tag.tag.tagName}
            </NavLink>
        </span>
    )
}

export default TagBubble;
