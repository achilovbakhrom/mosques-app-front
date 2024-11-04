import { Paginated } from "../model/Paginated";
import { Place } from "../model/Place";
import { User } from "../model/User";
import instance from "./instance";

class PlaceApi {
  private static instance = instance;

  static async getCurrentPlace(id: number): Promise<Place> {
    const response = await this.instance.get(`/place/${id}/`);

    return response.data;
  }

  static async getPlaces(
    page: number,
    pageSize: number,
    placeId?: number
  ): Promise<Paginated<Place>> {
    const response = await this.instance.get("/place/", {
      params: { page, page_size: pageSize, place_id: placeId },
    });

    return response.data;
  }

  static async getUsers(placeId: number): Promise<Paginated<User>> {
    const response = await this.instance.get(`/user/place/${placeId}/`);

    return response.data;
  }
}

export default PlaceApi;
