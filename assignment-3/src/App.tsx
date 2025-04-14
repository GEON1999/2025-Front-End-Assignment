import { useState, useEffect } from "react";
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

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      users: users,
    },
    mode: "all",
  });

  const formValues = watch();

  useEffect(() => {
    setValue("users", users);
  }, [users, setValue]);

  const validateDuplicateName = (name: string, index: number) => {
    if (!name) return true;

    const formUsers = formValues.users || [];
    return !formUsers.some(
      (user: any, i: number) => i !== index && user && user.name === name
    );
  };

  const addUser = () => {
    const newId = Date.now().toString() + Math.floor(Math.random() * 1000);
    const currentFormUsers = [...(formValues.users || [])];

    const newUsers = [
      ...currentFormUsers,
      { id: newId, name: "", password: "" },
    ];
    setUsers(newUsers);
    setValue("users", newUsers);
  };

  const deleteUser = (index: number) => {
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
    setValue("users", newUsers);
  };

  const onSubmit = (data: any) => {
    setConfirmedUsers(data.users);
    setIsConfirmed(true);
  };

  const replacePassword = (password: string) => {
    const visiblePart = password.substring(0, 3);
    const hiddenPart = "*".repeat(password.length - 3);

    return visiblePart + hiddenPart;
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
              errors={errors}
              validateDuplicateName={(value) =>
                validateDuplicateName(value, index)
              }
            />
          ))}
        </div>
        <div className="form-actions">
          <button type="button" onClick={addUser}>
            Add User
          </button>
          <button type="submit" disabled={!isValid}>
            Confirm
          </button>
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
                <span>{replacePassword(user.password)}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
