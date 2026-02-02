/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { handleSubmitTouristIndividualResearch } from "./handle-submit-tourist-individual-research";
import { formatErrors } from "@/utils/format-errors";

vi.mock("@/utils/format-errors", () => ({
	formatErrors: vi.fn(),
}));

const fetchMock = vi.fn();

describe("handleSubmitTouristIndividualResearch", () => {
	beforeEach(() => {
		vi.resetAllMocks();
		global.fetch = fetchMock as any;
		process.env.NEXT_PUBLIC_APP_BASE_PATH = "http://localhost:3000";
	});

	describe("when the request succeeds", () => {
		it("calls fetch with correct params and returns the response JSON", async () => {
			const payload = { tourist_country: "Brasil" };

			fetchMock.mockResolvedValue({
				ok: true,
				json: vi.fn().mockResolvedValue({ success: true }),
			});

			const result = await handleSubmitTouristIndividualResearch(payload);

			expect(fetchMock).toHaveBeenCalledWith(
				"http://localhost:3000/api/researches/tourist-individual",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				},
			);

			expect(result).toEqual({ success: true });
		});
	});

	describe("when the API responds with an error", () => {
		it("throws a formatted error message", async () => {
			const payload = { tourist_country: "Brasil" };

			(formatErrors as any).mockReturnValue("Campo inválido");

			fetchMock.mockResolvedValue({
				ok: false,
				status: 400,
				json: vi.fn().mockResolvedValue({
					errors: ["campo inválido"],
				}),
			});

			await expect(
				handleSubmitTouristIndividualResearch(payload),
			).rejects.toThrow("Can't submit form data [400] ~ Campo inválido");

			expect(formatErrors).toHaveBeenCalled();
		});
	});

	describe("when the network request fails", () => {
		it("throws an error with the original message", async () => {
			fetchMock.mockRejectedValue(new Error("Network error"));

			await expect(
				handleSubmitTouristIndividualResearch({}),
			).rejects.toThrow("Can't submit form data Network error");
		});
	});

	describe("when a non-Error value is thrown", () => {
		it("throws a generic unknown error message", async () => {
			fetchMock.mockRejectedValue("qualquer coisa");

			await expect(
				handleSubmitTouristIndividualResearch({}),
			).rejects.toThrow("Unknown error submitting form data");
		});
	});
});
