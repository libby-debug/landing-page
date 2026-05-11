import { BehaviorChangeModule } from "@/components/behavior-change-module";
import { behaviorChangeModules } from "@/lib/modules/behavior-change-modules";

export default function ExtinctionModulePage() {
  return <BehaviorChangeModule module={behaviorChangeModules.extinction} />;
}
