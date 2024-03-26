import { RoutesCompare } from "$/components/RoutesCompare";
import { NewDataProvider } from "$/providers/NewDataProvider";
import { PrevDataProvider } from "$/providers/PrevDataProvider";

export default function Home() {
  return (
    <PrevDataProvider>
      <NewDataProvider>
        <RoutesCompare />
      </NewDataProvider>
    </PrevDataProvider>
  );
}
