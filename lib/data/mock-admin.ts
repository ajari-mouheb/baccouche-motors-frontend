export interface MockTestDrive {
  id: string;
  name: string;
  email: string;
  phone: string;
  model: string;
  preferredDate?: string;
  timeSlot?: string;
  createdAt: string;
  status: "pending" | "confirmed" | "completed" | "rejected";
}

export interface MockContact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  read?: boolean;
  createdAt: string;
}

export const mockTestDrives: MockTestDrive[] = [
  {
    id: "1",
    name: "Ahmed Ben Salem",
    email: "ahmed.bensalem@email.com",
    phone: "+216 73 123 456",
    model: "bmw-serie-3",
    preferredDate: "2025-03-10",
    timeSlot: "morning",
    createdAt: "2025-03-01T10:30:00",
    status: "pending",
  },
  {
    id: "2",
    name: "Sara Khelifi",
    email: "sara.k@email.com",
    phone: "+216 98 654 321",
    model: "bmw-x5",
    preferredDate: "2025-03-08",
    timeSlot: "afternoon",
    createdAt: "2025-02-28T14:20:00",
    status: "confirmed",
  },
  {
    id: "3",
    name: "Mohamed Trabelsi",
    email: "m.trabelsi@email.com",
    phone: "+216 70 111 222",
    model: "bmw-serie-5",
    preferredDate: "2025-03-05",
    createdAt: "2025-02-27T09:15:00",
    status: "completed",
  },
  {
    id: "4",
    name: "Youssef Jebali",
    email: "y.jebali@email.com",
    phone: "+216 72 333 444",
    model: "bmw-x3",
    preferredDate: "2025-03-12",
    timeSlot: "morning",
    createdAt: "2025-03-02T08:00:00",
    status: "rejected",
  },
];

export const mockContacts: MockContact[] = [
  {
    id: "1",
    name: "Karim Hammami",
    email: "karim.h@email.com",
    phone: "+216 73 555 666",
    subject: "Informations véhicules et financement",
    message: "Bonjour, je souhaite des informations sur les modèles disponibles et les options de financement.",
    read: false,
    createdAt: "2025-03-02T11:00:00",
  },
  {
    id: "2",
    name: "Leila Mansour",
    email: "leila.mansour@email.com",
    subject: "Service après-vente",
    message: "Question concernant le service après-vente et les garanties.",
    read: true,
    createdAt: "2025-03-01T16:45:00",
  },
];
