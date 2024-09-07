# Stack-Flow

## BACKEND API
## Schema
![Stack Flow (1)](https://github.com/user-attachments/assets/ccc4394b-50bd-4d74-bc60-56d06f9f6af7)

## Questions

### Delete a Tag of a Question Based on the Question's id

Remove a tag from a question's tags.

* Require Authentication: true
* Require proper authorization: Question must belong to the logged in user
* Request
  * Method: DELETE
  * URL: /questions/tags/:questionId/:tagId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully Removed"
    }
    ```

* Error response: Couldn't find a Question with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Question couldn't be found"
    }
    ```

* Error response: Couldn't find the specified Tag under the Question
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Tag couldn't be found"
    }
    ```

## Follow/Save for Later

### Get all Saved Questions

Return all the questions saved by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/saved/current
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Saved": [
        {
          "id": 1,
          "userId": 1,
          "question": "How can I do x, y and z?",
          "subject": "Python is crazy!",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36" ,
        }
      ]
    }
    ```

### Save a Question for Later

Save a question for later specified by id.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/questions/:questionId/saved
  * Headers:
    * Content-Type: application/json

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Saved for later"
    }
    ```

* Error response: Couldn't find a question with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Question couldn't be found"
    }
    ```

* Error response: The current user has already saved this question
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "This question has already been saved"
    }
    ```
### Unsave a Question

Unsaves a question.

* Require Authentication: true
* Require proper authorization: Question must be saved by the current user
* Request
  * Method: DELETE
  * URL: /api/saved/:questionId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Question unsaved"
    }
    ```

* Error response: Couldn't find a saved question with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Question couldn't be found in your saved list"
    }
    ```

## Tags

### Add a Tag For a Question Based on the Question's id

Create if not exist and return all tags for a given question with id.

* Require Authentication: true
* Require proper authorization: Question must belong to the logged in user
* Request
  * Method: POST
  * URL: /tags/questions/:questionId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "tagName": "javascript"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 5,
      "tagName": "javascript"
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      {
        "tagName": [
          "Tag name must be less than 20 characters",
          // and/or
          "Tag name must not have space",
          // and/or
          "This field is required"
        ]
      }
    }
    ```

* Error response: Couldn't find a Question with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "error": "Question not found"
    }
    ```

### Get all Tags of a Question Based on the Question's id

Returns all the tags of a specific question based on its id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /tags/questions/:questionId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "Tags": [
        {
          "id": 5,
          "tagName": "javascript"
        },
        {
          "id": 6,
          "tagName": "reactjs"
        }
      ]
    }
    ```
* Error response: Couldn't find a Question with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "error": "Question not found"
    }
    ```
## Questions
### Get all questions
* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/questions
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
	"questions":[
		{
			"id": 1,
			"question": "How do I write API's?",
			"subject": "How do you make a readme",
			"User": {
				"username": "testUser"
			}
		},
		{
			"id": 2,
			"question": "How do I finish a project?",
			"subject": "What should I do?",
			"User": {
				"username": "testUser"
			}
		}
	]
    }
    ```

### Get question
* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/questions/:id
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

```json
    {
 {
	"id": 1,
	"question": "How do I write API's?",
	"subject": "How do you make a readme",
	"User": {
		"username": "testUser",
	},
	"QuestionComments": [
		{
			"id": 3,
			"comment": "This is a comment under the question",
			"User":{
				"username": "commentUser"
			}
	],
	"Answers":[
		{
			"id": 3,
			"answer": "By writing a backend"
			"User":{
				"username": "answerUser"
			},
			"AnswerComments":[
				{
					"comment": "This is the right answer",
					"User":{
						"username": "answerCommentUser"
					}
				}
			]
		}
	]

    }
 ```
* Error response: Couldn't find question
* Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
	     "message": "Question couldn't be found"
    }
    ```

### Edit Question
* Require Authentication: true
* Request
  * Method: PUT
  * URL: /api/questions/:id/edit
  * Body:
    ```json
    {
        "id": 1,
	"question": "How do I write API's?",
	"subject": "How do you make a readme",
	"userId": 1
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

   ```json
   {
	"message": "Question update"
   }
    ```

* Error response: Couldn't find question
* Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
	"message": "Question couldn't be found"
    }
    ```

* Error response: User not logged in
* Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
	"message": "User must be logged in
    }
    ```

