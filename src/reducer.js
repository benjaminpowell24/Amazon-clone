export const initialState = {
    basket : [],
    user: null
};

export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => (item.price * item.qty) + amount,0);

const reducer = (state, action) => {
    console.log(action);    
    switch(action.type){
        case 'ADD_TO_BASKET':
            return {
                ...state,                    
                basket : [...state.basket, action.item]
            };
            
        case 'EMPTY_BASKET':
            return{
                ...state,
                basket : []
            };
                
        case 'REMOVE_FROM_BASKET':
            let newBasket = [...state.basket];
            const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);
            
            if(index >= 0){
                newBasket.splice(index,1);
            }
            return {
                ...state,
                basket: newBasket
            };

        case 'INCREASE_QTY':
            let newBasket1 = [...state.basket];
            const index1 = state.basket.findIndex((basketItem) => basketItem.id === action.id);    

            if(index1>=0){
                newBasket1.find(item => item.id === action.id).qty = action.qty;
            }
            return{
                ...state,
                basket: newBasket1
            };

        case 'DECREASE_QTY':
            let newBasket2 = [...state.basket];
            const index2 = state.basket.findIndex((basketItem) => basketItem.id === action.id);    

            if(index2>=0){
                newBasket2.find(item => item.id === action.id).qty = action.qty;
            }
            return{
                ...state,
                basket: newBasket2
            };
        
        case 'SET_USER':
            return{
                ...state,
                user: action.user
            };

        default:
            return state;
    }
    
}

export default reducer;