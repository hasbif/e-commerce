# e-commerce


# Server

___
## RESTful endpoints
___

### POST /register
##### register new customer
___
_Request Body_
```json
{
	"email": "email@email.com",
	"password":"password"
}
```
_Response ( 201 - Succes)_
```json
{
  "access_token": <token>,
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Email already taken"
}
```
_Response (500 - Server Error)_
```json
{
  "message": "Internal Server Error"
}
```
___
### POST /login
##### login existing user
___

_Request Body_
```json
{
	"email": "email@email.com",
	"password":"password"
}
```

_Response ( 201 )_
```json
{
  "access_token": <token>,
}
```

_Error Response ( 400 - email or password wrong)_
```json
{
  "message": "Email/Password Invalid"
}
```


_Response (500 - Server Error)_
```json
{
    "message": "Internal Server Error"
}
```
___
### GET /products
##### get all products craeted by admin
___

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```json
[
    {
        "id": 1,
        "name": "Product 1",
        "image": "https://imageurl.com",
        "price": 10000,
        "stock": 100,
        "createdAt": "2020-04-14T15:57:58.785Z",
        "updatedAt": "2020-04-14T15:57:58.785Z"
    },
    ...
]
```
_Response (500 - Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

____________
### GET /products/:id
##### get one products by id
____________
_Request Header_
```json
{
  "access_token": <token>
}
```

_Request Params_
```json
{
  "id": 1
}
```

_Request Body_
```json
not needed
```

_Response (200)_
```json
{
    "id": 1,
    "name": "Product 1",
    "image": "https://imageurl.com",
    "price": 10000,
    "stock": 100,
    "createdAt": "2020-04-14T15:57:58.785Z",
    "updatedAt": "2020-04-14T15:57:58.785Z"
}
```
_Response (404 - Not Found)_
```json
{
  "message": "Product not found"
}
```
_Response (500 - Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

_________
### PUT /products/:id
##### update existing product
_________
_Request Header_
```json
{
  "access_token": <token>
}
```

_Request Params_
```json
{
  "id": 2
}
```

_Request Body_
```json
{
    "cart": [
    {
        "id": 3,
        "email": "email@mail.com",
        "password": "password",
        "createdAt": "2020-04-21T16:25:17.900Z",
        "updatedAt": "2020-04-21T16:25:17.900Z",
        "Carts": [
            {
                "CustomerId": 3,
                "ProductId": 1,
                "amount": 1,
                "createdAt": "2020-04-21T16:52:34.602Z",
                "updatedAt": "2020-04-21T16:52:34.602Z",
                "Product": {
                    "id": 1,
                    "name": "product 1",
                    "image_url": "google.com",
                    "price": 12000000,
                    "stock": 13,
                    "category": "smartphone",
                    "description": "new",
                    "AdminId": 1,
                    "createdAt": "2020-04-18T07:14:51.377Z",
                    "updatedAt": "2020-04-18T07:21:30.246Z"
                }
            },
            {
                "CustomerId": 3,
                "ProductId": 2,
                "amount": 2,
                "createdAt": "2020-04-21T16:52:34.602Z",
                "updatedAt": "2020-04-21T16:52:34.602Z",
                "Product": {
                    "id": 2,
                    "name": "product 2",
                    "image_url": "google.com",
                    "price": 13000000,
                    "stock": 3,
                    "category": "smartphone",
                    "description": "new",
                    "AdminId": 1,
                    "createdAt": "2020-04-18T07:15:25.991Z",
                    "updatedAt": "2020-04-18T07:23:48.930Z"
                }
            }
        ]
    }
],

}
```

_Response (200)_
```json
for amount of Carts length
[
  1,
  [
    {
        "id": 1,
        "name": "Product 1",
        "image": "imageurl.com",
        "price": 10000,
        "stock": 12,
        "createdAt": "2020-04-14T15:57:58.785Z",
        "updatedAt": "2020-04-14T15:57:58.785Z"
    }
  ]
]
```

_Response (400 - Authorization)_
```json
{
  "message": "You are not authorized"
}
```
_Response (500 - Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

_______________
### GET /cart
##### get cart based on CustomerId
___

_Request Header_
```json
{
  "access_token": <token>
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
[
    "cart": [
    {
        "id": 3,
        "email": "email@mail.com",
        "password": "password",
        "createdAt": "2020-04-21T16:25:17.900Z",
        "updatedAt": "2020-04-21T16:25:17.900Z",
        "Carts": [
            {
                "CustomerId": 3,
                "ProductId": 1,
                "amount": 1,
                "createdAt": "2020-04-21T16:52:34.602Z",
                "updatedAt": "2020-04-21T16:52:34.602Z",
                "Product": {
                    "id": 1,
                    "name": "product 1",
                    "image_url": "google.com",
                    "price": 12000000,
                    "stock": 13,
                    "category": "smartphone",
                    "description": "new",
                    "AdminId": 1,
                    "createdAt": "2020-04-18T07:14:51.377Z",
                    "updatedAt": "2020-04-18T07:21:30.246Z"
                }
            },
            {
                "CustomerId": 3,
                "ProductId": 2,
                "amount": 2,
                "createdAt": "2020-04-21T16:52:34.602Z",
                "updatedAt": "2020-04-21T16:52:34.602Z",
                "Product": {
                    "id": 2,
                    "name": "product 2",
                    "image_url": "google.com",
                    "price": 13000000,
                    "stock": 3,
                    "category": "smartphone",
                    "description": "new",
                    "AdminId": 1,
                    "createdAt": "2020-04-18T07:15:25.991Z",
                    "updatedAt": "2020-04-18T07:23:48.930Z"
                }
            }
        ]
    ...
]
```
_Response (500 - Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

___
### POST /cart
##### create new cart
___

_Request Header_
```json
{
  "access_token": <token>
}
```

_Request Body_
```json
{
    "ProductId": 1,
    "amount": 1
}
```

_Response (200)_
```json
{
    "id": 2,
    "productId": 1,
    "CustomerId": 1,
    "amount": 1,
    "stock": 100,
    "createdAt": "2020-04-14T15:57:58.785Z",
    "updatedAt": "2020-04-14T15:57:58.785Z"
}
```


_Response (500 - Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

____________
_________
### PUT /cart/:id
##### update existing cart
_________
_Request Header_
```json
{
  "access_token": <token>
}
```

_Request Params_
```json
{
  "id": 2
}
```

_Request Body_
```json
{
    "amount": 3
}
```

_Response (200)_
```json

  {
    "id": 2,
    "productId": 1,
    "CustomerId": 1,
    "amount": 3,
    "stock": 100,
    "createdAt": "2020-04-14T15:57:58.785Z",
    "updatedAt": "2020-04-14T15:57:58.785Z"
}

```
_Response (404 - Not Found)_
```json
{
  "message": "Cart not found"
}
```
_Response (400 - Authorization)_
```json
{
  "message": "You are not authorized"
}
```
_Response (500 - Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

### DELETE /cart/
##### delete existing cart by customer id
_______________
_Request Header_
```json
{
  "access_token": <token>
}
```
_Request Params_
```json
{
  "id": 2
}
```

_Request Body_
```
not needed
```
_Response (200)_
```json
{
    "msg": "product deleted"
}
```
_Response (404 - Not Found)_
```json
{
    "message": "Cart not found"
}
```

_Response (500 - Server Error)_
```json
{
  "message": "Internal Server Error"
}
```
_______________
### DELETE /cart/:id
##### delete existing cart by id
_______________
_Request Header_
```json
{
  "access_token": <token>
}
```
_Request Params_
```json
{
  "id": 2
}
```

_Request Body_
```
not needed
```
_Response (200)_
```json
{
    "id": 2,
    "productId": 1,
    "CustomerId": 1,
    "amount": 3,
    "stock": 100,
    "createdAt": "2020-04-14T15:57:58.785Z",
    "updatedAt": "2020-04-14T15:57:58.785Z"
}
```
_Response (404 - Not Found)_
```json
{
    "message": "Cart not found"
}
```
_Response (400 - Authorization)_
```json
{
  "message": "You are not authorized"
}
```
_Response (500 - Server Error)_
```json
{
  "message": "Internal Server Error"
}
```