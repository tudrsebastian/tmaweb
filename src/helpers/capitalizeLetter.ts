export  function capitalizeFirstLetter(string: string) {
    const newWord = string.slice(1);
    return newWord.charAt(0).toUpperCase() + string.slice(2);
}