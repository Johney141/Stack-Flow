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
