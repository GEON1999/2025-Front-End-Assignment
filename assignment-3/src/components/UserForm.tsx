import { UseFormRegister } from "react-hook-form";

interface UserFormProps {
  index: number;
  onDelete: () => void;
  register: UseFormRegister<any>;
  errors: any;
}

const UserForm = ({ index, onDelete, register, errors }: UserFormProps) => {
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
          <input
            id={`name-${index}`}
            className={errors.users?.[index]?.name ? "error-input" : ""}
            {...register(`users.${index}.name`, {
              required: true,
              minLength: 3,
            })}
          />
          {errors.users?.[index]?.name && (
            <p className="error-message">
              Name must be at least 3 characters long.
            </p>
          )}
        </div>
        <div className="form-group-details">
          <label htmlFor={`password-${index}`}>Password</label>
          <input
            id={`password-${index}`}
            type="password"
            className={errors.users?.[index]?.password ? "error-input" : ""}
            {...register(`users.${index}.password`, {
              required: true,
              minLength: 6,
            })}
          />
          {errors.users?.[index]?.password?.type === "minLength" && (
            <p className="error-message">
              Password must be at least 6 characters long.
            </p>
          )}
          {errors.users?.[index]?.password?.type === "required" && (
            <p className="error-message">Password is required.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserForm;
