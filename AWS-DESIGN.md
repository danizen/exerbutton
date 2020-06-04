# Exerbutton

## Data Model

On AWS, we store the data in DynamoDB, and we use single single table design.
The hash_key is always the `user_id`, and the `type` is always the range key. 

### Buttons


Buttons table determines what buttons to show
  - user_id(hash_key=True)
  - type ("btn:" + uuid)
  - name
  - color
  - archived

### DailyActivity

Holds data for what happened for each user on each day
  - user_id(hash_key=True)
  - type ("activity:" + date)
  - map of button uuid to count
 
### Drawing the table

SPA fetches non-archived buttons first, and shows all these buttons.
SPA fetches button presses in the past week, and processes them.
If a user presses a button, the application bulk creates a new button press

If the user wants analytics, we might need to retrieve the data for a particular button, so we'd better have a secondary index on uuid projecting everything.

## Architecture

- Cognito pool with Google and Facebook
- API - Lambda functions with AWS API Gateway secured by JWT
- JavaScript and HTML published to S3 and served by CloudFront
- JavaScript runs authentication through Cognito and forwards JWT
https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-integrate-with-cognito.html

## API Operations

- GET users active buttons
- Create button
- Edit button
- Archive button
- Press Button - activity
