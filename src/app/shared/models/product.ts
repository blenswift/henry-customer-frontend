export interface Product {
  id: string;
  categoryId: string;
  name: string;
  imageUrl: string;
  description: string;
  basePrice: number;
  available: boolean;
  ingredients: string[] | null;
  legalAge: number;
  diets: string[];
  allergens: string[];
  additives: string[];
  extraGroups: ExtraGroup[];
}

export interface ExtraGroup {
  name: string;
  selectionType: SelectionType;
  defaultValue: string | null;
  maxSelections: number;
  selected: string | null;
  extras: Extra[];
}

export interface Extra {
  id: string;
  price: number | null;
  name: string;
  maxQuantity: number;
  quantity: number;
  allergens: string[];
  selected: boolean;
  additives: string[];
}

export type SelectionType = 'CHECKBOX' | 'RADIO_GROUP' | 'MULTI_SELECT';
