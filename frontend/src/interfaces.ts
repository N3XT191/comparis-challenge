export interface Property {
	title: string;
	realEstateType: "House" | "Apartment";
	streetName: string;
	streetNumber: string;
	zip: string;
	city: string;
	latitude: number;
	longitude: number;
}

export interface FilterOptions {
	realEstateType: "" | "House" | "Apartment";
	viewport: number[];
}
