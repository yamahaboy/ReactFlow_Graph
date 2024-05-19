export type UserAction = {
    userId: number;
    userName: string;
    sessionId: number;
    action: string;
    timestamp: string;
}

export type SimpleAction = {
    action: string;
    timestamp: string;
};

export type UserActionGroup = {
    userId: number;
    userName: string;
    sessionId: number;
    actions: SimpleAction[];
};

export enum UserActionEnum {
    LOGIN = "LOGIN",
    VIEW_PRODUCT_LIST = "VIEW_PRODUCT_LIST",
    VIEW_PRODUCT_DETAILS = "VIEW_PRODUCT_DETAILS",
    ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART",
    VIEW_CART = "VIEW_CART",
    UPDATE_CART = "UPDATE_CART",
    REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART",
    CHECKOUT = "CHECKOUT",
    SEARCH_PRODUCT = "SEARCH_PRODUCT",
    APPLY_FILTER = "APPLY_FILTER",
    VIEW_ORDER_HISTORY = "VIEW_ORDER_HISTORY",
    VIEW_ORDER_DETAILS = "VIEW_ORDER_DETAILS",
    RATE_PRODUCT = "RATE_PRODUCT",
    ADD_PRODUCT_REVIEW = "ADD_PRODUCT_REVIEW",
    LOGOUT = "LOGOUT",
  }
  

