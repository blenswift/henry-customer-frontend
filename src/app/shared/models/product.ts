export interface Product {
  id: string;
  categoryId: string;
  name: string;
  imageUrl: string;
  description: string;
  basePrice: number;
  available: boolean;
  ingredients: string[];
  legalAge: number;
  allergens: string[];
  additives: string[];
  extraGroups: ExtraGroup[];
}

export interface ExtraGroup {
  name: string;
  selectionType: SelectionType;
  defaultValue: string | null;
  extras: Extra[];
}

export interface Extra {
  id: string;
  price: number | null;
  name: string;
  allergens: string[];
  additives: string[];
}

export type SelectionType = 'CHECKBOX' | 'RADIO_GROUP';
