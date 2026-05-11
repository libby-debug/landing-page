import { BehaviorChangeModule } from "@/components/behavior-change-module";
import { behaviorChangeModules } from "@/lib/modules/behavior-change-modules";

export default function PromptingModulePage() {
  return <BehaviorChangeModule module={behaviorChangeModules.prompting} />;
}
