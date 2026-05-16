# Admin Dashboard Documentation

## Overview
A modern, professional admin dashboard built with Next.js and Tailwind CSS, styled similar to InternShala's job portal. The dashboard includes user management, analytics, and system settings.

## Features

### 1. **Manage Users** (`/admin/manage-users`)
Complete user management interface with the following features:

#### Functionality:
- **View All Users**: Display all registered users with their details
- **Search**: Real-time search by user name or email
- **Sort Options**:
  - Newest First (default)
  - Oldest First
  - Name (A-Z)
- **User Information Displayed**:
  - User Avatar (initials)
  - Full Name
  - Email Address (clickable mailto link)
  - Join Date
- **Delete Users**: Remove user accounts with confirmation modal
- **Select Multiple Users**: Bulk selection with select-all checkbox
- **Responsive Design**: Desktop table view and mobile card view

#### API Endpoint:
```
GET /api/users
```
Returns array of user objects with fields: `_id`, `name`, `email`, `createdAt`

#### Example Response:
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-05-01T10:30:00Z"
  }
]
```

---

### 2. **Analytics Dashboard** (`/admin/analytics`)
Real-time platform statistics and insights with comprehensive reporting.

#### Key Metrics Displayed:
- **Total Users**: Number of registered users with monthly growth
- **Job Listings**: Active job postings with monthly additions
- **Internship Positions**: Active internships with monthly growth
- **Conversion Rate**: Percentage of approved applications

#### Applications Overview:
- **Total Applications**: All submitted applications
- **Approved Applications**: Accepted applications with progress bar
- **Pending Applications**: Under review with progress bar
- **Rejected Applications**: Declined applications with progress bar

#### Features:
- **Date Range Filtering**: View statistics for week, month, or year
- **Download Report**: Export analytics as CSV file
- **Trend Indicators**: Up/down percentage changes
- **Quick Navigation Links**: Direct links to related sections
- **Progress Bars**: Visual representation of application status distribution

#### API Endpoint:
```
GET /api/admin/analytics?range=[week|month|year]
```

#### Example Response:
```json
{
  "totalUsers": 1250,
  "totalJobs": 45,
  "totalInternships": 30,
  "totalApplications": 890,
  "approvedApplications": 234,
  "pendingApplications": 456,
  "rejectedApplications": 200,
  "conversionRate": 26.29,
  "applicationsThisMonth": 125,
  "usersThisMonth": 45,
  "jobsThisMonth": 8,
  "internshipsThisMonth": 5
}
```

---

### 3. **Settings** (`/admin/settings`)
System-wide configuration and preferences management.

#### Setting Categories:

**General Settings**
- Platform Name: Customize the platform name
- Support Email: Configure support contact email

**System Settings**
- Maintenance Mode: Enable/disable maintenance mode
- User Registration: Allow/disallow new user registrations
- Max File Upload Size: Set maximum upload file size (MB)
- Session Timeout: Configure session expiration time (minutes)

**Notification Settings**
- Email Notifications: Toggle email notifications globally
- Application Notifications: Toggle new application alerts

**Security Settings**
- Change Admin Password: Link to password change (future implementation)
- Security Checklist: Display security status indicators

#### Features:
- **Toggle Switches**: Easy on/off configuration
- **Number Inputs**: Set numeric values (file size, timeout)
- **Text Inputs**: Configure text-based settings
- **Save/Cancel**: Persist or discard changes
- **Success Notifications**: Confirmation message on save
- **Error Handling**: Display errors when applicable

#### API Endpoints:
```
GET /api/admin/settings
POST /api/admin/settings
```

#### Settings Object:
```json
{
  "platformName": "Internshala",
  "supportEmail": "support@internshala.com",
  "maintenanceMode": false,
  "emailNotifications": true,
  "applicationNotifications": true,
  "userRegistrationAllowed": true,
  "maxFileUploadSize": 5,
  "sessionTimeout": 30
}
```

---

## UI Components

### AdminNavigation
Reusable navigation component with:
- Desktop sidebar (fixed on left)
- Mobile hamburger menu
- Active route highlighting
- Logout functionality

**Location**: `components/AdminNavigation.tsx`

### Admin Layout
Main layout wrapper for all admin pages.
**Location**: `app/admin/layout.tsx`

### AdminComponents
Reusable component library:

**AdminHeader**
```tsx
<AdminHeader
  title="Page Title"
  description="Page description"
  stats={[{ label: 'Total', value: 100 }]}
  action={<button>Action</button>}
