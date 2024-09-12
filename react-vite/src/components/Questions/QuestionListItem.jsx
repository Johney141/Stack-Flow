import { NavLink } from 'react-router-dom';

const QuestionListItem = (question) => {
    question = question.question.question_obj;
    return(
        <div key={question.id} className="QuestionListItem">
            <div className="QuestionListItem-subject">
                <NavLink to={`/questions/${question.id}`}>{question.subject}</NavLink>
            </div>
            <div className="QuestionListItem-question">
                {question.question}
            </div>
            <div className="QuestionListItem-tag-user">
                <div className="QuestionListItem-tag">
                    {/* PUT TAGS HERE */}
                </div>
                <div className="QuestionListItem-username">
                    {/* {question.User.username} */}
                </div>
            </div>

        </div>
    )
}

export default QuestionListItem;
