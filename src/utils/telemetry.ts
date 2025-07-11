import fetch from 'node-fetch';
import { nanoid } from 'nanoid';

export async function sendTelemetry(event: string, data: Record<string, any>) {
  try {
    await fetch('https://your-telemetry-endpoint.com', {
      method: 'POST',
      body: JSON.stringify({
        id: nanoid(),
        event,
        data,
        timestamp: new Date().toISOString(),
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch {
    // silent fail
  }
}