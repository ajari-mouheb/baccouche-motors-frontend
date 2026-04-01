import type { MockTestDrive } from "@/lib/data/mock-admin";
import { mockTestDrives as initialTestDrives } from "@/lib/data/mock-admin";

const testDrivesData: MockTestDrive[] = initialTestDrives.map((t) => ({ ...t }));

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchTestDrives(): Promise<MockTestDrive[]> {
  await delay(300);
  return [...testDrivesData];
}

export async function fetchTestDrive(id: string): Promise<MockTestDrive | undefined> {
  await delay(200);
  return testDrivesData.find((t) => t.id === id);
}

export async function createTestDrive(data: {
  name: string;
  email: string;
  phone: string;
  model: string;
  preferredDate?: string;
  timeSlot?: string;
}): Promise<MockTestDrive> {
  await delay(400);
  const id = (testDrivesData.length + 1).toString();
  const testDrive: MockTestDrive = {
    ...data,
    id,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  testDrivesData.push(testDrive);
  return testDrive;
}

export async function updateTestDriveStatus(
  id: string,
  status: MockTestDrive["status"]
): Promise<MockTestDrive | null> {
  await delay(300);
  const td = testDrivesData.find((t) => t.id === id);
  if (!td) return null;
  td.status = status;
  return td;
}

export async function deleteTestDrive(id: string): Promise<boolean> {
  await delay(300);
  const idx = testDrivesData.findIndex((t) => t.id === id);
  if (idx === -1) return false;
  testDrivesData.splice(idx, 1);
  return true;
}
