import Header from "../header";
import RecordsTable from "./containers/table";
import FilterPanel from "./containers/filterPanel";

function RecordContainer() {
  return (
    <div className="h-[100vh] overflow-hidden">
      <Header />
      <div className="h-[calc(100%_-_60px)] px-6 pt-6 flex flex-col gap-2">
        <FilterPanel />
        <RecordsTable />
      </div>
    </div>
  );
}

export default RecordContainer;
