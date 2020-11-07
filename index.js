const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const  { 
	GraphQLSchema , 
	GraphQLObjectType , 
	GraphQLString , 
	GraphQLList , 
	GraphQLInt , 
	GraphQLNonNull , 
} = require('graphql');
const app = express();
const PORT = 5000;


const books = [
	{ id : 0 , title : "Sandhu is here" } , 
	{ id : 1 , title : "Sandhu is here" } , 
	{ id : 2 , title : "Sandhu is here" } , 
	{ id : 3 , title : "Sandhu is here" } , 
	{ id : 4 , title : "Sandhu is here" } , 
	{ id : 5 , title : "Sandhu is here" } , 

]

const BookType = new GraphQLObjectType({
	name : "Book" , 
	description : "dv" , 
	fields : () => ({
		id : { type : GraphQLNonNull(GraphQLInt) } , 
		title : { type : GraphQLNonNull(GraphQLString) } , 
	})
})

const RootQueryType = new GraphQLObjectType({
	name : "Query" , 
	description : "Root Query" , 
	fields : () => ({
		books : {
			type : new GraphQLList(BookType) , 
			description : "List of Books" , 
			resolve : (book) => books
		}
	})
});


const schema = new GraphQLSchema({
	query : RootQueryType , 
});

app.use('/api' , graphqlHTTP({ 
	schema : schema , 
	graphiql : true , 
}));

async function main(argument) {
	try {
       app.listen(PORT , () => console.log("Server is running at "+PORT));
	} catch(e) {
		console.log(e);
	}
}

main();