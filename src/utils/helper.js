export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0'); // HH
    const minutes = String(date.getMinutes()).padStart(2, '0'); // mm
    const day = String(date.getDate()).padStart(2, '0'); // dd
    const month = String(date.getMonth() + 1).padStart(2, '0'); // MM (month is zero-based)
    const year = date.getFullYear(); // yyyy
    return `${hours}:${minutes} ${day}-${month}-${year}`;
  };
