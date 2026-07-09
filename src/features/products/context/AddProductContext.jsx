import React, { createContext, useContext, useReducer } from 'react';
import { addProductReducer, INITIAL_STATE } from './addProductReducer';
import { createProduct } from '../services/productsApi';

const AddProductContext = createContext();

export const AddProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(addProductReducer, INITIAL_STATE);

  const submitProduct = async (fields) => {
    if (state.images.length === 0) {
      dispatch({ type: 'SET_ERROR', payload: 'Please upload at least one product image.' });
      return { success: false }; // Returning status so component can handle navigation/timers
    }

    dispatch({ type: 'RESET_STATUS' });
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      await createProduct(fields, state.tags, state.images);
      dispatch({ type: 'SET_SUCCESS', payload: true });
      return { success: true };
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        'Something went wrong. Please try again.';
      dispatch({ type: 'SET_ERROR', payload: msg });
      return { success: false };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <AddProductContext.Provider value={{ state, dispatch, submitProduct }}>
      {children}
    </AddProductContext.Provider>
  );
};

export const useAddProduct = () => {
  const context = useContext(AddProductContext);
  if (!context) {
    throw new Error('useAddProduct must be used within an AddProductProvider');
  }
  return context;
};
