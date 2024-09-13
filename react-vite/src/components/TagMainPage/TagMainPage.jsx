import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllTagsThunk } from "../../redux/tags";

function TagMainPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTagsThunk());
  }, [dispatch]);

  const tags = useSelector((store) => store.tagState.allTags);
  console.log(tags);

  return (
    <>
      <h2>Tags</h2>
      <div>
        A tag is a keyword or label that categorizes your question.
        Use them to find the answer to your question or the similar ones.
      </div>

    </>
  );
}

export default TagMainPage;
