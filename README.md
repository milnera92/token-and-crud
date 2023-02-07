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







