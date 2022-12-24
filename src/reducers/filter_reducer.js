import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((product) => product.price);
    maxPrice = Math.max(...maxPrice);

    return {
      ...state,
      filtered_products: [...action.payload],
      all_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products]; // if somehow no filter option matched so instead of no products we display all products
    if (sort === 'price-lowest') {
      tempProducts = filtered_products.sort((a, b) => {
        // for lowest number first
        if (a.price < b.price) {
          // if we are return -1 then a will place before b
          return -1;
        }
        if (a.price > b.price) {
          // if we are return 1 then b will place before a
          return 1;
        }
        return 0;
      });
    }
    if (sort === 'price-highest') {
      tempProducts = filtered_products.sort((a, b) => b.price - a.price);
    }
    if (sort === 'name-a') {
      tempProducts = filtered_products.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    if (sort === 'name-z') {
      tempProducts = filtered_products.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }
    return { ...state, filtered_products: tempProducts };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    const { text, category, company, color, price, shipping } = state.filters;

    // filtering
    let tempProducts = [...all_products];

    // text
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }

    // category
    if (category !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      );
    }

    // company
    if (company !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.company === company
      );
    }

    // colors
    if (color !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((c) => c === color);
      });
    }

    // price
    tempProducts = tempProducts.filter((product) => product.price <= price);

    // shipping
    if (shipping) {
      tempProducts = tempProducts.filter(
        (product) => product.shipping === true
      );
    }
    return { ...state, filtered_products: tempProducts };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
