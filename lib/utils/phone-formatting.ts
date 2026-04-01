export function formatPhoneNumber(value: string): string {
  // Remove all non-numeric characters
  const cleaned = value.replace(/\D/g, "");
  
  // Handle different formats
  if (cleaned.startsWith("216")) {
    // Already has country code
    const rest = cleaned.slice(3);
    if (rest.length >= 8) {
      return `+216 ${rest.slice(0, 2)} ${rest.slice(2, 5)} ${rest.slice(5, 8)}`;
    } else if (rest.length >= 5) {
      return `+216 ${rest.slice(0, 2)} ${rest.slice(2, 5)} ${rest.slice(5)}`;
    } else if (rest.length >= 2) {
      return `+216 ${rest.slice(0, 2)} ${rest.slice(2)}`;
    }
    return `+216 ${rest}`;
  }
  
  // Tunisian number without country code
  if (cleaned.length >= 8) {
    return `+216 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)}`;
  } else if (cleaned.length >= 5) {
    return `+216 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
  } else if (cleaned.length >= 2) {
    return `+216 ${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
  }
  
  return cleaned ? `+216 ${cleaned}` : "";
}

export function parsePhoneNumber(formatted: string): string {
  return formatted.replace(/\D/g, "").replace(/^216/, "");
}

export function isValidTunisianPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");
  // Check for +216 followed by 8 digits, or just 8 digits
  return /^216?\d{8}$/.test(cleaned);
}
