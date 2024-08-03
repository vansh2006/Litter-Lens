
export default async function fetchGarbageState() {
  const response = await fetch(`http://localhost:8000/getGarbageState`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json(); 
  return data;
}