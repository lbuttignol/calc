# EJERCICIO:
1) Escribir una calculadora simple con las siguientes funcionalidades:
   La calculadora debe soportar:
   suma,
   resta, 
   multiplicación,
   división
2) Se tiene que poder persistir una sesión de cálculo
3) Se tiene que poder recuperar una sesión de cálculo almacenada.

# Ejemplo:
input: 2+2
output: 4

input: 5*3*(8-23)
output: -225

input: guardar sesion 1
output: sesion1 almacenada

input: recuperar sesion 1
output: 2+2 = 4

El motor de cálculo de esta aplicación tendría que estar en un servidor Node.js / PHP/ JAVA / Ruby or Rails, con una base de persistencia en Mongo, MySQL, MSSQL, PSQL y su interfaz tendría que ser REST (en lo posible).

# Problem Solution

This project has a file that handle the server ```server.js```, another to manage a db conection ```database.js``` and finally ```index.html``` a file with a tiny page to use all the functions writen in the first file.

# Help to install the packages
```npm install```

# Help to init the db-client

To init the database run the following command: 
```$mongo```
// inside mongo must to connect to the databaserun the following command in the db-client:
```$use CalculatorDB```
// to find all the elements on the database run:
```$db.operations.find({}) ```

# Help to init the server.

To start the application run :
```$node server```

## API

# Method: GET "/"
Return the init page

# Method: GET "/all"
Find all the stored operations in JSON format:

{
	_id:
	input:
	output:
}

# Method: POST "/"
Insert an Operation in the database.
Body parameters expected:
{
	input:
}

# Method: GET "/:id"
Find operation in database


# Method: PUT "/:id"
Update an operation 
Body parameters expected:
{
	input
}

# Method: DELETE "/:id"
Delete an operation


