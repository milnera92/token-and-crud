# How to Use:
In Insomnia or Postman, go to https://token-crud-test.onrender.com/ and one of the following endpoints to generate a token:
GET /generate-read-token
GET /generate-manage-token
GET /generate-read-manage-token
GET /generate-admin-token

So https://token-crud-test.onrender.com/generate-read-token for example will give 
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtaXNzaW9uIjoicmVhZF9wcm9kdWN0IiwiaWF0IjoxNjc1ODExMjg0LCJleHAiOjE2NzU4MTE4ODR9.YMZqFAUejyf8IzHQzfvUrbqaPTYnVh3OVGzcsOWZhFw"
}

Take the token, and go to one of the following endpoints in the product service:
GET /products
GET /products/:id"
POST /products
PUT /products/:id
DELETE /products/:id
DELETE /products/:id/hard

For example, https://token-crud-test.onrender.com/products with the headers set like the following : 

![image](https://user-images.githubusercontent.com/95140821/217388097-6f7a8cc6-acb3-4ed4-a816-537339036d5f.png)

Will return these items from the database hosted on ElephantSQL:

[
	{
		"id": 1,
		"name": "Product A",
		"description": "This is product A",
		"status": "active",
		"price": 10.99,
		"created_at": "2023-02-07T15:52:01.240Z",
		"updated_at": "2023-02-07T15:52:01.240Z"
	},
	{
		"id": 2,
		"name": "Product B",
		"description": "This is product B",
		"status": "active",
		"price": 20.99,
		"created_at": "2023-02-07T15:52:01.295Z",
		"updated_at": "2023-02-07T15:52:01.295Z"
	}
]

That's it !

# To-Do:
- Finish simple front end for testing these endpoints

# Completed So Far:
Hosting the PostgresSQL DB on ElephantSQL:
![image](https://user-images.githubusercontent.com/95140821/217340093-de2b508a-5eb6-45f2-b417-1d62feb88858.png)

Created tables for the products and tokens, in preperation of my seed script for the test data:
![image](https://user-images.githubusercontent.com/95140821/217340291-2175765e-b011-42c6-ad37-b2fe0bc6e6cf.png)

Seeded in some test data:
![image](https://user-images.githubusercontent.com/95140821/217340389-e68b133c-2fec-45d8-b8c2-a04f0bacd0a7.png)

Now we have some products! (Price needs to be fixed, changed price to floating point):
*This has been fixed, price now TYPE FLOAT
![image](https://user-images.githubusercontent.com/95140821/217340567-a1a2d5d2-f6d9-4939-9ad7-16d245f894ef.png)

We can also use the following endpoints to generate tokens, which are also stored in the DB on Elephant:
![image](https://user-images.githubusercontent.com/95140821/217340750-5eac3798-e563-4f33-8ccd-f7df2e01bb31.png)
![image](https://user-images.githubusercontent.com/95140821/217340788-7e9f18f0-62af-4702-ae32-5a0ac5203841.png)

I've written these handlers for the tokens that the endpoints call:
![image](https://user-images.githubusercontent.com/95140821/217340901-c9a65344-3f00-470e-8979-22a998542a08.png)

But for the products I just have the function right in the endpoint. Need to change this:
![image](https://user-images.githubusercontent.com/95140821/217340984-490bd72d-a40f-4ef1-928b-45e04abe23d1.png)

Insomnia test works: 
![image](https://user-images.githubusercontent.com/95140821/217383413-f977a685-8e99-4c38-87f3-2334998cd29b.png)
![image](https://user-images.githubusercontent.com/95140821/217383454-903727ef-901f-4d2e-bd6e-22a621181db7.png)

Now lets try and host the node.js server on Render.com. This way, anyone can use one of the 4 endpoints to generate a token, then use that token to access the products services:
![image](https://user-images.githubusercontent.com/95140821/217386466-9bc09fe2-9aea-433b-bf3c-d6bb685100d7.png)
Works!
![image](https://user-images.githubusercontent.com/95140821/217387136-a9a9a8f6-007f-415e-9fe9-56309a5ae3e9.png)








