export default function LimitText(text: string) {
  const maxLength = 165;
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}
