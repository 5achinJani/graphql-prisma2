import Photon from "@generated/photon";

export interface Context {
  photon: Photon;
  request: any;
  userId: string;
}