/>
```

**AdminContent**
Wrapper for main page content with proper padding and max-width.

**AdminCard**
Reusable card component with consistent styling.

**AdminGrid**
Responsive grid layout with configurable columns (1, 2, 3, or 4).

**StatBox**
Statistics display component with color variants:
- blue (default)
- emerald
- purple
- orange
- red
- slate

---

## File Structure

```
internarea/
├── app/admin/
│   ├── layout.tsx                    # Admin layout wrapper
│   ├── manage-users/
│   │   └── page.tsx                 # User management page
│   ├── analytics/
│   │   └── page.tsx                 # Analytics dashboard
│   ├── settings/
│   │   └── page.tsx                 # Settings page
│   └── dashboard/
│       └── page.tsx                 # Main dashboard
├── app/api/
│   ├── users/
│   │   └── route.ts                 # Fetch users
│   └── admin/
│       ├── analytics/
│       │   └── route.ts             # Fetch analytics
│       └── settings/
│           └── route.ts             # Get/Save settings
└── components/
    ├── AdminNavigation.tsx           # Navigation sidebar
    └── AdminComponents.tsx           # Reusable components
```

---

## Styling

All components use **Tailwind CSS** with:
- Responsive design (mobile-first approach)
- Professional color scheme:
  - Primary: Blue (#0F172A - #3B82F6)
  - Success: Emerald
  - Warning: Amber/Orange
  - Danger: Red
  - Neutral: Slate

### Color Palette:
- **Blue**: Primary actions and highlights
- **Emerald**: Growth and positive metrics
- **Purple**: Internships and special sections
- **Orange**: Caution and warnings
- **Red**: Errors and critical actions
- **Slate**: Neutral and text elements

---

## Getting Started

### 1. Access Admin Dashboard
Navigate to `/admin/dashboard` after logging in as admin.

### 2. Navigate Between Sections
Use the sidebar or mobile menu to access:
- Applications
- Manage Users
- Analytics
- Settings
- Post Job
- Post Internship

### 3. User Management Workflow
1. Go to "Manage Users"
2. Search or filter users as needed
3. View user details
4. Delete users if necessary

### 4. View Analytics
1. Go to "Analytics Dashboard"
2. Select time range (week/month/year)
3. Review key metrics and application status
4. Download report as CSV

### 5. Configure Settings
1. Go to "Settings"
2. Update desired configurations
3. Click "Save Settings"
4. Confirm success message

---

## Future Enhancements

1. **Advanced Analytics**
   - Charts and graphs (Chart.js or similar)
   - Detailed application timeline
   - User growth trends
   - Revenue metrics

2. **User Management**
   - Edit user information
   - Suspend/ban users
   - Send notifications to users
   - Export user list

3. **Settings**
   - Email template customization
   - Payment gateway configuration
   - Theme customization
   - API key management

4. **Moderation**
   - Content moderation queue
   - Report management
   - User activity logs
   - Audit trails

5. **Performance**
   - Database query optimization
   - Caching strategies
   - Pagination for large datasets
   - Real-time updates with WebSockets

---

## Troubleshooting

### Users Not Loading
- Check MongoDB connection in `/lib/mongodb.ts`
- Verify User model is properly exported
- Check browser console for API errors

### Analytics Not Working
- Ensure all models (Application, Job, Internship) are connected
- Check database has sample data
- Verify API endpoint is returning correct data

### Settings Not Saving
- Check POST endpoint is correctly implemented
- Verify JSON payload format
- Check for console errors in browser dev tools

---

## Performance Tips

1. **Optimize Database Queries**
   - Add indexes to frequently searched fields
   - Use pagination for large datasets

2. **Frontend Optimization**
   - Images are optimized with Next.js Image component
   - Lazy load heavy components
   - Use React.memo for expensive components

3. **Caching Strategy**
   - Cache admin settings
   - Use SWR or React Query for data fetching
   - Implement browser caching headers

---

## Security Considerations

1. **Authentication**: Only accessible after admin login
2. **Authorization**: Admin-only routes are protected
3. **Data Validation**: Input validation on all forms
4. **CSRF Protection**: Use built-in Next.js CSRF protection
5. **Rate Limiting**: Implement rate limiting on API endpoints

---

## Support & Maintenance

For issues or feature requests:
1. Check the troubleshooting section
2. Review console logs for errors
3. Check database connectivity
4. Verify API endpoints are working

**Last Updated**: May 4, 2024
**Version**: 1.0.0