* Error response: User unauthorized
* Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
	"message": "Unauthorized"
    }
    ```

### DELETE QUESTION
* Require Authentication: true
* Request
  * Method: DELETE
  * URL: /api/questions/:id/delete
  * Body: none

* Successful Response
  * Status Code: 204
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Question deleted"
    }
    ```

* Error response: Couldn't find question
* Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
	"message": "Question couldn't be found"
    }
    ```

* Error response: User not logged in
* Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
	"message": "User must be logged in
    }
    ```

* Error response: User unauthorized
* Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
	"message": "Unauthorized"
    }
    ```

### CREATE QUESTION
* Require Authentication: true
* Request
  * Method: CREATE
  * URL: /api/questions/new
  * Body:
 ```json
    {
	"id": 1,
	"question": "How do I write API's?",
	"subject": "How do you make a readme",
	"user_id": 2
    }
 ```

* Successful Response
  * Status Code: 204
  * Headers:
    * Content-Type: application/json
  * Body:
 ```json
    {
	"message": "Question created"
    }
 ```

* Error response: Couldn't find question
* Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
	"message": "Question couldn't be found"
    }
    ```

* Error response: User not logged in
* Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
	"message": "User must be logged in
    }
    ```
## Answers

### Get all Answers of the Current User

Returns all the answers that belong to a question specified by id.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/answers/current
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Answers": [
        {
          "id": 1,
          "userId": 1,
          "questionId": 1,
          "answer": "This is my answer",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36" ,
          "User": {
            "id": 1,
            "firstName": "John",
            "lastName": "Smith"
          },
        }
      ]
    }
    ```


* Error response: User does not have any answers
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User does not have any answers currently"
    }
    ```

### Create a Answer for a Question based on the Question's id

Create and return a new answer for a question specified by id.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/questions/:questionId/answers
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "answer": "This is the answer to your question!",
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "questionId": 1,
      "answer": "This is the answer to your question!",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "answer": "Answer text is required",
      }
    }
    ```

* Error response: Couldn't find a Question with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Question couldn't be found"
    }
    ```

* Error response: Answer from the current user already exists for the Question
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already has a Answer for this Question"
    }
    ```
### Edit a Answer

Update and return an existing answer.

* Require Authentication: true
* Require proper authorization: Answer must belong to the current user
* Request
  * Method: PUT
  * URL: /api/answers/:answerId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "answer": "This is the answer to your question!",
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "questionId": 1,
      "answer": "This is an updated answer to your question!",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "answer": "Answer text is required",
      }
    }
    ```

* Error response: Couldn't find a Answer with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Answer couldn't be found"
    }


### Delete a Answer

Delete an existing Answer.

* Require Authentication: true
* Require proper authorization: Answer must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/answers/:answerId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a Answer with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Answer couldn't be found"
    }
    ```

## Answer Comments
### Get all Answer Comments of the Current User

Returns all the answers that belong to a question specified by id.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/answers/comments/current
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "AnswerComments": [
        {
          "id": 1,
          "userId": 1,
          "questionId": 1,
          "comment": "Your answer is correct!",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36" ,
          "User": {
            "id": 1,
            "firstName": "John",
            "lastName": "Smith"
          },
        }
      ]
    }
    ```
    ```

* Error response: User does not have any answer comments
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User does not have any answer comments currently"
    }
    ```

### Create a Answer Comment for a Answer based on the Answer's id

Create and return a new answer comment for a answer specified by id.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/answers/:answerId/comments
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "comment": "This answer is correct!",
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "answerId": 1,
      "comment": "This answer is correct!",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "comment": "Comment text is required",
      }
    }
    ```

* Error response: Couldn't find a Answer with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Answer couldn't be found"
    }
    ```

    ```
### Edit a Answer Comment

Update and return an existing answer comment.

* Require Authentication: true
* Require proper authorization: Answer comment must belong to the current user
* Request
  * Method: PUT
  * URL: /api/answers/comments/:commentId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "comment": "This answer is wrong!",
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "questionId": 1,
      "comment": "This answer is wrong!",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "comment": "Comment text is required",
      }
    }
    ```

* Error response: Couldn't find a Answer Comment with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Comment couldn't be found"
    }


### Delete a Answer Comment

Delete an existing Answer Comment.

* Require Authentication: true
* Require proper authorization: Answer Comment must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/answers/comments/:commentId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a Answer Comment with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Comment couldn't be found"
    }
