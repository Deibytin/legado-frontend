"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type LoginFormData = z.infer<typeof schema>;

export function LoginForm() {
  const { login } = useAuth();
  const { t } = useI18n();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormData): Promise<void> => {
    try {
      setError(null);
      await login(values);
      router.push("/dashboard");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input error={errors.email?.message} label={t("email")} type="email" {...register("email")} />
      <Input
        error={errors.password?.message}
        label={t("password")}
        type="password"
        {...register("password")}
      />
      {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
      <Button disabled={isSubmitting} type="submit">
        {t("login")}
      </Button>
      <Link className="text-center text-sm font-semibold text-brand" href="/register">
        {t("register")}
      </Link>
    </form>
  );
}
