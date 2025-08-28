
export type PetCategory = {
  id: string;
  name: string;
  icon: string; 
};

export type Pet = {
  id: string;
  name: string;
  sex: 'Male' | 'Female';
  age: string;
  image: string;
  category: string;
  backgroundColor: string;
};
