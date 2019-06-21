# prisma-graphql

![Alt text](https://user-images.githubusercontent.com/5340832/59903086-aeda1100-941d-11e9-8ed4-a6e34904f08f.png)


Get project running:

	Install dependencies
	- yarn install
	
	Deploy postgres and prisma in docker
	- cd prisma
	- docker-compose up -d
	- prisma deploy

	Populating database with values
	- prisma seed --reset

	Starting nodejs server
	- yarn start 