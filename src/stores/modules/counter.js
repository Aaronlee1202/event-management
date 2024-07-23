import { defineStore } from 'pinia'; // Import defineStore from pinia
import { ref } from 'vue';

export const useCounterStore = defineStore(
  'counter',
  () => {
    const count = ref(0);

    const increment = () => {
      count.value++;
    };

    const decrement = () => {
      count.value--;
    };

    return { count, increment, decrement };
  },
  { persist: true }
);
