export type TRecipe = {
  image: string;
  label: string;
  cuisineType: string[];
  calories: number;
};

export type TModifiedResponse = {
  hits: TRecipe[];
  _links: {
    next: {
      href: string;
      title: string;
    };
  };
  to: number;
  count: number;
};

export type TApiResponse = {
  hits: {
    recipe: {
      image: string;
      label: string;
      cuisine: string[];
      calories: number;
      [key: string]: any;
    };

    [key: string]: any;
  }[];
  _links: {
    next: {
      href: string;
      title: string;
    };
  };
  to: number;
  count: number;
  [key: string]: any;
};
