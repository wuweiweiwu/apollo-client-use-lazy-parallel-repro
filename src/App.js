import React from "react";
import { gql, useLazyQuery } from "@apollo/client";

const PERSON = gql`
  query Person($id: ID!) {
    person(id: $id) {
      id
      name
    }
  }
`;

export default function App() {
  const [people, setPeople] = React.useState([]);
  const ids = [1, 2, 3];

  const [getPerson] = useLazyQuery(PERSON, {
    onCompleted: data => {
      console.log("completed");
      setPeople(prev => prev.concat(data.person));
    }
  });

  const contrivedFetch = () => {
    ids.forEach(id => {
      console.log("calling", id);
      getPerson({ variables: { id } });
    });
  };

  return (
    <main>
      <h1>Apollo Client Issue Reproduction</h1>
      <p>
        This application can be used to demonstrate an error in Apollo Client.
      </p>
      <button onClick={contrivedFetch}>Fetch people</button>
      <h2>Names</h2>

      <ul>
        {people.map(person => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    </main>
  );
}
