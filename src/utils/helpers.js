// Utility functions for the application

/**
 * Validates if a full name has duplicate repetitions
 * @param {string} name - The full name to validate
 * @returns {string|null} - Error message if invalid, null if valid
 */
export function validateFullName(name) {
  if (!name || !name.trim()) return null;

  const trimmedName = name.trim();
  const words = trimmedName.split(/\s+/);

  // Check if the entire string is repeated (e.g., "abcabcabc")
  const normalizedName = trimmedName.replace(/\s+/g, '').toLowerCase();
  const halfLength = Math.floor(normalizedName.length / 2);
  if (halfLength > 0) {
    const firstHalf = normalizedName.substring(0, halfLength);
    const secondHalf = normalizedName.substring(halfLength);
    if (firstHalf === secondHalf) {
      return "Tên của bạn nhập đã bị trùng lặp, hãy nhập lại";
    }
  }

  // Check for consecutive duplicate words (e.g., "Trần Bá Trần Bá")
  for (let i = 0; i < words.length - 1; i++) {
    if (words[i].toLowerCase() === words[i + 1].toLowerCase()) {
      return "Tên của bạn nhập đã bị trùng lặp, hãy nhập lại";
    }
  }

  return null;
}