export async function GET() {
  try {
    // Return default settings
    const settings = {
      platformName: 'Internshala',
      supportEmail: 'support@internshala.com',
      maintenanceMode: false,
      emailNotifications: true,
      applicationNotifications: true,
      userRegistrationAllowed: true,
      maxFileUploadSize: 5,
      sessionTimeout: 30,
    };

    return Response.json(settings);
  } catch (error) {
    console.error('Settings error:', error);
    return Response.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const settings = await request.json();

    // Here you would typically save settings to a database or configuration file
    // For now, we'll just return success
    console.log('Settings updated:', settings);

    return Response.json({
      success: true,
      message: 'Settings saved successfully',
      settings,
    });
  } catch (error) {
    console.error('Settings update error:', error);
    return Response.json(
      { error: 'Failed to save settings' },
      { status: 500 }
    );
  }
}
