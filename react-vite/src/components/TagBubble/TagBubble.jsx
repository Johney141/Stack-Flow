import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';



const TagBubble = (tag, idx) => {
    console.log(tag.tag.question)
    return(
        <span key={idx} className="tag-bubble">
            #{tag.tag.question} {tag.tag.tag_name}
        </span>
    )
}

export default TagBubble;
