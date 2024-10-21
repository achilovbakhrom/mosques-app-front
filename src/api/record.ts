import { Paginated } from "../model/Paginated";
import { Record } from "../model/Record";
import instance from "./instance";

class RecordApi {
  private static instance = instance;

  static async getRecords(
    page: number,
    pageSize: number,
    placeId?: number
  ): Promise<Paginated<Record>> {
    const response = await this.instance.get("/record/", {
      params: { page, page_size: pageSize, place_id: placeId },
    });

    return response.data;
  }

  static async createRecord(arg: Partial<Record>): Promise<void> {
    await this.instance.post("/record/", arg);
  }

  static async getTotalSum(arg: number): Promise<{ total?: number | null }> {
    const response = await this.instance.get(`/record/report-profit/${arg}/`);
    return response.data;
  }
}

export default RecordApi;
