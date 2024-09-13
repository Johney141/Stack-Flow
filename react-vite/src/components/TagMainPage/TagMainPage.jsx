import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { getAllTagsThunk } from "../../redux/tags";

function TagMainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tagSearch, setTagSearch] = useState('');
  const handleTagSearch = e => setTagSearch(e.target.value);

  useEffect(() => {
    dispatch(getAllTagsThunk());
  }, [dispatch]);

  const tags = useSelector((store) => store.tagState.allTags);
  console.log(tags);

  return (
    <>
      <h3>Tags</h3>
      <div>
        A tag is a keyword or label that categorizes your question.
        Use them to find the answer to your question or to the similar ones.
      </div>

      <div>
        <label>
          Search Tags:
          <input
            value={tagSearch}
            onChange={handleTagSearch}
            type="text"
            name="tagSearch"
          />
        </label>
      </div>

      <div className="tag-list">
        {tags.map(tag => {
          if(tag.tagName.replace(" ", "-").includes(tagSearch)){
            return (
              <div className="tag-anchor" onClick={() => navigate(`/tags/${tag.id}`)}>
                <p>#{tag.tagName}</p>
                <p className="tag-numQuestion">Number of Questions: {tag.numQuestions}</p>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

export default TagMainPage;
