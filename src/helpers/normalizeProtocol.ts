const PROTOCOL_REGEX = /\[(\d+)\/\d+\]/;

export const normalizeProtocol = (protocol?: string) => {
  if (!protocol) {
    return "N/A";
  }

  const splitedProtocol = protocol?.match(PROTOCOL_REGEX);

  if (!splitedProtocol) {
    return "N/A";
  }

  return splitedProtocol[1] || "N/A";
};
