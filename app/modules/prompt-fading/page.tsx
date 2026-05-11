import { BehaviorChangeModule } from "@/components/behavior-change-module";
import { behaviorChangeModules } from "@/lib/modules/behavior-change-modules";

export default function PromptFadingModulePage() {
  return <BehaviorChangeModule module={behaviorChangeModules["prompt-fading"]} />;
}
