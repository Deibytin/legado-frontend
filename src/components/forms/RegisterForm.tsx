"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["ADMIN", "COACH", "PLAYER"]),
});

type RegisterFormData = z.infer<typeof schema>;

export function RegisterForm() {
  const { register: registerUser } = useAuth();
  const { t } = useI18n();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "", role: "PLAYER" },
  });

  const onSubmit = async (values: RegisterFormData): Promise<void> => {
    try {
      setError(null);
      await registerUser(values);
      router.push("/dashboard");
    } catch {
      setError("Unable to create account");
    }
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input error={errors.name?.message} label={t("name")} {...register("name")} />
      <Input error={errors.email?.message} label={t("email")} type="email" {...register("email")} />
      <Input
        error={errors.password?.message}
        label={t("password")}
        type="password"
        {...register("password")}
      />
      <Select
        error={errors.role?.message}
        label={t("role")}
        options={[
          { label: "PLAYER", value: "PLAYER" },
          { label: "COACH", value: "COACH" },
          { label: "ADMIN", value: "ADMIN" },
        ]}
        {...register("role")}
      />
      {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
      <Button disabled={isSubmitting} type="submit">
        {t("register")}
      </Button>
      <Link className="text-center text-sm font-semibold text-brand" href="/login">
        {t("login")}
      </Link>
    </form>
  );
}
