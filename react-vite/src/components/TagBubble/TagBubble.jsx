import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';



const TagBubble = (tag, idx) => {
    console.log(tag)
    return(
        <span key={idx} className="TagBubble">
            {tag.tag.tag_name}
        </span>
    )
}

export default TagBubble;
