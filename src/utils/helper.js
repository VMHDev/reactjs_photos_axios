// Appending data to a localStorage() array
const addToLocalStorageArray = (key, value) => {
  try {
    // Get the existing data
    let existing = localStorage.getItem(key);

    // If no existing data, create an array
    // Otherwise, convert the localStorage string to an array
    let arr = existing ? JSON.parse(existing) : [];

    // Add new data to localStorage Array
    arr.data.push(value);

    // Save back to localStorage
    localStorage.setItem(key, JSON.stringify(arr));
  } catch (error) {
    console.log('utils/helper/addToLocalStorageArray', error);
  }
};

// Set delay time
const timeout = (ms) => {
  try {
    return new Promise((resolve) => setTimeout(resolve, ms));
  } catch (error) {
    console.log('utils/helper/timeout', error);
  }
};

export { addToLocalStorageArray, timeout };
