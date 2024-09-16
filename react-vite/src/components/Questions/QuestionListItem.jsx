import { useNavigate } from 'react-router-dom';
import TagBubble from '../TagBubble/TagBubble';



const QuestionListItem = (question) => {
    const navigate = useNavigate();
    const handleQuestionDetail = () => {
      navigate(`/questions/${question.id}`);
    }

    question = question.question.question_obj;
    console.log("Question: ", question);
    return(
        <div key={question.id}>
            <div className="QuestionListItem-subject" onClick={handleQuestionDetail}>
                <a href={`/questions/${question.id}`} className='question-anchor'>{question.subject}</a>
            </div>
            <div className="QuestionListItem-question">
                {question.question.substring(0, 250)} {question.question.length > 250 ? "... ..." : ""}
            </div>
            <div className="QuestionListItem-tag-user">
                <div className="QuestionListItem-tag">
                    {
                        question.Tags.map((tag)=>{
                            return (
                                <TagBubble tag={tag} idx={tag.id} />
                            )
                        })
                    }
                </div>
                <div className="QuestionListItem-username">

                </div>
            </div>

        </div>
    )
}

export default QuestionListItem;
