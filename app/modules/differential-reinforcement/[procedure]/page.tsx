import { notFound, redirect } from "next/navigation";
import {
  differentialReinforcementProcedures,
  getProcedure,
  getStepHref,
} from "@/lib/modules/differential-reinforcement";

type ProcedurePageProps = {
  params: Promise<{
    procedure: string;
  }>;
};

export function generateStaticParams() {
  return differentialReinforcementProcedures.map((procedure) => ({
    procedure: procedure.slug,
  }));
}

export default async function DifferentialReinforcementProcedurePage({
  params,
}: ProcedurePageProps) {
  const { procedure: procedureSlug } = await params;
  const procedure = getProcedure(procedureSlug);

  if (!procedure) {
    notFound();
  }

  redirect(getStepHref(procedure.slug, "visual-comparison"));
}
