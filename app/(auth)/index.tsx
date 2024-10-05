import React from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import LayoutAuth from "@/components/auth/LayoutAuth";

export default function Login() {
  return (
    <LayoutAuth>
      <LoginForm />
    </LayoutAuth>
  );
}
