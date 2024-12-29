import React, { useState } from "react";
import { useAuth } from "../../../context/AuthProvider";

const AuthPage = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", role: "user" });

  const handleLogin = () => {
    login({ username: form.username, role: form.role });
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AuthPage;
