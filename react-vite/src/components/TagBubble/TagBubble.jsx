import './TagBubble.css';
import { useNavigate } from 'react-router-dom';


const TagBubble = (tag, idx) => {
  const navigate = useNavigate();
    return(
        <span key={idx}>
            <span className="tag-bubble" onClick={() => navigate(`/tags/bubble/${tag.tag.id}`)}>
              # {tag.tag.question} {tag.tag.tag_name} {tag.tag.tagName}
            </span>
        </span>
    )
}

export default TagBubble;
