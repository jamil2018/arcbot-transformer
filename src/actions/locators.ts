"use server";

import prisma from "@/config/dbConfig";
import { revalidatePath } from "next/cache";

export interface Locator {
  name: string;
  module: string;
  value: string;
  file: string;
}

export async function getAllLocators() {
  try {
    const res = await prisma.locator.findMany();
    return res;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Error processing request";
    console.error(errorMessage);
    return {
      message: "Error processing request",
      error: errorMessage,
    };
  }
}

export async function createLocator(locator: Locator) {
  try {
    const res = await prisma.locator.create({ data: locator });
    revalidatePath("/locators");
    return { success: true, data: res };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Error processing request";
    if (errorMessage.includes("Unique constraint failed on the fields:")) {
      return {
        success: false,
        message: "Locator already exists",
        error: errorMessage,
      };
    }
    return {
      success: false,
      message: "Error processing request",
      error: errorMessage,
    };
  }
}

export async function deleteLocator(id: number) {
  try {
    const res = await prisma.locator.delete({ where: { id } });
    revalidatePath("/locators");
    return { success: true, data: res };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Error processing request";
    return {
      success: false,
      message: "Error processing request",
      error: errorMessage,
    };
  }
}

export async function deleteMultipleLocator(id: number[]) {
  try {
    const res = await prisma.locator.deleteMany({ where: { id: { in: id } } });
    revalidatePath("/locators");
    return { success: true, data: res };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Error processing request";
    return {
      success: false,
      message: "Error processing request",
      error: errorMessage,
    };
  }
}
