import { BehaviorChangeModule } from "@/components/behavior-change-module";
import { behaviorChangeModules } from "@/lib/modules/behavior-change-modules";

export default function ShapingModulePage() {
  return <BehaviorChangeModule module={behaviorChangeModules.shaping} />;
}
