import Header from "../../features/header";
import PlaceTable from "./containers/table";

function PlaceContainer() {
  return (
    <div className="h-[100vh] overflow-hidden">
      <Header />
      <div className="h-[calc(100%_-_60px)] px-6 pt-6">
        <PlaceTable />
      </div>
    </div>
  );
}

export default PlaceContainer;
