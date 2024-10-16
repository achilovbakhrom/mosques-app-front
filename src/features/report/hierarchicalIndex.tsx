import SimpleHeader from "../header/simpleHeader";
import FilterPanel from "./containers/filterPanel";
import HierarchicallyReportTable from "./containers/hierarchicallyTable";

function ReportContainer() {
  return (
    <div className="h-[100vh] overflow-hidden">
      <SimpleHeader title="Хисобот" />
      <div className="h-[calc(100%_-_60px)] px-6 pt-6 flex flex-col gap-2">
        <FilterPanel isMosque={false} />
        <HierarchicallyReportTable />
      </div>
    </div>
  );
}

export default ReportContainer;
