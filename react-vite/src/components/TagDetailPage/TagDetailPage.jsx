import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import { getQuestionsByTagThunk } from "../../redux/questions";
import QuestionListItem from "../Questions/QuestionListItem";

function TagDetailPage() {
  const {id} = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestionsByTagThunk({tagId: id}));
  }, [dispatch]);

  const questions = useSelector(state => state.questionState.allQuestions);
  console.log(questions);
  const tagName= useSelector(state => state.questionState.tagName);

  return (
    <div className="tag-page">
      <h3>[{tagName.tagName}]</h3>
      <div className="question-list">
        {questions.map((question_obj)=>{
            return (<QuestionListItem key={question_obj.id} question={{question_obj}}/>)
        })}

      </div>
    </div>
  );
}

export default TagDetailPage;
