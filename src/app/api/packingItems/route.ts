import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const result = await pool.query(`
      SELECT pi.*, a.name as activity_name
      FROM PackIT_PackingItems pi
      JOIN PackIT_Activities a ON pi.activity_id = a.id
      JOIN PackIT_Trips t ON a.trip_id = t.id
      WHERE t.user_id = $1
    `, [userId]);

    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { activity_id, text, is_packed } = await request.json();
    const result = await pool.query(
      'INSERT INTO PackIT_PackingItems (activity_id, text, is_packed) VALUES ($1, $2, $3) RETURNING *',
      [activity_id, text, is_packed]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, activity_id, is_packed } = await request.json();
    console.log("XXXX BE: ", id, activity_id, is_packed);
    const result = await pool.query(
      'UPDATE PackIT_PackingItems SET activity_id = $1, is_packed = $2 WHERE id = $3 RETURNING *',
      [activity_id, is_packed, id]
    );
    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Packing item not found' }, { status: 404 });
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
    const result = await pool.query('DELETE FROM PackIT_PackingItems WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Packing item not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}