export const ADMIN_SESSION_COOKIE_NAME = 'internarea_admin_session';
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;

export const APPLICATION_STATUSES = ['pending', 'approved', 'rejected'] as const;
export const LISTING_TYPES = ['job', 'internship'] as const;

export const DEFAULT_SUCCESS_MESSAGE = 'Request completed successfully';
export const DEFAULT_ERROR_MESSAGE = 'Something went wrong';