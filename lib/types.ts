export type Trip = {
  id: number; // int4
  delegation_id: number; // int4
  start_time: Date; // timestamp, keep as Date
  end_time: number; // int4
  start_location: string; // numeric(5,2), nullable, represents decimal
  end_location?: string; // numeric(5,2), nullable, represents decimal
  trip_description?: string; // int4, nullable
  start_meter?: number; // varchar(250), nullable
  end_meter?: number; // int2, nullable
  car_id: number;
  user_id: number;
  last_updated: Date;
  status: string;
};
