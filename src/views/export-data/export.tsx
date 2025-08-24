import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { convertToCSV, downloadCSV } from "@/lib/utils";

interface ExportDataProps {
  data?: any[];
  columns?: string[];
}

function ExportData({ data = [], columns = [] }: ExportDataProps) {
  const handleExport = (format: string) => {
    if (format === "csv") {
      if (!data.length || !columns.length) {
        alert("No data available to export");
        return;
      }

      const csvContent = convertToCSV(data, columns);

      downloadCSV(csvContent, "query-results.csv");
    }
  };

  const isDisabled = !data.length || !columns.length;

  return (
    <Select onValueChange={handleExport} disabled={isDisabled}>
      <SelectTrigger
        className={isDisabled ? "opacity-50 cursor-not-allowed" : ""}
      >
        <SelectValue placeholder='Export data' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='csv'>CSV</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default ExportData;
