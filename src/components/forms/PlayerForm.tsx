"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useI18n } from "@/context/I18nContext";
import { CreatePlayerPayload } from "@/types/player";

const schema = z.object({
  name: z.string().min(2),
  position: z.string().min(2),
  birthDate: z.string().min(1),
  teamId: z.string().uuid(),
});

interface PlayerFormProps {
  onSubmit: (payload: CreatePlayerPayload) => Promise<void>;
}

export function PlayerForm({ onSubmit }: PlayerFormProps) {
  const { t } = useI18n();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<CreatePlayerPayload>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", position: "", birthDate: "", teamId: "" },
  });

  const submit = async (payload: CreatePlayerPayload): Promise<void> => {
    await onSubmit(payload);
    reset();
  };

  return (
    <form className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900" onSubmit={handleSubmit(submit)}>
      <div className="grid gap-4 md:grid-cols-2">
        <Input error={errors.name?.message} label={t("name")} {...register("name")} />
        <Input error={errors.position?.message} label={t("position")} {...register("position")} />
        <Input error={errors.birthDate?.message} label={t("birthDate")} type="date" {...register("birthDate")} />
        <Input error={errors.teamId?.message} label={t("teamId")} {...register("teamId")} />
      </div>
      <Button className="w-fit" disabled={isSubmitting} type="submit">
        {t("create")}
      </Button>
    </form>
  );
}
