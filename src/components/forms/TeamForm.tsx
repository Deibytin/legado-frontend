"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useI18n } from "@/context/I18nContext";
import { CreateTeamPayload } from "@/types/team";

const schema = z.object({
  name: z.string().min(2),
  coachId: z.string().uuid(),
});

interface TeamFormProps {
  onSubmit: (payload: CreateTeamPayload) => Promise<void>;
}

export function TeamForm({ onSubmit }: TeamFormProps) {
  const { t } = useI18n();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<CreateTeamPayload>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", coachId: "" },
  });

  const submit = async (payload: CreateTeamPayload): Promise<void> => {
    await onSubmit(payload);
    reset();
  };

  return (
    <form className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900" onSubmit={handleSubmit(submit)}>
      <div className="grid gap-4 md:grid-cols-2">
        <Input error={errors.name?.message} label={t("name")} {...register("name")} />
        <Input error={errors.coachId?.message} label={t("coachId")} {...register("coachId")} />
      </div>
      <Button className="w-fit" disabled={isSubmitting} type="submit">
        {t("create")}
      </Button>
    </form>
  );
}
