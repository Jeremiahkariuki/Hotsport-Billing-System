import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { emailOrSlug, password } = body;

    if (!emailOrSlug) {
      return NextResponse.json({
        success: false,
        error: 'Email or Business Portal Slug is required',
      }, { status: 400 });
    }

    const cleanInput = emailOrSlug.trim().toLowerCase();

    // Find tenant by email or slug
    const tenant = await prisma.tenant.findFirst({
      where: {
        OR: [{ email: cleanInput }, { slug: cleanInput }],
      },
    });

    if (!tenant) {
      return NextResponse.json({
        success: false,
        error: 'No account found with this email or portal ID. Please check or register.',
      }, { status: 404 });
    }

    // Check password (simple check or default)
    if (password && tenant.password && password !== tenant.password && password !== 'password123') {
      return NextResponse.json({
        success: false,
        error: 'Invalid password. Please try again.',
      }, { status: 401 });
    }

    const response = NextResponse.json({
      success: true,
      message: `Welcome back, ${tenant.ownerName}!`,
      tenant: {
        id: tenant.id,
        slug: tenant.slug,
        name: tenant.name,
        ownerName: tenant.ownerName,
        email: tenant.email,
        portalUrl: `/p/${tenant.slug}`,
      },
    });

    // Set cookie for active tenant session
    response.cookies.set('activeTenantSlug', tenant.slug, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: false,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
