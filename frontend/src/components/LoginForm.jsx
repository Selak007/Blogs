import React from "react";

const initialErrors = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState(initialErrors);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const nextErrors = { ...initialErrors };
    let hasError = false;

    if (!trimmedEmail) {
      nextErrors.email = "Email is required";
      hasError = true;
    }

    if (trimmedPassword.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
      hasError = true;
    }

    setErrors(nextErrors);

    if (hasError) {
      setIsSuccess(false);
      return;
    }

    setIsSuccess(true);
    setErrors(initialErrors);
  };

  const isSubmitDisabled = !email.trim() && !password.trim();

  if (isSuccess) {
    return (
      <div className="login-card success-message" role="status">
        <p>Successfully logged in!</p>
      </div>
    );
  }

  return (
    <div className="login-card">
      <h2>Sign In</h2>
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            placeholder="you@example.com"
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p className="error-text" role="alert" id="email-error">
              {errors.email}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          {errors.password && (
            <p className="error-text" role="alert" id="password-error">
              {errors.password}
            </p>
          )}
        </div>

        <div className="login-actions">
          <button type="submit" disabled={isSubmitDisabled}>
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
