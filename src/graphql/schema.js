import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from "graphql";

const PersonType = new GraphQLObjectType({
  name: "Person",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  }
});

const peopleData = [
  { id: 1, name: "John Smith" },
  { id: 2, name: "Sara Smith" },
  { id: 3, name: "Budd Deey" }
];

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    person: {
      type: PersonType,
      // `args` describes the arguments that the `user` query accepts
      args: {
        id: { type: GraphQLID }
      },
      resolve: (_, { id }) => {
        return peopleData.find(p => p.id == id);
      }
    }
  }
});

export const schema = new GraphQLSchema({ query: QueryType });
