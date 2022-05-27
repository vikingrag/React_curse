import React, { useState } from 'react';
import './App.css';

const initialValues = {
  userName: '',
  userSurname: '',
  userSalary: ''

}

function App() {
  const [userDate, setUserDate] = useState(initialValues);
  const [users, setUsers] = useState([]);
  const [editableUserDate, setEditableUserDate] = useState({
    isEdit: false,
    userIndex: null
  })

  const handleRemoveClick = (index) => {
    setUsers(users.filter((user, userIndex) => userIndex !== index));

  }

  const isFilledFirlds = userDate.userName && userDate.userSurname && userDate.userSalary;

  const handleSubmitUser = (e) => {
    e.preventDefault();

    if (isFilledFirlds) {
      if (editableUserDate.isEdit) {
        const editedData = users;
        editedData.splice(editableUserDate.userDate, 1, userDate)

        setUsers(editedData);

        setEditableUserDate({
          isEdit: false,
          userIndex: null

        })

      } else {
        setUsers((prevState) => [...prevState, userDate])
      }

      setUserDate(initialValues)

    }

  }

  const handleCleanClick = () => setUserDate(initialValues);
  const handleEditClick = (data, index) => {
    setUserDate(data);

  }

  console.log('userDate: ', userDate);


  return (
    <div className='wrapper'>
      <div className='wrapper-content'>
        <div className='table-date'>
          <tadle>
            <th>#</th>
            <th>User Name</th>
            <th>User Surname</th>
            <th>User Salary</th>
            <th>Actions</th>

            <tbody>
              {users.map((user, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{user.userName}</td>
                  <td>{user.userSurname}</td>
                  <td>{user.userSalary}</td>
                  <td>
                    <div>
                      <button className='edit-ection' onClick={() => handleEditClick(user, index)}>edit</button>
                      <button className='remove-action' onClick={() => handleRemoveClick(index)}>remove</button>

                    </div>
                  </td>

                </tr>
              ))}

            </tbody>

          </tadle>
        </div>
        <div>

          <form onSubmit={handleSubmitUser}>
            <input placeholder='Write your name' onChange={(e) => setUserDate((prevState) => ({
              ...prevState,
              userName: e.target.value
            }))}
              value={userDate.userName}
            />

            <input placeholder='Write your surname' onChange={(e) => setUserDate((prevState) => ({
              ...prevState,
              userSurname: e.target.value
            }))}
              value={userDate.userSurname}
            />

            <input placeholder='Write your salary' onChange={(e) => setUserDate((prevState) => ({
              ...prevState,
              userSalary: e.target.value
            }))}
              value={userDate.userSalary}
            />

            <div className='buttons-wrapper'>
              <button type='reset'>Clean</button>
              <button type='submit'>Add</button>
            </div>

          </form>

        </div>

      </div >
    </div >

  );
}

export default App;


