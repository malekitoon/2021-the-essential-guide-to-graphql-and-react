import axios from 'axios';

function App() {
  const addUserHandler = () => {
    const userData = {
      email: 'rebekka@gmail.com',
      password: 'test123',
    };

    axios({
      url: '/graphql',
      method: 'post',
      data: {
        query: `
          mutation {
            addUser(
              userInput: {
                email: "${userData.email}"
                password: "${userData.password}"
              }
            ) {
              _id
              email
              password
            } 
          }
        `
      }
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      })
  };

  return (
    <div className="App">
      <button onClick={addUserHandler}>
        ADD USER
      </button>
    </div>
  );
}

export default App;
