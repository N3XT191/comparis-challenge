export interface Property {
	title: string;
	realEstateType: RealEstateType;
	streetName: string;
	streetNumber: string;
	zip: string;
	city: string;
	latitude: number;
	longitude: number;
}

export interface FilterOptions {
	realEstateType: RealEstateFilterType;
	viewport: number[];
}
type RealEstateType = "House" | "Apartment";
export type RealEstateFilterType = RealEstateType | "";
