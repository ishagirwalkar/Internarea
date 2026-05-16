'use client';

import { useState, useEffect } from 'react';
import {
  Settings,
  Bell,
  Lock,
  Globe,
  Database,
  Mail,
  User,
  Save,
  AlertCircle,
  Check,
  Loader,
} from 'lucide-react';
import { AdminHeader, AdminContent, AdminCard } from '@/components/AdminComponents';

interface Settings {
  platformName: string;
  supportEmail: string;
  maintenanceMode: boolean;
  emailNotifications: boolean;
  applicationNotifications: boolean;
  userRegistrationAllowed: boolean;
  maxFileUploadSize: number;
  sessionTimeout: number;
}

const SettingGroup = ({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: any;
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
    <div className="mb-6 flex items-start gap-4">
      <div className="rounded-lg bg-blue-100 p-3">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const ToggleSetting = ({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description?: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) => (
  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
    <div>
      <label className="font-medium text-slate-900">{label}</label>
      {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
    </div>
    <button
      onClick={() => onChange(!value)}
      className={`relative h-6 w-11 rounded-full transition ${value ? 'bg-blue-600' : 'bg-slate-300'}`}
    >
      <div
        className={`absolute h-5 w-5 rounded-full bg-white transition ${value ? 'right-0.5 top-0.5' : 'left-0.5 top-0.5'}`}
      ></div>
    </button>
  </div>
);

const InputSetting = ({
  label,
  description,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string;
  description?: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type?: string;
  placeholder?: string;
}) => (
  <div>
    <label className="block font-medium text-slate-900">{label}</label>
    {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(type === 'number' ? parseInt(e.target.value) || 0 : e.target.value)}
      placeholder={placeholder}
      className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>
);

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    platformName: 'Internshala',
    supportEmail: 'support@internshala.com',
    maintenanceMode: false,
    emailNotifications: true,
    applicationNotifications: true,
    userRegistrationAllowed: true,
    maxFileUploadSize: 5,
    sessionTimeout: 30,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      } else {
        console.error('Failed to fetch settings');
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        console.error('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="flex items-center gap-2 text-slate-600">
          <Loader className="h-8 w-8 animate-spin text-blue-600" />
          <span>Loading settings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <AdminHeader
        title="Settings"
        description="Configure platform preferences and behavior"
      />

      <AdminContent>
        {saveSuccess && (
          <div className="mb-6 flex items-center gap-3 rounded-lg bg-emerald-50 px-4 py-3 text-emerald-800 border border-emerald-200">
            <Check className="h-5 w-5" />
            <span>Settings saved successfully!</span>
          </div>
        )}

        <div className="space-y-6">
          {/* General Settings */}
          <SettingGroup
            icon={Globe}
            title="General Settings"
            description="Manage basic platform information and behavior"
          >
            <InputSetting
              label="Platform Name"
              description="The name of your platform"
              value={settings.platformName}
              onChange={(value) => setSettings({ ...settings, platformName: value as string })}
              placeholder="e.g., Internshala"
            />
            <InputSetting
              label="Support Email"
              description="Email address for platform support inquiries"
              value={settings.supportEmail}
              onChange={(value) => setSettings({ ...settings, supportEmail: value as string })}
              type="email"
              placeholder="support@example.com"
            />
          </SettingGroup>

          {/* System Settings */}
          <SettingGroup
            icon={Database}
            title="System Settings"
            description="Control platform-wide system behavior"
          >
            <ToggleSetting
              label="Maintenance Mode"
              description="Enable to put the platform in maintenance mode (users won't access it)"
              value={settings.maintenanceMode}
              onChange={(value) => setSettings({ ...settings, maintenanceMode: value })}
            />
            <ToggleSetting
              label="Allow User Registration"
              description="Allow new users to register on the platform"
              value={settings.userRegistrationAllowed}
              onChange={(value) => setSettings({ ...settings, userRegistrationAllowed: value })}
            />
            <InputSetting
              label="Max File Upload Size (MB)"
              description="Maximum file size allowed for uploads (in megabytes)"
              value={settings.maxFileUploadSize}
              onChange={(value) => setSettings({ ...settings, maxFileUploadSize: value as number })}
              type="number"
              placeholder="5"
            />
            <InputSetting
              label="Session Timeout (Minutes)"
              description="How long before user sessions expire due to inactivity"
              value={settings.sessionTimeout}
              onChange={(value) => setSettings({ ...settings, sessionTimeout: value as number })}
              type="number"
              placeholder="30"
            />
          </SettingGroup>

          {/* Notification Settings */}
          <SettingGroup
            icon={Bell}
            title="Notification Settings"
            description="Manage email and system notifications"
          >
            <ToggleSetting
              label="Email Notifications"
              description="Send email notifications for platform events"
              value={settings.emailNotifications}
              onChange={(value) => setSettings({ ...settings, emailNotifications: value })}
            />
            <ToggleSetting
              label="Application Notifications"
              description="Send notifications when new applications are received"
              value={settings.applicationNotifications}
              onChange={(value) => setSettings({ ...settings, applicationNotifications: value })}
            />
          </SettingGroup>

          {/* Security Settings */}
          <SettingGroup
            icon={Lock}
            title="Security Settings"
            description="Configure security and privacy options"
          >
            <div className="space-y-3 rounded-lg bg-slate-50 p-4">
              <div>
                <label className="block font-medium text-slate-900">Change Admin Password</label>
                <p className="mt-1 text-sm text-slate-600">Update your admin account password</p>
                <button className="mt-2 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  <Lock className="h-4 w-4" />
                  Change Password
                </button>
              </div>
            </div>

            <div className="space-y-2 rounded-lg bg-slate-50 p-4">
              <h4 className="font-medium text-slate-900">Security Checklist</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" />
                  Strong admin password set
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" />
                  HTTPS enabled
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" />
                  Database backups configured
                </li>
              </ul>
            </div>
          </SettingGroup>

          {/* Save Button */}
          <div className="flex gap-3">
            <button
              onClick={saveSettings}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-blue-400 transition"
            >
              {saving ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Save Settings
                </>
              )}
            </button>
            <button
              onClick={fetchSettings}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-900 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </AdminContent>
    </div>
  );
}
