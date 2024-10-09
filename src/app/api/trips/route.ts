import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM PackIT_Trips');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user_id, start_date, end_date, location, low_weather, high_weather } = await request.json();
    const result = await pool.query(
      'INSERT INTO PackIT_Trips (user_id, start_date, end_date, location, low_weather, high_weather) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [user_id, start_date, end_date, location, low_weather, high_weather]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, user_id, start_date, end_date, location, low_weather, high_weather } = await request.json();
    const result = await pool.query(
      'UPDATE PackIT_Trips SET user_id = $1, start_date = $2, end_date = $3, location = $4, low_weather = $5, high_weather = $6 WHERE id = $7 RETURNING *',
      [user_id, start_date, end_date, location, low_weather, high_weather, id]
    );
    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const result = await pool.query('DELETE FROM PackIT_Trips WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}