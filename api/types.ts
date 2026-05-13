export interface NPSResponse<T> {
  total: string;
  limit: string;
  start: string;
  data: T[];
}

export interface Image {
  title: string;
  altText: string;
  caption: string;
  url: string;
}

export interface Activity {
  id: string;
  name: string;
}

export interface EntranceFee {
  cost: string;
  description: string;
  title: string;
}

export interface StandardHours {
  sunday: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
}

export interface OperatingHours {
  name: string;
  description: string;
  standardHours: StandardHours;
}

export interface Park {
  id: string;
  parkCode: string;
  fullName: string;
  description: string;
  states: string;
  designation: string;
  images: Image[];
  activities: Activity[];
  entranceFees: EntranceFee[];
  operatingHours: OperatingHours[];
}
