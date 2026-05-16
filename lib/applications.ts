import { apiFetch } from './api';

export type ApplicationStatus = 'Pending' | 'Approved' | 'Rejected';

export type ApplicationData = {
  id: string;
  listingType: 'job' | 'internship';
  listingId: string;
  company: string;
  category: string;
  applicantName: string;
  applicantEmail: string;
  phoneNumber: string;
  coverLetter: string;
  resumeFileName: string;
  appliedDate: string;
  status: ApplicationStatus;
};


export type CreateApplicationInput = {
  listingType: 'job' | 'internship';
  listingId: string;
  company: string;
  category: string;
  applicantName: string;
  applicantEmail: string;
  phoneNumber: string;
  coverLetter: string;
  resumeFileName: string;
  appliedDate: string;
};

type BackendApplication = {
  _id: string;
  listingType: 'job' | 'internship';
  listingId: string;
  company: string;
  category: string;
  applicantName: string;
  applicantEmail: string;
  phoneNumber: string;
  coverLetter: string;
  resumeFileName: string;
  appliedDate: string;
  status: 'pending' | 'approved' | 'rejected';
};

function mapStatus(status: BackendApplication['status']): ApplicationStatus {
  if (status === 'approved') {
    return 'Approved';
  }

  if (status === 'rejected') {
    return 'Rejected';
  }

  return 'Pending';
}

function toApiStatus(status: ApplicationStatus) {
  return status.toLowerCase();
}

function mapApplication(raw: BackendApplication): ApplicationData {
  return {
    id: raw._id,
    listingType: raw.listingType,
    listingId: raw.listingId,
    company: raw.company,
    category: raw.category,
    applicantName: raw.applicantName,
    applicantEmail: raw.applicantEmail,
    phoneNumber: raw.phoneNumber,
    coverLetter: raw.coverLetter,
    resumeFileName: raw.resumeFileName,
    appliedDate: raw.appliedDate,
    status: mapStatus(raw.status),
  };
}

export async function getApplications(email?: string) {
  const searchParams = new URLSearchParams();

  if (email) {
    searchParams.set('email', email);
  }

  const query = searchParams.toString();
  const applications = await apiFetch<BackendApplication[]>(`/api/application${query ? `?${query}` : ''}`);

  return applications.map(mapApplication);
}

export async function createApplication(payload: CreateApplicationInput) {
  const createdApplication = await apiFetch<BackendApplication>('/api/application', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return mapApplication(createdApplication);
}

export async function updateApplicationStatus(id: string, status: ApplicationStatus) {
  const updatedApplication = await apiFetch<BackendApplication>(`/api/application/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status: toApiStatus(status) }),
  });

  return mapApplication(updatedApplication);
}

export async function deleteApplication(id: string) {
  await apiFetch(`/api/application/${id}`, {
    method: 'DELETE',
  });
}