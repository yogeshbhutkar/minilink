import Hashids from "hashids";

/**
 * Instance of Hashids configured with environment variables.
 */
export const hashids = new Hashids(
	process.env.HASH_IDS_SALT,
	parseInt(process.env.HASH_IDS_MIN_LENGTH || "6", 10),
);

/**
 * Encodes a numeric ID into a hashid string.
 *
 * @param id - The numeric ID to encode.
 * @returns The encoded hashid string.
 */
export const encodeId = (id: number): string => {
	return hashids.encode(id);
};

/**
 * Decodes a hashid string back into a numeric ID.
 *
 * @param hash - The hashid string to decode.
 * @returns The decoded numeric ID, or null if decoding fails.
 */
export const decodeId = (hash: string): number | null => {
	const decoded = hashids.decode(hash);
	if (decoded.length === 0) {
		return null;
	}

	return Number(decoded[0]);
};
