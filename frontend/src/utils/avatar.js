function getInitials(name) {
    if (!name) return "";
  
    const words = name.trim().split(" ");       // split by space
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  export default getInitials;