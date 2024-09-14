import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import TagBubble from '../TagBubble/TagBubble';



const QuestionListItem = (question) => {



    question = question.question.question_obj;
    console.log("Question: ", question);
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
                    {
                        question.Tags.map((tag, idx)=>{
                            return (
                                <TagBubble tag={tag} idx={idx} />
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
