import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    console.log('request:', request);
    // const { searchParams } = new URL(request.url);
    const userId = 1; //searchParams.get('userId');
    const tripId = 1; //searchParams.get('tripId');

    if (!userId || !tripId) {
      return NextResponse.json({ error: 'User ID and Trip ID are required' }, { status: 400 });
    }

    // First, verify that the trip belongs to the user
    const tripResult = await pool.query(
      'SELECT * FROM PackIT_Trips WHERE id = $1 AND user_id = $2',
      [tripId, userId]
    );
    console.log('tripResult:', tripResult);

    if (tripResult.rowCount === 0) {
      return NextResponse.json({ error: 'Trip not found or does not belong to the user' }, { status: 404 });
    }

    // Fetch activities and packing items for the trip
    const result = await pool.query(`
      SELECT
        a.id AS activity_id,
        a.name AS activity_name,
        pi.id AS packing_item_id,
        pi.text AS packing_item_text,
        pi.is_packed
      FROM
        PackIT_Activities a
      LEFT JOIN
        PackIT_PackingItems pi ON a.id = pi.activity_id
      WHERE
        a.trip_id = $1
      ORDER BY
        a.id, pi.id
    `, [tripId]);

    // Process the result to group packing items by activity
    const activities = result.rows.reduce((acc, row) => {
      const activity = acc.find((a: { id: BigInteger; }) => a.id === row.activity_id);
      if (activity) {
        if (row.packing_item_id) {
          activity.packingItems.push({
            id: row.packing_item_id,
            text: row.packing_item_text,
            isPacked: row.is_packed
          });
        }
      } else {
        acc.push({
          id: row.activity_id,
          name: row.activity_name,
          packingItems: row.packing_item_id ? [{
            id: row.packing_item_id,
            text: row.packing_item_text,
            isPacked: row.is_packed
          }] : []
        });
      }
      return acc;
    }, []);

    return NextResponse.json({ activities });
  } catch (error) {
    console.error('Error fetching trip details:', error);
    return NextResponse.json({ error: 'Failed to fetch trip details' }, { status: 500 });
  }
}