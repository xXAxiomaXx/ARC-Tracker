export default async function handler(req, res) {
  const { search } = req.query;
  
  try {
    const url = search 
      ? `https://metaforge.app/api/arc-raiders/items?search=${encodeURIComponent(search)}`
      : `https://metaforge.app/api/arc-raiders/items`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
