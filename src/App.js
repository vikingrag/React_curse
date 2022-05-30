import React, { useState } from 'react';
import './App.css';

const initialValues = {
  userName: '',
  userSurname: '',
  userSalary: ''

}

function App() {
  const [UserData, setUserData] = useState(initialValues);
  const [users, setUsers] = useState([]);
  const [editableUserData, setEditableUserData] = useState({
    isEdit: false,
    userIndex: null
  })

  const handleRemoveClick = (index) => {
    setUsers(users.filter((user, userIndex) => userIndex !== index));

  }

  const isFilledFields = UserData.userName && UserData.userSurname && UserData.userSalary;

  const handleSubmitUser = (e) => {
    e.preventDefault();

    if (isFilledFields) {
      if (editableUserData.isEdit) {
        const editedData = users;
        editedData.splice(editableUserData.userIndex, 1, UserData);

        setUsers(editedData);

        setEditableUserData({
          isEdit: false,
          userIndex: null

        })

      } else {
        setUsers((prevState) => [...prevState, UserData]);
      }

      setUserData(initialValues)

    }

  }

  const handleCleanClick = () => setUserData(initialValues);

  const handleEditClick = (data, index) => {
    setUserData(data);
    setEditableUserData({
      isEdit: true,
      userIndex: index
    })

  }

  console.log('userData: ', UserData);


  return (
    <div className='wrapper'>
      <div className='wrapper-content'>
        <div className='table-data'>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>User Surname</th>
                <th>User Salary</th>
                <th>Actions</th>
              </tr>
            </thead>



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

          </table>
        </div>
        <div>

          <form onSubmit={handleSubmitUser} onReset={handleCleanClick}>
            <input placeholder='Write your name' onChange={(e) => setUserData((prevState) => ({
              ...prevState,
              userName: e.target.value
            }))}
              value={UserData.userName}
            />

            <input placeholder='Write your surname' onChange={(e) => setUserData((prevState) => ({
              ...prevState,
              userSurname: e.target.value
            }))}
              value={UserData.userSurname}
            />

            <input placeholder='Write your salary' onChange={(e) => setUserData((prevState) => ({
              ...prevState,
              userSalary: e.target.value
            }))}
              value={UserData.userSalary}
            />

            <div className='buttons-wrapper'>
              <button type='reset'>Clean</button>
              <button disabled={!isFilledFields} type='submit'>{editableUserData.isEdit ? 'Edit' : 'Add'}</button>
            </div>

          </form>

        </div>

      </div >
    </div >

  );
}

export default App;


