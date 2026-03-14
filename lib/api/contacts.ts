import type { MockContact } from "@/lib/data/mock-admin";
import { mockContacts as initialContacts } from "@/lib/data/mock-admin";

let contactsData: MockContact[] = initialContacts.map((c) => ({ ...c }));

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchContacts(): Promise<MockContact[]> {
  await delay(300);
  return [...contactsData];
}

export async function fetchContact(id: string): Promise<MockContact | undefined> {
  await delay(200);
  return contactsData.find((c) => c.id === id);
}

export async function createContact(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<MockContact> {
  await delay(400);
  const id = (contactsData.length + 1).toString();
  const contact: MockContact = {
    ...data,
    id,
    read: false,
    createdAt: new Date().toISOString(),
  };
  contactsData.push(contact);
  return contact;
}

export async function markContactRead(id: string): Promise<MockContact | null> {
  await delay(200);
  const contact = contactsData.find((c) => c.id === id);
  if (!contact) return null;
  contact.read = true;
  return contact;
}

export async function deleteContact(id: string): Promise<boolean> {
  await delay(300);
  const idx = contactsData.findIndex((c) => c.id === id);
  if (idx === -1) return false;
  contactsData.splice(idx, 1);
  return true;
}
