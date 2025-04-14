import { UseFormRegister } from "react-hook-form";

interface UserFormProps {
  index: number;
  onDelete: () => void;
  register: UseFormRegister<any>;
}

const UserForm = ({ index, onDelete, register }: UserFormProps) => {
  return (
    <div className="user-form">
      <div className="user-form-header">
        <h3>User - {index}</h3>
        <button type="button" className="delete-btn" onClick={onDelete}>
          ✕
        </button>
      </div>
      <div className="form-group">
        <div className="form-group-details">
          <label htmlFor={`name-${index}`}>Name</label>
          <input id={`name-${index}`} {...register(`users.${index}.name`)} />
        </div>
        <div className="form-group-details">
          <label htmlFor={`password-${index}`}>Password</label>
          <input
            id={`password-${index}`}
            type="password"
            {...register(`users.${index}.password`)}
          />
        </div>
      </div>
    </div>
  );
};

export default UserForm;
