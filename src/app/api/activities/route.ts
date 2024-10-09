import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM PackIT_Activities');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { trip_id, name } = await request.json();
    const result = await pool.query(
      'INSERT INTO PackIT_Activities (trip_id, name) VALUES ($1, $2) RETURNING *',
      [trip_id, name]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, trip_id, name } = await request.json();
    const result = await pool.query(
      'UPDATE PackIT_Activities SET trip_id = $1, name = $2 WHERE id = $3 RETURNING *',
      [trip_id, name, id]
    );
    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Activity not found' }, { status: 404 });
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
    const result = await pool.query('DELETE FROM PackIT_Activities WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Activity not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}