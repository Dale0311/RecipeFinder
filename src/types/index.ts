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
  [key: string]: any;
};
