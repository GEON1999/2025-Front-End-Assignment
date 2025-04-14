import { useState } from "react";
import "./App.css";
import UserForm from "./components/UserForm";
import { User } from "./types";
import { useForm } from "react-hook-form";

function App() {
  const [users, setUsers] = useState<User[]>([
    { id: "0", name: "", password: "" },
  ]);
  const [confirmedUsers, setConfirmedUsers] = useState<User[]>([]);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      users: users,
    },
  });

  const addUser = () => {
    const newId = Date.now().toString() + Math.floor(Math.random() * 1000);
    setUsers([...users, { id: newId, name: "", password: "" }]);
  };

  const deleteUser = (index: number) => {
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
  };

  const onSubmit = (data: any) => {
    setConfirmedUsers(data.users);
    setIsConfirmed(true);
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="user-forms">
          {users.map((user, index) => (
            <UserForm
              key={user.id}
              index={index}
              onDelete={() => deleteUser(index)}
              register={register}
            />
          ))}
        </div>
        <div className="form-actions">
          <button type="button" onClick={addUser}>
            Add User
          </button>
          <button type="submit">Confirm</button>
        </div>
      </form>
      {isConfirmed && (
        <div className="confirmed-users">
          {confirmedUsers.map((user, index) => (
            <div key={index} className="user-info">
              <p>
                <label>Name:</label>
                <span>{user.name}</span>
              </p>
              <p>
                <label>Password:</label>
                <span>{user.password}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
