# Stack-Flow

## BACKEND API

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

### Add Tags For a Question Based on the Question's id

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
      "Tags": [
        {
          "tagName": "javascript"
        },
        {
          "tagName": "reactjs"
        }
      ]
    }
    ```

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

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "tagName": "tagName can't have space or capitalized letters"
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




