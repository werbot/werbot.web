import { defineStore } from "pinia";

interface ErrorState {
  message: null | string;
  errors: any;
}

// Define a store named 'error'
export const useErrorStore = defineStore("error", {
  // Use an arrow function for the state object
  state: (): ErrorState => ({
    message: null,
    errors: {},
  }),

  // Define getters to get values from the store
  getters: {
    // Get error codes from the 'errors' state object
    errorCode(state) {
      return Object.keys(state.errors);
    },
  },

  // Define actions to modify the store's state
  actions: {
    // Reset the store to its initial state
    resetStore() {
      this.$reset(); // '$reset' is a Pinia helper method to reset the state
    },

    /**
     * Setter method for the `message` property.
     * @param message - The error message to be stored.
     */
    setErrorMessage(message: string) {
      this.message = message;
    },

    /**
     * Setter method for the `errors` property.
     * @param errors - The errors to be stored.
     */
    setErrors(errors: any) {
      this.errors = errors;
    },
  },
});
