import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './TagBubble.css';


const TagBubble = (tag, idx) => {
    console.log(tag.tag.question)
    return(
        <span key={idx} className="tag-bubble">
            <NavLink to={`/tags/${tag.tag.id}`}>#{tag.tag.question} {tag.tag.tag_name}</NavLink>
        </span>
    )
}

export default TagBubble;
