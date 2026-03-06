export interface CountryFollowers {
  country: string;
  code: string;
  followers: number;
}

export interface CityFollowers {
  city: string;
  country: string;
  percentage: number;
  followers: number;
}

export interface AgeGroup {
  range: string;
  male: number;
  female: number;
}

export const countryFollowers: CountryFollowers[] = [
  { country: "México", code: "MEX", followers: 45200 },
  { country: "Estados Unidos", code: "USA", followers: 12800 },
  { country: "Colombia", code: "COL", followers: 8500 },
  { country: "Argentina", code: "ARG", followers: 6200 },
  { country: "España", code: "ESP", followers: 4800 },
  { country: "Brasil", code: "BRA", followers: 3200 },
  { country: "Chile", code: "CHL", followers: 2100 },
  { country: "Perú", code: "PER", followers: 1900 },
  { country: "Ecuador", code: "ECU", followers: 1400 },
  { country: "Guatemala", code: "GTM", followers: 900 },
];

export const topCities: CityFollowers[] = [
  { city: "Ciudad de México", country: "México", percentage: 18, followers: 5840 },
  { city: "Monterrey", country: "México", percentage: 11, followers: 2310 },
  { city: "Guadalajara", country: "México", percentage: 10, followers: 1840 },
  { city: "Los Ángeles", country: "Estados Unidos", percentage: 7, followers: 1020 },
  { city: "Bogotá", country: "Colombia", percentage: 6, followers: 780 },
  { city: "Miami", country: "Estados Unidos", percentage: 5, followers: 560 },
  { city: "Buenos Aires", country: "Argentina", percentage: 3, followers: 430 },
  { city: "Madrid", country: "España", percentage: 2, followers: 310 },
];

export const ageDistribution: AgeGroup[] = [
  { range: "13-17", male: 2100, female: 1800 },
  { range: "18-24", male: 12400, female: 14200 },
  { range: "25-34", male: 15800, female: 18100 },
  { range: "35-44", male: 8200, female: 7600 },
  { range: "45-54", male: 3100, female: 2800 },
  { range: "55+", male: 1200, female: 900 },
];

export const genderDistribution = {
  male: 42800,
  female: 45400,
  total: 88200,
};
