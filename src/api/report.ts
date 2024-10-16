import { Report, ReportType, ReportNode } from "../model/Report";
import instance from "./instance";

class ReportApi {
  private static instance = instance;

  static async getReport(
    start: string,
    end: string,
    reportType: ReportType,
    placeId?: number
  ): Promise<Report> {
    const response = await this.instance.get(`/record/report/${reportType}/`, {
      params: { start, end, place_id: placeId },
    });

    return response.data;
  }

  static async getReportHierchically(
    start: string,
    end: string,
    reportType: ReportType,
    placeId?: number
  ): Promise<ReportNode> {
    const response = await this.instance.get(
      `/record/report-hierarchicallly/${reportType}/`,
      {
        params: { start, end, place_id: placeId },
      }
    );

    return response.data;
  }
}

export default ReportApi;
