import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


const TagBubbleNavigate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    navigate(`/tags/${id}`);
  }, [navigate]);

    return(
      <></>
    );
}

export default TagBubbleNavigate;
