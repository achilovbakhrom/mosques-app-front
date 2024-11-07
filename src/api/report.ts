import { Report, ReportType, ReportNode } from "../model/Report";
import { ReportValueData } from "../model/ReportValue";
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

  static async getReportValue(
    start: string,
    end: string,
    placeId?: number
  ): Promise<ReportValueData[]> {
    const response = await this.instance.get(
      `/record/report-value/${placeId}/`,
      {
        params: { start, end },
      }
    );

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
